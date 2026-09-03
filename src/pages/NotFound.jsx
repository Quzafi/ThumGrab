import { Link } from 'react-router-dom'
import { Home, Search, Compass, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { Section, Button, IconBubble } from '../components/ui.jsx'
import Logo from '../components/Logo.jsx'

const LINKS = [
  { to: '/', label: 'Thumbnail Downloader', icon: Search },
  { to: '/guides', label: 'Guides', icon: Compass },
  { to: '/faq', label: 'FAQ', icon: Home },
]

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <div className="animate-float mx-auto w-fit">
            <Logo size={72} />
          </div>
          <p className="mt-8 font-display text-7xl font-bold text-primary">404</p>
          <h1 className="mt-3 text-3xl md:text-4xl">This page took a wrong turn</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-fg">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8">
            <Button to="/" variant="accent" size="lg">
              Back to the downloader <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="clay flex flex-col items-center gap-3 p-6 transition-transform hover:-translate-y-1"
              >
                <IconBubble>
                  <l.icon size={22} aria-hidden="true" />
                </IconBubble>
                <span className="font-bold">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
