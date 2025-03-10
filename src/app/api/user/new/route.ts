import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"
import { loggerMiddleware } from "@/lib/logger"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  return loggerMiddleware(req, async () => {
    try {
      console.log("Hey look ma I make it")

      return NextResponse.json({ message: "you did it" }, { status: 200 })
    } catch (err) {
      console.error(err)

      return NextResponse.json({ error: err }, { status: 400 })
    }
  })
}
