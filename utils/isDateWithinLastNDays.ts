export function isDateWithinLastNDays(dateToCheck: Date, days: number) {
  const now = new Date() // Get the current date and time
  const nDaysAgo = new Date(now.getTime() - days * 24 * 60 * 60 * 1000) // Calculate 'days' ago

  return dateToCheck >= nDaysAgo && dateToCheck <= now // Check if date is within the range
}
