import { ReusableCombobox } from "@/components/FormComponents/MultiSelect"
import SingleSelect from "@/components/FormComponents/SingleSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { Field, Label } from "@/components/Tailwind/fieldset"
import {
  ClinicalCommitment,
  ClinicalCommitmentMap,
  ClinicalSpecialty,
  ClinicalSpecialtyMap,
  CurrentRoles,
  CurrentRolesMap,
} from "@/lib/definitions/provider-options"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { parseRoles, postRoles } from "../../actions"
import { PracticeRoles } from "../../definitions"
import ProfileSection from "../profileSection"
const Roles = ({
  data,
  setProfile,
}: {
  data: PracticeRoles | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postRoles, undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentRoles, setCurrentRoles] = useState<
    { id: CurrentRoles; label: string }[]
  >([])
  const [clinicalSpecialty, setClinicalSpecialty] = useState<
    { id: ClinicalSpecialty; label: string }[]
  >([])

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

    const newData = await parseRoles(e)

    setProfile((prev: User) => ({
      ...prev,
      practices: { ...prev.practices, roles: newData },
    }))
    await action(e)
  }

  const renderView = (data: PracticeRoles) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Current Role(s)</DescriptionTerm>
        <DescriptionDetails>
          {data?.current_roles
            ?.map((v: CurrentRoles) => CurrentRolesMap[v])
            .join(", ")}
        </DescriptionDetails>

        <DescriptionTerm>Clinical Specialty</DescriptionTerm>
        <DescriptionDetails>
          {data?.clinical_specialty
            ?.map((v: ClinicalSpecialty) => ClinicalSpecialtyMap[v])
            .join(", ")}
        </DescriptionDetails>

        {data?.clinical_commitment && (
          <>
            <DescriptionTerm>Clinical Commitment</DescriptionTerm>
            <DescriptionDetails>
              {ClinicalCommitmentMap[data?.clinical_commitment]}
            </DescriptionDetails>
          </>
        )}
        <DescriptionTerm>Currently see patients here</DescriptionTerm>
        <DescriptionDetails>
          {data?.currently_see_patients ? "Yes" : "No"}
        </DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: PracticeRoles) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Current Roles (optional)</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <ReusableCombobox
              label="Current Roles"
              name="current"
              options={Object.entries(CurrentRoles).map(([, value]) => ({
                id: value,
                label: CurrentRolesMap[value],
              }))}
              value={currentRoles}
              onChange={setCurrentRoles}
              error={state?.errors?.current_roles}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Clinical Specialty</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <ReusableCombobox
              label="Clinical Specialty"
              name="clinical_specialty"
              options={Object.entries(ClinicalSpecialty).map(([, value]) => ({
                id: value,
                label: ClinicalSpecialtyMap[value],
              }))}
              value={clinicalSpecialty}
              onChange={setClinicalSpecialty}
              error={state?.errors?.clinical_specialty}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Clinical Commitment</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <SingleSelect
              label="Clinical Commitment"
              name="clinical_commitment"
              options={Object.entries(ClinicalCommitment).map(([, value]) => ({
                label: ClinicalCommitmentMap[value],
                value: value,
              }))}
              error={state?.errors?.clinical_commitment}
              defaultValue={data?.clinical_commitment}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Do you currently see patients here?</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <SingleSelect
              label="Do you currently see patients here?"
              name="currently_see"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              error={state?.errors?.currently_see_patients}
              defaultValue={data?.currently_see_patients ? "yes" : "no"}
            />
          </div>
        </Field>
      </div>
    )
  }

  return (
    <ProfileSection
      title="Roles"
      id="Roles"
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

export default Roles
