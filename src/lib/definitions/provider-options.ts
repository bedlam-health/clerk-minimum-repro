/* Section: Provider Description */
export enum YesNoContact {
  Yes = "yes",
  No = "no",
  PleaseContact = "please_contact",
}

export const YesNoContactMap: Record<YesNoContact, string> = {
  [YesNoContact.Yes]: "Yes",
  [YesNoContact.No]: "No",
  [YesNoContact.PleaseContact]: "Please Contact",
}

export enum MeetingMode {
  Virtual = "virtual",
  InPerson = "in_person",
}

export enum CurrentRoles {
  Clinician = "clinician",
  AlliedHealthProfessional = "allied_health_professional",
  Administrator = "administrator",
}

export const CurrentRolesMap: Record<CurrentRoles, string> = {
  [CurrentRoles.Clinician]: "Clinician",
  [CurrentRoles.AlliedHealthProfessional]: "Allied Health Professional",
  [CurrentRoles.Administrator]: "Administrator",
}

export enum ClinicalSpecialty {
  PsychologyMentalHealth = "psychology_mental_health",
  Psychiatry = "psychiatry",
  PrimaryCare = "primary_care",
  Neurology = "neurology",
  DevelopmentalPediatrics = "developmental_pediatrics",
  AdolescentMedicine = "adolescent_medicine",
}

export const ClinicalSpecialtyMap: Record<ClinicalSpecialty, string> = {
  [ClinicalSpecialty.PsychologyMentalHealth]: "Psychology/Mental health",
  [ClinicalSpecialty.Psychiatry]: "Psychiatry",
  [ClinicalSpecialty.PrimaryCare]: "Primary Care",
  [ClinicalSpecialty.Neurology]: "Neurology",
  [ClinicalSpecialty.DevelopmentalPediatrics]: "Developmental Pediatrics",
  [ClinicalSpecialty.AdolescentMedicine]: "Adolescent Medicine",
}
export const clinical_commitment = [
  "Full Time",
  "Part time (>50%)",
  "Part Time (<50%)",
]

export enum ClinicalCommitment {
  FullTime = "full_time",
  PartTimeMoreThan50 = "part_time_more_than_50",
  PartTimeLessThan50 = "part_time_less_than_50",
}

export const ClinicalCommitmentMap: Record<ClinicalCommitment, string> = {
  [ClinicalCommitment.FullTime]: "Full Time",
  [ClinicalCommitment.PartTimeMoreThan50]: "Part time (>50%)",
  [ClinicalCommitment.PartTimeLessThan50]: "Part Time (<50%)",
}

/* Section: Provider Service Description */

export enum ServiceType {
  Evaluation = "evaluation",
  MedicationManagement = "medication_management",
  Psychotherapy = "psychotherapy",
  CaseManagement = "case_management",
  AlliedHealthServices = "allied_health_services",
}

export const ServiceTypeMap: Record<ServiceType, string> = {
  [ServiceType.Evaluation]: "Evaluation",
  [ServiceType.MedicationManagement]: "Medication Management",
  [ServiceType.Psychotherapy]: "Psychotherapy",
  [ServiceType.CaseManagement]: "Case Management",
  [ServiceType.AlliedHealthServices]:
    "Allied Health Services (e.g., occupational therapy)",
}

export enum TreatmentSetting {
  OUTPATIENT = "outpatient",
  INTENSIVE_OUTPATIENT = "intensive_outpatient",
  CRISIS_CARE = "crisis_care",
  PARTIAL_HOSPITALIZATION = "partial_hospitalization",
  RESIDENTIAL_TREATMENT = "residential_treatment",
}

export const TreatmentSettingMap: Record<TreatmentSetting, string> = {
  [TreatmentSetting.OUTPATIENT]: "Outpatient",
  [TreatmentSetting.INTENSIVE_OUTPATIENT]: "Intensive Outpatient (IOP)",
  [TreatmentSetting.CRISIS_CARE]: "Crisis Care",
  [TreatmentSetting.PARTIAL_HOSPITALIZATION]:
    "Partial Hospitalization Program (PHP)",
  [TreatmentSetting.RESIDENTIAL_TREATMENT]: "Residential Treatment",
}

export enum EvaluationType {
  Psychiatric = "psychiatric",
  Neuropsychological = "neuropsychological",
  Educational = "educational",
  OccupationalTherapy = "occupational_therapy",
}

export const EvaluationTypeMap: Record<EvaluationType, string> = {
  [EvaluationType.Psychiatric]: "Psychiatric",
  [EvaluationType.Neuropsychological]: "Neuropsychological",
  [EvaluationType.Educational]: "Educational",
  [EvaluationType.OccupationalTherapy]: "Occupational Therapy",
}

export enum TherapeuticAudience {
  Individual = "individual",
  Couples = "couples",
  Family = "family",
  Group = "group",
}

export const TherapeuticAudienceMap: Record<TherapeuticAudience, string> = {
  [TherapeuticAudience.Individual]: "Individual",
  [TherapeuticAudience.Couples]: "Couples",
  [TherapeuticAudience.Family]: "Family",
  [TherapeuticAudience.Group]: "Group",
}

export enum TherapeuticApproach {
  Behavioral = "behavioral",
  Psychodynamic = "psychodynamic",
  Psychoanalytic = "psychoanalytic",
  Other = "other",
}

export const TherapeuticApproachMap: Record<TherapeuticApproach, string> = {
  [TherapeuticApproach.Behavioral]: "Behavioral (e.g., CBT)",
  [TherapeuticApproach.Psychodynamic]: "Psychodynamic",
  [TherapeuticApproach.Psychoanalytic]: "Psychoanalytic",
  [TherapeuticApproach.Other]: "Other",
}

/* Section: Client Description */

export enum ClinicalPresentation {
  AnxietyDepression = "anxiety_depression",
  TraumaAndStress = "trauma_and_stress",
  ObsessiveCompulsiveDisorders = "obsessive_compulsive_disorders",
  DisorderedEating = "disordered_eating",
  ManiaAndPsychosis = "mania_and_psychosis",
  SleepWakeDisorders = "sleep_wake_disorders",
  AttentionDeficitHyperactivityDisorders = "attention_deficit_hyperactivity_disorders",
  AutismSpectrumDisorder = "autism_spectrum_disorder",
  PersonalityDisorders = "personality_disorders",
  SubstanceUseDisorders = "substance_use_disorders",
  SelfHarmAndSuicidality = "self_harm_and_suicidality",
}

export const ClinicalPresentationMap: Record<ClinicalPresentation, string> = {
  [ClinicalPresentation.AnxietyDepression]: "Anxiety/Depression",
  [ClinicalPresentation.TraumaAndStress]: "Trauma and Stress",
  [ClinicalPresentation.ObsessiveCompulsiveDisorders]:
    "Obsessive Compulsive Disorders",
  [ClinicalPresentation.DisorderedEating]: "Disordered Eating",
  [ClinicalPresentation.ManiaAndPsychosis]: "Mania and Psychosis",
  [ClinicalPresentation.SleepWakeDisorders]: "Sleep/Wake Disorders",
  [ClinicalPresentation.AttentionDeficitHyperactivityDisorders]:
    "Attention Deficit Hyperactivity Disorders",
  [ClinicalPresentation.AutismSpectrumDisorder]: "Autism Spectrum Disorder",
  [ClinicalPresentation.PersonalityDisorders]: "Personality Disorders",
  [ClinicalPresentation.SubstanceUseDisorders]: "Substance Use Disorders",
  [ClinicalPresentation.SelfHarmAndSuicidality]: "Self-harm and Suicidality",
}

export enum SymptomSeverity {
  HighFunctioning = "high_functioning",
  MildToModerateImpairment = "mild_to_moderate_impairment",
  ModerateToSevereImpairment = "moderate_to_severe_impairment",
  HistoryOfSelfHarmOrSuicidality = "history_of_self_harm_or_suicidality",
}

export const SymptomSeverityMap: Record<SymptomSeverity, string> = {
  [SymptomSeverity.HighFunctioning]: "High functioning",
  [SymptomSeverity.MildToModerateImpairment]: "Mild to moderate impairment",
  [SymptomSeverity.ModerateToSevereImpairment]: "Moderate to severe impairment",
  [SymptomSeverity.HistoryOfSelfHarmOrSuicidality]:
    "History of self-harm or suicidality",
}

/* Insurance */
export enum InsuranceType {
  InNetwork = "in_network",
  OutOfNetwork = "out_of_network",
  Cash = "cash",
}

export const InsuranceTypeMap: Record<InsuranceType, string> = {
  [InsuranceType.InNetwork]: "In Network",
  [InsuranceType.OutOfNetwork]: "Out of Network",
  [InsuranceType.Cash]: "Cash",
}

export const insurance_providers = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "United Healthcare",
  "Kaiser Permanente",
  "Medicare",
  "Medicaid",
]

// Interface for insurance information
export interface InsuranceInformation {
  type: InsuranceType[]
  providers?: string[]
}
