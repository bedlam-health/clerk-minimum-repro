// code starter from https://github.com/vercel-labs/app-router-auth

import { z } from "zod"

const credentialSchema = z
  .string()
  .max(10, { message: "Credential must not exceed 10 characters" })
  .trim()
  .optional()

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    title: z.string().optional(),
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .trim(),
    credentials1: credentialSchema,
    credentials2: credentialSchema,
    credentials3: credentialSchema,
    credentials4: credentialSchema,
    pronouns: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .max(256, { message: "Be no more than 256 characters long" })
      // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      // .regex(/[0-9]/, { message: "Contain at least one number." })
      // .regex(/[^a-zA-Z0-9]/, {
      //   message: "Contain at least one special character.",
      // })
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const credentials = [
        data.credentials1,
        data.credentials2,
        data.credentials3,
        data.credentials4,
      ].filter(Boolean)
      return credentials.length > 0
    },
    {
      message: "At least one credential is required",
      path: ["credentials1"],
    }
  )

export type SignupFormState = {
  message: string
  success: boolean
  errors?: {
    [K in keyof z.infer<typeof SignupFormSchema>]?: string[]
  }
  data?: any
}

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
})
export type LoginFormState = {
  errors?: {
    [K in keyof z.infer<typeof LoginFormSchema>]?: string[]
  }
  message?: string
  success: boolean
}

export type FormState =
  | {
      errors?: {
        email?: string[]
        title?: string[]
        firstName?: string[]
        lastName?: string[]
        credentials1?: string[]
        credentials2?: string[]
        credentials3?: string[]
        credentials4?: string[]
        credentials5?: string[]
        pronouns?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  userId: string | number
  expiresAt: Date
}
