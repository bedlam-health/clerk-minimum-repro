import z from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
})

export type LoginFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof LoginFormSchema>]?: string[]
  }
  data?: any
}
