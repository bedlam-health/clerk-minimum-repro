import { z } from "zod"
import {
  YesNoContact,
  ServiceType,
  TreatmentSetting,
  InsuranceType,
  ClinicalPresentation,
  SymptomSeverity,
  EvaluationType,
  TherapeuticApproach,
  TherapeuticAudience,
} from "@/lib/definitions/provider-options"
import { ClientAge, Gender } from "@/lib/definitions/demographics"

export const formSchema = z.object({
  city: z.string({ message: "Required" }),
  state: z.string({ message: "Required" }),
  zipCode: z.string({ message: "Required" }),

  inPerson: z.nativeEnum(YesNoContact, { message: "Required" }),
  telehealth: z.nativeEnum(YesNoContact, { message: "Required" }),

  availableServices: z
    .nativeEnum(ServiceType)
    .array()
    .nonempty({ message: "Required" }),
  evaluationType: z.nativeEnum(EvaluationType).optional(),
  therapyApproach: z.nativeEnum(TherapeuticApproach).optional(),
  therapyAudience: z.nativeEnum(TherapeuticAudience).optional(),
  modality: z.string().optional(),

  treatmentSettings: z
    .nativeEnum(TreatmentSetting)
    .array()
    .nonempty({ message: "Required" }),

  insuranceType: z
    .nativeEnum(InsuranceType)
    .array()
    .nonempty({ message: "Required" }),
  providers: z.string().array().optional(),
  acceptsSlidingScale: z.boolean(),

  ageGroup: z.nativeEnum(ClientAge).array().nonempty({ message: "Required" }),
  gender: z.nativeEnum(Gender).array().nonempty({ message: "Required" }),
  languages: z.string().array().optional(),
  clinicalPresentation: z
    .nativeEnum(ClinicalPresentation)
    .array()
    .nonempty({ message: "Required" }),
  severity: z
    .nativeEnum(SymptomSeverity)
    .array()
    .nonempty({ message: "Required" }),

  otherComments: z.string().optional(),
})
export type FormState = {
  errors?: {
    [K in keyof z.infer<typeof formSchema>]?: string[]
  }
  message?: string
}
