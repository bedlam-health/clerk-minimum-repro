import { CheckSelect } from "@/components/FormComponents/CheckSelect"
import SingleSelect from "@/components/FormComponents/SingleSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { Field, Label } from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import {
  EvaluationType,
  EvaluationTypeMap,
  ServiceType,
  ServiceTypeMap,
  TherapeuticApproach,
  TherapeuticApproachMap,
  TherapeuticAudience,
  TherapeuticAudienceMap,
} from "@/lib/definitions/provider-options"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postServices, transformServiceData } from "../../actions"
import { PracticeServices } from "../../definitions"
import ProfileSection from "../profileSection"
const Services = ({
  data,
  setProfile,
}: {
  data: PracticeServices | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postServices, undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    const newData = await transformServiceData(e)
    setProfile((prev: User) => ({
      ...prev,
      practices: { ...prev.practices, services: newData },
    }))
    await action(e)
  }

  const renderView = (data: PracticeServices) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Services Offered</DescriptionTerm>
        <DescriptionDetails>
          {data?.types?.map((v: ServiceType) => ServiceTypeMap[v]).join(", ")}
        </DescriptionDetails>

        <DescriptionTerm>Evaluations Offered</DescriptionTerm>
        <DescriptionDetails>
          {data?.eval_types
            ?.map((v: EvaluationType) => EvaluationTypeMap[v])
            .join(", ")}
        </DescriptionDetails>

        <DescriptionTerm>Therapy Group</DescriptionTerm>
        <DescriptionDetails>
          {data?.therapy_group
            ?.map((v: TherapeuticAudience) => TherapeuticAudienceMap[v])
            .join(", ")}
        </DescriptionDetails>

        <DescriptionTerm>Therapeutic Approach, Primary</DescriptionTerm>
        <DescriptionDetails>{data?.approach_primary}</DescriptionDetails>

        <DescriptionTerm>Therapeutic Approach, Secondary</DescriptionTerm>
        <DescriptionDetails>{data?.approach_secondary}</DescriptionDetails>

        <DescriptionTerm>Therapeutic Modality</DescriptionTerm>
        <DescriptionDetails>{data?.modality}</DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: PracticeServices) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Services Offered</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              className="mt-4"
              label={"Services Offered"}
              name="types"
              options={Object.entries(ServiceType).map(([, value]) => ({
                label: ServiceTypeMap[value],
                value: value,
              }))}
              error={state?.errors?.types}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Evaluation Types (optional)</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              label="If you offer evaluations, please select the evaluation types."
              name="eval_types"
              options={Object.entries(EvaluationType).map(([, value]) => ({
                label: EvaluationTypeMap[value],
                value: value,
              }))}
              error={state?.errors?.eval_types}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Therapy Group</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              label="If you offer therapy for different audiences, please select them here."
              name="therapy_group"
              options={Object.entries(TherapeuticAudience).map(([, value]) => ({
                label: TherapeuticAudienceMap[value],
                value: value,
              }))}
              error={state?.errors?.therapy_group}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Therapeutic Approach, Primary</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <SingleSelect
              label="Therapeutic Approach, Primary"
              name="approach_primary"
              options={Object.entries(TherapeuticApproach).map(([, value]) => ({
                label: TherapeuticApproachMap[value],
                value: value,
              }))}
              error={state?.errors?.approach_primary}
              defaultValue={data?.approach_primary}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Therapeutic Approach, Secondary</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <SingleSelect
              label="Therapeutic Approach, Secondary"
              name="approach_secondary"
              options={Object.entries(TherapeuticApproach).map(([, value]) => ({
                label: TherapeuticApproachMap[value],
                value: value,
              }))}
              error={state?.errors?.approach_secondary}
              defaultValue={data?.approach_secondary}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Therapeutic Modality (optional)</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="text" name="modality" defaultValue={data?.modality} />
          </div>
        </Field>
      </div>
    )
  }

  return (
    <ProfileSection
      title="Services"
      id="services"
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

export default Services
