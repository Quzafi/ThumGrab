const TRANSLATE_TIMEOUT_MS = 10000
const MAX_TRANSLATE_CHARS = 5000

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function languageCode(value) {
  const code = clean(value).toLowerCase()
  return /^[a-z]{2,3}(?:-[a-z]{2,4})?$/.test(code) ? code : ''
}

/**
 * Keyless translation through Google's public web translation endpoint.
 * This is intentionally limited to short creator metadata and needs no API
 * key or account. The UI still works if the public endpoint is unavailable.
 */
export async function translateText(input, target) {
  const text = clean(input)
  const targetCode = languageCode(target)
  if (!text) {
    const error = new Error('Text is required')
    error.code = 'INVALID_TRANSLATION_INPUT'
    throw error
  }
  if (!targetCode) {
    const error = new Error('Choose a valid language code')
    error.code = 'INVALID_TRANSLATION_LANGUAGE'
    throw error
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TRANSLATE_TIMEOUT_MS)
  try {
    const url = new URL('https://translate.googleapis.com/translate_a/single')
    url.searchParams.set('client', 'gtx')
    url.searchParams.set('sl', 'auto')
    url.searchParams.set('tl', targetCode)
    url.searchParams.set('dt', 't')
    url.searchParams.set('q', text.slice(0, MAX_TRANSLATE_CHARS))

    const response = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Translation service responded with ${response.status}`)
    const payload = await response.json()
    const translated = Array.isArray(payload?.[0])
      ? payload[0].map((part) => part?.[0] || '').join('').trim()
      : ''
    if (!translated) throw new Error('Translation service returned no text')

    return {
      sourceText: text,
      translatedText: translated,
      target: targetCode,
    }
  } finally {
    clearTimeout(timeout)
  }
}
