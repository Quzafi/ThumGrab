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
    note: 'Best quality — not available on every video',
    guaranteed: false,
  },
  {
    key: 'sddefault',
    label: 'SD',
    badge: '640 × 480',
    w: 640,
    h: 480,
    note: 'Standard definition',
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
  {
    key: 'mqdefault',
    label: 'MQ',
    badge: '320 × 180',
    w: 320,
    h: 180,
    note: 'Medium quality',
    guaranteed: true,
  },
  {
    key: 'default',
    label: 'Tiny',
    badge: '120 × 90',
    w: 120,
    h: 90,
    note: 'Smallest size',
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
 * Fetch API-free metadata and related videos through the local backend.
 * The endpoint is optional: thumbnail downloading still works if it is down.
 */
export async function fetchVideoInfo(id, signal) {
  try {
    const res = await fetch('/api/video-info', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id }),
      signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.id === id ? data : null
  } catch {
    return null
  }
}
