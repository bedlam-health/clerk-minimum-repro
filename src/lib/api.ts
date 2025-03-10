export function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  let host = process.env.NEXT_PUBLIC_API_URL

  if (process.env.NODE_ENV === "development") {
    host = `localhost:${process.env.PORT ?? 3000}`
  }
  // Use environment variable as source of truth
  return `${protocol}://${host}`
}
