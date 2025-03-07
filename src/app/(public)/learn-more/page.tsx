import { Button } from "@/components/Tailwind/button"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Home } from "lucide-react"

export default function LearnMorePage() {
  return (
    <main className="flex flex-row justify-around min-h-screen px-8 mx-auto">
      <div className="flex items-center container ">
        <div className="flex flex-col gap-2 max-w-3xl">
          <h1 className="text-6xl leading-snug">
            When your patients need mental health care, <br /> you need
            referrals.{" "}
          </h1>
          <h2 className="text-3xl">Let us connect you.</h2>
          <p>
            Bedlam Connect gives you access to a network of mental health
            providers so you&apos;re able to find the right referral fast,
            whether that&apos;s med management or specialized group therapy.
          </p>
          <p>
            Connect with providers from any organization or insurance network by
            posting a client referral or scrolling a feed of new patients. Send
            and recieve communication right in your email.
          </p>
          <p>
            Bedlam Connect is actively under development, with new features
            added regularly. Bedlam Connect is made by{" "}
            <Link className="underline" href="http://bedlamhealth.com">
              Bedlam Health
            </Link>
            .
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
          </div>
        </div>
      </div>
    </main>
  )
}
