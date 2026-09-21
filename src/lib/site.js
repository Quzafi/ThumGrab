// Central site configuration. Change these before you deploy.
export const SITE = {
  name: 'ThumbGrab',
  // Human tagline / SEO headline (safe descriptive use of the YouTube name)
  tagline: 'YouTube Thumbnail Downloader & AI Content DNA Extractor',
  url: 'https://thumbgrabe.netlify.app',
  email: 'brotechsolutions2@gmail.com',
  description:
    'Free YouTube thumbnail downloader & 100% client-side AI CTR auditor. Download Max HD thumbnails, extract video copywriting DNA blueprints, analyze contrast scores, and add custom badges.',
  // Twitter/X handle (optional, without @). Leave '' to omit.
  twitter: '',
  locale: 'en_US',
}

// Google AdSense configuration.
// Leave `client` empty until you're approved — the ad slots then render as
// clearly-labelled placeholders (so you can see ad positions during dev).
// After approval: set client to "ca-pub-XXXXXXXXXXXXXXXX", fill in the slot
// IDs, uncomment the <script> tag in index.html, and update /public/ads.txt.
export const ADSENSE = {
  client: '', // e.g. 'ca-pub-1234567890123456'
  slots: {
    inContent: '', // e.g. '1234567890'
    inArticle: '',
    footer: '',
  },
}

// Nav shown in the header.
export const NAV = [
  { to: '/', label: 'Downloader' },
  { to: '/dna', label: '🧬 Channel DNA' },
  { to: '/title-generator', label: '✨ AI Titles' },
  { to: '/ab-test', label: '⚔️ A/B Test' },
  { to: '/batch', label: '📦 Batch' },
  { to: '/guides', label: 'Guides' },
  { to: '/faq', label: 'FAQ' },
]

// Every route, for the footer + sitemap generator.
export const ROUTES = [
  '/',
  '/dna',
  '/title-generator',
  '/ab-test',
  '/batch',
  '/guides',
  '/guides/how-to-download-youtube-thumbnails',
  '/guides/youtube-thumbnail-sizes',
  '/guides/how-to-make-good-thumbnails',
  '/faq',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
]
