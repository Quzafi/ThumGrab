// YouTube helpers — parse a video ID and build thumbnail URLs.
// Everything here is pure and runs safely on the server (prerender) and client.

const ID_RE = /^[a-zA-Z0-9_-]{11}$/

/**
 * Extract an 11-character YouTube video ID from many URL shapes, or accept a
 * raw ID. Returns null when nothing valid is found.
 *
 * Supported:
 *   https://www.youtube.com/watch?v=ID
 *   https://youtu.be/ID
 *   https://youtube.com/shorts/ID
 *   https://www.youtube.com/embed/ID
 *   https://www.youtube.com/live/ID
 *   https://m.youtube.com/watch?v=ID
 *   https://www.youtube-nocookie.com/embed/ID
 *   ID   (bare 11-char id)
 */
export function parseVideoId(input) {
  if (!input) return null
  const raw = String(input).trim()
  if (!raw) return null
  if (ID_RE.test(raw)) return raw

  let url
  try {
    url = new URL(raw.includes('://') ? raw : `https://${raw}`)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '')

  if (host === 'youtu.be') {
    const seg = url.pathname.split('/').filter(Boolean)[0]
    return seg && ID_RE.test(seg) ? seg : null
  }

  if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    const v = url.searchParams.get('v')
    if (v && ID_RE.test(v)) return v

    const parts = url.pathname.split('/').filter(Boolean)
    const known = ['shorts', 'embed', 'live', 'v', 'watch']
    if (parts.length >= 2 && known.includes(parts[0]) && ID_RE.test(parts[1])) {
      return parts[1]
    }
  }

  return null
}

// Ordered best → smallest. `maxres` and `sd` are not guaranteed to exist for
// every video (we detect availability when the preview image loads).
export const RESOLUTIONS = [
  {
    key: 'maxresdefault',
    label: 'Max HD',
    badge: '1280 × 720',
    w: 1280,
    h: 720,
    note: 'Best quality — full resolution',
    guaranteed: false,
  },
  {
    key: 'hqdefault',
    label: 'HQ',
    badge: '480 × 360',
    w: 480,
    h: 360,
    note: 'High quality — always available',
    guaranteed: true,
  },
]

export function thumbUrl(id, key) {
  return `https://i.ytimg.com/vi/${id}/${key}.jpg`
}

export function watchUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`
}

export function downloadFilename(id, key) {
  return `youtube-thumbnail-${id}-${key}.jpg`
}

/**
 * Optional enrichment: fetch the video title/author via YouTube oEmbed.
 * oEmbed is CORS-enabled, but we treat failure as non-fatal (returns null).
 */
export async function fetchOEmbed(id, signal) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        watchUrl(id),
      )}&format=json`,
      { signal },
    )
    if (!res.ok) return null
    const data = await res.json()
    return {
      title: data.title || '',
      author: data.author_name || '',
      authorUrl: data.author_url || '',
    }
  } catch {
    return null
  }
}

/**
 * Fetch API-free metadata and related videos through the local backend,
 * with pure client-side fallback to YouTube oEmbed when no backend is running.
 */
export async function fetchVideoInfo(id, signal) {
  try {
    const res = await fetch('/api/video-info', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id }),
      signal,
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.id === id) return data
    }
  } catch {
    // Backend API unavailable — proceed to client-side oEmbed fallback
  }

  // Pure client-side fallback via YouTube CORS-enabled oEmbed
  const oembed = await fetchOEmbed(id, signal)
  if (!oembed) return null

  // Generate smart keywords/tags client-side from the title
  const words = (oembed.title || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3)
  const tags = Array.from(new Set(words))

  return {
    id,
    title: oembed.title,
    author: oembed.author,
    authorUrl: oembed.authorUrl,
    description: '',
    tags,
    similar: [],
    metadataAvailable: true,
    isClientFallback: true,
  }
}

/** 
 * Translate text with backend endpoint primary, and free client-side MyMemory API fallback.
 */
export async function translateText(text, target, signal) {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, target }),
      signal,
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.translatedText) return data
    }
  } catch {
    // Backend unavailable — fallback to client-side MyMemory free translation API
  }

  // Pure client-side free translation (MyMemory API)
  const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text,
  )}&langpair=autodetect|${target}`
  const response = await fetch(myMemoryUrl, { signal })
  if (!response.ok) throw new Error('Translation failed')
  const json = await response.json()
  const translatedText = json?.responseData?.translatedText
  if (!translatedText) throw new Error('Could not translate text')
  return { translatedText }
}

