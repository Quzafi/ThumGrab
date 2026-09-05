import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardPaste,
  Search,
  X,
  FileArchive,
  PlaySquare,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Dna,
} from 'lucide-react'
import {
  parseVideoId,
  RESOLUTIONS,
  thumbUrl,
  downloadFilename,
  watchUrl,
  fetchVideoInfo,
} from '../lib/youtube.js'
import { downloadZip } from '../lib/download.js'
import { saveHistoryItem, getHistory } from '../lib/history.js'
import { Button, IconBubble } from './ui.jsx'
import ResolutionCard from './ResolutionCard.jsx'
import VideoInfo from './VideoInfoEnhanced.jsx'
import ThumbnailEditor from './ThumbnailEditor.jsx'
import ClientSideAiAnalyzer from './ClientSideAiAnalyzer.jsx'

const SAMPLES = [

  { label: 'Me at the zoo', url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
  { label: 'Big Buck Bunny', url: 'https://youtu.be/aqz-KE-bpKQ' },
]

export default function ThumbnailTool() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [videoId, setVideoId] = useState(null)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)
  const [infoLoading, setInfoLoading] = useState(false)
  const [avail, setAvail] = useState({})
  const [editor, setEditor] = useState(null)
  const [zipping, setZipping] = useState(false)
  const inputRef = useRef(null)

  const onAvailability = useCallback((key, ok) => {
    setAvail((m) => (m[key] === ok ? m : { ...m, [key]: ok }))
  }, [])

  function submit(value) {
    const id = parseVideoId(value)
    if (!id) {
      setVideoId(null)
      setError(
        "That doesn't look like a YouTube link. Paste a full video URL (or an 11-character video ID) and try again.",
      )
      return
    }
    setError('')
    setVideoInfo(null)
    setInfoLoading(true)
    setAvail({})
    setVideoId(id)
  }

  function handleSubmit(e) {
    e.preventDefault()
    submit(input)
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setInput(text)
        submit(text)
      }
    } catch {
      // Clipboard read blocked — just focus so the user can paste manually.
      inputRef.current?.focus()
    }
  }

  function useSample(url) {
    setInput(url)
    submit(url)
  }

  function reset() {
    setInput('')
    setVideoId(null)
    setError('')
    setVideoInfo(null)
    setInfoLoading(false)
    setAvail({})
    inputRef.current?.focus()
  }

  // Optional enrichment — video title / author. Failure is silent.
  useEffect(() => {
    if (!videoId) return
    const ctrl = new AbortController()
    setInfoLoading(true)
    fetchVideoInfo(videoId, ctrl.signal).then((data) => {
      if (!ctrl.signal.aborted) {
        setVideoInfo(data)
        setInfoLoading(false)
        saveHistoryItem({ id: videoId, title: data?.title, author: data?.author })
      }
    })
    return () => ctrl.abort()
  }, [videoId])

  const availableList = RESOLUTIONS.filter((r) => avail[r.key])
  const best = availableList[0]

  async function handleZip() {
    if (!availableList.length) return
    setZipping(true)
    setError('')
    try {
      const items = availableList.map((r) => ({
        url: thumbUrl(videoId, r.key),
        filename: downloadFilename(videoId, r.key),
      }))
      await downloadZip(items, `youtube-thumbnails-${videoId}.zip`)
    } catch {
      setError('Could not build the ZIP file. Please try downloading the images individually.')
    } finally {
      setZipping(false)
    }
  }

  return (
    <div className="clay-lg p-6 sm:p-8 md:p-10">
      {/* Live status for screen readers */}
      <p className="sr-only" role="status">
        {videoId
          ? `Thumbnails ready for ${videoInfo?.title || 'the video'}. ${availableList.length} sizes available.`
          : ''}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="clay-inset flex flex-1 items-center gap-2 rounded-2xl px-3 py-2 sm:px-4">
            <PlaySquare className="shrink-0 text-danger" size={22} aria-hidden="true" />
            <label htmlFor="tg-url" className="sr-only">
              YouTube video URL or ID
            </label>
            <input
              id="tg-url"
              ref={inputRef}
              type="text"
              inputMode="url"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a YouTube link or video ID…"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-base text-fg placeholder:text-muted-fg/70 focus:outline-none"
            />
            {input ? (
              <button
                type="button"
                onClick={reset}
                aria-label="Clear input"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-fg transition-colors hover:bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <X size={18} aria-hidden="true" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={handlePaste}
              className="clay-btn hidden shrink-0 bg-card px-3 py-1.5 text-sm font-bold text-fg sm:inline-flex"
            >
              <ClipboardPaste size={16} aria-hidden="true" /> Paste
            </button>
          </div>
          <Button type="submit" variant="accent" size="lg" className="shrink-0">
            <Search size={18} aria-hidden="true" /> Get thumbnails
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-fg">Try an example:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.url}
            type="button"
            onClick={() => useSample(s.url)}
            className="clay-chip inline-flex min-h-11 items-center px-4 py-2 font-semibold text-primary transition-colors hover:text-accent"
          >
            {s.label}
          </button>
        ))}
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-2xl bg-danger/10 px-4 py-3 text-sm font-semibold text-danger"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {videoId ? (
        <div className="mt-8">
          <div className="clay flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <IconBubble tone="accent">
                <ImageIcon size={22} aria-hidden="true" />
              </IconBubble>
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-bold">
                  {videoInfo?.title || 'Your thumbnails are ready'}
                </h2>
                <p className="mt-0.5 truncate text-sm text-muted-fg">
                  {videoInfo?.author ? `${videoInfo.author} · ` : ''}
                  {availableList.length} size{availableList.length === 1 ? '' : 's'} available ·{' '}
                  <a
                    href={watchUrl(videoId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-fg"
                  >
                    Watch on YouTube
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                variant="primary"
                onClick={() => navigate(`/dna?id=${videoId}`)}
              >
                <Dna size={18} aria-hidden="true" /> Extract Channel DNA
              </Button>
              <Button
                variant="accent"
                onClick={handleZip}
                disabled={zipping || !availableList.length}
              >
                {zipping ? (
                  <Loader2 className="animate-spin-slow" size={18} aria-hidden="true" />
                ) : (
                  <FileArchive size={18} aria-hidden="true" />
                )}
                {zipping ? 'Zipping…' : `Download all (${availableList.length})`}
              </Button>
              <Button variant="soft" onClick={reset}>
                <X size={18} aria-hidden="true" /> Start over
              </Button>
            </div>
          </div>

          {infoLoading ? (
            <p className="mt-5 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-fg" role="status">
              Loading video details and similar videos…
            </p>
          ) : videoInfo?.metadataAvailable ? (
            <VideoInfo info={videoInfo} />
          ) : (
            <p className="mt-5 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-fg">
              Video details are unavailable right now, but your thumbnails are ready.
            </p>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
            {RESOLUTIONS.map((r) => (
              <ResolutionCard
                key={r.key}
                id={videoId}
                res={r}
                isBest={best?.key === r.key}
                onAvailability={onAvailability}
                onEdit={(value) => setEditor(value)}
              />
            ))}
          </div>

          {/* 100% Client-Side AI CTR & Quality Audit */}
          {best ? (
            <ClientSideAiAnalyzer
              imageUrl={thumbUrl(videoId, best.key)}
              title={videoInfo?.title || ''}
            />
          ) : null}

          <p className="mt-6 text-center text-sm text-muted-fg">

            Please make sure you have the right to use a thumbnail before republishing it. See our{' '}
            <a href="/disclaimer" className="link-underline text-fg">
              usage disclaimer
            </a>
            .
          </p>
        </div>
      ) : null}
      {editor ? (
        <ThumbnailEditor
          imageUrl={editor.url}
          filename={editor.filename}
          onClose={() => setEditor(null)}
        />
      ) : null}
    </div>
  )
}
