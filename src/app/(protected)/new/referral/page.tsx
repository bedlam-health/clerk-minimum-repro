"use client"
import Card from "@/components/Card"
import { CheckSelect } from "@/components/FormComponents/CheckSelect"
import { Error } from "@/components/FormComponents/Error"
import { ReusableCombobox } from "@/components/FormComponents/MultiSelect"
import ScrollableForm, {
  FormSectionData,
} from "@/components/FormComponents/ScrollableForm"
import SingleSelect from "@/components/FormComponents/SingleSelect"
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@/components/Tailwind/checkbox"
import { Divider } from "@/components/Tailwind/divider"
import { Field, Fieldset, Label, Legend } from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import { Select } from "@/components/Tailwind/select"
import {
  ClientAge,
  ClientAgeMap,
  Gender,
  GenderMap,
  Pronouns,
  language,
} from "@/lib/definitions/demographics"
import {
  ClinicalPresentation,
  ClinicalPresentationMap,
  ServiceType,
  ServiceTypeMap,
  SymptomSeverity,
  SymptomSeverityMap,
  YesNoContact,
  YesNoContactMap,
  insurance_providers,
} from "@/lib/definitions/provider-options"
import { states } from "@/lib/definitions/states"
import { Phone, Video } from "lucide-react"
import { useState } from "react"
import { useFormState } from "react-dom"
import { onFormPostAction } from "./actions"

export default function New_postPage() {
  // eslint-disable-next-line
  const [state, action] = useFormState(onFormPostAction, undefined)

  const [reqLanguage, setReqLanguage] = useState("no")
  const [lang, setLang] = useState<{ id: string; label: string }[]>([])

  const [inNetwork, setInNetwork] = useState(false)
  const [providers, setProviders] = useState<{ id: string; label: string }[]>(
    []
  )
  const formSections: FormSectionData[] = [
    {
      id: "location",
      title: "Client Location",
      children: (
        <>
          <Field>
            <Label>City</Label>
            <Input type="text" name="location_city" />
            {state?.errors?.location_city && (
              <Error message={state.errors.location_city} />
            )}
          </Field>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Location (State)</Label>
              <Select name="location_state">
                <option value="">Select an option</option>
                {states.flatMap((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </Select>
              {state?.errors?.location_state && (
                <Error message={state.errors.location_state} />
              )}
            </Field>
            <Field>
              <Label>ZIP Code</Label>
              <Input type="number" name="location_zip" />
              {state?.errors?.location_zip && (
                <Error message={state.errors.location_zip} />
              )}
            </Field>
          </div>
          <Divider />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Availability
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
              <Field>
                <Label>In-Person Sessions</Label>
                <Select name="location_in_person">
                  <option value="">Select an option</option>
                  {Object.entries(YesNoContact).map(([, value]) => (
                    <option value={value} key={value}>
                      {YesNoContactMap[value]}
                    </option>
                  ))}
                </Select>
                {state?.errors?.location_in_person && (
                  <Error message={state.errors.location_in_person} />
                )}
              </Field>
              <Field>
                <Label>
                  Virtual Sessions <Video className="inline ml-2 size-4" />{" "}
                  <Phone className="inline size-4" />
                </Label>
                <Select name="location_virtual">
                  <option value="">Select an option</option>
                  {Object.entries(YesNoContact).map(([, value]) => (
                    <option value={value} key={value}>
                      {YesNoContactMap[value]}
                    </option>
                  ))}
                </Select>
                {state?.errors?.location_virtual && (
                  <Error message={state.errors.location_virtual} />
                )}
              </Field>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "Client Demographics",
      title: "Demographics",
      children: (
        <>
          <SingleSelect
            label={"Age Group"}
            name="client_dem_ages"
            options={Object.entries(ClientAge).map(([, value]) => ({
              label: ClientAgeMap[value],
              value: value,
            }))}
            error={state?.errors?.client_dem_ages}
          />
          <SingleSelect
            label={"Gender"}
            name="client_dem_gender"
            options={Object.entries(Gender).map(([, value]) => ({
              label: GenderMap[value],
              value: value,
            }))}
            error={state?.errors?.client_dem_gender}
          />
          <CheckSelect
            label={"Pronouns"}
            name="client_dem_pronouns"
            options={Object.entries(Pronouns).map(([, value]) => ({
              label: value,
              value: value,
            }))}
          />
          <Divider />
          <Field>
            <Label>
              Are services preferred in a language other than English?
            </Label>
            <Select
              name="language_preferred"
              onChange={(e) => setReqLanguage(e.target.value)}
              value={reqLanguage}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Select>
          </Field>
          {reqLanguage == "yes" && (
            <ReusableCombobox
              label="Languages"
              name="languages"
              options={language.flatMap((s) => ({ id: s, label: s }))}
              value={lang}
              onChange={(e) => setLang(e)}
            />
          )}
        </>
      ),
    },
    {
      id: "complaint",
      title: "Complaint",
      children: (
        <>
          <SingleSelect
            label="Select the patient's chief complaint."
            name="client_focus_chief_complaint"
            options={Object.entries(ClinicalPresentation).map(([, value]) => ({
              label: ClinicalPresentationMap[value],
              value: value,
            }))}
            error={state?.errors?.client_focus_chief_complaint}
          />

          <CheckSelect
            className="mt-4"
            label={"Symptom Severity"}
            name="client_focus_symptom_severity"
            options={Object.entries(SymptomSeverity).map(([, value]) => ({
              label: SymptomSeverityMap[value],
              value: value,
            }))}
            error={state?.errors?.client_focus_symptom_severity}
          />
        </>
      ),
    },
    {
      id: "services",
      title: "Services",
      children: (
        <>
          <CheckSelect
            label={"Select the service requested."}
            name="services_service_type"
            options={Object.entries(ServiceType).map(([, value]) => ({
              label: ServiceTypeMap[value],
              value: value,
            }))}
            error={state?.errors?.services_service_type}
          />
          <Field>
            <Label>
              If you require a specific modality of psychotherapy, please
              indicate it here.
            </Label>
            <Input name="services_psychotherapy_modality" />
          </Field>
        </>
      ),
    },
    {
      id: "insurance",
      title: "Insurance",
      children: (
        <>
          <Fieldset>
            <Legend>Please select the payment situation.</Legend>
            <CheckboxGroup className={`mt-2 columns-1 gap-5`}>
              <CheckboxField key={"insurance_in_network"} className="flex py-1">
                <Checkbox
                  name={`insurance_in_network`}
                  value={String(inNetwork)}
                  // @ts-ignore
                  onChange={() => setInNetwork((prev) => !prev)}
                />
                <Label>In network</Label>
              </CheckboxField>
              <CheckboxField
                key={"insurance_out_of_network"}
                className="flex py-1"
              >
                <Checkbox name={`insurance_out_of_network`} />
                <Label>Out of network</Label>
              </CheckboxField>
            </CheckboxGroup>
            {state?.errors?.insurance && (
              <Error message={state?.errors?.insurance} />
            )}
          </Fieldset>
          {inNetwork && (
            <ReusableCombobox
              label="Please select the insurance providers"
              name="insurance-providers"
              options={insurance_providers.flatMap((s) => ({
                id: s,
                label: s,
              }))}
              value={providers}
              onChange={(e) => setProviders(e)}
            />
          )}
        </>
      ),
    },
  ]

  return (
    <>
      <Card className="flex flex-col gap-2 mb-4">
        <h1>New Post: Client Referral</h1>
        <p>
          Share your client&apos;s referral needs with our entire professional
          network in seconds for perfect match and expanded visibility.
        </p>
      </Card>
      <ScrollableForm sections={formSections} action={action} state={state} />
    </>
  )
}
