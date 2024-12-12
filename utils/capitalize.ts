export function capitalize(word: string): string {
  const lowerCasedString = word.toLowerCase()
  const firstLetter = lowerCasedString.charAt(0)
  const rest =
    lowerCasedString.length > 1
      ? lowerCasedString.slice(1, lowerCasedString.length)
      : ''

  return `${firstLetter.toUpperCase()}${rest}`
}
