import * as React from "react"
import cn from "../lib/cn"

type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
