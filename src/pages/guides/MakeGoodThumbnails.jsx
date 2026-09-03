import { ArrowRight, Palette, Type, Smile, Contrast, Grid3x3, X, Check } from 'lucide-react'
import Seo, { JsonLd } from '../../components/Seo.jsx'
import PageHero from '../../components/PageHero.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import Prose from '../../components/Prose.jsx'
import AdSlot from '../../components/AdSlot.jsx'
import { Section, Card, Button, IconBubble } from '../../components/ui.jsx'

const PRINCIPLES = [
  {
    icon: Smile,
    title: 'Lead with emotion',
    body: 'Expressive human faces are the single most reliable way to earn a click. A genuine reaction — surprise, joy, curiosity — pulls the eye and hints at the payoff inside the video.',
  },
  {
    icon: Type,
    title: 'Three or four words, max',
    body: 'A thumbnail is not a place for a sentence. Use a few large, punchy words that add to the title rather than repeat it. If it isn’t legible on a phone, it’s too small.',
  },
  {
    icon: Contrast,
    title: 'Fight for contrast',
    body: 'Your thumbnail competes against a busy, often white or dark feed. Bold color blocks, outlines, and drop shadows separate your subject from the background and from everything around it.',
  },
  {
    icon: Grid3x3,
    title: 'Compose with intent',
    body: 'Place your subject off-center using the rule of thirds, leave breathing room, and keep the focal point away from the bottom-right where the duration stamp sits.',
  },
]

const CHECKLIST = [
  'Designed at full 1280 × 720 (16:9)',
  'Readable at the size of a thumbnail on a phone',
  'One clear focal point, not five competing ones',
  'High contrast between subject, text, and background',
  'Text kept clear of the bottom-right timestamp area',
  'Consistent style, font, or color so fans recognize you',
  'Accurately represents the video (no clickbait bait-and-switch)',
]

const MISTAKES = [
  'Tiny text that vanishes at preview size',
  'Cluttered images with no clear subject',
  'Low contrast that blends into the feed',
  'Misleading visuals that hurt watch time and trust',
  'Reusing the exact same layout with no focal hierarchy',
]

export default function MakeGoodThumbnails() {
  return (
    <>
      <Seo
        title="How to Make YouTube Thumbnails That Get Clicks"
        description="A practical guide to designing high-CTR YouTube thumbnails: emotion, contrast, readable text, composition, a pre-publish checklist, and mistakes to avoid."
        path="/guides/how-to-make-good-thumbnails"
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'How to Make YouTube Thumbnails That Get Clicks',
          description:
            'Design principles and a checklist for creating high-click-through YouTube thumbnails.',
        }}
      />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Guides', to: '/guides' },
              { label: 'Design better thumbnails' },
            ]}
          />
        }
        eyebrow={
          <>
            <Palette size={16} aria-hidden="true" /> Design
          </>
        }
        title="How to make thumbnails that get clicks"
        subtitle="Your thumbnail is the trailer for your video. These principles help it stop the scroll and earn the click — honestly."
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-4xl">
          <Prose>
            <p>
              Click-through rate (CTR) is how often people who see your thumbnail
              actually click it, and it&apos;s one of the strongest signals
              YouTube uses to decide who to show your video to. A great thumbnail
              doesn&apos;t trick people — it makes a clear, honest promise about
              the value inside. Here&apos;s how to design one.
            </p>
          </Prose>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.title}>
                <IconBubble>
                  <p.icon size={22} aria-hidden="true" />
                </IconBubble>
                <h2 className="!mt-5 text-xl font-bold">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-fg">{p.body}</p>
              </Card>
            ))}
          </div>

          <Prose className="mt-12">
            <h2>Use color deliberately</h2>
            <p>
              Color sets the mood before a single word is read. Warm colors —
              red, orange, yellow — feel energetic and urgent, while cool blues
              and greens feel calm and trustworthy. Pick two or three colors and
              stick to them across your channel so your videos become instantly
              recognizable in a crowded feed. Avoid YouTube&apos;s own red and
              white as your dominant colors: they blend into the interface.
            </p>

            <h2>Design for the smallest screen first</h2>
            <p>
              Most impressions happen on mobile, where your thumbnail might be
              barely an inch wide. Before you publish, shrink your design to that
              size (or just squint at it from across the room). If the subject,
              text, and emotion still read clearly, you&apos;ve got a winner. If
              not, simplify until they do.
            </p>
          </Prose>

          <div className="my-10">
            <AdSlot slot={''} label="Advertisement" minHeight={100} />
          </div>

          {/* Checklist + mistakes */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="clay-lg p-7">
              <div className="flex items-center gap-3">
                <span className="clay-raised grid h-10 w-10 place-items-center rounded-2xl bg-card text-accent">
                  <Check size={20} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold">Pre-publish checklist</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {CHECKLIST.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-fg">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="clay-lg p-7">
              <div className="flex items-center gap-3">
                <span className="clay-raised grid h-10 w-10 place-items-center rounded-2xl bg-card text-danger">
                  <X size={20} aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold">Common mistakes</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {MISTAKES.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-muted-fg">
                    <X size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Prose className="mt-12">
            <h2>Study what already works</h2>
            <p>
              The fastest way to improve is to analyze thumbnails that already
              perform well in your niche. Collect the ones that make{' '}
              <em>you</em> want to click, and look for patterns: how they use
              faces, where the text sits, which colors repeat. A simple way to
              build that reference library is to download the thumbnails and keep
              them in a folder.
            </p>
            <p>
              You can grab any of them in seconds with our{' '}
              <a href="/">YouTube thumbnail downloader</a> — paste a link, pick
              Max HD, and save. Just remember these are for reference and
              inspiration; don&apos;t republish another creator&apos;s artwork as
              your own.
            </p>
          </Prose>

          <div className="mt-10">
            <Card className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="!mt-0 text-xl font-bold">Build your swipe file</h2>
                <p className="mt-1 leading-relaxed text-muted-fg">
                  Download reference thumbnails in full HD to study later.
                </p>
              </div>
              <Button to="/" variant="primary" className="shrink-0">
                Open the downloader <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
