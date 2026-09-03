import { Users, ArrowRight, Zap, ShieldCheck, Heart } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Prose from '../components/Prose.jsx'
import { Section, Card, Button, IconBubble } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'

const VALUES = [
  {
    icon: Zap,
    title: 'Simple beats clever',
    body: 'One input, clear buttons, instant results. A good tool gets out of your way.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy by default',
    body: 'No accounts, no tracking of the links you paste, no images stored on our servers.',
  },
  {
    icon: Heart,
    title: 'Free and honest',
    body: 'Free to use, upfront about copyright, and clear that we are independent from YouTube.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={`Learn about ${SITE.name}, a free, privacy-friendly YouTube thumbnail downloader built for creators and designers.`}
        path="/about"
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />}
        eyebrow={
          <>
            <Users size={16} aria-hidden="true" /> About
          </>
        }
        title={`About ${SITE.name}`}
        subtitle="A small, fast, free tool with one job: help you get YouTube thumbnails without the hassle."
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <p>
              {SITE.name} is a free web tool that lets anyone download the
              thumbnail image from a YouTube video in seconds. Paste a link, see
              every available resolution, and save the one you need — or grab
              them all at once. There&apos;s no signup, no software, and no
              watermark.
            </p>

            <h2>Why we built it</h2>
            <p>
              Thumbnails are the most important two seconds of any YouTube video.
              Creators obsess over them, designers study them, and researchers
              analyze them — but YouTube doesn&apos;t offer a simple way to save
              one. The usual workarounds involve digging through page source or
              memorizing cryptic image URLs. We thought that was silly, so we
              built the tool we wanted: paste, click, done.
            </p>

            <h2>How it works</h2>
            <p>
              {SITE.name} runs entirely in your browser. When you paste a link,
              your device fetches the thumbnail directly from YouTube&apos;s image
              servers and saves it locally. Nothing is uploaded to us, and we
              don&apos;t keep a record of what you download. That makes it fast,
              private, and reliable.
            </p>

            <h2>Who it&apos;s for</h2>
            <p>
              We built {SITE.name} for YouTubers grabbing their own artwork,
              graphic designers building reference libraries, editors assembling
              playlists and documentation, and anyone who simply needs a clean
              copy of a thumbnail. If that&apos;s you, we hope it saves you time.
            </p>
          </Prose>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <Card key={v.title}>
                <IconBubble tone="accent">
                  <v.icon size={22} aria-hidden="true" />
                </IconBubble>
                <h2 className="!mt-5 text-lg font-bold">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-fg">{v.body}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="!mt-0 text-xl font-bold">Have feedback or an idea?</h2>
                <p className="mt-1 leading-relaxed text-muted-fg">
                  We&apos;d genuinely love to hear it.
                </p>
              </div>
              <Button to="/contact" variant="primary" className="shrink-0">
                Get in touch <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
