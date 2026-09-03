import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './Seo.jsx'
import { SITE } from '../lib/site.js'

/**
 * Accessible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * `items`: [{ label, to? }] — the last item is the current page (no `to`).
 */
export default function Breadcrumbs({ items }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-fg">
          {items.map((it, i) => {
            const last = i === items.length - 1
            return (
              <li key={it.label} className="flex items-center gap-1.5">
                {it.to && !last ? (
                  <Link to={it.to} className="transition-colors hover:text-primary">
                    {it.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-fg" aria-current="page">
                    {it.label}
                  </span>
                )}
                {!last ? (
                  <ChevronRight size={14} className="text-muted-fg/60" aria-hidden="true" />
                ) : null}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.label,
            ...(it.to ? { item: SITE.url + it.to } : {}),
          })),
        }}
      />
    </>
  )
}
