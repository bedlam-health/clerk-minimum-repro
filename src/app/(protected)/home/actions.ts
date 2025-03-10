"use server"

import { Post } from "@/lib/definitions/postTypes"
import { getFirestoreInstance } from "@/lib/firebase/firebaseAdmin"

export async function fetchRecentPosts(): Promise<{
  posts: Post[]
  error: string | null
}> {
  try {
    const db = await getFirestoreInstance()

    if (!db) {
      return {
        posts: [],
        error: "No database",
      }
    }

    const postsRef = db.collection("posts")

    // Execute the query
    const snapshot = await postsRef.get()
    console.log("Query executed, documents count:", snapshot.size)

    const posts: Post[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }))

    return { posts, error: null }
  } catch (err: any) {
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    })
    return {
      posts: [],
      error: `Failed to fetch posts: ${err.message}`,
    }
  }
}

export async function fetchAuthorInfo(
  // eslint-disable-next-line
  id: string
): Promise<{ authorName: string; creds: string[]; email: string }> {
  const db = await getFirestoreInstance()

  try {
    const userRef = db.doc(`users/${id}`)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      throw new Error("User not found")
    }

    const userData = userDoc.data()

    if (!userData) {
      throw new Error(`Failed to retrieve user data - uid ${id}`)
    }
    return {
      authorName: `${userData.firstName} ${userData.lastName}`,
      creds: userData.credentials || [],
      email: userData.email,
    }
  } catch (err) {
    console.error("Error fetching author info:", err)
    return {
      authorName: `Author not found`,
      creds: [],
      email: "",
    }
  }
}
