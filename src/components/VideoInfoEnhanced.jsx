import { useState } from 'react'
import { Check, ChevronDown, Copy, ExternalLink, Info, Languages, Tags } from 'lucide-react'
import { translateText } from '../lib/youtube.js'
import { copyText } from '../lib/clipboard.js'
import { Button, IconBubble } from './ui.jsx'

const LANGUAGES = [
  ['ur', 'Urdu'],
  ['hi', 'Hindi'],
  ['ar', 'Arabic'],
  ['bn', 'Bengali'],
  ['es', 'Spanish'],
  ['fr', 'French'],
  ['de', 'German'],
  ['tr', 'Turkish'],
  ['pt', 'Portuguese'],
  ['en', 'English'],
]

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

function CopyButton({ copied, label, onClick }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="!min-h-9 !px-3 text-primary shadow-none" aria-label={label}>
      {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default function VideoInfoEnhanced({ info }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState('')
  const [target, setTarget] = useState('ur')
  const [translatedTitle, setTranslatedTitle] = useState('')
  const [translationLoading, setTranslationLoading] = useState(false)
  const [translationError, setTranslationError] = useState('')
  const tags = Array.isArray(info.tags) ? info.tags : []
  const similar = Array.isArray(info.similar) ? info.similar : []
  const description = info.description || ''

  async function copyValue(key, value) {
    if (!value) return
    const ok = await copyText(value)
    if (!ok) return
    setCopied(key)
    window.setTimeout(() => setCopied((current) => (current === key ? '' : current)), 1600)
  }

  const allMetadata = [
    info.title ? `Title: ${info.title}` : '',
    info.author ? `Channel: ${info.author}` : '',
    description ? `Description:\n${description}` : '',
    tags.length ? `Tags: ${tags.join(', ')}` : '',
    similar.length
      ? `Similar videos:\n${similar.map((video) => `- ${video.title} — ${video.url}`).join('\n')}`
      : '',
  ].filter(Boolean).join('\n\n')

  async function handleTranslate() {
    if (!info.title) return
    setTranslationLoading(true)
    setTranslationError('')
    try {
      const result = await translateText(info.title, target)
      setTranslatedTitle(result.translatedText || '')
    } catch (error) {
      setTranslationError(error?.message || 'Translation is unavailable right now.')
      setTranslatedTitle('')
    } finally {
      setTranslationLoading(false)
    }
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="clay p-5" aria-labelledby="video-details-heading">
        <div className="flex items-start gap-3">
          <IconBubble tone="primary">
            <Info size={22} aria-hidden="true" />
          </IconBubble>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Video details</p>
              <CopyButton copied={copied === 'all'} label="Copy all video metadata" onClick={() => copyValue('all', allMetadata)} />
            </div>
            <div className="mt-1 flex items-start gap-2">
              <h3 id="video-details-heading" className="min-w-0 flex-1 text-xl font-bold">
                {info.title || 'Untitled video'}
              </h3>
              <CopyButton copied={copied === 'title'} label="Copy video title" onClick={() => copyValue('title', info.title)} />
            </div>
            {info.author || info.publishedAt ? (
              <p className="mt-1 text-sm font-semibold text-muted-fg">
                {info.authorUrl && info.author ? (
                  <a href={info.authorUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {info.author}
                  </a>
                ) : info.author}
                {info.author && info.publishedAt ? ' · ' : ''}
                {info.publishedAt ? formatDate(info.publishedAt) : ''}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-muted p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Languages size={17} className="text-primary" aria-hidden="true" />
            <span className="text-sm font-bold">Translate title</span>
            <select value={target} onChange={(event) => setTarget(event.target.value)} className="clay-inset ml-auto rounded-xl px-3 py-2 text-sm font-semibold text-fg outline-none">
              {LANGUAGES.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
            <Button variant="primary" size="sm" onClick={handleTranslate} disabled={translationLoading || !info.title}>
              {translationLoading ? 'Translating…' : 'Translate'}
            </Button>
          </div>
          {translatedTitle ? (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-card p-3">
              <p className="flex-1 font-bold text-fg">{translatedTitle}</p>
              <CopyButton copied={copied === 'translated'} label="Copy translated title" onClick={() => copyValue('translated', translatedTitle)} />
            </div>
          ) : null}
          {translationError ? <p className="mt-2 text-sm font-semibold text-danger" role="alert">{translationError}</p> : null}
        </div>

        {description ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-fg">Description</p>
              <CopyButton copied={copied === 'description'} label="Copy video description" onClick={() => copyValue('description', description)} />
            </div>
            <p className={`whitespace-pre-line leading-relaxed text-muted-fg ${expanded ? '' : 'max-h-28 overflow-hidden'}`}>
              {description}
            </p>
            {description.length > 360 ? (
              <Button variant="ghost" size="sm" className="mt-2 !min-h-9 !px-2 text-primary shadow-none" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
                {expanded ? 'Show less' : 'Show more'}
                <ChevronDown size={16} aria-hidden="true" className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </Button>
            ) : null}
          </div>
        ) : null}

        {tags.length ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-fg">
                <Tags size={16} className="text-primary" aria-hidden="true" /> Tags / keywords
              </div>
              <CopyButton copied={copied === 'tags'} label="Copy all video tags" onClick={() => copyValue('tags', tags.join(', '))} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => <button key={tag} type="button" onClick={() => copyValue(`tag:${tag}`, tag)} className="clay-chip px-3 py-1 text-xs font-semibold text-muted-fg hover:text-primary" title="Copy tag">{copied === `tag:${tag}` ? 'Copied' : tag}</button>)}
            </div>
          </div>
        ) : null}

        {!description && !tags.length ? <p className="mt-5 text-sm text-muted-fg">Extra description and tags were not available for this video.</p> : null}
      </section>

      <section className="clay p-5" aria-labelledby="similar-videos-heading">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Research helper</p>
            <h3 id="similar-videos-heading" className="mt-1 text-xl font-bold">Similar videos</h3>
          </div>
          {similar.length ? <CopyButton copied={copied === 'similar'} label="Copy similar video titles and links" onClick={() => copyValue('similar', similar.map((video) => `${video.title} — ${video.url}`).join('\n'))} /> : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-fg">Related results based on this video&apos;s title and topic. No views or engagement data.</p>

        {similar.length ? (
          <div className="mt-4 space-y-3">
            {similar.map((video) => (
              <div key={video.id} className="flex items-center gap-2 rounded-2xl p-2 transition-colors hover:bg-muted">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="group flex min-w-0 flex-1 items-center gap-3">
                  <img src={video.thumbnailUrl} alt="" width="120" height="68" loading="lazy" className="h-16 w-28 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0">
                    <span className="block line-clamp-2 text-sm font-bold leading-snug text-fg group-hover:text-primary">{video.title}</span>
                    {video.author ? <span className="mt-1 block truncate text-xs text-muted-fg">{video.author}</span> : null}
                  </span>
                  <ExternalLink size={15} className="ml-auto shrink-0 text-muted-fg" aria-hidden="true" />
                </a>
                <button type="button" onClick={() => copyValue(`similar:${video.id}`, `${video.title}\n${video.url}`)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-primary hover:bg-card" aria-label={`Copy ${video.title}`}>
                  {copied === `similar:${video.id}` ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            ))}
          </div>
        ) : <p className="mt-4 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-fg">Similar results are not available right now, but your thumbnails are ready.</p>}
      </section>
    </div>
  )
}
