import { Error } from "@/components/FormComponents/Error"
import MonthYearInput from "@/components/FormComponents/MonthYear"
import SingleSelect from "@/components/FormComponents/SingleSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@/components/Tailwind/dialog"
import { Field, Label } from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import { states } from "@/lib/definitions/states"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postLicensure } from "../actions"
import { License } from "../definitions"
import ProfileSection from "./profileSection"
import Link from "next/link"

const Licensure = ({
  data,
  setProfile,
}: {
  data: License[] | undefined
  setProfile: any
}) => {
  const [state, licensureAction] = useFormState(postLicensure, undefined)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      licenses: Object.fromEntries(e.entries()),
    }))
    await licensureAction(e)
    setIsEditing(false)
    setIsLoading(false)
  }

  const renderView = (data: License) => {
    return (
      <DescriptionList>
        <DescriptionTerm>License Type</DescriptionTerm>
        <DescriptionDetails>{data?.type}</DescriptionDetails>

        <DescriptionTerm>License Number</DescriptionTerm>
        <DescriptionDetails>{data?.number}</DescriptionDetails>

        <DescriptionTerm>Issuing State</DescriptionTerm>
        <DescriptionDetails>{data?.state}</DescriptionDetails>

        <DescriptionTerm>Expiration Date</DescriptionTerm>
        <DescriptionDetails>{data?.expiry_date}</DescriptionDetails>
      </DescriptionList>
    )
  }

  const renderForm = (data: License) => {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>License Type</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="text" name="type" defaultValue={data?.type} />
            {state?.errors?.type && <Error message={state?.errors?.type} />}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>License Number</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <Input type="number" name="number" defaultValue={data?.number} />
            {state?.errors?.number && <Error message={state?.errors?.number} />}
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Issuing State</Label>
          <SingleSelect
            className="mt-3 sm:col-span-2 sm:mt-0"
            name="state"
            options={states.map((s) => ({ label: s, value: s }))}
            error={state?.errors?.state}
            defaultValue={data?.state}
          />
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
        <DialogTitle>Want to add multiple licenses?</DialogTitle>
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
      title="Licensure"
      id="licensure"
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

export default Licensure
