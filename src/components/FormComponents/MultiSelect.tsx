"use client"
import React, { useState, useRef } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react"
import { Label } from "../Tailwind/fieldset"
import { ChevronDown, CircleX as XIcon, Check } from "lucide-react"
import Input from "./Input"
import { Error } from "./Error"
import clsx from "clsx"

interface SelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  label?: string
  name?: string
  options: SelectOption[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  allowOther?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  options,
  defaultValue = [],
  onChange,
  allowOther,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)
  const [otherValue, setOtherValue] = useState("")
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedValuesHasOther = () => {
    return selectedValues.filter((v) => v.includes("other")).length > 0
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleOptionClick = (option: SelectOption) => {
    if (option.value.includes("other")) {
      if (selectedValuesHasOther()) {
        //remove the old other / update it
        const newSelectedValues = selectedValues.filter(
          (v) => !v.includes("other")
        )
        setSelectedValues(newSelectedValues)
      } else {
        //add it to the list
        setSelectedValues([...selectedValues, option.value])
        setIsOpen(true)
      }
    } else {
      const newSelectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value]
      setSelectedValues(newSelectedValues)
    }
    onChange?.(selectedValues)
  }

  const handleRemoveOption = (value: string) => {
    const newSelectedValues = selectedValues.filter((v) => v !== value)
    setSelectedValues(newSelectedValues)
    onChange?.(newSelectedValues)
  }

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setOtherValue(e.target.value)
  }

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value, i) =>
            value.includes("other") ? (
              <div
                key={i}
                className="flex items-center px-2 py-1 bg-gray-200 rounded-md"
              >
                Other: {otherValue}
                <button
                  className="ml-2 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveOption(value)
                  }}
                >
                  <XIcon className="size-6" />
                </button>
              </div>
            ) : (
              <div
                key={i}
                className="flex items-center px-2 py-1 bg-gray-200 rounded-md"
              >
                {options.find((o) => o.value === value)?.label}
                <button
                  className="ml-2 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveOption(value)
                  }}
                >
                  <XIcon className="size-6" />
                </button>
              </div>
            )
          )}
          {selectedValues.length === 0 && (
            <div className="text-gray-400">Select options</div>
          )}
        </div>
        <ChevronDown
          className={`size-6 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 hover:bg-gray-100 ${
                selectedValues.includes(option.value) ? "bg-blue-100" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
          {allowOther && (
            <div
              className={`px-4 py-2 hover:bg-gray-100 ${
                selectedValuesHasOther() ? "bg-blue-100" : ""
              }`}
              onClick={() =>
                handleOptionClick({
                  label: "Other",
                  value: `other: ${otherValue}`,
                })
              }
            >
              <div className="flex items-center">
                Other
                <Input
                  type="text"
                  className="flex-1 px-2 py-1 ml-2"
                  value={otherValue}
                  onChange={handleOtherChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {name && (
        <input type="hidden" name={name} value={selectedValues.join(",")} />
      )}
    </div>
  )
}

// Define the base structure that all options must have
interface BaseOption {
  id: string | number
  [key: string]: any
}

interface ComboboxProps<T extends BaseOption> {
  label: string
  name: string
  options: T[]
  displayField?: keyof T
  value: T[] | null
  onChange: (value: T[]) => void
  className?: string
  placeholder?: string
  error?: string[]
}

export function ReusableCombobox<T extends BaseOption>({
  label,
  name,
  options,
  displayField = "label",
  value,
  onChange,
  placeholder = "Search...",
  error,
}: ComboboxProps<T>) {
  const [query, setQuery] = useState("")

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          const displayValue = String(option[displayField]).toLowerCase()
          return displayValue.includes(query.toLowerCase())
        })

  // Default tag renderer
  const renderTag = (option: T, handleRemove: () => void) => {
    return option ? (
      <span className="px-2 py-1 bg-gray-200 rounded-md" key={option.id}>
        <span className="text-sm mr-2">{String(option[displayField])}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleRemove()
          }}
        >
          <XIcon className="size-3" />
        </button>
      </span>
    ) : (
      <></>
    )
  }

  const handleRemoveOption = (optionToRemove: T) => {
    if (value) {
      const newValue = value.filter((v) => v.id !== optionToRemove.id)
      onChange(newValue)
    }
  }

  return (
    <div className="w-full">
      <Combobox value={value ?? []} onChange={onChange} name={name} multiple>
        <div className="relative mt-1">
          <Label htmlFor={name}>{label}</Label>
          <div className="flex flex-row gap-2 mb-2">
            {(value ?? []).map((option) =>
              renderTag(option, () => handleRemoveOption(option))
            )}
          </div>
          <div className="relative">
            <ComboboxInput
              id={name}
              className={clsx(
                "border border-zinc-950/10 data-[hover]:border-zinc-950/20",
                "w-full rounded-lg  py-1.5 pr-8 pl-3 text-sm/6 ",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-steelblue"
              )}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => query !== "" && setQuery("")}
              placeholder={placeholder}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            anchor="bottom"
            className={clsx(
              "w-[var(--input-width)] rounded-xl border border-gray bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {filteredOptions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.id}
                  value={option}
                  className="group flex cursor-default items-center gap-2 rounded-lg bg-white py-1.5 px-3 select-none data-[focus]:bg-steelblue-200 "
                >
                  {" "}
                  <Check className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 data">
                    {String(option[displayField])}
                  </div>
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
      {error && <Error message={error} />}
    </div>
  )
}
