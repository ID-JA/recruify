export const timeAgo = (date: Date) => {
  const time = new Date(date).getTime()
  const now = new Date().getTime()
  const diff = now - time
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diff / (1000 * 60 * 60))
  const diffInSeconds = Math.floor(diff / 1000)

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  if (diffInHours > 0) {
    return `${diffInHours} hours ago`
  }
  if (diffInSeconds > 0) {
    return `Just now`
  }
  return 'Just now'
}
