import { CheckSelect } from "@/components/FormComponents/CheckSelect"
import { ReusableCombobox } from "@/components/FormComponents/MultiSelect"
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/Tailwind/description-list"
import { Field, Label } from "@/components/Tailwind/fieldset"
import {
  ClientAge,
  ClientAgeMap,
  language,
} from "@/lib/definitions/demographics"
import {
  ClinicalPresentation,
  ClinicalPresentationMap,
  SymptomSeverity,
  SymptomSeverityMap,
} from "@/lib/definitions/provider-options"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { postClientFocus, transformClientFocus } from "../../actions"
import { PracticeClientFocus } from "../../definitions"
import ProfileSection from "../profileSection"
const ClientFocus = ({
  data,
  setProfile,
}: {
  data: PracticeClientFocus | undefined
  setProfile: any
}) => {
  const [state, action] = useFormState(postClientFocus, undefined)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lang, setLang] = useState<{ id: string; label: string }[]>([])

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
    const newdata = await transformClientFocus(e)
    // optimistic UI update
    setProfile((prev: User) => ({
      ...prev,
      // TODO: the data transformation is gonna need fixing
      practices: { ...prev, clientFocus: newdata },
    }))
    await action(e)
  }

  const renderView = (data: PracticeClientFocus) => {
    return (
      <DescriptionList>
        <DescriptionTerm>Age Groups</DescriptionTerm>
        <DescriptionDetails>
          {data?.ageGroups.map((v: ClientAge) => ClientAgeMap[v]).join(", ")}
        </DescriptionDetails>

        {data?.language && (
          <>
            <DescriptionTerm>Language (other than English)</DescriptionTerm>
            <DescriptionDetails>
              {data.language.length > 0 ? data.language?.join(", ") : "No"}
            </DescriptionDetails>
          </>
        )}

        {data?.clinicalPresentation && (
          <>
            <DescriptionTerm>Clinical Presentation</DescriptionTerm>
            <DescriptionDetails>
              {data?.clinicalPresentation
                .map((v: ClinicalPresentation) => ClinicalPresentationMap[v])
                .join(", ")}
            </DescriptionDetails>
          </>
        )}

        {data?.symptomSeverity && (
          <>
            <DescriptionTerm>Symptom Severity</DescriptionTerm>
            <DescriptionDetails>
              {data?.symptomSeverity
                .map((v: SymptomSeverity) => SymptomSeverityMap[v])
                .join(", ")}
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
          <Label>Age Groups</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              name="age"
              options={Object.entries(ClientAge).map(([, value]) => ({
                label: ClientAgeMap[value],
                value: value,
              }))}
              error={state?.errors?.ageGroups}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Language</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <ReusableCombobox
              label="If you offer services in a language other than English, select them here."
              name="language"
              options={language.flatMap((s) => ({ id: s, label: s }))}
              value={lang}
              onChange={(e) => setLang(e)}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Clinical Presentation (optional)</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              label="If you specialize in the care of specific patient presentations,
                 please select them below."
              name="clinical_presentation"
              options={Object.entries(ClinicalPresentation).map(
                ([, value]) => ({
                  label: ClinicalPresentationMap[value],
                  value: value,
                })
              )}
            />
          </div>
        </Field>

        <Field className="grid grid-cols-[subgrid] sm:col-span-3">
          <Label>Symptom Severity (optional)</Label>
          <div className="mt-3 sm:col-span-2 sm:mt-0">
            <CheckSelect
              label={"Symptom Severity"}
              name="symptom_severity"
              options={Object.entries(SymptomSeverity).map(([, value]) => ({
                label: SymptomSeverityMap[value],
                value: value,
              }))}
            />
          </div>
        </Field>
      </div>
    )
  }

  return (
    <ProfileSection
      title="Client Focus"
      id="client_focus"
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

export default ClientFocus
