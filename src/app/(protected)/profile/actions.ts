"use server"
import { ClientAge } from "@/lib/definitions/demographics"
import {
  ClinicalPresentation,
  InsuranceType,
  ServiceType,
  SymptomSeverity,
} from "@/lib/definitions/provider-options"
import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { extractChecklist, parseReusableCombobox } from "@/lib/formUtils"
import { logger } from "@/lib/logger"
import { auth } from "@clerk/nextjs/server"
import {
  BoardCertFormState,
  BoardCertSchema,
  EducationFormState,
  EducationSchema,
  InsuranceSchema,
  LicenseFormState,
  LicenseSchema,
  PracticeClientFocusFormState,
  PracticeClientFocusSchema,
  PracticeInsuranceFormState,
  PracticeLocationFormState,
  PracticeLocationSchema,
  PracticeRolesFormState,
  PracticeRolesSchema,
  PracticeServicesFormState,
  PracticeServicesSchema,
} from "./definitions"

async function updateIsProfileComplete() {
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    logger.error("Unauthorized request - no user ID")
  }

  try {
    const userRef = db.doc(`users/${userId}`)
    const userSnap = await userRef.get()

    if (!userSnap.exists) {
      logger.info("User not found", { uid: `${userId}` })
    }
    const userData = userSnap.data()

    if (!userData) {
      logger.info("User data is undefined", { uid: userId })
    }

    if (userData?.isProfileComplete) {
      logger.info("Profile complete", {
        user: userId,
        isProfileComplete: true,
      })
    }

    const practice = userData?.practices
    const trainingComplete =
      userData?.licenses && userData?.boardCerts && userData?.education
    const practiceComplete =
      practice.clientFocus &&
      practice.insurance &&
      practice.location &&
      practice.roles &&
      practice.services
    const isProfileComplete = !!(trainingComplete && practiceComplete)

    await userRef.set({ isProfileComplete: isProfileComplete }, { merge: true })
    logger.info("Profile updated", {
      user: userId,
      isProfileComplete,
    })
  } catch (error) {
    if (error instanceof TypeError) {
      logger.info("Profile is not complete ", { message: error.message })
    } else if (error instanceof Error) {
      logger.error("Error", { message: error.message })
    } else {
      logger.error("Unknown error", { error })
    }
  }
}

export async function postLicensure(
  state: LicenseFormState | undefined,
  formData: FormData
) {
  const dataForParsing = Object.fromEntries(formData.entries())
  const validatedFields = LicenseSchema.safeParse(dataForParsing)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set({ licenses: validatedFields.data }, { merge: true })
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function postCertification(
  state: BoardCertFormState | undefined,
  formData: FormData
) {
  const dataForParsing = Object.fromEntries(formData.entries())
  const validatedFields = BoardCertSchema.safeParse(dataForParsing)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set({ boardCerts: validatedFields.data }, { merge: true })
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function postEducation(
  state: EducationFormState | undefined,
  formData: FormData
) {
  const dataForParsing = Object.fromEntries(formData.entries())
  const validatedFields = EducationSchema.safeParse(dataForParsing)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set({ education: validatedFields.data }, { merge: true })
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function postLocation(
  state: PracticeLocationFormState | undefined,
  formData: FormData
) {
  const dataForParsing = Object.fromEntries(formData.entries())
  // validate fields
  const validatedFields = PracticeLocationSchema.safeParse(dataForParsing)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set(
      { practices: { location: validatedFields.data } },
      { merge: true }
    )
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function transformClientFocus(formData: FormData) {
  const ageGroups = extractChecklist<ClientAge>(formData, "age_")
  const language = parseReusableCombobox(
    Object.fromEntries(formData.entries()),
    "language",
    "id"
  )
  const clinicalPresentation = extractChecklist<ClinicalPresentation>(
    formData,
    "clinical_presentation_"
  )
  const symptomSeverity = extractChecklist<SymptomSeverity>(
    formData,
    "symptom_severity_"
  )
  return { ageGroups, language, clinicalPresentation, symptomSeverity }
}

export async function postClientFocus(
  state: PracticeClientFocusFormState | undefined,
  formData: FormData
) {
  const data = await transformClientFocus(formData)
  const validatedFields = PracticeClientFocusSchema.safeParse(data)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set(
      { practices: { clientFocus: validatedFields.data } },
      { merge: true }
    )
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function parseRoles(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const current = parseReusableCombobox(data, "current", "id")
  const clinical_specialty = parseReusableCombobox(
    data,
    "clinical_specialty",
    "id"
  )
  return {
    current,
    clinical_specialty,
    currently_see_patients: data.currently_see === "yes" ? true : false,
    clinical_commitment: data.clinical_commitment,
  }
}

export async function postRoles(
  state: PracticeRolesFormState | undefined,
  formData: FormData
) {
  const data = await parseRoles(formData)
  const validatedFields = PracticeRolesSchema.safeParse(data)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set(
      { practices: { roles: validatedFields.data } },
      { merge: true }
    )
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function transformServiceData(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const types = extractChecklist<ServiceType>(formData, "types_")
  const eval_types = extractChecklist<string>(formData, "eval_types_")
  const therapy_group = extractChecklist<string>(formData, "therapy_group_")
  return {
    types,
    eval_types,
    therapy_group,
    approach_primary: data.approach_primary,
    approach_secondary: data.approach_secondary,
    modality: data.modality,
  }
}
export async function postServices(
  state: PracticeServicesFormState | undefined,
  formData: FormData
) {
  const data = await transformServiceData(formData)
  const validatedFields = PracticeServicesSchema.safeParse(data)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set(
      { practices: { services: validatedFields.data } },
      { merge: true }
    )
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}

export async function transformInsurance(formData: FormData) {
  const insurance = extractChecklist<InsuranceType>(formData, "insurance_")
  const providers = parseReusableCombobox(
    Object.fromEntries(formData.entries()),
    "providers",
    "id"
  )
  return {
    type: insurance,
    ...(providers.length > 0 ? { providers: providers } : undefined),
  }
}

export async function postInsurance(
  state: PracticeInsuranceFormState | undefined,
  formData: FormData
) {
  const data = await transformInsurance(formData)
  const validatedFields = InsuranceSchema.safeParse(data)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post, please fix field errors and try again",
    }
  }

  // post to DB
  const db = await getFirestoreInstance()
  const { userId } = await auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    // Save the post to the database
    const userRef = db.doc(`users/${userId}`)
    await userRef.set(
      { practices: { insurance: validatedFields.data } },
      { merge: true }
    )
    await updateIsProfileComplete()
    return {
      message: "Successfully saved data.",
      ...validatedFields,
    }
  } catch (error) {
    console.error("Error saving form data:", error)
    return {
      success: false,
      message: "Database Error: Failed to create post",
    }
  }
}
