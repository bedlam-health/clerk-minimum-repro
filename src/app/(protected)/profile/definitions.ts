import {
  ClinicalCommitment,
  ClinicalSpecialty,
  CurrentRoles,
  EvaluationType,
  InsuranceType,
  ServiceType,
  TherapeuticAudience,
} from "@/lib/definitions/provider-options"
import { ClientAge } from "@/lib/definitions/demographics"
import {
  ClinicalPresentation,
  SymptomSeverity,
} from "@/lib/definitions/provider-options"
import { z } from "zod"

export const LicenseSchema = z.object({
  type: z.string().min(1, { message: "Required" }),
  number: z
    .string()
    .regex(/^\d+$/, "Must contain only numbers")
    .min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }),
  expiry_date: z.string().min(1, { message: "Required" }), // MM/YYYY
})
export type License = z.infer<typeof LicenseSchema>
export type LicenseFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof License]?: string[]
  }
  data?: any
}

export const BoardCertSchema = z.object({
  type: z.string().max(100).min(1, { message: "Required" }),
  issuing_board: z.string().min(1, { message: "Required" }),
  expiry_date: z.string().min(1, { message: "Required" }), // MM/YYYY
})
export type BoardCert = z.infer<typeof BoardCertSchema>
export type BoardCertFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof BoardCert]?: string[]
  }
  data?: any
}

export const EducationSchema = z.object({
  degree_or_cert: z.string().min(1, { message: "Required" }),
  institution: z.string().min(1, { message: "Required" }),
  year_completed: z.string().min(1, { message: "Required" }), // YYYY
})
export type Education = z.infer<typeof EducationSchema>
export type EducationFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof Education]?: string[]
  }
  data?: any
}

export const PracticeLocationSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  state: z.string().min(1, { message: "Required" }), //state
  city: z.string().min(1, { message: "Required" }),
  zip: z.string().min(1, { message: "Required" }), //zipcode
  in_person: z.string().min(1, { message: "Required" }),
  telehealth: z.string().min(1, { message: "Required" }),
})
export type PracticeLocation = z.infer<typeof PracticeLocationSchema>
export type PracticeLocationFormState = {
  message: string
  success: boolean
  data?: any
  errors?: {
    [K in keyof PracticeLocation]?: string[]
  }
}

export const PracticeClientFocusSchema = z.object({
  ageGroups: z
    .nativeEnum(ClientAge)
    .array()
    .nonempty({ message: "Please select at least one." }),
  language: z.string().array().optional(),
  clinicalPresentation: z.nativeEnum(ClinicalPresentation).array().optional(),
  symptomSeverity: z.nativeEnum(SymptomSeverity).array().optional(),
})
export type PracticeClientFocus = z.infer<typeof PracticeClientFocusSchema>
export type PracticeClientFocusFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof PracticeClientFocusSchema>]?: string[]
  }
  data?: any
}

export const PracticeRolesSchema = z.object({
  current_roles: z.nativeEnum(CurrentRoles).array().min(1).optional(),
  clinical_specialty: z
    .nativeEnum(ClinicalSpecialty)
    .array()
    .min(1, { message: "Required" })
    .optional(), // select multiple
  clinical_commitment: z.nativeEnum(ClinicalCommitment, {
    message: "Required",
  }),
  currently_see_patients: z.boolean(),
})

export type PracticeRoles = z.infer<typeof PracticeRolesSchema>
export type PracticeRolesFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof PracticeRolesSchema>]?: string[]
  }
  data?: any
}

export const PracticeServicesSchema = z.object({
  types: z.nativeEnum(ServiceType).array().min(1), // select multiple
  eval_types: z.nativeEnum(EvaluationType).array().min(1).optional(),
  therapy_group: z.nativeEnum(TherapeuticAudience).array().min(1).optional(),
  approach_primary: z.string().optional(),
  approach_secondary: z.string().optional(),
  modality: z.string().max(100).optional(),
})
export type PracticeServices = z.infer<typeof PracticeServicesSchema>
export type PracticeServicesFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof PracticeServicesSchema>]?: string[]
  }
  data?: any
}

export const InsuranceSchema = z.object({
  type: z.nativeEnum(InsuranceType).array().nonempty({
    message: "Please select at least one.",
  }),
  providers: z.string().array().nonempty().optional(),
})
export type PracticeInsurance = z.infer<typeof InsuranceSchema>
export type PracticeInsuranceFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof InsuranceSchema>]?: string[]
  }
  data?: any
}
