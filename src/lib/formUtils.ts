export function extractChecklist<T extends string>(
  formData: FormData,
  prefix: string,
  removePrefix: boolean = true
): T[] {
  const entries = Array.from(formData.entries())
    .filter(([key]) => key.startsWith(prefix))
    .map(([key]) => {
      if (removePrefix) {
        return key.replace(prefix, "") as T
      }
      return key as T
    })

  return entries
}

export function parseReusableCombobox(
  obj: any, // canot be a FormData, convert it to object before passing it here
  name: string,
  key: string = "id"
): string[] {
  try {
    // Get all keys that match the pattern propertyName[n][valueKey]
    const arrayPattern = new RegExp(`^${name}\\[(\\d+)\\]\\[${key}\\]$`)
    // Filter and transform the entries
    const values = Object.entries(obj)
      .filter(([key]) => arrayPattern.test(key))
      .map(([key, value]) => {
        return {
          index: parseInt(key.match(arrayPattern)?.[1] || "0"),
          value: value || "",
        }
      })
      // Sort by index to maintain order
      .sort((a, b) => a.index - b.index)
      .map((item) => item.value as string)
    return values
  } catch (error) {
    console.error("Error extracting array property:", error)
    return []
  }
}
