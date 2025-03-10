import { fetchRecentPosts } from "./actions"
import { ClientReferralCard } from "./components/ClientReferralCard"
import { ProviderAvailabilityCard } from "./components/ProviderAvailability"
import { ProfileDialog } from "./components/ProfileDialog"
export default async function DashboardPage() {
  const { posts, error } = await fetchRecentPosts()
  if (error) {
    console.error(error)
  }

  return (
    <div>
      <div className="flex flex-col items-center mx-auto space-y-4">
        {posts ? (
          posts.map((post) => {
            if (post.postType === "referral") {
              return <ClientReferralCard post={post} key={post.id} />
            }
            if (post.postType === "availability") {
              return <ProviderAvailabilityCard post={post} key={post.id} />
            }
          })
        ) : (
          <p>Loading</p>
        )}
      </div>
      <ProfileDialog />
    </div>
  )
}
