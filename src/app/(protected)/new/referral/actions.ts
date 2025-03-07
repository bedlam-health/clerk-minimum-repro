"use server"
import { ClientAge, Gender, Pronouns } from "@/lib/definitions/demographics"
import { ReferralPost } from "@/lib/definitions/postTypes"
import {
  ClinicalPresentation,
  InsuranceType,
  MeetingMode,
  ServiceType,
  SymptomSeverity,
} from "@/lib/definitions/provider-options"
import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { extractChecklist, parseReusableCombobox } from "@/lib/formUtils"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { formSchema, FormState } from "./definitions"

function transformFormData(formData: FormData, userId: string): ReferralPost {
  const data = Object.fromEntries(formData.entries())

  // Extract checklists
  const pronouns = extractChecklist<Pronouns>(formData, "client_dem_pronouns_")
  const severity = extractChecklist<SymptomSeverity>(
    formData,
    "client_focus_symptom_severity_"
  )
  const services = extractChecklist<ServiceType>(
    formData,
    "services_service_type_"
  )

  // Determine location types
  const meetingMode: MeetingMode[] = []
  if (data.location_in_person === "Yes") meetingMode.push(MeetingMode.InPerson)
  if (data.location_virtual === "Yes") meetingMode.push(MeetingMode.Virtual)

  const insurance = []
  // must do it in this order for rendering reasons
  if (data.insurance_out_of_network === "on")
    insurance.push(InsuranceType.OutOfNetwork)
  if (data.insurance_in_network === "true")
    insurance.push(InsuranceType.InNetwork)

  // parse comboboxes
  const languages = parseReusableCombobox(data, "languages", "id")
  const providers = parseReusableCombobox(data, "insurance-providers", "id")

  return {
    id: crypto.randomUUID(),
    postType: "referral",
    authorId: userId,
    createdAt: new Date(),
    content: {
      clientDemographics: {
        physicalLocation: {
          city: data.location_city as string,
          state: data.location_state as string,
          zipCode: data.location_zip as string,
        },
        meetingMode,
        ageGroup: data.client_dem_ages as ClientAge,
        gender: data.client_dem_gender as Gender,
        pronouns,
        language_preferred: data.language_preferred == "yes" ? true : false,
        ...(languages.length > 0 && { languages: languages }),
      },
      chiefComplaint: data.client_focus_chief_complaint as ClinicalPresentation,
      symptomSeverity: severity,
      services: {
        service: services,
        ...(data.services_psychotherapy_modality && {
          modality: data.services_psychotherapy_modality as string,
        }),
      },
      insurance: {
        type: insurance,
        ...(providers.length > 0 && { providers: providers }),
      },
    },
  }
}

export async function onFormPostAction(
  state: FormState | undefined,
  formData: FormData
) {
  const pronouns = extractChecklist<Pronouns>(formData, "client_dem_pronouns_")
  const client_focus_symptom_severity = extractChecklist<string>(
    formData,
    "client_focus_symptom_severity_"
  )
  const services_service_type = extractChecklist<ServiceType>(
    formData,
    "services_service_type_"
  )
  const insurance = extractChecklist<string>(formData, "insurance_")
  const dataForParsing = {
    ...Object.fromEntries(formData.entries()),
    pronouns,
    client_focus_symptom_severity,
    services_service_type,
    insurance,
  }
  console.log(dataForParsing)

  const validatedFields = formSchema.safeParse(dataForParsing)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error(`User not authenticated`)
  }

  // process the data into format that can be saved to the database
  const data = transformFormData(formData, userId)

  try {
    // Save the post to the database
    const postRef = db.doc(`posts/${data.id}`)
    await postRef.set(data)
    return {
      message: "Successfully created post",
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      message: "Database Error: Failed to create post",
    }
  } finally {
    redirect("/home")
  }
}
