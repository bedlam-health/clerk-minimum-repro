import React, { ReactNode } from "react"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: "default" | "destructive"
}

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles = "p-4 rounded-md border"
  const variantStyles = {
    default: "bg-blue-100 border-blue-300 text-blue-900",
    destructive: "bg-red-100 border-red-300 text-red-900",
  }

  const alertClasses = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <div role="alert" className={alertClasses} {...props}>
      {children}
    </div>
  )
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`text-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Alert, AlertDescription }
