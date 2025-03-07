// RightSideLoader.tsx
import { Suspense } from "react"
import { RightSideContent } from "./RightSideContent"

export interface AuthorInfo {
  authorName: string
  creds: string[]
  email: string
}

export interface RightSideContentProps {
  authorInfo: AuthorInfo
  displayAuthor: boolean
}

// Loading placeholder component
const LoadingState = () => (
  <div className="flex flex-col gap-2 pt-8 animate-pulse">
    <div className="h-10 w-32 bg-gray-200 rounded"></div>
    <div>
      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
      <div className="h-6 w-40 bg-gray-200 rounded mb-1"></div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
    </div>
  </div>
)

// Async component that fetches the data
async function RightSideAsync({
  authorId,
  fetchAuthorInfo,
}: {
  authorId: string
  fetchAuthorInfo: (id: string) => Promise<AuthorInfo>
}) {
  const authorInfo = await fetchAuthorInfo(authorId)
  return <RightSideContent authorInfo={authorInfo} displayAuthor={true} />
}

// Main component that wraps everything with Suspense
export function RightSideLoader({
  authorId,
  fetchAuthorInfo,
}: {
  authorId: string
  fetchAuthorInfo: (id: string) => Promise<AuthorInfo>
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      <RightSideAsync authorId={authorId} fetchAuthorInfo={fetchAuthorInfo} />
    </Suspense>
  )
}
