import { Error } from "@/components/FormComponents/Error"
import MonthYearInput from "@/components/FormComponents/MonthYear"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { Field, Label } from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postEducation } from "../actions"
import { Education as EducationType } from "../definitions"
import ProfileSection from "./profileSection"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@/components/Tailwind/dialog"
import Link from "next/link"

const Education = ({
  data,
  setProfile,
}: {
  data: EducationType[] | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postEducation, undefined)
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
      education: Object.fromEntries(e.entries()),
    }))
    await action(e)
  }

  const renderView = (data: EducationType) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Degree or Certification</DescriptionTerm>
        <DescriptionDetails>{data?.degree_or_cert}</DescriptionDetails>

        <DescriptionTerm>Institution</DescriptionTerm>
        <DescriptionDetails>{data?.institution}</DescriptionDetails>

        <DescriptionTerm>Year Completed</DescriptionTerm>
        <DescriptionDetails>{data?.year_completed}</DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: EducationType) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Degree or Certification</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input
              type="text"
              name="degree_or_cert"
              defaultValue={data?.degree_or_cert}
            />
            {state?.errors?.degree_or_cert && (
              <Error message={state.errors?.degree_or_cert} />
            )}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Institution</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input
              type="text"
              name="institution"
              defaultValue={data?.institution}
            />
            {state?.errors?.institution && (
              <Error message={state?.errors?.institution} />
            )}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Month Completed</Label>
          <MonthYearInput
            className="mt-3 sm:col-span-2 sm:mt-0"
            label="Month Completed"
            name="year_completed"
            errorMessage={state?.errors?.year_completed}
            defaultValue={data?.year_completed}
          />
        </Field>
      </div>
    )
  }

  const renderHelpDialog = (
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return (
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Want to add multiple degrees?</DialogTitle>
        <DialogDescription>
          We&apos;re working on it! Let us know what other features you want to
          see{" "}
          <Link href="mailto:support@bedlamconnect.com">
            support@bedlamconnect.com
          </Link>
        </DialogDescription>
      </Dialog>
    )
  }

  return (
    <ProfileSection
      title="Education"
      id="Education"
      initialData={data}
      renderView={renderView}
      renderForm={renderForm}
      formAction={formAction}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      isLoading={isLoading}
      showHelp={true}
      renderHelpDialog={renderHelpDialog}
    />
  )
}

export default Education
