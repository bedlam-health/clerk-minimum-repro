import { Button } from "@/components/Tailwind/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Home } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-row justify-around min-h-screen px-8 mx-auto">
      <div className="flex items-center container ">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl">Welcome to Bedlam Connect</h1>
          <h2 className="text-3xl">Connecting providers, helping patients.</h2>
          <p>
            Post referrals, find referrals, and maintain a network of
            professional contacts.
          </p>
          <div className="flex gap-4 mt-4">
            <SignedOut>
              <Link href="signin">
                <Button color="steelblue">Sign in</Button>
              </Link>
              <Link href="signup">
                <Button outline>Sign Up</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/home">
                <Button color="steelblue">
                  {" "}
                  <Home data-slot="icon" /> Home
                </Button>
              </Link>
            </SignedIn>

            <Link href="/learn-more">
              <Button outline>Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
