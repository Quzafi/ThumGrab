import { createServer } from 'node:http'
import { getVideoInfo } from './video-info.mjs'
import { translateText } from './translate.mjs'

const HOST = process.env.HOST || '127.0.0.1'
const PORT = Number(process.env.PORT || 8787)
const MAX_BODY_BYTES = 16 * 1024

function headers() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'cache-control': 'no-store',
    'content-type': 'application/json; charset=utf-8',
  }
}

function sendJson(response, status, body) {
  response.writeHead(status, headers())
  response.end(JSON.stringify(body))
}

async function readJson(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large')
      error.code = 'BODY_TOO_LARGE'
      throw error
    }
    chunks.push(chunk)
  }
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers())
    response.end()
    return
  }
  if (url.pathname === '/health' && request.method === 'GET') {
    sendJson(response, 200, { ok: true })
    return
  }
  if (url.pathname === '/api/translate' && request.method === 'POST') {
    try {
      const body = await readJson(request)
      sendJson(response, 200, await translateText(body.text, body.target))
    } catch (error) {
      const status = error?.code?.startsWith('INVALID_') ? 400 : 502
      sendJson(response, status, { error: error?.message || 'Could not load translated text' })
    }
    return
  }
  if (url.pathname !== '/api/video-info' || !['GET', 'POST'].includes(request.method || '')) {
    sendJson(response, 404, { error: 'Not found' })
    return
  }
  try {
    const body = request.method === 'POST' ? await readJson(request) : {}
    const input = body.url || body.id || url.searchParams.get('url') || url.searchParams.get('id')
    sendJson(response, 200, await getVideoInfo(input))
  } catch (error) {
    const status = error?.code === 'INVALID_VIDEO_ID' ? 400 : error?.code === 'BODY_TOO_LARGE' ? 413 : 502
    sendJson(response, status, { error: error?.message || 'Could not load video details' })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[thumbgrab] metadata backend listening at http://${HOST}:${PORT}`)
})
