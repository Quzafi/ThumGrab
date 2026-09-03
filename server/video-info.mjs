import { parseVideoId, thumbUrl, watchUrl } from '../src/lib/youtube.js'

const CACHE_TTL_MS = 10 * 60 * 1000
const FETCH_TIMEOUT_MS = 9000
const MAX_HTML_BYTES = 8 * 1024 * 1024
const infoCache = new Map()

const YOUTUBE_HEADERS = {
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36',
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'for', 'from', 'how', 'in', 'is', 'it', 'of', 'on', 'or', 'the',
  'this', 'to', 'with', 'you', 'your',
])

function cleanText(value) {
  return typeof value === 'string' ? value.replace(/\r/g, '').trim() : ''
}

function textFromRuns(value) {
  if (typeof value === 'string') return cleanText(value)
  if (value?.simpleText) return cleanText(value.simpleText)
  if (Array.isArray(value?.runs)) return cleanText(value.runs.map((run) => run?.text || '').join(''))
  return ''
}

function uniqueStrings(values) {
  return [...new Set(values.map(cleanText).filter(Boolean))]
}

/** Extract one balanced JSON object assigned to a YouTube bootstrap variable. */
function extractEmbeddedJson(source, variableName) {
  const marker = source.indexOf(variableName)
  if (marker === -1) return null
  const start = source.indexOf('{', marker)
  if (start === -1) return null

  let depth = 0
  let inString = false
  let escaped = false
  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (inString) {
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === '"') inString = false
      continue
    }
    if (char === '"') inString = true
    else if (char === '{') depth += 1
    else if (char === '}') {
      depth -= 1
      if (depth === 0) {
        try {
          return JSON.parse(source.slice(start, index + 1))
        } catch {
          return null
        }
      }
    }
  }
  return null
}

function findByKey(value, key, depth = 0) {
  if (!value || typeof value !== 'object' || depth > 18) return null
  if (Object.prototype.hasOwnProperty.call(value, key)) return value[key]
  for (const child of Object.values(value)) {
    const found = findByKey(child, key, depth + 1)
    if (found) return found
  }
  return null
}

function collectByKey(value, key, output, depth = 0) {
  if (!value || typeof value !== 'object' || depth > 18 || output.length >= 30) return
  if (Array.isArray(value)) {
    for (const child of value) collectByKey(child, key, output, depth + 1)
    return
  }
  for (const [childKey, child] of Object.entries(value)) {
    if (childKey === key && child && typeof child === 'object') output.push(child)
    collectByKey(child, key, output, depth + 1)
    if (output.length >= 30) return
  }
}

async function fetchText(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      headers: YOUTUBE_HEADERS,
      redirect: 'follow',
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`YouTube responded with ${response.status}`)
    const text = await response.text()
    if (text.length > MAX_HTML_BYTES) throw new Error('YouTube response was too large')
    return text
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchOEmbed(id) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl(id))}&format=json`,
      { headers: YOUTUBE_HEADERS },
    )
    if (!response.ok) return null
    const data = await response.json()
    return {
      title: cleanText(data.title),
      author: cleanText(data.author_name),
      authorUrl: cleanText(data.author_url),
    }
  } catch {
    return null
  }
}

function buildSearchQuery(title) {
  const words = cleanText(title)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word.toLowerCase()))
    .slice(0, 8)
  return words.join(' ') || cleanText(title).slice(0, 100)
}

function thumbnailFromRenderer(renderer) {
  const thumbnails = renderer?.thumbnail?.thumbnails
  if (!Array.isArray(thumbnails) || !thumbnails.length) return ''
  return thumbnails[thumbnails.length - 1]?.url || thumbnails[0]?.url || ''
}

async function fetchSimilarVideos(query, currentId) {
  if (!query) return []
  try {
    const html = await fetchText(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    )
    const initialData = extractEmbeddedJson(html, 'ytInitialData')
    const renderers = []
    collectByKey(initialData, 'videoRenderer', renderers)
    const results = []
    const seen = new Set([currentId])
    for (const renderer of renderers) {
      const id = cleanText(renderer?.videoId)
      const title = textFromRuns(renderer?.title)
      const author = textFromRuns(renderer?.ownerText || renderer?.longBylineText)
      const thumbnail = thumbnailFromRenderer(renderer)
      if (!id || !title || !thumbnail || seen.has(id)) continue
      seen.add(id)
      results.push({ id, title, author, thumbnailUrl: thumbnail, url: watchUrl(id) })
      if (results.length === 5) break
    }
    return results
  } catch {
    return []
  }
}

function extractVideoMetadata(player, initialData, oembed, id) {
  const details = player?.videoDetails || {}
  const microformat = player?.microformat?.playerMicroformatRenderer || {}
  const primaryInfo = findByKey(initialData, 'videoPrimaryInfoRenderer') || {}
  const secondaryInfo = findByKey(initialData, 'videoSecondaryInfoRenderer') || {}
  const owner = secondaryInfo?.owner?.videoOwnerRenderer || {}
  const title = cleanText(details.title) || textFromRuns(primaryInfo.title) || oembed?.title || ''
  const author = cleanText(details.author) || textFromRuns(owner.title) || oembed?.author || ''
  const channelId = cleanText(details.channelId) || cleanText(microformat.externalChannelId)
  const description =
    cleanText(details.shortDescription) ||
    textFromRuns(secondaryInfo.description) ||
    textFromRuns(microformat.description)
  const tags = uniqueStrings(Array.isArray(details.keywords) ? details.keywords : [])
  const publishedAt = cleanText(microformat.publishDate) || cleanText(microformat.uploadDate)
  const authorUrl = oembed?.authorUrl || (channelId ? `https://www.youtube.com/channel/${channelId}` : '')

  return {
    id,
    title,
    author,
    authorUrl,
    description,
    tags,
    publishedAt,
    thumbnailUrl: thumbUrl(id, 'hqdefault'),
    metadataAvailable: Boolean(title || author || description || tags.length || publishedAt),
  }
}

export async function getVideoInfo(input) {
  const id = parseVideoId(input)
  if (!id) {
    const error = new Error('Invalid YouTube video URL or ID')
    error.code = 'INVALID_VIDEO_ID'
    throw error
  }

  const cached = infoCache.get(id)
  if (cached && cached.expiresAt > Date.now()) return cached.value

  const [oembed, page] = await Promise.all([
    fetchOEmbed(id),
    fetchText(`https://www.youtube.com/watch?v=${id}`).catch(() => ''),
  ])
  const player = page ? extractEmbeddedJson(page, 'ytInitialPlayerResponse') : null
  const initialData = page ? extractEmbeddedJson(page, 'ytInitialData') : null
  const metadata = extractVideoMetadata(player, initialData, oembed, id)
  const similarQuery = buildSearchQuery(metadata.title)
  const similar = await fetchSimilarVideos(similarQuery, id)
  const result = { ...metadata, similar, similarQuery }

  infoCache.set(id, { expiresAt: Date.now() + CACHE_TTL_MS, value: result })
  return result
}
