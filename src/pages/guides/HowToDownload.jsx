import { ArrowRight, Download, Smartphone, Monitor, Wrench, Scale } from 'lucide-react'
import Seo, { JsonLd } from '../../components/Seo.jsx'
import PageHero from '../../components/PageHero.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import Prose from '../../components/Prose.jsx'
import AdSlot from '../../components/AdSlot.jsx'
import { Section, Card, Button, IconBubble } from '../../components/ui.jsx'
import { SITE } from '../../lib/site.js'

const CROSSLINKS = [
  { to: '/guides/youtube-thumbnail-sizes', label: 'YouTube thumbnail sizes explained' },
  { to: '/guides/how-to-make-good-thumbnails', label: 'How to design thumbnails that get clicks' },
  { to: '/faq', label: 'Frequently asked questions' },
]

export default function HowToDownload() {
  return (
    <>
      <Seo
        title="How to Download YouTube Thumbnails (2026 Step-by-Step Guide)"
        description="Learn how to download any YouTube video thumbnail in HD — on desktop, iPhone and Android — using ThumbGrab or the manual URL method. Free, step-by-step."
        path="/guides/how-to-download-youtube-thumbnails"
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to download a YouTube thumbnail',
          description:
            'Download any YouTube video thumbnail in full quality using ThumbGrab.',
          totalTime: 'PT1M',
          step: [
            {
              '@type': 'HowToStep',
              position: 1,
              name: 'Copy the video link',
              text: 'Open the YouTube video and copy its URL from the address bar or the Share button.',
            },
            {
              '@type': 'HowToStep',
              position: 2,
              name: 'Paste it into ThumbGrab',
              text: 'Paste the link into the downloader box on the ThumbGrab home page.',
            },
            {
              '@type': 'HowToStep',
              position: 3,
              name: 'Choose a resolution and download',
              text: 'Pick the resolution you need and click Download, or download every size at once as a ZIP.',
            },
          ],
        }}
      />

      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Guides', to: '/guides' },
              { label: 'How to download' },
            ]}
          />
        }
        eyebrow={
          <>
            <Download size={16} aria-hidden="true" /> Tutorial
          </>
        }
        title="How to download YouTube thumbnails"
        subtitle="Three ways to save any YouTube thumbnail in full quality — the one-click way, the manual way, and how to do it on your phone."
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <p>
              A YouTube thumbnail is just an image file that YouTube stores on
              its servers, which means you can view and save it like any other
              picture on the web. The catch is that YouTube doesn&apos;t give you
              a &ldquo;download thumbnail&rdquo; button, and it keeps several
              different sizes of every thumbnail. This guide shows you the
              quickest way to grab the exact size you want.
            </p>

            <h2>The fastest way: use ThumbGrab</h2>
            <p>
              The simplest method takes about five seconds and works on any
              device with a web browser:
            </p>
            <ol>
              <li>
                <strong>Copy the video URL.</strong> On the YouTube video page,
                copy the link from your browser&apos;s address bar, or tap{' '}
                <strong>Share → Copy link</strong> in the mobile app.
              </li>
              <li>
                <strong>Paste it into the downloader.</strong> Open the{' '}
                <a href="/">ThumbGrab home page</a> and paste the link into the
                box. You can also tap <strong>Paste</strong> to pull it straight
                from your clipboard.
              </li>
              <li>
                <strong>Pick a size and download.</strong> Every available
                resolution appears instantly. Click <strong>Download</strong> on
                the one you want, or use <strong>Download all</strong> to save
                them together as a ZIP.
              </li>
            </ol>
            <p>
              Because everything happens inside your browser, there&apos;s no
              upload, no queue, and nothing is saved on our end.
            </p>
          </Prose>

          <div className="my-10">
            <Card className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <IconBubble tone="accent">
                  <Download size={22} aria-hidden="true" />
                </IconBubble>
                <div>
                  <h2 className="!mt-0 text-xl font-bold">Try it right now</h2>
                  <p className="mt-1 leading-relaxed text-muted-fg">
                    Jump to the downloader and paste a link.
                  </p>
                </div>
              </div>
              <Button to="/" variant="primary" className="shrink-0">
                Open the downloader <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Card>
          </div>

          <Prose>
            <h2>
              <Monitor className="mb-1 mr-1 inline" size={22} aria-hidden="true" /> On a
              desktop or laptop
            </h2>
            <p>
              On Windows, macOS, or Linux the download saves straight to your
              Downloads folder:
            </p>
            <ol>
              <li>Open the video and copy the URL from the address bar.</li>
              <li>
                Paste it into ThumbGrab and click <strong>Get thumbnails</strong>.
              </li>
              <li>
                Click <strong>Download</strong> under your chosen size. The file
                is named clearly, for example{' '}
                <code>youtube-thumbnail-VIDEOID-maxresdefault.jpg</code>.
              </li>
            </ol>

            <h2>
              <Smartphone className="mb-1 mr-1 inline" size={22} aria-hidden="true" /> On
              iPhone or Android
            </h2>
            <p>The steps are almost identical in a mobile browser:</p>
            <ol>
              <li>
                In the YouTube app, tap <strong>Share → Copy link</strong>.
              </li>
              <li>
                Open ThumbGrab in Safari or Chrome and tap the box, then{' '}
                <strong>Paste</strong>.
              </li>
              <li>
                Tap <strong>Download</strong>. On iPhone the image is saved to
                your Files (or Photos, depending on your settings); on Android it
                goes to your Downloads.
              </li>
            </ol>
            <p>
              Tip: if a long-press &ldquo;Save image&rdquo; ever gives you a tiny
              or blurry picture, it&apos;s because the page showed a small preview
              — using the download button guarantees the full-resolution file.
            </p>
          </Prose>

          <div className="my-10">
            <AdSlot slot={''} label="Advertisement" minHeight={100} />
          </div>

          <Prose>
            <h2>
              <Wrench className="mb-1 mr-1 inline" size={22} aria-hidden="true" /> The
              manual method (no tools)
            </h2>
            <p>
              If you just want to view a thumbnail, YouTube stores every image at
              a predictable address. Replace <code>VIDEO_ID</code> with the
              11-character ID from the video&apos;s URL:
            </p>
            <ul>
              <li>
                <code>https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg</code> —
                Max HD (1280×720)
              </li>
              <li>
                <code>https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg</code> — High
                quality (480×360)
              </li>
              <li>
                <code>https://i.ytimg.com/vi/VIDEO_ID/sddefault.jpg</code> —
                Standard (640×480)
              </li>
            </ul>
            <p>
              Open the address in a new tab, then right-click (or long-press) and
              choose <strong>Save image as…</strong>. The downside is that you
              have to know which sizes exist and type each URL by hand — which is
              exactly the tedium ThumbGrab removes.
            </p>

            <h2>Troubleshooting</h2>
            <h3>The Max HD option isn&apos;t showing</h3>
            <p>
              YouTube only creates a <code>maxresdefault</code> image for videos
              uploaded in HD. If it doesn&apos;t exist, ThumbGrab automatically
              hides it and highlights the next-best size, so you&apos;re never
              left with a broken image.
            </p>
            <h3>The download opened the image instead of saving it</h3>
            <p>
              That usually happens with the manual URL method. Use the{' '}
              <strong>Download</strong> button in ThumbGrab instead — it saves a
              proper file with a real name rather than opening the picture in a
              tab.
            </p>

            <h2>
              <Scale className="mb-1 mr-1 inline" size={22} aria-hidden="true" /> A note
              on copyright
            </h2>
            <p>
              Thumbnails are owned by the creator who uploaded them. Saving one
              for private reference, education, or fair-use commentary is
              generally acceptable, but you should not republish someone
              else&apos;s thumbnail as your own or imply that they endorse you.
              When in doubt, ask for permission. See our{' '}
              <a href="/disclaimer">full disclaimer</a> for more.
            </p>
          </Prose>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-bold">Keep reading</h2>
            <ul className="mt-4 space-y-2">
              {CROSSLINKS.map((l) => (
                <li key={l.to}>
                  <Button to={l.to} variant="soft" size="sm">
                    {l.label} <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
