export function getBaseUrl() {
  if (typeof window !== "undefined") return ""

  if (process.env.NODE_ENV === "development") {
    return `localhost:${process.env.PORT ?? 3000}`
  }
  // Use environment variable as source of truth
  return process.env.NEXT_PUBLIC_API_URL
}
