import { useEffect, useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Dna,
  Search,
  Sparkles,
  Copy,
  Check,
  Zap,
  Target,
  FileText,
  Palette,
  ExternalLink,
  Loader2,
  AlertCircle,
  ArrowLeft,
  PlaySquare,
  Cpu,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import { parseVideoId, fetchVideoInfo, thumbUrl, watchUrl } from '../lib/youtube.js'
import { copyText } from '../lib/clipboard.js'
import { Section, Button, IconBubble, Card } from '../components/ui.jsx'
import ClientSideAiAnalyzer from '../components/ClientSideAiAnalyzer.jsx'
import VideoDnaExtractor from '../components/VideoDnaExtractor.jsx'

export default function ChannelDna() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryId = searchParams.get('id') || searchParams.get('v') || ''

  const [input, setInput] = useState(queryId)
  const [videoId, setVideoId] = useState(parseVideoId(queryId) || 'jNQXAC9IVRw')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!videoId) return
    const ctrl = new AbortController()
    setLoading(true)
    setError('')
    fetchVideoInfo(videoId, ctrl.signal).then((data) => {
      if (!ctrl.signal.aborted) {
        setVideoInfo(data)
        setLoading(false)
      }
    })
    return () => ctrl.abort()
  }, [videoId])

  function handleSearch(e) {
    e.preventDefault()
    const id = parseVideoId(input)
    if (!id) {
      setError('Please paste a valid YouTube video or Shorts link.')
      return
    }
    setError('')
    setVideoId(id)
    setSearchParams({ id })
  }

  return (
    <>
      <Seo
        title="YouTube Channel & Video Content DNA Extractor (Free)"
        description="Extract complete YouTube channel content DNA blueprints, title copywriting strategies, color palettes, and CTR scores 100% client-side."
        path="/dna"
      />

      <PageHero
        eyebrow={
          <>
            <Dna size={18} className="text-primary animate-pulse" aria-hidden="true" /> Channel & Video DNA Blueprint
          </>
        }
        title="YouTube Channel Content DNA Extractor"
        subtitle="Paste any YouTube video or channel link to extract its complete visual brand DNA, title copywriting blueprint, and algorithmic CTR performance."
        center
      >
        <div className="mx-auto mt-8 max-w-2xl text-left">
          <form onSubmit={handleSearch} className="clay-lg p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="clay-inset flex flex-1 items-center gap-2 rounded-2xl px-3 py-2">
                <Search size={20} className="text-primary shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste YouTube video link to extract Channel DNA..."
                  className="w-full bg-transparent py-1 text-sm font-semibold text-fg outline-none placeholder:text-muted-fg/70"
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Extract DNA
              </Button>
            </div>
            {error ? <p className="mt-2 text-xs font-bold text-danger">{error}</p> : null}
          </form>
        </div>
      </PageHero>

      <Section className="!pt-2">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted-fg hover:text-fg">
              <ArrowLeft size={16} /> Back to Thumbnail Downloader
            </Link>
          </div>

          {loading ? (
            <div className="clay flex flex-col items-center justify-center p-12 text-center">
              <Loader2 className="animate-spin text-primary mb-3" size={32} />
              <p className="font-bold text-lg text-fg">Extracting Channel & Video DNA...</p>
              <p className="text-xs text-muted-fg mt-1">Analyzing copywriting hooks, color psychology, and metadata 100% in your browser.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Channel Profile Header */}
              <div className="clay p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={thumbUrl(videoId, 'hqdefault')}
                      alt="Thumbnail preview"
                      className="h-20 w-32 rounded-xl object-cover border border-border shadow-sm"
                    />
                    <div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        Channel Blueprint
                      </span>
                      <h2 className="mt-1 text-2xl font-black text-fg">{videoInfo?.author || 'Creator Channel'}</h2>
                      <p className="text-xs text-muted-fg font-medium mt-0.5">
                        Source Video: <span className="text-fg font-semibold">{videoInfo?.title || 'YouTube Video'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={videoInfo?.authorUrl || watchUrl(videoId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn inline-flex items-center gap-2 bg-card px-4 py-2 text-xs font-bold text-fg"
                    >
                      Visit Channel <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* DNA Component */}
              <VideoDnaExtractor
                videoId={videoId}
                title={videoInfo?.title || ''}
                author={videoInfo?.author || ''}
                tags={videoInfo?.tags || []}
              />

              {/* Client Side AI Quality Audit */}
              <ClientSideAiAnalyzer
                imageUrl={thumbUrl(videoId, 'maxresdefault')}
                title={videoInfo?.title || ''}
              />
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
