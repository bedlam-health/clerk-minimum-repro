"use client"
import React, { useState, useEffect, ReactElement } from "react"
import Card from "@/components/Card"
import { Button } from "@/components/Tailwind/button"
import { FieldGroup, Fieldset } from "@/components/Tailwind/fieldset"

export type FormSectionData = {
  id: string
  title: string
  children?: ReactElement
  action?: any
}

const FormSection = ({ id, title, children, action }: FormSectionData) => {
  return (
    <Card id={id} className="p-6 mb-8 bg-white rounded-lg shadow">
      <form action={action}>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <Button type="submit" color="steelblue">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  )
}

interface ScrollableFormProps {
  sections: FormSectionData[]
}

export const ScrollableManyForms: React.FC<ScrollableFormProps> = ({
  sections,
}) => {
  const [activeSection, setActiveSection] = useState("")

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = sections.map((section) => section.id)

      sectionIds.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { top } = element.getBoundingClientRect()
          if (top <= 100) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container flex max-w-4xl min-h-screen mx-auto">
      {/* Sidebar */}
      <Card className="fixed w-64 ">
        <h2 className="mb-4 text-xl font-bold">Form Sections</h2>
        <nav className="space-y-2">
          {sections.map(({ id, title }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                activeSection === id
                  ? "bg-steelblue text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {title}
            </button>
          ))}
        </nav>
      </Card>

      {/* Main Form Content */}
      <div className="flex-1 px-8 ml-64">
        {/* Added min-height to ensure scrollability */}
        <Fieldset>
          {sections.map(({ id, title, children, action }) => (
            <FormSection id={id} title={title} key={id} action={action}>
              <FieldGroup>{children}</FieldGroup>
            </FormSection>
          ))}
        </Fieldset>
      </div>
    </div>
  )
}
