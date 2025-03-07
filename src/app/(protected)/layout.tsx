import { Navbar } from "@/components/Navbar"
import { StackedLayout } from "@/components/Tailwind/stacked-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StackedLayout navbar={<Navbar />}>{children}</StackedLayout>
}
