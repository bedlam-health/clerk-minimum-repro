"use client"
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/Tailwind/dropdown"
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/components/Tailwind/navbar"
import { useClerk } from "@clerk/nextjs"
import {
  AlertCircle,
  ChevronDown,
  Home,
  LogOut,
  Magnet,
  NotebookTabs,
  Plus,
  User,
  UserPlus,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Logo from "./logo"

function AppNavbar() {
  const pathname = usePathname()
  const activeItem = pathname?.split("/")[1] || ""
  const { signOut } = useClerk()
  const router = useRouter()
  const [profileStatus, setProfileStatus] = useState({
    isProfileComplete: false,
    loading: true,
  })

  const fetchProfileStatus = async () => {
    setProfileStatus((prev) => ({ ...prev, loading: true }))
    try {
      const response = await fetch("/api/user/profile")
      if (!response.ok) {
        throw new Error("Failed to fetch profile status")
      }
      const data = await response.json()
      console.log(data)
      setProfileStatus({
        isProfileComplete: !!data?.user?.isProfileComplete,
        loading: false,
      })
    } catch (error) {
      console.error("Error fetching profile status:", error)
      setProfileStatus((prev) => ({ ...prev, loading: false }))
    }
  }

  const refetchProfileStatus = () => {
    if (!profileStatus.isProfileComplete) {
      fetchProfileStatus()
    }
  }

  useEffect(() => {
    fetchProfileStatus()
  }, [])

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault()
    signOut({ redirectUrl: "/" })
  }

  const renderDropdownContent = () => {
    if (profileStatus.loading) {
      return (
        <DropdownItem disabled>
          <DropdownLabel>Loading...</DropdownLabel>
        </DropdownItem>
      )
    }

    if (!profileStatus.isProfileComplete) {
      return (
        <DropdownItem
          onClick={() => router.push("/profile")}
          className="text-carrotorange"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          <DropdownLabel>Complete your profile to create posts</DropdownLabel>
        </DropdownItem>
      )
    }

    return (
      <>
        <DropdownItem href="/new/referral">
          <UserPlus data-slot="icon" />
          <DropdownLabel>Client Referral</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/new/availability">
          <Magnet data-slot="icon" />
          <DropdownLabel>Provider Availability</DropdownLabel>
        </DropdownItem>
      </>
    )
  }

  return (
    <Navbar className="bg-white border-b-2">
      <div className="container flex flex-row max-w-3xl mx-auto">
        <NavbarSection>
          <NavbarItem href="/home">
            <Logo data-slot="icon" className="fill-steelblue size-6" />
            <NavbarLabel className="font-serif text-xl font-bold">
              Bedlam Connect
            </NavbarLabel>
          </NavbarItem>
        </NavbarSection>

        <NavbarSpacer />

        <NavbarSection className="gap-0">
          <NavbarItem href="/home" current={activeItem === "home"}>
            <Home data-slot="icon" />
            <NavbarLabel className="hidden md:block">Home</NavbarLabel>
          </NavbarItem>
          <Dropdown>
            <DropdownButton as={NavbarItem} onClick={refetchProfileStatus}>
              <Plus data-slot="icon" />
              <NavbarLabel className="hidden md:block">New Post</NavbarLabel>
              <ChevronDown />
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="bottom start">
              {renderDropdownContent()}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem href="/profile" current={activeItem === "profile"}>
            <User data-slot="icon" />
            <NavbarLabel className="hidden md:block">Profile</NavbarLabel>
          </NavbarItem>

          <Dropdown>
            <DropdownButton as={NavbarItem}>
              <NotebookTabs data-slot="icon" />
              <NavbarLabel className="hidden md:block">My Lists</NavbarLabel>
              {/* <ChevronDown /> */}
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="bottom start">
              <DropdownItem disabled>
                <DropdownLabel>
                  Coming soon! Manage referral lists and easily print them for
                  patients.
                </DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavbarDivider />

          <NavbarItem onClick={handleSignOut}>
            <LogOut className="fill-none" data-slot="icon" />
            <NavbarLabel className="hidden md:block">Logout</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
      </div>
    </Navbar>
  )
}

export { AppNavbar as Navbar }
