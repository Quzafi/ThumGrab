import { ArrowRight, Ruler, Upload, Check } from 'lucide-react'
import Seo, { JsonLd } from '../../components/Seo.jsx'
import PageHero from '../../components/PageHero.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import Prose from '../../components/Prose.jsx'
import AdSlot from '../../components/AdSlot.jsx'
import { Section, Card, Button, IconBubble } from '../../components/ui.jsx'

const SIZES = [
  {
    name: 'Max HD',
    file: 'maxresdefault.jpg',
    dim: '1280 × 720',
    ratio: '16:9',
    use: 'Best for reuse, printing references, and design work. Only exists if the video was uploaded in HD.',
  },
  {
    name: 'Standard Definition',
    file: 'sddefault.jpg',
    dim: '640 × 480',
    ratio: '4:3',
    use: 'A larger legacy size. Note the 4:3 frame adds bars around the 16:9 image.',
  },
  {
    name: 'High Quality',
    file: 'hqdefault.jpg',
    dim: '480 × 360',
    ratio: '4:3',
    use: 'Always available for every video — a dependable fallback when Max HD is missing.',
  },
  {
    name: 'Medium Quality',
    file: 'mqdefault.jpg',
    dim: '320 × 180',
    ratio: '16:9',
    use: 'Good for compact previews, list items, and link cards.',
  },
  {
    name: 'Default',
    file: 'default.jpg',
    dim: '120 × 90',
    ratio: '4:3',
    use: 'The smallest preview. Useful for tiny icons and dense lists.',
  },
]

const UPLOAD_SPECS = [
  ['Recommended resolution', '1280 × 720 pixels'],
  ['Minimum width', '640 pixels'],
  ['Aspect ratio', '16:9 (the YouTube standard)'],
  ['File formats', 'JPG, PNG, GIF, or BMP'],
  ['Maximum file size', 'Under 2 MB'],
]

export default function ThumbnailSizes() {
  return (
    <>
      <Seo
        title="YouTube Thumbnail Sizes & Dimensions (Full 2026 Reference)"
        description="Every YouTube thumbnail size explained: maxresdefault, sddefault, hqdefault, mqdefault and default — dimensions, aspect ratios, and the official upload spec."
        path="/guides/youtube-thumbnail-sizes"
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'YouTube Thumbnail Sizes & Dimensions',
          description:
            'A complete reference of every YouTube thumbnail resolution and the official upload specification.',
        }}
      />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Guides', to: '/guides' },
              { label: 'Thumbnail sizes' },
            ]}
          />
        }
        eyebrow={
          <>
            <Ruler size={16} aria-hidden="true" /> Reference
          </>
        }
        title="YouTube thumbnail sizes & dimensions"
        subtitle="Every resolution YouTube generates, what it's good for, and the exact spec to hit when you upload your own."
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-4xl">
          <Prose>
            <p>
              When you upload a video, YouTube automatically resizes your
              thumbnail into a fixed set of images. Each one has a specific
              filename and dimension. Knowing them helps you pick the right file
              for the job — whether you&apos;re reusing your own artwork or
              referencing another creator&apos;s work.
            </p>
          </Prose>

          {/* Sizes table */}
          <div className="clay-lg mt-8 overflow-hidden p-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="text-muted-fg">
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Filename</th>
                    <th className="px-4 py-3 font-bold">Dimensions</th>
                    <th className="px-4 py-3 font-bold">Ratio</th>
                    <th className="px-4 py-3 font-bold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((s) => (
                    <tr key={s.file} className="border-t border-border align-top">
                      <td className="px-4 py-4 font-bold text-fg">{s.name}</td>
                      <td className="px-4 py-4 font-mono text-muted-fg">{s.file}</td>
                      <td className="px-4 py-4 font-mono text-muted-fg">{s.dim}</td>
                      <td className="px-4 py-4 text-muted-fg">{s.ratio}</td>
                      <td className="px-4 py-4 leading-relaxed text-muted-fg">{s.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Prose className="mt-10">
            <h2>Which size should I use?</h2>
            <p>
              For almost everything, <strong>Max HD (1280×720)</strong> is the
              one you want — it&apos;s the sharpest and matches YouTube&apos;s own
              upload recommendation. If a video wasn&apos;t uploaded in HD, that
              file won&apos;t exist, and <strong>High Quality (480×360)</strong>{' '}
              is the reliable fallback that every video has.
            </p>
            <p>
              Watch out for aspect ratio: <code>sddefault</code>,{' '}
              <code>hqdefault</code>, and <code>default</code> are stored in a
              4:3 frame, so the 16:9 thumbnail sits letterboxed with bars on the
              top and bottom. The <code>maxresdefault</code> and{' '}
              <code>mqdefault</code> sizes are true 16:9 with no bars.
            </p>
          </Prose>

          <div className="my-10">
            <AdSlot slot={''} label="Advertisement" minHeight={100} />
          </div>

          {/* Upload spec */}
          <div className="clay-lg p-8 md:p-10">
            <div className="flex items-center gap-4">
              <IconBubble tone="accent">
                <Upload size={22} aria-hidden="true" />
              </IconBubble>
              <h2 className="text-2xl font-bold md:text-3xl">
                Uploading your own thumbnail
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-muted-fg">
              If you&apos;re creating a custom thumbnail to upload, hit these
              targets so it looks crisp everywhere it appears:
            </p>
            <ul className="mt-6 space-y-3">
              {UPLOAD_SPECS.map(([label, value]) => (
                <li key={label} className="clay flex items-center justify-between gap-4 p-4">
                  <span className="flex items-center gap-3 font-semibold text-fg">
                    <span className="clay-raised grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card text-accent">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    {label}
                  </span>
                  <span className="text-right font-mono text-sm text-muted-fg">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <Prose className="mt-10">
            <h2>Why thumbnails look different across devices</h2>
            <p>
              YouTube serves whichever size best fits the space — a small preview
              in search, a larger one on the watch page, and a tiny version in
              sidebars. That&apos;s why designing at full 1280×720 matters: your
              artwork is scaled <em>down</em> to fit, so starting large keeps it
              sharp. It also means fine details and small text can disappear at
              preview sizes, which is why bold, simple thumbnails win.
            </p>
            <p>
              Ready to see all of this in action? Paste any link into the{' '}
              <a href="/">thumbnail downloader</a> and compare the sizes
              side-by-side.
            </p>
          </Prose>

          <div className="mt-10">
            <Card className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="!mt-0 text-xl font-bold">Design tips next</h2>
                <p className="mt-1 leading-relaxed text-muted-fg">
                  Now that sizes make sense, learn what makes a thumbnail
                  clickable.
                </p>
              </div>
              <Button
                to="/guides/how-to-make-good-thumbnails"
                variant="primary"
                className="shrink-0"
              >
                Read the design guide <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
