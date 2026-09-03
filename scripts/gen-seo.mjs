// Generates public/robots.txt and public/sitemap.xml from the site config,
// so they always match SITE.url and the real route list. Runs before build.
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { SITE, ROUTES } from '../src/lib/site.js'

const here = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(here, '..', 'public')
const base = SITE.url.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

function priorityFor(route) {
  if (route === '/') return '1.0'
  if (route.startsWith('/guides')) return '0.8'
  if (['/privacy-policy', '/terms', '/disclaimer'].includes(route)) return '0.3'
  return '0.6'
}

const urls = ROUTES.map(
  (route) => `  <url>
    <loc>${base}${route === '/' ? '/' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priorityFor(route)}</priority>
  </url>`,
).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = `# robots.txt for ${SITE.name}
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(resolve(publicDir, 'robots.txt'), robots)
console.log(`[gen-seo] Wrote sitemap.xml (${ROUTES.length} URLs) and robots.txt for ${base}`)
