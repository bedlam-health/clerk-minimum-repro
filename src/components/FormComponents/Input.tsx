import * as React from "react"
import cn from "@/lib/cn"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, className, type, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          name={name}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-accent-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export default Input
