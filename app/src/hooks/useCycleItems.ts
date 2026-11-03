import { useState, useCallback, useMemo } from 'react'
import { shuffle } from '@/lib/utils'

/**
 * Hook for cycling through a shuffled list of items with a fade transition.
 * Used by Reflection and ConversationStarter pages.
 *
 * @param items - The items to shuffle and cycle through
 * @param fadeDuration - Duration of the fade-out in ms (default 200)
 */
export function useCycleItems<T>(items: T[], fadeDuration = 200) {
  const shuffled = useMemo(() => shuffle(items), [items])
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const current = shuffled[index]

  const showNext = useCallback(() => {
    setFading(true)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % shuffled.length)
      setFading(false)
    }, fadeDuration)
  }, [shuffled.length, fadeDuration])

  return { current, fading, showNext }
}
