// FeedCardShared.tsx
import Card from "@/components/Card"
import {
  DescriptionDetails,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import {
  InsuranceInformation,
  InsuranceTypeMap,
} from "@/lib/definitions/provider-options"
import { ReactElement } from "react"

export interface FeedCardRenderProps {
  title: string
  renderIcons?: () => ReactElement
  renderBody: () => ReactElement
  renderRightSide: ReactElement
}

export const FeedCard = ({
  title,
  renderIcons,
  renderBody,
  renderRightSide,
}: FeedCardRenderProps) => {
  return (
    <Card className="p-6 w-full">
      <div className="flex justify-around gap-4">
        <div id="center" className="">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-semibold">{title}</h2>
              {renderIcons && (
                <div className="inline-block px-3 py-1 mb-4 bg-gray-100 rounded-md">
                  {renderIcons()}
                </div>
              )}
            </div>
          </div>
          {renderBody()}
        </div>
        <div id="right" className="">
          {renderRightSide}
        </div>
      </div>
    </Card>
  )
}

export const InsuranceInfo = ({
  insurance,
  acceptsSlidingScale,
}: {
  insurance: InsuranceInformation
  acceptsSlidingScale?: boolean
}) => {
  return (
    <>
      <DescriptionTerm>Insurance</DescriptionTerm>
      <DescriptionDetails>
        {insurance.type.map((s) => InsuranceTypeMap[s]).join(", ")} <br />
        {insurance.providers && (
          <>
            Providers: {insurance.providers.join(", ")}
            <br />{" "}
          </>
        )}
        {acceptsSlidingScale != undefined &&
          `Sliding Scale: ${acceptsSlidingScale ? "Yes" : "No"}`}
      </DescriptionDetails>
    </>
  )
}
