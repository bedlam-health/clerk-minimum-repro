import {
  BoardCert,
  Education,
  License,
} from "@/app/(protected)/profile/definitions"

import { ClientAge } from "./demographics"
import {
  ClinicalCommitment,
  ClinicalPresentation,
  ClinicalSpecialty,
  CurrentRoles,
  EvaluationType,
  InsuranceInformation,
  ServiceType,
  SymptomSeverity,
  TherapeuticApproach,
  TherapeuticAudience,
  YesNoContact,
} from "./provider-options"

export interface User {
  uid: string
  email: string
  role: "provider"
  title?: string
  firstName: string
  lastName: string
  credentials: string[]
  pronouns?: string
  createdAt: string
  updatedAt: string

  isProfileComplete: boolean

  licenses: License[]
  boardCerts: BoardCert[]
  education: Education[]
  extraTraining?: Education[]

  practices: Practice
}

interface Practice {
  clientFocus: {
    ageGroups: ClientAge[]
    language?: string[]
    clientFocus?: {
      clinicalPresentation: ClinicalPresentation[]
      symptomSeverity: SymptomSeverity[]
    }
  }
  insurance: InsuranceInformation
  location: {
    name: string
    state: string
    city: string
    zip: string
    in_person: YesNoContact
    telehealth: YesNoContact
  }
  roles: {
    current_roles?: CurrentRoles[]
    clinical_specialty?: ClinicalSpecialty[]
    clinical_commitment: ClinicalCommitment
    currently_see_patients: boolean
  }
  services: {
    types: ServiceType[]
    EvalType?: EvaluationType[]
    TherapeuticAudience?: TherapeuticAudience[]
    therapeuticApproach?: {
      primary: TherapeuticApproach
      secondary: TherapeuticApproach
    }
    therapeuticModality?: string
  }
}
