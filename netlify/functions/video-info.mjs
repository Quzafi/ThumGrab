import { getVideoInfo } from '../../server/video-info.mjs'

const responseHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
}

function respond(statusCode, body) {
  return { statusCode, headers: responseHeaders, body: JSON.stringify(body) }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return respond(204, {})
  if (!['GET', 'POST'].includes(event.httpMethod)) return respond(405, { error: 'Method not allowed' })

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : event.body || '{}'
    const body = event.httpMethod === 'POST' ? JSON.parse(rawBody) : {}
    const params = new URLSearchParams(event.rawQuery || '')
    const input = body.url || body.id || params.get('url') || params.get('id')
    return respond(200, await getVideoInfo(input))
  } catch (error) {
    const status = error?.code === 'INVALID_VIDEO_ID' ? 400 : 502
    return respond(status, { error: error?.message || 'Could not load video details' })
  }
}
