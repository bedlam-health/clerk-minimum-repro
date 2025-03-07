"use server"
import { AvailabilityPost } from "@/lib/definitions/postTypes"
import { ClientAge, Gender } from "@/lib/definitions/demographics"
import {
  InsuranceType,
  ServiceType,
  TreatmentSetting,
  ClinicalPresentation,
  SymptomSeverity,
  YesNoContact,
} from "@/lib/definitions/provider-options"
import { redirect } from "next/navigation"
import { formSchema, FormState } from "./definitions"
import { extractChecklist, parseReusableCombobox } from "@/lib/formUtils"
import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { auth } from "@clerk/nextjs/server"

function transformForParsing(formData: FormData) {
  const data = Object.fromEntries(formData.entries())

  // Extract checklists
  const availableServices = extractChecklist<ServiceType>(
    formData,
    "availableServices_"
  )
  const treatmentSettings = extractChecklist<TreatmentSetting>(
    formData,
    "treatmentSettings_"
  )
  const ageGroup = extractChecklist<ClientAge>(formData, "ageGroup_")
  const gender = extractChecklist<Gender>(formData, "gender_")
  const clinicalPresentation = extractChecklist<ClinicalPresentation>(
    formData,
    "clinicalPresentation_"
  )
  const severity = extractChecklist<SymptomSeverity>(formData, "severity_")
  const insuranceType = extractChecklist<InsuranceType>(formData, "insurance_")
  //extract comboboxes
  const languages = parseReusableCombobox(data, "languages", "id")
  const providers = parseReusableCombobox(data, "providers", "id")

  return {
    ...data,
    acceptsSlidingScale: data.acceptsSlidingScale === "yes" ? true : false,
    availableServices,
    treatmentSettings,
    ageGroup,
    gender,
    clinicalPresentation,
    severity,
    languages,
    providers,
    insuranceType,
  }
}

function transformForDB(data: any, userId: string): AvailabilityPost {
  console.log(data)
  return {
    id: crypto.randomUUID(),
    postType: "availability",
    authorId: userId,
    createdAt: new Date(),
    content: {
      physicalLocation: {
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
      inPerson: data.inPerson as YesNoContact,
      telehealth: data.telehealth as YesNoContact,
      availableServices: data.availableServices,
      ...(data.evaluationType && { evaluationType: data.evaluationType }),
      ...(data.therapyAudience && {
        therapeuticAudience: data.therapyAudience,
      }),
      ...(data.therapyApproach && {
        therapeuticApproach: data.therapyApproach,
      }),
      ...(data.modality && { therapeuticModality: data.modality }),
      serviceSettings: data.treatmentSettings,
      insurance: {
        type: data.insuranceType,
        ...(data.providers.length > 0 && { providers: data.providers }),
      },
      acceptsSlidingScale: data.acceptsSlidingScale,
      clientCriteria: {
        ageGroup: data.ageGroup,
        gender: data.gender,
        ...(data.languages.length > 0 && { languages: data.languages }),
        clinicalPresentation: data.clinicalPresentation,
        severity: data.severity,
      },
      otherComments: data.otherComments,
    },
  }
}

export async function onFormPostAction(
  state: FormState | undefined,
  formData: FormData
) {
  const dataForParsing = transformForParsing(formData)
  const validatedFields = formSchema.safeParse(dataForParsing)
  console.log(validatedFields)
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
    throw new Error("User not authenticated")
  }

  const data = transformForDB(validatedFields.data, userId)
  console.log(data)
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
