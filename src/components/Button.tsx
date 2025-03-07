import { ButtonHTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"
import cn from "@/lib/cn"

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

const Button = ({
  children,
  className,
  intent,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

const buttonVariants = cva(["rounded-lg"], {
  variants: {
    intent: {
      primary: [
        "bg-gray-500",
        "text-white",
        "border-2",
        "border-transparent",
        "hover:bg-gray-600",
      ],
      outline: [
        "text-gray-800",
        "border-2",
        "border-gray-500",
        "hover:bg-gray-600/25",
      ],
      colored: [
        "bg-accent-700",
        "text-white",
        "border-transparent",
        "hover:bg-accent-800",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-xl", "py-2", "px-4"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "small",
  },
})

export default Button
