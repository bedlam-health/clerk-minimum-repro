import { inter, playfair_display } from "@/components/fonts"
import Logo from "@/components/logo"
import { ClerkProvider, UserButton } from "@clerk/nextjs"
import { Mail } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bedlam Connect",
  description: "Connecting mental health providers, helping patients.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfair_display.variable} antialiased bg-beige-100`}
        >
          <div className="grid grid-cols-1 min-h-screen relative">
            {/* Background Logo - fixed positioning for viewport-centered placement */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-end overflow-hidden">
              <Logo className="mr-5 fill-steelblue opacity-5 w-1/2 h-1/2 max-w-4xl" />
            </div>

            {/* Main Content */}
            <main className="min-h-screen pb-16">{children}</main>

            <footer className="fixed bottom-0 w-screen flex flex-1 items-center justify-center bg-beige-100 border-t-2 py-2.5">
              <UserButton />
              <div className="flex items-center text-sm">
                Problems? Contact{" "}
                <Link
                  href="mailto:support@bedlamhealth.com"
                  className="flex items-center rounded bg-beige-200 ml-2 pr-1"
                >
                  <Mail className="h-4 mr-1" />
                  support@bedlamhealth.com
                </Link>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
