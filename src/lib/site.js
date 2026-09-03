// Central site configuration. Change these before you deploy.
export const SITE = {
  name: 'ThumbGrab',
  // Human tagline / SEO headline (safe descriptive use of the YouTube name)
  tagline: 'YouTube Thumbnail Downloader',
  // Production URL — used for canonical links, Open Graph and the sitemap.
  // ▶ Replace with your real domain after you buy it.
  url: 'https://thumbgrab.app',
  // Support / contact email — used on Contact, About, and legal pages.
  // ▶ Replace with your real inbox.
  email: 'hello@thumbgrab.app',
  description:
    'Free YouTube thumbnail downloader. Paste any YouTube link and download the thumbnail in HD, SD and every resolution instantly — no signup, no watermark.',
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
  { to: '/guides', label: 'Guides' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
]

// Every route, for the footer + sitemap generator.
export const ROUTES = [
  '/',
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
