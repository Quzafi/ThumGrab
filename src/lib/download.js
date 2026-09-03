// Client-side download helpers. Works because i.ytimg.com sends
// `Access-Control-Allow-Origin: *`, so we can fetch the image as a Blob and
// save it with a real filename — no server or proxy required.

export async function fetchBlob(url, signal) {
  const res = await fetch(url, { mode: 'cors', cache: 'no-store', signal })
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return await res.blob()
}

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/** Download a single image URL as `filename`. Returns the byte size. */
export async function downloadImage(url, filename, signal) {
  const blob = await fetchBlob(url, signal)
  saveBlob(blob, filename)
  return blob.size
}

/** Best-effort file size via a HEAD request (returns null on failure). */
export async function headSize(url, signal) {
  try {
    const res = await fetch(url, { method: 'HEAD', mode: 'cors', signal })
    const len = res.headers.get('content-length')
    return len ? Number(len) : null
  } catch {
    return null
  }
}

/**
 * Bundle several images into a single ZIP and download it.
 * jszip is imported lazily so it never bloats the initial page load.
 * @param {{url:string, filename:string}[]} items
 */
export async function downloadZip(items, zipName) {
  const { default: JSZip } = await import('jszip')
  const zip = new JSZip()
  const blobs = await Promise.all(
    items.map(async (it) => ({ name: it.filename, blob: await fetchBlob(it.url) })),
  )
  for (const b of blobs) zip.file(b.name, b.blob)
  const out = await zip.generateAsync({ type: 'blob' })
  saveBlob(out, zipName)
}

export function formatBytes(bytes) {
  if (bytes == null || Number.isNaN(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
