/**
 * Freesound API client for fetching ambient/nature sounds.
 *
 * Requires a free API key from https://freesound.org/apiv2/apply/
 * Set as VITE_FREESOUND_API_KEY in .env.local
 *
 * License: sounds are CC0 or CC-BY (we filter for these).
 * Preview URLs (HQ MP3) are freely streamable without download auth.
 */

const API_KEY = import.meta.env.VITE_FREESOUND_API_KEY as string | undefined

interface FreesoundResult {
  id: number
  name: string
  duration: number
  previews: {
    'preview-hq-mp3': string
    'preview-hq-ogg': string
    'preview-lq-mp3': string
    'preview-lq-ogg': string
  }
}

interface FreesoundSearchResponse {
  count: number
  results: FreesoundResult[]
}

export interface AudioResult {
  id: number
  title: string
  url: string // direct HQ MP3 preview URL
  duration: number
}

/**
 * Search for a random ambient/nature sound matching the query.
 * Filters for sounds between 5-120 seconds.
 * Returns HQ MP3 preview URL (streamable without auth).
 */
export async function getRandomSound(
  query: string
): Promise<AudioResult | null> {
  if (!API_KEY) {
    console.warn('VITE_FREESOUND_API_KEY not set')
    return null
  }

  const page = Math.floor(Math.random() * 3) + 1

  // URL-encode the filter brackets
  const filter = encodeURIComponent('duration:[5 TO 120]')

  const res = await fetch(
    `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(query)}&filter=${filter}&fields=id,name,previews,duration&page_size=15&page=${page}&token=${API_KEY}`
  )

  if (!res.ok) throw new Error(`Freesound API error: ${res.status}`)

  const data: FreesoundSearchResponse = await res.json()

  if (data.results.length === 0) return null

  // Pick one at random
  const sound = data.results[Math.floor(Math.random() * data.results.length)]

  return {
    id: sound.id,
    title: sound.name,
    url: sound.previews['preview-hq-mp3'],
    duration: Math.round(sound.duration),
  }
}
