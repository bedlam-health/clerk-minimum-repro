import React, { useState } from "react"
import { Error } from "./Error"

interface MonthYearInputProps {
  label: string
  name: string
  errorMessage?: string[]
  onDateChange?: (month: number, year: number) => void
  className?: string
  defaultValue?: string
}

const MonthYearInput = ({
  label,
  name,
  errorMessage,
  onDateChange,
  className = "",
  defaultValue,
}: MonthYearInputProps) => {
  const [value, setValue] = useState(defaultValue ?? "")
  const [error, setError] = useState("")

  const validateInput = (input: string): boolean => {
    // Check if empty
    if (!input) {
      setError("Please enter a date in MM/YYYY format")
      return false
    }

    // Check format using regex
    const regex = /^(0[1-9]|1[0-2])\/([12]\d{3})$/
    if (!regex.test(input)) {
      setError("Please use MM/YYYY format (e.g., 03/2024)")
      return false
    }

    const [month, year] = input.split("/").map(Number)

    // Validate month range (1-12)
    if (month < 1 || month > 12) {
      setError("Month must be between 01 and 12")
      return false
    }

    // Validate year (reasonable range)
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear + 100) {
      setError(`Year must be between 1900 and ${currentYear + 100}`)
      return false
    }

    setError("")
    return true
  }

  const formatInput = (input: string): string => {
    // Remove any non-digit characters
    const digitsOnly = input.replace(/\D/g, "")

    // Format as MM/YYYY
    if (digitsOnly.length <= 2) {
      return digitsOnly
    } else if (digitsOnly.length <= 6) {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`
    }
    return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 6)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value)
    setValue(formatted)

    if (formatted.length === 7) {
      // Full MM/YYYY format
      if (validateInput(formatted)) {
        const [month, year] = formatted.split("/").map(Number)
        onDateChange?.(month, year)
      }
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor="monthYear"
        className="mb-1 text-sm font-medium text-gray-700"
      >
        {label} (MM/YYYY)
      </label>
      <input
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="MM/YYYY"
        maxLength={7}
        className={`h-10 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
          ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        aria-invalid={!!error}
        aria-describedby={error ? "date-error" : undefined}
      />
      {error ||
        (errorMessage && <Error message={[...[error], ...errorMessage]} />)}
    </div>
  )
}

export default MonthYearInput
