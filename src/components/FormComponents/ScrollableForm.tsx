"use client"
import Card from "@/components/Card"
import { Button } from "@/components/Tailwind/button"
import { FieldGroup, Fieldset } from "@/components/Tailwind/fieldset"
import React, { ReactElement, useEffect, useRef, useState } from "react"

export type FormSectionData = {
  id: string
  title: string
  children?: ReactElement
}

const FormSection = ({ id, title, children }: FormSectionData) => {
  return (
    <Card id={id} className="p-6 mb-8 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
      {children}
    </Card>
  )
}

interface ScrollableFormProps {
  sections: FormSectionData[]
  action: any
  state: any
}

const ScrollableForm: React.FC<ScrollableFormProps> = ({
  sections,
  action,
}) => {
  const [activeSection, setActiveSection] = useState("licensure")

  const formRef = useRef(null)

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = sections.map((section) => section.id)
      //   const scrollPosition = window.scrollY

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
      <div className="flex-1 pl-8 ml-64" ref={formRef}>
        {/* Added min-height to ensure scrollability */}
        <form action={action} className="max-w-4xl pb-96">
          <Fieldset>
            {sections.map(({ id, title, children }) => (
              <FormSection id={id} title={title} key={id}>
                <FieldGroup>{children}</FieldGroup>
              </FormSection>
            ))}
          </Fieldset>

          <div className="flex justify-end">
            <Button type="submit" color="steelblue">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScrollableForm
