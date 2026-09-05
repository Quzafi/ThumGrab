import { useState } from 'react'
import { FileArchive, Loader2, PlaySquare, Layers, Download, Check } from 'lucide-react'
import { parseVideoId, thumbUrl, downloadFilename } from '../lib/youtube.js'
import { downloadZip } from '../lib/download.js'
import { Button, IconBubble } from './ui.jsx'

export default function BatchDownloader() {
  const [text, setText] = useState('')
  const [zipping, setZipping] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  function handleProcess(e) {
    if (e) e.preventDefault()
    setError('')
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
    const foundIds = []

    for (const line of lines) {
      const id = parseVideoId(line)
      if (id && !foundIds.includes(id)) {
        foundIds.push(id)
      }
    }

    if (!foundIds.length) {
      setError('No valid YouTube links found. Please paste 1 or more YouTube URLs (one per line).')
      setResults([])
      return
    }

    setResults(foundIds)
  }

  async function handleBatchZip() {
    if (!results.length) return
    setZipping(true)
    try {
      const items = results.map((id) => ({
        url: thumbUrl(id, 'maxresdefault'),
        filename: downloadFilename(id, 'maxresdefault'),
      }))
      await downloadZip(items, `batch-thumbnails-${results.length}-videos.zip`)
    } catch {
      setError('Could not zip batch thumbnails.')
    } finally {
      setZipping(false)
    }
  }

  return (
    <div className="clay p-5 sm:p-7">
      <div className="flex items-center gap-3 border-b border-border/60 pb-4">
        <IconBubble tone="primary">
          <Layers size={22} className="text-primary" />
        </IconBubble>
        <div>
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-primary">
            Multi-URL Batch Downloader
          </span>
          <h3 className="mt-1 text-xl font-bold">Download Multiple Video Thumbnails at Once</h3>
        </div>
      </div>

      <form onSubmit={handleProcess} className="mt-5 space-y-3">
        <label className="block text-xs font-bold text-fg">
          Paste YouTube URLs or Video IDs (one per line):
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`https://www.youtube.com/watch?v=jNQXAC9IVRw\nhttps://youtu.be/aqz-KE-bpKQ\n...`}
            className="clay-inset mt-1.5 w-full p-4 text-xs font-mono font-semibold text-fg outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" variant="primary">
            Fetch Batch ({text.split('\n').filter((l) => l.trim()).length} Links)
          </Button>
          {results.length > 0 ? (
            <Button variant="accent" onClick={handleBatchZip} disabled={zipping}>
              {zipping ? <Loader2 className="animate-spin" size={18} /> : <FileArchive size={18} />}
              {zipping ? 'Zipping All…' : `Download All (${results.length}) as ZIP`}
            </Button>
          ) : null}
        </div>
      </form>

      {error ? <p className="mt-3 text-xs font-bold text-danger">{error}</p> : null}

      {/* Grid Results */}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((id) => (
            <div key={id} className="rounded-2xl bg-card border border-border p-3 shadow-xs space-y-2">
              <img
                src={thumbUrl(id, 'hqdefault')}
                alt={id}
                className="h-36 w-full rounded-xl object-cover"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-muted-fg">{id}</span>
                <a
                  href={thumbUrl(id, 'maxresdefault')}
                  download={downloadFilename(id, 'maxresdefault')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn px-2.5 py-1 text-xs font-bold text-primary"
                >
                  <Download size={13} /> HD JPG
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
