import { translateText } from '../../server/translate.mjs'

const responseHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'POST, OPTIONS',
  'cache-control': 'no-store',
  'content-type': 'application/json; charset=utf-8',
}

function respond(status, body) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders })
}

export default async function handler(request) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: responseHeaders })
  if (request.method !== 'POST') return respond(405, { error: 'Method not allowed' })

  try {
    const body = await request.json()
    return respond(200, await translateText(body.text, body.target))
  } catch (error) {
    const status = error?.code?.startsWith('INVALID_') ? 400 : 502
    return respond(status, { error: error?.message || 'Could not translate text' })
  }
}
