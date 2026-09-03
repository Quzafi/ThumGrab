import { getVideoInfo } from '../../server/video-info.mjs'

const responseHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
}

function respond(status, body) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders })
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: responseHeaders })
  if (!['GET', 'POST'].includes(request.method)) return respond(405, { error: 'Method not allowed' })

  try {
    const url = new URL(request.url)
    const body = request.method === 'POST' ? await request.json() : {}
    const input = body.url || body.id || url.searchParams.get('url') || url.searchParams.get('id')
    return respond(200, await getVideoInfo(input))
  } catch (error) {
    const status = error?.code === 'INVALID_VIDEO_ID' ? 400 : 502
    return respond(status, { error: error?.message || 'Could not load video details' })
  }
}
