"use client"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogActions,
} from "@/components/Tailwind/dialog"
import { Button } from "@/components/Tailwind/button"
import Link from "next/link"
import { User } from "@/lib/definitions/users"
import { useAuth } from "@clerk/nextjs"

export const ProfileDialog = () => {
  const { isLoaded, userId } = useAuth()
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<User | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile")

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setProfile(data.user)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (userId && isLoaded) {
      fetchProfile()
    }
  }, [userId, isLoaded])

  const shouldShowDialog =
    !!isOpen && !loading && !error && !!profile && !profile.isProfileComplete

  if (loading) return null // Or a loading spinner if preferred
  if (error) return null // Or error handling UI if preferred

  return (
    <Dialog open={shouldShowDialog} onClose={setIsOpen}>
      <DialogTitle>Welcome to Bedlam Connect!</DialogTitle>
      <DialogDescription>
        Take a look around, or complete your profile. You will not be able to
        create posts until your profile is complete.
      </DialogDescription>
      <DialogActions>
        <Link href={"/profile"}>
          <Button plain onClick={() => setIsOpen(false)}>
            Complete my profile
          </Button>
        </Link>
        <Button color="applegreen" onClick={() => setIsOpen(false)}>
          Continue to main feed
        </Button>
      </DialogActions>
    </Dialog>
  )
}
