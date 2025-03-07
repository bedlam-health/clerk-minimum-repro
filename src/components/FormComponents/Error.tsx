import React from "react"

interface ErrorProps {
  message: string | string[]
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <p className="text-sm text-rosered mt-0">
      {Array.isArray(message) ? message.join(", ") : message}
    </p>
  )
}
