import { z } from "zod"
import {
  YesNoContact,
  ClinicalPresentation,
  ServiceType,
  SymptomSeverity,
} from "@/lib/definitions/provider-options"
import { ClientAge, Gender } from "@/lib/definitions/demographics"
import { states } from "@/lib/definitions/states"
import { InsuranceType } from "@/lib/definitions/provider-options"

export const formSchema = z.object({
  // Location Section
  location_city: z.string().min(1, "City is required."),
  location_state: z.enum(states as [string, ...string[]], {
    message: "State is required.",
  }),
  location_zip: z
    .string()
    .min(5, "ZIP code must be 5 digits")
    .max(5, "ZIP code must be 5 digits")
    .regex(/^\d+$/, "ZIP code must contain only numbers"),
  location_in_person: z.nativeEnum(YesNoContact, { message: "Required" }),
  location_virtual: z.nativeEnum(YesNoContact, { message: "Required" }),

  // Demographics Section
  client_dem_ages: z.nativeEnum(ClientAge, { message: "Required" }),
  client_dem_gender: z.nativeEnum(Gender, { message: "Required" }),
  pronouns: z.string().array().optional(),
  language_preferred: z.enum(["yes", "no"]),

  // Complaint Section
  client_focus_chief_complaint: z.nativeEnum(ClinicalPresentation, {
    message: "Required",
  }),
  client_focus_symptom_severity: z
    .nativeEnum(SymptomSeverity)
    .array()
    .nonempty({ message: "Please select at least one." }),

  // Services Section
  services_service_type: z.nativeEnum(ServiceType).array().nonempty({
    message: "Please select at least one.",
  }),

  // Insurance Section
  insurance: z.nativeEnum(InsuranceType).array().nonempty({
    message: "Please select at least one.",
  }),
})

export type FormState = {
  errors?: {
    [K in keyof z.infer<typeof formSchema>]?: string[]
  }
  message?: string
}
