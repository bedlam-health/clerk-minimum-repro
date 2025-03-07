"use client"
import { Button } from "@/components/Tailwind/button"
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from "@/components/Tailwind/dialog"
import { Check, Copy, Mail } from "lucide-react"
import { useState } from "react"
import { AuthorInfo } from "./RightSideLoader"

export interface RightSideContentProps {
  authorInfo: AuthorInfo
  displayAuthor: boolean
}
// Email Modal Component
const EmailModal = ({
  email,
  isOpen,
  setIsOpen,
}: {
  email: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onClose={setIsOpen}>
      <DialogTitle>Contact Information</DialogTitle>
      <DialogDescription>
        Copy the email address to contact the provider
      </DialogDescription>
      <div className="flex items-center space-x-2 mt-4">
        <div className="grid flex-1 gap-2">
          <div className="p-3 border rounded-md flex justify-between items-center bg-slate-50">
            <span className="text-sm font-medium">{email}</span>
            <Button
              color="steelblue"
              className="px-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

// Content component that receives the loaded data
export const RightSideContent = ({
  authorInfo,
  displayAuthor,
}: RightSideContentProps) => {
  const { authorName, creds, email } = authorInfo
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2 pt-8">
      <Button color="carrotorange" onClick={() => setIsModalOpen(true)}>
        <Mail className="w-4 h-4 mr-2" /> Interested
      </Button>

      <EmailModal
        email={email}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      {displayAuthor && (
        <div>
          <p className="text-sm">Referring Provider</p>
          <p className="font-medium">{authorName}</p>
          <p className="text-sm text-zinc-500">{creds.join(", ")}</p>
        </div>
      )}
    </div>
  )
}
