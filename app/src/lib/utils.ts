/** Returns a time-aware greeting string — Morning / Afternoon / Evening. */
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  return 'Evening'
}

/** Picks a random item from an array */
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Formats seconds as m:ss (e.g. 63 → "1:03") */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

/** Shuffles an array (Fisher-Yates) and returns a new array */
export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
