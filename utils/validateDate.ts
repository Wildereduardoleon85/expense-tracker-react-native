/**
 * Method that checks if the date is valid, date passed must match the pattern
 * `YYYY-MM-DD`
 * @param {string} dateString - A string representing the date to validate.
 * @returns {boolean} true if date is valid, false otherwise.
 */
export function isValidDate(dateString: string): boolean {
  // Check if the format matches YYYY-MM-DD using a regex
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  if (!dateRegex.test(dateString)) {
    return false
  }

  // Parse the date string into year, month, and day
  const [year, month, day] = dateString.split('-').map(Number)

  // Create a new Date object
  const date = new Date(year, month - 1, day) // Month is 0-based in JavaScript's Date

  // Check if the date is valid
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}
