"use client"
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-steelblue hover:bg-steelblue-400 text-sm",
            headerTitle: "font-serif",
          },
        }}
      />
    </div>
  )
}
