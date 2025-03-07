import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import {
  ClientAge,
  ClientAgeMap,
  Gender,
  GenderMap,
  Pronouns,
} from "@/lib/definitions/demographics"
import { ReferralPost } from "@/lib/definitions/postTypes"
import {
  ClinicalPresentation,
  ClinicalPresentationMap,
  MeetingMode,
  ServiceType,
  ServiceTypeMap,
  SymptomSeverity,
  SymptomSeverityMap,
} from "@/lib/definitions/provider-options"
import { Handshake, Phone, Pill, Video } from "lucide-react"
import { Fragment } from "react"
import { fetchAuthorInfo } from "../actions"
import { FeedCard, InsuranceInfo } from "./FeedCardShared"
import { RightSideLoader } from "./RightSideLoader"

interface ClientReferralCardProps {
  post: ReferralPost
}

function ClientReferralCard({ post }: ClientReferralCardProps) {
  const { authorId, content } = post
  const {
    clientDemographics,
    chiefComplaint,
    symptomSeverity,
    services,
    insurance,
  } = content
  const {
    ageGroup,
    gender,
    pronouns,
    physicalLocation,
    meetingMode,
    language_preferred,
  } = clientDemographics

  const renderIcons = () => (
    <IconBlock
      meds={services.service.includes(ServiceType.MedicationManagement)}
      meetingMode={meetingMode}
    />
  )

  const renderBody = () => (
    <ServiceAndFocusSection
      age={ageGroup}
      pronouns={pronouns.length > 0 ? pronouns : undefined}
      gender={gender}
      services={services.service}
      modality={services?.modality}
      insurance={insurance}
      language={language_preferred ? clientDemographics?.languages : undefined}
      chiefComplaint={chiefComplaint}
      severity={symptomSeverity}
    />
  )

  const renderRightSide = (
    <RightSideLoader authorId={authorId} fetchAuthorInfo={fetchAuthorInfo} />
  )

  return (
    <FeedCard
      title={`Client Referral, ${physicalLocation.city}, ${physicalLocation.state}`}
      renderIcons={renderIcons}
      renderBody={renderBody}
      renderRightSide={renderRightSide}
    />
  )
}

export { ClientReferralCard }

const IconBlock = ({
  meds,
  meetingMode,
}: {
  meds: boolean
  meetingMode: MeetingMode[]
}) => {
  return (
    <div className="flex flex-row divide-x-2 divide-zinc-500">
      {meds && (
        <div className="px-2">
          <Pill />
        </div>
      )}{" "}
      {meetingMode.includes(MeetingMode.Virtual) && (
        <div className="flex flex-row px-2">
          <Video /> <Phone />
        </div>
      )}{" "}
      {meetingMode.includes(MeetingMode.InPerson) && (
        <div className="flex flex-row gap-1 px-2">
          <Handshake />
        </div>
      )}{" "}
    </div>
  )
}

const ServiceAndFocusSection = ({
  age,
  gender,
  pronouns,
  chiefComplaint,
  severity,
  services,
  modality,
  language,
  insurance,
}: {
  age: ClientAge
  gender: Gender
  pronouns?: Pronouns[]
  chiefComplaint: ClinicalPresentation
  severity: SymptomSeverity[]
  services: ServiceType[]
  modality?: string
  language?: string[]
  insurance: any
}) => {
  return (
    <DescriptionList>
      <DescriptionTerm>Age</DescriptionTerm>
      <DescriptionDetails>{ClientAgeMap[age]}</DescriptionDetails>

      <DescriptionTerm>Gender</DescriptionTerm>
      <DescriptionDetails>
        {GenderMap[gender]}
        {pronouns && `, (${pronouns.join(", ")})`}
      </DescriptionDetails>

      <DescriptionTerm>Chief Complaint</DescriptionTerm>
      <DescriptionDetails>
        {ClinicalPresentationMap[chiefComplaint]}
        <br />
        {severity.map((s) => SymptomSeverityMap[s]).join(", ")}
      </DescriptionDetails>

      <DescriptionTerm>Services</DescriptionTerm>
      <DescriptionDetails>
        {services.map((s) => (
          <Fragment key={s}>
            {ServiceTypeMap[s]}
            <br />
          </Fragment>
        ))}
      </DescriptionDetails>

      {modality && (
        <>
          <DescriptionTerm>Preferred Modality</DescriptionTerm>
          <DescriptionDetails>{modality}</DescriptionDetails>
        </>
      )}

      {language && (
        <>
          <DescriptionTerm>Preferred Language</DescriptionTerm>
          <DescriptionDetails>{language}</DescriptionDetails>
        </>
      )}

      <InsuranceInfo insurance={insurance} />
    </DescriptionList>
  )
}
