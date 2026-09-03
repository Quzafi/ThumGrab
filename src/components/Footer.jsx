import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { SITE } from '../lib/site.js'

const COLUMNS = [
  {
    title: 'Tool',
    links: [
      { to: '/', label: 'Thumbnail Downloader' },
      { to: '/guides/youtube-thumbnail-sizes', label: 'Thumbnail Sizes' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { to: '/guides/how-to-download-youtube-thumbnails', label: 'How to Download' },
      { to: '/guides/youtube-thumbnail-sizes', label: 'Sizes & Dimensions' },
      { to: '/guides/how-to-make-good-thumbnails', label: 'Design Better Thumbnails' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/disclaimer', label: 'Disclaimer' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-8">
      <div className="container-page">
        <div className="clay clay-lg p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div className="max-w-xs">
              <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold">
                <Logo size={36} />
                {SITE.name}
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-fg">
                The fast, free way to download YouTube video thumbnails in every
                resolution. No signup, no watermark — everything runs right in
                your browser.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-fg">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-fg transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs leading-relaxed text-muted-fg">
              <strong className="text-fg">Disclaimer:</strong> {SITE.name} is an
              independent tool and is <strong>not affiliated with, endorsed by, or
              sponsored by YouTube or Google LLC.</strong> &ldquo;YouTube&rdquo; is
              a trademark of Google LLC. All thumbnail images are the property of
              their respective owners. Please download and use thumbnails
              responsibly and only where you have the right to do so.{' '}
              <Link to="/disclaimer" className="link-underline text-fg">
                Read the full disclaimer
              </Link>
              .
            </p>
            <div className="mt-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-fg">
                © {year} {SITE.name}. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-muted-fg">
                <Link to="/privacy-policy" className="hover:text-primary">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-primary">
                  Terms
                </Link>
                <Link to="/disclaimer" className="hover:text-primary">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8" />
    </footer>
  )
}
