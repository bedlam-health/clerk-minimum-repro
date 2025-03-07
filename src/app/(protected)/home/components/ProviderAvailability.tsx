import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { ClientAgeMap, GenderMap } from "@/lib/definitions/demographics"
import { AvailabilityPost, ClientCriteria } from "@/lib/definitions/postTypes"
import {
  ClinicalPresentationMap,
  ServiceType,
  ServiceTypeMap,
  SymptomSeverityMap,
  TreatmentSettingMap,
  YesNoContact,
  YesNoContactMap,
} from "@/lib/definitions/provider-options"
import { Handshake, Phone, Pill, Video } from "lucide-react"
import { Fragment } from "react"
import { fetchAuthorInfo } from "../actions"
import { FeedCard, InsuranceInfo } from "./FeedCardShared"
import { RightSideContent } from "./RightSideContent"

interface ProviderAvailabilityCardProps {
  post: AvailabilityPost
}

async function ProviderAvailabilityCard({
  post,
}: ProviderAvailabilityCardProps) {
  const { authorId, content } = post
  const authorInfo = await fetchAuthorInfo(authorId)
  const { physicalLocation, inPerson, telehealth } = content

  const renderIcons = () => (
    <IconBlock meds={false} inPerson={inPerson} telehealth={telehealth} />
  )

  const renderBody = () => <BodySection content={content} />

  const renderRightSide = () => (
    <RightSideContent authorInfo={authorInfo} displayAuthor={false} />
  )

  return (
    <FeedCard
      title={`${authorInfo.authorName}${
        authorInfo.creds.length > 0 ? `, ${authorInfo.creds.join(", ")}` : ``
      }, ${physicalLocation.city}, ${physicalLocation.state}`}
      renderIcons={renderIcons}
      renderBody={renderBody}
      renderRightSide={renderRightSide()}
    />
  )
}

export { ProviderAvailabilityCard }

const IconBlock = ({
  meds,
  inPerson,
  telehealth,
}: {
  meds: boolean
  inPerson: YesNoContact
  telehealth: YesNoContact
}) => {
  return (
    <div className="flex flex-row divide-x-2 divide-zinc-500">
      {meds && (
        <div className="px-2">
          <Pill />
        </div>
      )}{" "}
      {(inPerson === YesNoContact.Yes ||
        inPerson === YesNoContact.PleaseContact) && (
        <div className="flex flex-row px-2">
          <Handshake />
        </div>
      )}
      {(telehealth === YesNoContact.Yes ||
        telehealth === YesNoContact.PleaseContact) && (
        <div className="flex flex-row px-2">
          <Video /> <Phone />
        </div>
      )}
    </div>
  )
}

interface BodySectionProps {
  content: AvailabilityPost["content"]
}

const BodySection = ({ content }: BodySectionProps) => {
  const {
    inPerson,
    telehealth,
    availableServices,
    evaluationType,
    therapeuticAudience,
    therapeuticApproach,
    therapeuticModality,
    serviceSettings,
    insurance,
    acceptsSlidingScale,
    clientCriteria,
    otherComments,
  } = content

  return (
    <DescriptionList>
      <DescriptionTerm>Services</DescriptionTerm>
      <DescriptionDetails>
        <ul className="list-disc">
          {availableServices
            .filter(
              (s) =>
                s !== ServiceType.Evaluation && s !== ServiceType.Psychotherapy
            )
            .map((s) => (
              <Fragment key={s}>
                <li className=" text-zinc-500 font-semibold">
                  {ServiceTypeMap[s]}
                </li>
              </Fragment>
            ))}
          {availableServices.includes(ServiceType.Evaluation) && (
            <>
              <li className=" text-zinc-500 font-semibold">
                {ServiceTypeMap[ServiceType.Evaluation]}
              </li>
              <ul className="ml-2">
                <li>{evaluationType}</li>
              </ul>
            </>
          )}
          {availableServices.includes(ServiceType.Psychotherapy) && (
            <>
              <li>
                <span className=" text-zinc-500 font-semibold">
                  {ServiceTypeMap[ServiceType.Psychotherapy]}
                </span>
                <ul className="list-disc ml-2">
                  {therapeuticModality && (
                    <>
                      <li>Modality: {therapeuticModality}</li>
                    </>
                  )}
                  {therapeuticAudience && (
                    <>
                      <li>Audience: {therapeuticAudience}</li>
                    </>
                  )}
                  {therapeuticApproach && (
                    <>
                      <li>Approach: {therapeuticApproach}</li>
                    </>
                  )}
                </ul>
              </li>
            </>
          )}
        </ul>
      </DescriptionDetails>

      <DescriptionTerm>Service Setting</DescriptionTerm>
      <DescriptionDetails>
        {serviceSettings?.map((s) => (
          <Fragment key={s}>
            {TreatmentSettingMap[s]}
            <br />
          </Fragment>
        ))}
      </DescriptionDetails>

      <DescriptionTerm>Location</DescriptionTerm>
      <DescriptionDetails>
        {`In Person: ${YesNoContactMap[inPerson]}`} <br />{" "}
        {`Telehealth: ${YesNoContactMap[telehealth]}`}
      </DescriptionDetails>

      <InsuranceInfo
        insurance={insurance}
        acceptsSlidingScale={acceptsSlidingScale}
      />

      <DescriptionTerm>
        Available to clients who meet the following criteria:{" "}
      </DescriptionTerm>
      <DescriptionDetails>
        <Client client={clientCriteria} />
      </DescriptionDetails>

      {otherComments && (
        <>
          <DescriptionTerm>Other comments</DescriptionTerm>
          <DescriptionDetails>{otherComments}</DescriptionDetails>
        </>
      )}
    </DescriptionList>
  )
}

interface ClientProps {
  client: ClientCriteria
}

const Client = ({ client }: ClientProps) => {
  return (
    <DescriptionList>
      <DescriptionTerm>Ages</DescriptionTerm>
      <DescriptionDetails>
        {client.ageGroup.map((s) => ClientAgeMap[s]).join(", ")}
      </DescriptionDetails>

      <DescriptionTerm>Gender</DescriptionTerm>
      <DescriptionDetails>
        {client.gender.map((s) => GenderMap[s]).join(", ")}
      </DescriptionDetails>

      {client.languages && (
        <>
          <DescriptionTerm>Preferred Language</DescriptionTerm>
          <DescriptionDetails>{client.languages.join(", ")}</DescriptionDetails>
        </>
      )}

      <DescriptionTerm>Presenting Problems</DescriptionTerm>
      <DescriptionDetails>
        {client.clinicalPresentation
          .map((s) => ClinicalPresentationMap[s])
          .join(", ")}
      </DescriptionDetails>

      <DescriptionTerm>Symptom Severity</DescriptionTerm>
      <DescriptionDetails>
        {client.severity.map((s) => SymptomSeverityMap[s]).join(", ")}
      </DescriptionDetails>
    </DescriptionList>
  )
}
