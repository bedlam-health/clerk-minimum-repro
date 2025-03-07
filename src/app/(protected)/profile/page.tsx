"use client"
import { User } from "@/lib/definitions/users"
import { useEffect, useState } from "react"
import Certification from "./components/Certification"
import Education from "./components/Education"
import Licensure from "./components/Licensure"
import ClientFocus from "./components/Practice/ClientFocus"
import Insurance from "./components/Practice/Insurance"
import PracticeLocation from "./components/Practice/PracticeLocation"
import Roles from "./components/Practice/Roles"
import Services from "./components/Practice/Services"

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null)
  //eslint-disable-next-line
  const [loading, setLoading] = useState<boolean>(true)
  //eslint-disable-next-line
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("api/user/profile")

        if (!response.ok) {
          console.error(response.status)
        }

        const data = await response.json()
        setProfile(data.user)
      } catch (err) {
        setError((err as Error)?.message ?? "Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <>
      <Licensure data={profile?.licenses} setProfile={setProfile} />
      <Certification data={profile?.boardCerts} setProfile={setProfile} />
      <Education data={profile?.education} setProfile={setProfile} />
      <PracticeLocation
        data={profile?.practices?.location}
        setProfile={setProfile}
      />
      <ClientFocus
        // @ts-ignore eslint-disable-next-line
        data={profile?.practices?.clientFocus}
        setProfile={setProfile}
      />
      <Roles data={profile?.practices?.roles} setProfile={setProfile} />
      <Services data={profile?.practices?.services} setProfile={setProfile} />

      <Insurance // @ts-ignore eslint-disable-next-line
        data={profile?.practices?.insurance}
        setProfile={setProfile}
      />
    </>
  )
}
