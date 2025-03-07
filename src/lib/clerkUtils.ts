import { isClerkAPIResponseError } from "@clerk/nextjs/errors"

export const filterClerkErrors = (
  err: any,
  paramName: string
): string[] | undefined => {
  if (isClerkAPIResponseError(err)) {
    const result = err.errors
      ?.filter((e: any) => e.meta?.paramName === paramName)
      .map((e) => e.message)

    return result.length > 0 ? result : undefined
  }
  return undefined
}
