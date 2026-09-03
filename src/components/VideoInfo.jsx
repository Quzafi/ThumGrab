import { useState } from 'react'
import { ChevronDown, ExternalLink, Info, Tags } from 'lucide-react'
import { Button, IconBubble } from './ui.jsx'

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

export default function VideoInfo({ info }) {
  const [expanded, setExpanded] = useState(false)
  const tags = Array.isArray(info.tags) ? info.tags : []
  const similar = Array.isArray(info.similar) ? info.similar : []
  const description = info.description || ''

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="clay p-5" aria-labelledby="video-details-heading">
        <div className="flex items-start gap-3">
          <IconBubble tone="primary">
            <Info size={22} aria-hidden="true" />
          </IconBubble>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Video details</p>
            <h3 id="video-details-heading" className="mt-1 text-xl font-bold">
              {info.title || 'Untitled video'}
            </h3>
            {info.author || info.publishedAt ? (
              <p className="mt-1 text-sm font-semibold text-muted-fg">
                {info.authorUrl && info.author ? (
                  <a
                    href={info.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {info.author}
                  </a>
                ) : (
                  info.author
                )}
                {info.author && info.publishedAt ? ' · ' : ''}
                {info.publishedAt ? formatDate(info.publishedAt) : ''}
              </p>
            ) : null}
          </div>
        </div>

        {description ? (
          <div className="mt-5">
            <p
              className={`whitespace-pre-line leading-relaxed text-muted-fg ${
                expanded ? '' : 'max-h-28 overflow-hidden'
              }`}
            >
              {description}
            </p>
            {description.length > 360 ? (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 !min-h-9 !px-2 text-primary shadow-none"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
              >
                {expanded ? 'Show less' : 'Show more'}
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'}
                />
              </Button>
            ) : null}
          </div>
        ) : null}

        {tags.length ? (
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm font-bold text-fg">
              <Tags size={16} className="text-primary" aria-hidden="true" />
              Tags / keywords
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="clay-chip px-3 py-1 text-xs font-semibold text-muted-fg">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {!description && !tags.length ? (
          <p className="mt-5 text-sm text-muted-fg">
            Extra description and tags were not available for this video.
          </p>
        ) : null}
      </section>

      <section className="clay p-5" aria-labelledby="similar-videos-heading">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Research helper</p>
          <h3 id="similar-videos-heading" className="mt-1 text-xl font-bold">
            Similar videos
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-fg">
          Related results based on this video&apos;s title and topic. No views or engagement data.
        </p>

        {similar.length ? (
          <div className="mt-4 space-y-3">
            {similar.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted"
              >
                <img
                  src={video.thumbnailUrl}
                  alt=""
                  width="120"
                  height="68"
                  loading="lazy"
                  className="h-16 w-28 shrink-0 rounded-xl object-cover"
                />
                <span className="min-w-0">
                  <span className="block line-clamp-2 text-sm font-bold leading-snug text-fg group-hover:text-primary">
                    {video.title}
                  </span>
                  {video.author ? (
                    <span className="mt-1 block truncate text-xs text-muted-fg">{video.author}</span>
                  ) : null}
                </span>
                <ExternalLink size={15} className="ml-auto shrink-0 text-muted-fg" aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-fg">
            Similar results are not available right now, but your thumbnails are ready.
          </p>
        )}
      </section>
    </div>
  )
}
