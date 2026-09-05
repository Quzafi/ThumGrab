import { useState } from 'react'
import {
  Check,
  Copy,
  ExternalLink,
  Info,
  Languages,
  Tags,
  FileText,
  Video,
  Search,
  PlaySquare,
} from 'lucide-react'
import { translateText, watchUrl } from '../lib/youtube.js'
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
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="!min-h-8 !px-2.5 text-xs text-primary shadow-none font-bold"
      aria-label={label}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default function VideoInfoEnhanced({ info }) {
  const [activeTab, setActiveTab] = useState('description')
  const [copied, setCopied] = useState('')
  const [target, setTarget] = useState('ur')
  const [translatedTitle, setTranslatedTitle] = useState('')
  const [translationLoading, setTranslationLoading] = useState(false)
  const [translationError, setTranslationError] = useState('')

  const tags = Array.isArray(info.tags) && info.tags.length > 0
    ? info.tags
    : (info.title || '').toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter((w) => w.length > 3)

  const similar = Array.isArray(info.similar) ? info.similar : []
  const description = info.description || `Official YouTube video published by ${info.author || 'the creator'}.\n\nTitle: ${info.title || 'YouTube Video'}\nWatch the full video and read channel links on YouTube.`

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
  ]
    .filter(Boolean)
    .join('\n\n')

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

  const TABS = [
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'tags', label: `Tags & Keywords (${tags.length})`, icon: Tags },
    { id: 'translate', label: 'Title Translator', icon: Languages },
    { id: 'similar', label: `Similar & Related Videos`, icon: Video },
  ]

  // Generated fallback search links if similar videos array is empty
  const searchQueries = [
    { label: `${info.author || 'Creator'} Channel Videos`, query: info.author },
    { label: `Related: ${info.title?.slice(0, 30)}...`, query: info.title },
    { label: `${tags[0] || 'YouTube'} Tutorials & Guides`, query: tags[0] || 'YouTube' },
  ].filter((q) => q.query)

  return (
    <div className="clay mt-8 overflow-hidden p-6 sm:p-8">
      {/* Header Info */}
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <IconBubble tone="primary">
            <Info size={22} aria-hidden="true" />
          </IconBubble>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary uppercase tracking-wider">
                Video Details & SEO
              </span>
              {info.publishedAt ? (
                <span className="text-xs font-semibold text-muted-fg">
                  {formatDate(info.publishedAt)}
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 text-xl font-black text-fg leading-snug">
              {info.title || 'Untitled Video'}
            </h3>
            {info.author ? (
              <p className="mt-1 text-xs font-bold text-muted-fg">
                Channel:{' '}
                {info.authorUrl ? (
                  <a
                    href={info.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-primary"
                  >
                    {info.author}
                  </a>
                ) : (
                  <span className="text-fg">{info.author}</span>
                )}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <CopyButton
            copied={copied === 'title'}
            label="Copy video title"
            onClick={() => copyValue('title', info.title)}
          />
          <CopyButton
            copied={copied === 'all'}
            label="Copy all video metadata"
            onClick={() => copyValue('all', allMetadata)}
          />
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <div className="mt-5 flex flex-wrap gap-2 border-b border-border/40 pb-3">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = activeTab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
                active
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-muted/70 text-muted-fg hover:bg-muted hover:text-fg'
              }`}
            >
              <Icon size={15} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Tab Contents */}
      <div className="mt-4">
        {/* Tab 1: Description */}
        {activeTab === 'description' ? (
          <div className="rounded-2xl bg-muted/40 p-4 border border-border/50">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-fg">
                Video Description & Overview
              </span>
              <CopyButton
                copied={copied === 'description'}
                label="Copy description"
                onClick={() => copyValue('description', description)}
              />
            </div>
            <div className="max-h-72 overflow-y-auto rounded-xl bg-card p-4 text-xs leading-relaxed text-muted-fg font-medium whitespace-pre-line border border-border/40 shadow-xs">
              {description}
            </div>
            {info.id ? (
              <div className="mt-3 flex justify-end">
                <a
                  href={watchUrl(info.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary"
                >
                  <PlaySquare size={14} /> Open Full Description on YouTube <ExternalLink size={13} />
                </a>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Tab 2: Tags & Keywords */}
        {activeTab === 'tags' ? (
          <div className="rounded-2xl bg-muted/40 p-4 border border-border/50">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-fg">
                Extracted SEO Search Tags ({tags.length})
              </span>
              <CopyButton
                copied={copied === 'tags'}
                label="Copy all tags"
                onClick={() => copyValue('tags', tags.join(', '))}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => copyValue(`tag:${tag}`, tag)}
                  className="group flex items-center gap-1.5 rounded-xl bg-card border border-border/60 px-3 py-1.5 text-xs font-bold text-fg transition-all hover:border-primary hover:scale-105 shadow-xs"
                >
                  <span>#{tag}</span>
                  {copied === `tag:${tag}` ? (
                    <Check size={13} className="text-accent" />
                  ) : (
                    <Copy size={13} className="opacity-0 group-hover:opacity-100 text-muted-fg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Tab 3: Translator */}
        {activeTab === 'translate' ? (
          <div className="rounded-2xl bg-muted/40 p-4 border border-border/50">
            <div className="flex flex-wrap items-center gap-3">
              <Languages size={18} className="text-primary" />
              <span className="text-xs font-bold text-fg">Translate Video Title:</span>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="clay-inset rounded-xl px-3 py-1.5 text-xs font-bold text-fg outline-none"
              >
                {LANGUAGES.map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={handleTranslate}
                disabled={translationLoading}
              >
                {translationLoading ? 'Translating…' : 'Translate Now'}
              </Button>
            </div>

            {translatedTitle ? (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-card border border-border p-3">
                <p className="text-sm font-bold text-fg">{translatedTitle}</p>
                <CopyButton
                  copied={copied === 'translated'}
                  label="Copy translated title"
                  onClick={() => copyValue('translated', translatedTitle)}
                />
              </div>
            ) : null}
            {translationError ? (
              <p className="mt-2 text-xs font-bold text-danger">{translationError}</p>
            ) : null}
          </div>
        ) : null}

        {/* Tab 4: Similar & Related Videos */}
        {activeTab === 'similar' ? (
          <div className="rounded-2xl bg-muted/40 p-4 border border-border/50">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-fg">
                Related Video Recommendations
              </span>
              {similar.length > 0 ? (
                <CopyButton
                  copied={copied === 'similar'}
                  label="Copy all similar links"
                  onClick={() =>
                    copyValue(
                      'similar',
                      similar.map((v) => `${v.title} — ${v.url}`).join('\n')
                    )
                  }
                />
              ) : null}
            </div>

            {similar.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {similar.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-3 rounded-xl bg-card border border-border p-2.5 transition-all hover:border-primary"
                  >
                    <img
                      src={v.thumbnailUrl}
                      alt=""
                      className="h-14 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-xs font-bold text-fg hover:text-primary"
                      >
                        {v.title}
                      </a>
                      {v.author ? (
                        <p className="truncate text-[11px] font-semibold text-muted-fg mt-0.5">
                          {v.author}
                        </p>
                      ) : null}
                    </div>
                    <button
                      onClick={() => copyValue(`similar:${v.id}`, `${v.title}\n${v.url}`)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-primary hover:bg-muted"
                    >
                      {copied === `similar:${v.id}` ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-fg">
                  Discover related content & competitor research links for this topic:
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {searchQueries.map((sq, idx) => (
                    <a
                      key={idx}
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(sq.query)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-chip flex items-center justify-between p-3 text-xs font-bold text-fg hover:text-primary transition-all hover:scale-102"
                    >
                      <span className="truncate">{sq.label}</span>
                      <Search size={14} className="shrink-0 text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
