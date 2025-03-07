export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 pb-2 lg:px-2">
      <div className="container max-w-6xl mx-auto">{children}</div>
    </div>
  )
}
