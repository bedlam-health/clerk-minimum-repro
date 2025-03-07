import Card from "@/components/Card"
import Loader from "@/components/Loader"
import { Button } from "@/components/Tailwind/button"
import { Fieldset } from "@/components/Tailwind/fieldset"
import { Check, CircleHelp, Pencil, X } from "lucide-react"
import React, { useState } from "react"

interface ProfileSectionProps<T> {
  title: string
  id: string
  initialData: T
  renderView: (data: T) => React.ReactNode
  renderForm: (data: T) => React.ReactNode
  formAction:
    | string
    | ((formData: FormData) => void | Promise<void>)
    | undefined
  isEditing: boolean
  setIsEditing: (value: boolean | ((prevState: boolean) => boolean)) => void
  isLoading: boolean
  showHelp?: boolean
  renderHelpDialog?: (
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode
}

const ProfileSection = ({
  title,
  id,
  initialData,
  renderView,
  renderForm,
  formAction,
  isEditing,
  setIsEditing,
  isLoading,
  showHelp,
  renderHelpDialog,
}: ProfileSectionProps<any>) => {
  // Handle canceling edit mode
  const handleCancel = () => {
    setIsEditing(false)
  }
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (!isEditing) {
    return (
      <Card className="relative mb-8" id={id}>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
        {renderView(initialData)}
        <div className="absolute right-4 top-4">
          <Button color="steelblue" onClick={() => setIsEditing(true)}>
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
        {showHelp && (
          <>
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <CircleHelp color="var(--carrotorange)" />
              </button>
            </div>
            {renderHelpDialog && renderHelpDialog(isOpen, setIsOpen)}
          </>
        )}
      </Card>
    )
  }

  return (
    <Card className="mb-8" id={id}>
      <form action={formAction}>
        <Fieldset className="space-y-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>

          {renderForm(initialData)}
          <div className="flex justify-end gap-3 pt-4">
            <Button outline onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button color="steelblue" type="submit" disabled={isLoading}>
              {isLoading && <Loader className="h-4 w-4" />}
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </Fieldset>
      </form>
    </Card>
  )
}

export default ProfileSection
