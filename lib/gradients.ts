const gradients = [
  'from-amber-100 to-orange-200',
  'from-rose-100 to-pink-200',
  'from-violet-100 to-purple-200',
  'from-emerald-100 to-teal-200',
  'from-sky-100 to-blue-200',
  'from-fuchsia-100 to-rose-200',
  'from-lime-100 to-green-200',
  'from-yellow-100 to-amber-200',
  'from-cyan-100 to-sky-200',
  'from-pink-100 to-fuchsia-200',
]

export function getGradient(text: string): string {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  return gradients[Math.abs(hash) % gradients.length]
}

export function getCategoryEmoji(
  category: string
): string {
  const map: Record<string, string> = {
    launch: '✨',
    campaign: '📣',
    collaboration: '🤝',
    retail: '🏬',
    trend: '📊',
    other: '💡',
  }
  return map[category] || '💡'
}
