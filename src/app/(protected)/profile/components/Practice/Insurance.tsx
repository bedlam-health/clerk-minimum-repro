import { Error } from "@/components/FormComponents/Error"
import { ReusableCombobox } from "@/components/FormComponents/MultiSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postInsurance, transformInsurance } from "../../actions"
import { PracticeInsurance } from "../../definitions"
import ProfileSection from "../profileSection"

import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@/components/Tailwind/checkbox"
import { Field, Label, Legend } from "@/components/Tailwind/fieldset"
import {
  InsuranceType,
  InsuranceTypeMap,
  insurance_providers,
} from "@/lib/definitions/provider-options"

const Insurance = ({
  data,
  setProfile,
}: {
  data: PracticeInsurance | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postInsurance, undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inNetwork, setInNetwork] = useState(false)
  const [providers, setProviders] = useState<{ id: string; label: string }[]>(
    []
  )

  useEffect(() => {
    if (state?.success) {
      setIsEditing(false)
      setIsLoading(false)
    }
    if (state?.errors) {
      setIsLoading(false)
    }
  }, [state])

  const formAction = async (e: FormData) => {
    setIsLoading(true)
    // optimistic UI update
    const newData = await transformInsurance(e)
    setProfile((prev: User) => ({
      ...prev,
      practices: { ...prev.practices, insurance: newData },
    }))
    await action(e)
  }

  const renderView = (data: PracticeInsurance) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Payment Accepted</DescriptionTerm>
        <DescriptionDetails>
          {data?.type.map((v: InsuranceType) => InsuranceTypeMap[v]).join(", ")}
        </DescriptionDetails>

        {data?.providers && (
          <>
            <DescriptionTerm>Providers</DescriptionTerm>
            <DescriptionDetails>
              {data?.providers.join(", ")}
            </DescriptionDetails>
          </>
        )}
      </DescriptionList>
    )
  }

  const renderForm = () => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Legend>Please select the payment situation.</Legend>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckboxGroup className={`mt-2 columns-1 gap-5`}>
              <CheckboxField key={"insurance_in_network"} className="flex py-1">
                <Checkbox
                  name={`insurance_in_network`}
                  value={String(inNetwork)}
                  // @ts-ignore
                  onChange={() => setInNetwork((prev) => !prev)}
                />
                <Label>{InsuranceTypeMap[InsuranceType.InNetwork]}</Label>
              </CheckboxField>
              <CheckboxField
                key={"insurance_out_of_network"}
                className="flex py-1"
              >
                <Checkbox name={`insurance_out_of_network`} />
                <Label>{InsuranceTypeMap[InsuranceType.OutOfNetwork]}</Label>
              </CheckboxField>
            </CheckboxGroup>
            {state?.errors?.type && <Error message={state?.errors?.type} />}
          </div>
        </Field>

        {inNetwork && (
          <Field className="grid grid-cols-[subgrid] sm:col-span-3">
            <Label>Providers</Label>
            <div className="mt-3 sm:col-span-2 sm:mt-0">
              <ReusableCombobox
                label="Please select the insurance providers"
                name="providers"
                options={insurance_providers.flatMap((s) => ({
                  id: s,
                  label: s,
                }))}
                value={providers}
                onChange={(e) => setProviders(e)}
              />
            </div>
          </Field>
        )}
      </div>
    )
  }

  return (
    <ProfileSection
      title="Insurance"
      id="insurance"
      initialData={data}
      renderView={renderView}
      renderForm={renderForm}
      formAction={formAction}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      isLoading={isLoading}
    />
  )
}

export default Insurance
