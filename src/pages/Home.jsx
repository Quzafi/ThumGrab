import {
  Zap,
  ShieldCheck,
  DollarSign,
  Layers,
  MousePointerClick,
  ClipboardPaste,
  Download,
  Sparkles,
  Ruler,
  Palette,
  PlaySquare,
  Lock,
  ArrowRight,
} from 'lucide-react'
import Seo, { JsonLd } from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ThumbnailTool from '../components/ThumbnailTool.jsx'
import AdSlot from '../components/AdSlot.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import { Section, SectionHeading, Card, Button, IconBubble, Eyebrow } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'
import { RESOLUTIONS } from '../lib/youtube.js'

const TRUST = [
  { icon: DollarSign, label: '100% free' },
  { icon: Lock, label: 'No signup' },
  { icon: Layers, label: 'Every resolution' },
  { icon: ShieldCheck, label: 'No watermark' },
]

const STEPS = [
  {
    icon: ClipboardPaste,
    title: 'Paste the link',
    body: 'Copy any YouTube video, Shorts, or Live URL and paste it into the box above. A raw 11-character video ID works too.',
  },
  {
    icon: MousePointerClick,
    title: 'Pick a resolution',
    body: 'We instantly show every thumbnail size the video has — from Max HD (1280×720) down to the smallest preview.',
  },
  {
    icon: Download,
    title: 'Download or copy',
    body: 'Save the image with one click, grab the direct URL, or download every size at once as a single ZIP file.',
  },
]

const FEATURES = [
  {
    icon: Sparkles,
    title: '100% Client-Side AI Audit',
    body: 'Evaluates thumbnail resolution, pixel contrast, and color palette directly in your browser canvas with $0 server cost.',
  },
  {
    icon: Zap,
    title: 'Video Content DNA Extractor',
    body: 'Extracts copywriting emotional hooks, title formats, high-CTR power words, and SEO tag fingerprints into a 1-click blueprint.',
  },
  {
    icon: Palette,
    title: 'Stamp & Badge Editor',
    body: 'Add 1-click viral stamps ("4K ULTRA HD", "LIVE", "NEW 2026") and custom text overlays before downloading.',
  },
  {
    icon: ShieldCheck,
    title: 'Private & Serverless',
    body: 'We never store your pasted links or images. Everything runs locally inside your browser with 100% privacy.',
  },
  {
    icon: Layers,
    title: 'Max HD Full Quality',
    body: 'Get the exact 1280×720 Max HD and HQ JPG YouTube serves — uncompressed, crisp, and ready for publication.',
  },
  {
    icon: Download,
    title: 'One-click ZIP Export',
    body: 'Download all available resolutions together in a single neatly-named ZIP archive with one click.',
  },
]

const USE_CASES = [
  'Building a thumbnail swipe file for inspiration and research',
  'Grabbing your own thumbnail to reuse in end screens, blogs, or social posts',
  'Designers referencing composition, color, and text placement',
  'Creating video playlists, wikis, or documentation that link out to videos',
  'Analyzing what top creators in your niche do with their thumbnails',
]

const HOME_FAQ = [
  {
    q: 'Is ThumbGrab really free?',
    a: 'Yes. Every feature — including downloading in HD and grabbing all resolutions as a ZIP — is completely free, with no account required.',
  },
  {
    q: 'Why is the Max HD (1280×720) option sometimes missing?',
    a: 'YouTube only generates a maxresdefault thumbnail for videos uploaded in HD. If a video was uploaded in a lower quality, that size simply does not exist, so we hide it and show the next best available size instead.',
  },
  {
    q: 'Can I download thumbnails from YouTube Shorts?',
    a: 'Yes. Paste a Shorts URL just like a normal video link and you will get every thumbnail size that Short has.',
  },
  {
    q: 'Is it legal to download YouTube thumbnails?',
    a: 'Downloading a thumbnail for private reference or fair-use purposes is generally fine, but thumbnails are copyrighted by their owners. Do not republish someone else’s thumbnail as your own without permission. See our disclaimer for details.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="YouTube Thumbnail Downloader & AI Content DNA Extractor"
        description={SITE.description}
        path="/"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: `${SITE.name} — YouTube Thumbnail Downloader & AI DNA Extractor`,
          url: SITE.url,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any (web browser)',
          browserRequirements: 'Requires JavaScript',
          description: SITE.description,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />

      <PageHero
        eyebrow={
          <>
            <Sparkles size={16} className="text-accent" aria-hidden="true" /> 100% Client-Side AI Auditor & Content DNA Extractor
          </>
        }
        title="Download YouTube Thumbnails & Extract Video Content DNA"
        subtitle="Paste any YouTube link to download full Max HD thumbnails, run 100% client-side AI CTR audits, extract copywriting DNA blueprints, and stamp custom viral badges — free & private in your browser."
        center
      >
        <div className="mx-auto mt-10 max-w-3xl text-left">
          <ThumbnailTool />
        </div>

        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-muted-fg">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-2">
              <t.icon size={18} className="text-accent" aria-hidden="true" />
              {t.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section className="!pt-4">
        <AdSlot slot={''} label="Advertisement" minHeight={100} />
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="!pt-6">
        <SectionHeading
          center
          eyebrow="How it works"
          title="Three steps, about five seconds"
          subtitle="No software to install and nothing to learn — if you can copy and paste a link, you can use ThumbGrab."
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Card key={s.title} className="relative">
              <span className="absolute right-6 top-6 font-display text-5xl font-bold text-muted">
                {i + 1}
              </span>
              <IconBubble>
                <s.icon size={22} aria-hidden="true" />
              </IconBubble>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-fg">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Resolutions */}
      <Section className="!py-8">
        <div className="clay-lg p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Eyebrow className="mb-4">Resolutions</Eyebrow>
              <h2 className="text-3xl md:text-4xl">Every thumbnail size YouTube makes</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-fg">
                When a video is uploaded, YouTube automatically creates the same
                thumbnail in several fixed sizes. ThumbGrab shows you all of them
                and lets you download whichever you need.
              </p>
              <Button to="/guides/youtube-thumbnail-sizes" variant="primary" className="mt-6">
                Full size guide <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="text-muted-fg">
                    <th className="px-3 py-3 font-bold">Name</th>
                    <th className="px-3 py-3 font-bold">Dimensions</th>
                    <th className="px-3 py-3 font-bold">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {RESOLUTIONS.map((r) => (
                    <tr key={r.key} className="border-t border-border">
                      <td className="px-3 py-3 font-bold text-fg">{r.label}</td>
                      <td className="px-3 py-3 font-mono text-muted-fg">{r.badge}</td>
                      <td className="px-3 py-3 text-muted-fg">
                        {r.guaranteed ? 'Always' : 'If uploaded in HD'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeading
          center
          eyebrow="Why ThumbGrab"
          title="A thumbnail grabber that respects your time"
          subtitle="Fast, private, and free — the way a simple tool should be."
          className="mx-auto"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <IconBubble tone="accent">
                <f.icon size={22} aria-hidden="true" />
              </IconBubble>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-fg">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!py-8">
        <AdSlot slot={''} label="Advertisement" minHeight={100} />
      </Section>

      {/* Use cases */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow className="mb-4">
              <Sparkles size={16} aria-hidden="true" /> Use cases
            </Eyebrow>
            <h2 className="text-3xl md:text-4xl">Who uses a thumbnail downloader?</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              Thumbnails are the single biggest driver of clicks on YouTube, so
              creators and designers study them constantly. Here are the most
              common reasons people reach for ThumbGrab:
            </p>
          </div>
          <ul className="space-y-3">
            {USE_CASES.map((u) => (
              <li key={u} className="clay flex items-start gap-3 p-4">
                <span className="clay-raised mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card text-accent">
                  <Sparkles size={14} aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-muted-fg">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ teaser */}
      <Section>
        <SectionHeading
          center
          eyebrow="FAQ"
          title="Questions, answered"
          subtitle="A few of the things people ask most often."
          className="mx-auto"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={HOME_FAQ} />
          <div className="mt-6 text-center">
            <Button to="/faq" variant="soft">
              See all FAQs <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="!pb-16">
        <div className="clay-lg relative overflow-hidden p-10 text-center md:p-16">
          <div className="mx-auto max-w-2xl">
            <IconBubble tone="accent" className="mx-auto">
              <Download size={22} aria-hidden="true" />
            </IconBubble>
            <h2 className="mt-6 text-3xl md:text-4xl">Grab your first thumbnail now</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              It is free, there is nothing to install, and your download starts
              in seconds. Scroll back up and paste a link to try it.
            </p>
            <Button href="#main" target="_self" rel="" variant="accent" size="lg" className="mt-8">
              Back to the downloader <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
