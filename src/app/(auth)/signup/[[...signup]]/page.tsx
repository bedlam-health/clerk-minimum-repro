"use client"

import Card from "@/components/Card"
import { SignUp } from "@clerk/nextjs"

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="my-4">Log In</h1>
      <Card>
        <SignUp />
      </Card>
    </div>
  )
}
