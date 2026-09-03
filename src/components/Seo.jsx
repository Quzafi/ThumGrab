import { Head } from 'vite-react-ssg'
import { SITE } from '../lib/site.js'

const base = SITE.url.replace(/\/$/, '')

/**
 * Per-page <head> tags: title, description, canonical, Open Graph, Twitter.
 * `path` should be the route path (e.g. "/about") for the canonical URL.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — ${SITE.tagline}`
  const desc = description || SITE.description
  const canonical = base + path
  const img = image || `${base}/og-image.svg`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Head>
  )
}

/** Render JSON-LD structured data (safe in the page body — Google reads it). */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
