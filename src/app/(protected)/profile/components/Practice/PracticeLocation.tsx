import { Error } from "@/components/FormComponents/Error"
import SingleSelect from "@/components/FormComponents/SingleSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { Field, Label } from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import { YesNoContact } from "@/lib/definitions/provider-options"
import { states } from "@/lib/definitions/states"
import { User } from "@/lib/definitions/users"
import { Phone, Video } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postLocation } from "../../actions"
import { PracticeLocation as PracticeLocationType } from "../../definitions"
import ProfileSection from "../profileSection"

const PracticeLocation = ({
  data,
  setProfile,
}: {
  data: PracticeLocationType | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postLocation, undefined)
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
    setProfile((prev: User) => ({
      ...prev,
      practices: { ...prev, location: Object.fromEntries(e.entries()) },
    }))
    await action(e)
  }

  const renderView = (data: PracticeLocationType) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>{data?.name}</DescriptionDetails>

        <DescriptionTerm>City, State, ZIP </DescriptionTerm>
        <DescriptionDetails>
          {data?.city}, {data?.state}, {data?.zip}
        </DescriptionDetails>

        <DescriptionTerm>In Person</DescriptionTerm>
        <DescriptionDetails>{data?.in_person}</DescriptionDetails>

        <DescriptionTerm>Telehealth</DescriptionTerm>
        <DescriptionDetails>{data?.telehealth}</DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: PracticeLocationType) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Name</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="text" name="name" defaultValue={data?.name} />
            {state?.errors?.name && <Error message={state.errors?.name} />}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>City</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="text" name="city" defaultValue={data?.city} />
          </div>
          {state?.errors?.city && <Error message={state?.errors?.city} />}
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>State</Label>
          <SingleSelect
            className="mt-3 sm:col-span-2 sm:mt-0"
            name="state"
            options={states.map((s) => ({ label: s, value: s }))}
            error={state?.errors?.state}
            defaultValue={data?.state}
          />
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>ZIP code</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="number" name="zip" defaultValue={data?.zip} />
          </div>
          {state?.errors?.zip && <Error message={state?.errors?.zip} />}
        </Field>

        <div className="grid grid-cols-[subgrid] sm:col-span-3">
          <h3 className="text-lg font-semibold text-gray-700">Availability</h3>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Field>
              <Label className="block text-sm font-medium text-gray-700">
                In-Person Sessions
              </Label>
              <SingleSelect
                name="in_person"
                options={Object.entries(YesNoContact).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
              {state?.errors?.in_person && (
                <Error message={state.errors.in_person} />
              )}
            </Field>
            <Field className="mt-3">
              <Label className="block text-sm font-medium text-gray-700">
                Virtual Sessions <Video className="inline ml-2 size-4" />{" "}
                <Phone className="inline size-4" />
              </Label>
              <SingleSelect
                name="telehealth"
                options={Object.entries(YesNoContact).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
              />
              {state?.errors?.telehealth && (
                <Error message={state.errors.telehealth} />
              )}
            </Field>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProfileSection
      title="Practice Location"
      id="PracticeLocation"
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

export default PracticeLocation
