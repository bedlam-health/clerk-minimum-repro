"use client"

// import * as Headless from "@headlessui/react"
import React from "react"
// import { NavbarItem } from "./navbar"

// function OpenMenuIcon() {
//   return (
//     <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
//       <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
//     </svg>
//   )
// }

// function CloseMenuIcon() {
//   return (
//     <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
//       <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
//     </svg>
//   )
// }

// function MobileSidebar({
//   open,
//   close,
//   children,
// }: React.PropsWithChildren<{ open: boolean; close: () => void }>) {
//   return (
//     <Headless.Dialog open={open} onClose={close} className="lg:hidden">
//       <Headless.DialogBackdrop
//         transition
//         className="fixed inset-0 bg-black/30 transition data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//       />
//       <Headless.DialogPanel
//         transition
//         className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
//       >
//         <div className="flex flex-col h-full bg-white rounded-lg shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
//           <div className="px-4 pt-3 -mb-3">
//             <Headless.CloseButton as={NavbarItem} aria-label="Close navigation">
//               <CloseMenuIcon />
//             </Headless.CloseButton>
//           </div>
//           {children}
//         </div>
//       </Headless.DialogPanel>
//     </Headless.Dialog>
//   )
// }

export function StackedLayout({
  navbar,
  // sidebar,
  children,
}: React.PropsWithChildren<{
  navbar: React.ReactNode
  // sidebar: React.ReactNode
}>) {
  // const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="relative flex flex-col w-full isolate min-h-svh dark:bg-zinc-900">
      {/* Sidebar on mobile */}
      {/* <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar> */}

      {/* Navbar */}
      <header className="flex items-center">
        {/* <div className="py-2.5 lg:hidden">
          <NavbarItem
            onClick={() => setShowSidebar(true)}
            aria-label="Open navigation"
          >
            <OpenMenuIcon />
          </NavbarItem>
        </div> */}
        <div className="flex-1 min-w-0 fixed top-0 w-screen z-10">{navbar}</div>
      </header>

      {/* Content */}
      <main className="flex flex-col flex-1 pb-2 lg:px-2 min-h-[calc(100vh-8rem)] mt-12 mb-10">
        <div className="container max-w-3xl mx-auto mt-8">{children}</div>
      </main>
    </div>
  )
}
