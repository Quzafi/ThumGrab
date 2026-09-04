import { useEffect, useRef, useState } from 'react'
import { Download, Copy, Check, ExternalLink, Loader2, ImageOff, Pencil } from 'lucide-react'
import { thumbUrl, downloadFilename } from '../lib/youtube.js'
import { downloadImage, headSize, formatBytes } from '../lib/download.js'
import { Button, Badge, cx } from './ui.jsx'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}

export default function ResolutionCard({ id, res, isBest, onAvailability, onEdit }) {
  const [status, setStatus] = useState('loading') // loading | ready | unavailable
  const [size, setSize] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const url = thumbUrl(id, res.key)
  const filename = downloadFilename(id, res.key)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  // Report availability up to the parent whenever it resolves.
  useEffect(() => {
    if (status === 'ready') onAvailability?.(res.key, true)
    if (status === 'unavailable') onAvailability?.(res.key, false)
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  // Best-effort file size once the image is confirmed available.
  useEffect(() => {
    if (status !== 'ready') return
    const ctrl = new AbortController()
    headSize(url, ctrl.signal).then((s) => {
      if (mounted.current && s) setSize(s)
    })
    return () => ctrl.abort()
  }, [status, url])

  function handleImgLoad(e) {
    const w = e.currentTarget.naturalWidth
    // YouTube serves a 120×90 grey placeholder when a size is missing.
    if (res.w > 120 && w <= 120) {
      setStatus('unavailable')
    } else {
      setStatus('ready')
    }
  }

  async function handleDownload() {
    setDownloading(true)
    setFailed(false)
    try {
      const bytes = await downloadImage(url, filename)
      if (mounted.current && bytes) setSize(bytes)
    } catch {
      if (mounted.current) setFailed(true)
    } finally {
      if (mounted.current) setDownloading(false)
    }
  }

  async function handleCopy() {
    const ok = await copyText(url)
    if (ok) {
      setCopied(true)
      setTimeout(() => mounted.current && setCopied(false), 1600)
    }
  }

  if (status === 'unavailable') return null

  const loading = status === 'loading'

  return (
    <div className={cx('clay flex flex-col overflow-hidden p-0', isBest && 'ring-2 ring-accent')}>
      <div
        className="relative w-full overflow-hidden bg-muted"
        style={{ aspectRatio: `${res.w} / ${res.h}` }}
      >
        {loading ? (
          <div className="absolute inset-0 grid place-items-center">
            <Loader2 className="animate-spin-slow text-muted-fg" size={26} aria-hidden="true" />
          </div>
        ) : null}
        {/* Preview image — hidden until it either loads or errors. Eager (not
            lazy): availability + the ZIP count depend on onLoad firing, and a
            lazy off-screen card would never resolve until scrolled into view. */}
        <img
          src={url}
          alt={`${res.label} YouTube thumbnail preview (${res.badge})`}
          loading="eager"
          decoding="async"
          onLoad={handleImgLoad}
          onError={() => setStatus('unavailable')}
          className={cx(
            'h-full w-full object-cover transition-opacity duration-300',
            loading ? 'opacity-0' : 'opacity-100',
          )}
        />
        {isBest ? (
          <span className="absolute left-3 top-3">
            <Badge tone="accent" className="!bg-accent !text-accent-fg shadow">
              Best quality
            </Badge>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold leading-none">{res.label}</h3>
            <p className="mt-1 font-mono text-sm text-muted-fg">
              {res.badge}
              {size ? <span className="text-muted-fg/70"> · {formatBytes(size)}</span> : null}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <Button
            variant="accent"
            size="sm"
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1"
            aria-label={`Download ${res.label} thumbnail (${res.badge})`}
          >
            {downloading ? (
              <Loader2 className="animate-spin-slow" size={16} aria-hidden="true" />
            ) : (
              <Download size={16} aria-hidden="true" />
            )}
            {downloading ? 'Saving…' : 'Download'}
          </Button>
          <Button
            variant="soft"
            size="sm"
            onClick={handleCopy}
            aria-label={`Copy ${res.label} image URL`}
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? 'Copied' : 'URL'}
          </Button>
          <Button
            variant="soft"
            size="sm"
            onClick={() => onEdit?.({ url, filename, label: res.label })}
            aria-label={`Edit ${res.label} thumbnail`}
          >
            <Pencil size={16} aria-hidden="true" /> Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            href={url}
            aria-label={`Open ${res.label} thumbnail in a new tab`}
          >
            <ExternalLink size={16} aria-hidden="true" />
          </Button>
        </div>

        {failed ? (
          <p className="flex items-center gap-1.5 text-sm text-danger" role="alert">
            <ImageOff size={14} aria-hidden="true" /> Couldn&apos;t save — try the
            Open button, then right-click &rarr; Save image.
          </p>
        ) : null}
      </div>
    </div>
  )
}
