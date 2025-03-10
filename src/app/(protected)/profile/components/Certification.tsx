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
import { postCertification } from "../actions"
import { BoardCert } from "../definitions"
import ProfileSection from "./profileSection"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@/components/Tailwind/dialog"
import Link from "next/link"

const Certification = ({
  data,
  setProfile,
}: {
  data: BoardCert[] | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postCertification, undefined)
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
      boardCerts: Object.fromEntries(e.entries()),
    }))
    await action(e)
  }

  const renderView = (data: BoardCert) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Certification Type</DescriptionTerm>
        <DescriptionDetails>{data?.type}</DescriptionDetails>

        <DescriptionTerm>Issuing Board</DescriptionTerm>
        <DescriptionDetails>{data?.issuing_board}</DescriptionDetails>

        <DescriptionTerm>Expiration Date</DescriptionTerm>
        <DescriptionDetails>{data?.expiry_date}</DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: BoardCert) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Certification Type</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="text" name="type" defaultValue={data?.type} />
            {state?.errors?.type && <Error message={state.errors?.type} />}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Certifying Body</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input
              type="text"
              name="issuing_board"
              defaultValue={data?.issuing_board}
            />
          </div>
          {state?.errors?.issuing_board && (
            <Error message={state?.errors?.issuing_board} />
          )}
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Expiration Date</Label>
          <MonthYearInput
            className="mt-3 sm:col-span-2 sm:mt-0"
            label="Expiration Date"
            name="expiry_date"
            errorMessage={state?.errors?.expiry_date}
            defaultValue={data?.expiry_date}
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
        <DialogTitle>Want to add multiple certifications?</DialogTitle>
        <DialogDescription>
          We&apos;re working on it! Let us know what other features you want to
          see{" "}
          <Link href="mailto:support@bedlamhealth.com">
            support@bedlamhealth.com
          </Link>
        </DialogDescription>
      </Dialog>
    )
  }

  return (
    <ProfileSection
      title="Certification"
      id="certification"
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

export default Certification
