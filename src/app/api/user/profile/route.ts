import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { loggerMiddleware } from "@/lib/logger"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  return loggerMiddleware(req, async () => {
    try {
      const db = await getFirestoreInstance()
      const { userId } = await auth()

      if (!userId) {
        return NextResponse.json(
          {
            error: `Authentication required - uid ${userId}`,
          },
          { status: 401 }
        )
      }

      try {
        const userRef = db.doc(`users/${userId}`)
        const userSnap = await userRef.get()

        if (!userSnap.exists) {
          return NextResponse.json(
            {
              error: `User not found - uid ${userId}`,
            },
            { status: 400 }
          )
        }
        const userData = userSnap.data()
        return NextResponse.json({ user: userData })
      } catch (error) {
        console.error("Error fetching user: ", error)
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        )
      }
    } catch (err) {
      console.error(err)

      return NextResponse.json(
        { error: `Unknown error: ${err}` },
        { status: 400 }
      )
    }
  })
}
