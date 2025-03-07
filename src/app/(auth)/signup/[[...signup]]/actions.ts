"use server"
import { SignupFormSchema } from "@/app/(auth)/signup/[[...signup]]/definitions"
import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { User } from "@/lib/definitions/users"

function transformDataForDB(
  id: string,
  formData: FormData
): Pick<
  User,
  | "uid"
  | "email"
  | "role"
  | "title"
  | "firstName"
  | "lastName"
  | "credentials"
  | "pronouns"
  | "createdAt"
  | "updatedAt"
  | "isProfileComplete"
> {
  const validatedFields = SignupFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  // this should never happen, since this is called after validating on the client-side, but it's here just in case
  if (!validatedFields.success) {
    throw Error("Fields are not valid")
  }

  // 2. Prepare data for insertion into database
  const { credentials1, credentials2, credentials3, credentials4 } =
    validatedFields.data

  // Create credentials array, filtering out empty values
  const credentials = [
    credentials1,
    credentials2,
    credentials3,
    credentials4,
  ].filter(Boolean) as string[]

  return {
    uid: id,
    email: validatedFields.data.email,
    role: "provider",
    ...(validatedFields.data.title && { title: validatedFields.data.title }),
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    credentials,
    ...(validatedFields.data.pronouns && {
      pronouns: validatedFields.data.title,
    }),
    isProfileComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function createNewUserInDB(
  id: string | null,
  formData: FormData | undefined
) {
  if (!id) {
    console.error("Signup error:", "no uid provided from clerk")
    return {
      message:
        "An error occurred while creating your account. Please try again.",
    }
  }
  if (!formData) {
    console.error("Signup error:", "no formdata provided")
    return {
      message:
        "An error occurred while creating your account. Please try again.",
    }
  }
  try {
    const user = transformDataForDB(id, formData)

    const db = await getFirestoreInstance()

    await db.collection("users").doc(id).set(user)
    console.log(`Sucessfully created user at /users/${id}`)
  } catch (error: any) {
    // Log any other errors and return a generic error message
    console.error("Signup error:", error)
    return {
      message:
        "An error occurred while creating your account. Please try again.",
    }
  }
}
