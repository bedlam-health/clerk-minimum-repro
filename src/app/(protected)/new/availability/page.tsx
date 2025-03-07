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
import {
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
} from "@/components/Tailwind/fieldset"
import { Input } from "@/components/Tailwind/input"
import { Radio, RadioField, RadioGroup } from "@/components/Tailwind/radio"
import { Select } from "@/components/Tailwind/select"
import {
  ClientAge,
  ClientAgeMap,
  Gender,
  GenderMap,
  language,
} from "@/lib/definitions/demographics"
import {
  ClinicalPresentation,
  ClinicalPresentationMap,
  EvaluationType,
  EvaluationTypeMap,
  insurance_providers,
  ServiceType,
  ServiceTypeMap,
  SymptomSeverity,
  SymptomSeverityMap,
  TherapeuticApproach,
  TherapeuticApproachMap,
  TherapeuticAudience,
  TherapeuticAudienceMap,
  TreatmentSetting,
  TreatmentSettingMap,
  YesNoContact,
  YesNoContactMap,
} from "@/lib/definitions/provider-options"
import { states } from "@/lib/definitions/states"
import { Phone, Video } from "lucide-react"
import { useState } from "react"
import { useFormState } from "react-dom"
import { onFormPostAction } from "./actions"

export default function NewAvailabilityPostPage() {
  // eslint-disable-next-line
  const [state, action] = useFormState(onFormPostAction, undefined)

  const [reqLanguage, setReqLanguage] = useState("no")
  const [lang, setLang] = useState<{ id: string; label: string }[]>([])

  const [inNetwork, setInNetwork] = useState(false)
  const [providers, setProviders] = useState<{ id: string; label: string }[]>(
    []
  )

  const [hasEval, setHasEval] = useState<boolean>(false)
  const [hasTherapy, setHasTherapy] = useState<boolean>(false)

  const formSections: FormSectionData[] = [
    {
      id: "location",
      title: "Location",
      children: (
        <>
          <Field>
            <Label>City</Label>
            <Input type="text" name="city" />
            {state?.errors?.city && <Error message={state.errors.city} />}
          </Field>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>State</Label>
              <Select name="state">
                <option value="">Select an option</option>
                {states.flatMap((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </Select>
              {state?.errors?.state && <Error message={state.errors.state} />}
            </Field>
            <Field>
              <Label>ZIP Code</Label>
              <Input type="number" name="zipCode" />
              {state?.errors?.zipCode && (
                <Error message={state.errors.zipCode} />
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
                <Select name="inPerson">
                  <option value="">Select an option</option>
                  {Object.entries(YesNoContact).map(([, value]) => (
                    <option value={value} key={value}>
                      {YesNoContactMap[value]}
                    </option>
                  ))}
                </Select>
                {state?.errors?.inPerson && (
                  <Error message={state.errors.inPerson} />
                )}
              </Field>
              <Field>
                <Label>
                  Virtual Sessions <Video className="inline ml-2 size-4" />{" "}
                  <Phone className="inline size-4" />
                </Label>
                <Select name="telehealth">
                  <option value="">Select an option</option>
                  {Object.entries(YesNoContact).map(([, value]) => (
                    <option value={value} key={value}>
                      {YesNoContactMap[value]}
                    </option>
                  ))}
                </Select>
                {state?.errors?.telehealth && (
                  <Error message={state.errors.telehealth} />
                )}
              </Field>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "services",
      title: "Featured Services",
      children: (
        <>
          <Fieldset>
            <Legend className="block text-sm font-medium text-gray-700">
              Select the services you&apos;d like to feature.
            </Legend>

            <CheckboxGroup className={`mt-2 columns-1 gap-5`}>
              <CheckboxField key={ServiceType.Evaluation} className="flex py-1">
                <Checkbox
                  name={`availableServices_${ServiceType.Evaluation}`}
                  value={ServiceType.Evaluation}
                  checked={hasEval}
                  onChange={() => setHasEval((prev) => !prev)}
                />
                <Label>{ServiceTypeMap[ServiceType.Evaluation]}</Label>
              </CheckboxField>
              <CheckboxField
                key={ServiceType.Psychotherapy}
                className="flex py-1"
              >
                <Checkbox
                  name={`availableServices_${ServiceType.Psychotherapy}`}
                  value={ServiceType.Psychotherapy}
                  checked={hasTherapy}
                  onChange={() => setHasTherapy((prev) => !prev)}
                />
                <Label>{ServiceTypeMap[ServiceType.Psychotherapy]}</Label>
              </CheckboxField>
              {Object.entries(ServiceType)
                .filter(
                  // eslint-disable-next-line
                  (a, _) =>
                    a[1] !== ServiceType.Evaluation &&
                    a[1] !== ServiceType.Psychotherapy
                )
                .map(([, value]) => ({
                  label: ServiceTypeMap[value],
                  value: value,
                }))
                .map((o) => (
                  <CheckboxField key={o.value} className="flex py-1">
                    <Checkbox
                      name={`availableServices_${o.value}`}
                      value={o.value}
                    />
                    <Label>{o.label}</Label>
                  </CheckboxField>
                ))}
            </CheckboxGroup>
            {state?.errors?.availableServices && (
              <Error message={state?.errors?.availableServices} />
            )}
          </Fieldset>
          {hasEval && (
            <SingleSelect
              label={"Please select the evaluation type."}
              name="evaluationType"
              options={Object.entries(EvaluationType).map(([, value]) => ({
                label: EvaluationTypeMap[value],
                value: value,
              }))}
              // error={state?.errors?.client_dem_ages}
            />
          )}
          {hasTherapy && (
            <>
              <SingleSelect
                label={"Please select the therapy audience."}
                name="therapyAudience"
                options={Object.entries(TherapeuticAudience).map(
                  ([, value]) => ({
                    label: TherapeuticAudienceMap[value],
                    value: value,
                  })
                )}
              />
              <SingleSelect
                label={"Please select the therapeutic approach."}
                name="therapyApproach"
                options={Object.entries(TherapeuticApproach).map(
                  ([, value]) => ({
                    label: TherapeuticApproachMap[value],
                    value: value,
                  })
                )}
              />
              <Field>
                <Label>
                  Please include any specific therapeutic modalities offered.
                </Label>
                <Input name="modality" />
              </Field>
            </>
          )}
          <CheckSelect
            label="Treatment Settings"
            name="treatmentSettings"
            options={Object.entries(TreatmentSetting).map(([, value]) => ({
              label: TreatmentSettingMap[value],
              value: value,
            }))}
            error={state?.errors?.treatmentSettings}
          />
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
            {state?.errors?.insuranceType && (
              <Error message={state?.errors?.insuranceType} />
            )}
          </Fieldset>
          {inNetwork && (
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
          )}
          <Fieldset>
            <Legend>Do You accept sliding scale?</Legend>
            <RadioGroup name="acceptsSlidingScale" defaultValue="no">
              <RadioField>
                <Radio value="yes" />
                <Label>Yes</Label>
              </RadioField>
              <RadioField>
                <Radio value="no" />
                <Label>No</Label>
              </RadioField>
            </RadioGroup>
            {state?.errors?.acceptsSlidingScale && (
              <Error message={state?.errors?.acceptsSlidingScale} />
            )}
          </Fieldset>
        </>
      ),
    },
    {
      id: "client",
      title: "Client Focus",
      children: (
        <>
          <CheckSelect
            label={"Age Group"}
            name="ageGroup"
            options={Object.entries(ClientAge).map(([, value]) => ({
              label: ClientAgeMap[value],
              value: value,
            }))}
            error={state?.errors?.ageGroup}
          />
          <CheckSelect
            label={"Gender"}
            name="gender"
            options={Object.entries(Gender).map(([, value]) => ({
              label: GenderMap[value],
              value: value,
            }))}
            error={state?.errors?.gender}
          />

          <Divider />
          <Field>
            <Label>
              Are services offered in a language other than English?
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
          <Divider />

          <CheckSelect
            label="Clinical Presentation"
            name="clinicalPresentation"
            options={Object.entries(ClinicalPresentation).map(([, value]) => ({
              label: ClinicalPresentationMap[value],
              value: value,
            }))}
            error={state?.errors?.clinicalPresentation}
          />
          <CheckSelect
            label="Symptom Severity"
            name="severity"
            options={Object.entries(SymptomSeverity).map(([, value]) => ({
              label: SymptomSeverityMap[value],
              value: value,
            }))}
            error={state?.errors?.severity}
          />
        </>
      ),
    },
    {
      id: "other",
      title: "Other Comments",
      children: (
        <>
          <Field>
            <Label hidden>Other comments</Label>
            <Description>Max 250 characters</Description>
            <Input name="otherComments" maxLength={250} />
          </Field>
        </>
      ),
    },
  ]

  return (
    <>
      <Card className="flex flex-col gap-2 mb-4">
        <h1>New Post: Provider Availability</h1>
        <p>
          Post your availability to find new clients faster or feature specialty
          services to find clients best suited for your clinical specialty.
        </p>
      </Card>
      <ScrollableForm sections={formSections} action={action} state={state} />
    </>
  )
}
