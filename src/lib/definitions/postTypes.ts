import {
  InsuranceInformation,
  ServiceType,
  MeetingMode,
  TreatmentSetting,
  ClinicalPresentation,
  SymptomSeverity,
  YesNoContact,
  EvaluationType,
  TherapeuticAudience,
  TherapeuticApproach,
} from "@/lib/definitions/provider-options"
import { ClientAge, Gender, Pronouns } from "@/lib/definitions/demographics"

export interface Post {
  id: string
  postType: "referral" | "availability"
  authorId: string
  createdAt: Date
  content: any
}

export interface ReferralPost extends Post {
  content: {
    clientDemographics: ClientDemographics
    chiefComplaint: ClinicalPresentation
    symptomSeverity: SymptomSeverity[]
    services: ServiceDetails
    insurance: InsuranceInformation
  }
}

export interface AvailabilityPost extends Post {
  content: {
    physicalLocation: PhysicalLocation
    inPerson: YesNoContact
    telehealth: YesNoContact
    availableServices: ServiceType[]
    evaluationType?: EvaluationType[]
    therapeuticAudience?: TherapeuticAudience[]
    therapeuticApproach?: TherapeuticApproach[]
    therapeuticModality?: string // free text
    serviceSettings: TreatmentSetting[]
    insurance: InsuranceInformation
    acceptsSlidingScale: boolean
    clientCriteria: ClientCriteria
    otherComments?: string // free text
  }
}

interface PhysicalLocation {
  city: string
  state: string
  zipCode: string
}
// Interface for client demographics
interface ClientDemographics {
  physicalLocation: PhysicalLocation
  meetingMode: MeetingMode[]
  ageGroup: ClientAge // from src/lib/definitions/demographics.ts
  gender: Gender // from src/lib/definitions/demographics.ts
  pronouns: Pronouns[] // from src/lib/definitions/demographics.ts
  language_preferred: boolean //language other than English
  languages?: string[]
}

// Interface for service details
interface ServiceDetails {
  service: ServiceType[]
  modality?: string // Optional field for modality
}

export interface ClientCriteria {
  ageGroup: ClientAge[]
  gender: Gender[]
  languages?: string[]
  clinicalPresentation: ClinicalPresentation[]
  severity: SymptomSeverity[]
}
