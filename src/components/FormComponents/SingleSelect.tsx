import * as React from "react"
import { Field, Label } from "@/components/Tailwind/fieldset"
import { Select } from "@/components/Tailwind/select"
import { Error } from "./Error"

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  name: string
  options: SelectOption[]
  error?: string | string[]
}

const SingleSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, name, options, error, ...props }, ref) => {
    return (
      <Field>
        {label && <Label>{label}</Label>}
        <Select name={name} ref={ref} {...props}>
          <option value="">Select an option</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        {error && <Error message={error} />}
      </Field>
    )
  }
)

SingleSelect.displayName = "SingleSelect"

export default SingleSelect
