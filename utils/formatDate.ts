export function formatDate(date: Date) {
  // Format the time part
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  // Format the date part
  const datePart = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return `${timePart}, ${datePart}`
}
