import React, { FC, FieldsetHTMLAttributes } from "react"
import { Fieldset, Label, Legend } from "@/components/Tailwind/fieldset"
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@/components/Tailwind/checkbox"
import { Error } from "@/components/FormComponents/Error"

interface SelectOption {
  label: string
  value: string
}

interface CheckSelectProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: string
  name?: string
  options: SelectOption[]
  numColumns?: number
  error?: string[]
}

/* it would be really nice to have this return a list as the Multiselect does, but its kind of a PITA */
/* TODO: make them flow columns rather than left-right */

export const CheckSelect: FC<CheckSelectProps> = (props) => {
  const { label, name, options, numColumns, className, error, ...rest } = props
  return (
    <Fieldset className={className} {...rest}>
      {label && (
        <Legend className="block text-sm font-medium text-gray-700">
          {label}
        </Legend>
      )}
      <CheckboxGroup className={`mt-2 columns-${numColumns} gap-5`}>
        {options.map((o) => (
          <CheckboxField key={o.value} className="flex py-1">
            <Checkbox name={`${name}_${o.value}`} value={o.value} />
            <Label>{o.label}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
      {error && <Error message={error} />}
    </Fieldset>
  )
}
