/**
 * Pexels API client for fetching short nature/animal videos.
 *
 * Requires a free API key from https://www.pexels.com/api/
 * Set as VITE_PEXELS_API_KEY in .env
 *
 * License: free for commercial use, no attribution required.
 * Rate limit: 200 requests/hour on free tier.
 */

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY as string | undefined

interface PexelsVideoFile {
  id: number
  quality: string
  file_type: string
  width: number
  height: number
  link: string
}

interface PexelsVideo {
  id: number
  width: number
  height: number
  duration: number
  image: string // thumbnail URL
  video_files: PexelsVideoFile[]
}

interface PexelsSearchResponse {
  videos: PexelsVideo[]
  total_results: number
}

export interface VideoResult {
  id: number
  url: string // direct video file URL
  thumbnail: string
  duration: number
}

/**
 * Search for a random short video matching the query.
 * Filters for videos under 30 seconds and picks one at random.
 * Returns the best-quality MP4 file URL.
 */
export async function getRandomVideo(
  query: string
): Promise<VideoResult | null> {
  if (!API_KEY) {
    console.warn('VITE_PEXELS_API_KEY not set')
    return null
  }

  // Fetch a random page (1-5) to get variety across calls
  const page = Math.floor(Math.random() * 5) + 1

  const params = new URLSearchParams({
    query,
    per_page: '15',
    page: String(page),
    orientation: 'portrait', // mobile-friendly
  })

  const res = await fetch(
    `https://api.pexels.com/videos/search?${params}`,
    { headers: { Authorization: API_KEY } }
  )

  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`)

  const data: PexelsSearchResponse = await res.json()

  // Filter for short clips (under 30s)
  const shortVideos = data.videos.filter((v) => v.duration <= 30)
  if (shortVideos.length === 0) return null

  // Pick one at random
  const video = shortVideos[Math.floor(Math.random() * shortVideos.length)]

  // Find the best MP4 file — prefer HD quality, portrait orientation
  const mp4Files = video.video_files
    .filter((f) => f.file_type === 'video/mp4')
    .sort((a, b) => b.height - a.height) // highest resolution first

  const file = mp4Files[0]
  if (!file) return null

  return {
    id: video.id,
    url: file.link,
    thumbnail: video.image,
    duration: video.duration,
  }
}
