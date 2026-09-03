import { HelpCircle, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { Section, Button } from '../components/ui.jsx'

const FAQ = [
  {
    q: 'Is ThumbGrab free to use?',
    a: 'Yes, completely. You can download thumbnails in any resolution, copy image URLs, and grab all sizes as a ZIP without paying or creating an account.',
  },
  {
    q: 'Do I need to install anything or sign up?',
    a: 'No. ThumbGrab runs entirely in your web browser. There is nothing to install and no account to create — just paste a link and download.',
  },
  {
    q: 'What resolutions can I download?',
    a: 'Every size YouTube generates: Max HD (1280×720), Standard Definition (640×480), High Quality (480×360), Medium Quality (320×180), and the small Default (120×90). We automatically detect and show only the sizes that actually exist for your video.',
  },
  {
    q: 'Why is the Max HD (1280×720) thumbnail sometimes unavailable?',
    a: 'YouTube only creates the maxresdefault image for videos that were uploaded in HD. If the source video was lower quality, that size was never generated, so we hide it and highlight the next-best available size instead.',
  },
  {
    q: 'Can I download thumbnails from YouTube Shorts and Live streams?',
    a: 'Yes. Paste a Shorts, Live, or standard watch URL — or even a raw video ID — and ThumbGrab will pull whatever thumbnail sizes exist for it.',
  },
  {
    q: 'What image format are the thumbnails?',
    a: 'Thumbnails are downloaded as JPG files, exactly as YouTube stores them. We do not re-compress or alter the image, so you get the original quality.',
  },
  {
    q: 'Does ThumbGrab store the links I paste or the images I download?',
    a: 'No. The parsing and downloading happen locally in your browser. We do not log the URLs you enter or keep copies of the thumbnails you save.',
  },
  {
    q: 'Is it legal to download a YouTube thumbnail?',
    a: 'Thumbnails are protected by copyright and belong to the creator who uploaded them. Downloading one for personal reference, research, or fair-use commentary is generally acceptable, but republishing someone else’s thumbnail as your own, or in a way that implies endorsement, can infringe their rights. When in doubt, get permission. See our disclaimer for full details.',
  },
  {
    q: 'Can I use a downloaded thumbnail commercially?',
    a: 'Not without permission from the copyright holder. If you did not create the thumbnail and do not own the rights, you should not use it in commercial work. The safest use is private reference and inspiration.',
  },
  {
    q: 'Can I download my own channel’s thumbnails?',
    a: 'Absolutely — and that is one of the most common uses. Grabbing your own thumbnails to reuse in end screens, blog posts, or social media is completely fine since you own them.',
  },
  {
    q: 'How do I download all sizes at once?',
    a: 'After you paste a link, click the “Download all” button. ThumbGrab bundles every available resolution into a single ZIP file with clearly-named images.',
  },
  {
    q: 'The download saved a small or blurry image — what happened?',
    a: 'That usually happens when you long-press and “Save image” on a small on-screen preview. Use the Download button in ThumbGrab instead: it always fetches the full-resolution original.',
  },
  {
    q: 'Is ThumbGrab affiliated with YouTube or Google?',
    a: 'No. ThumbGrab is an independent tool and is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC. “YouTube” is a trademark of Google LLC.',
  },
]

export default function Faq() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers about downloading YouTube thumbnails: resolutions, legality, formats, Shorts, privacy, and how to grab every size as a ZIP."
        path="/faq"
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />}
        eyebrow={
          <>
            <HelpCircle size={16} aria-hidden="true" /> FAQ
          </>
        }
        title="Frequently asked questions"
        subtitle="Everything you might want to know about downloading YouTube thumbnails with ThumbGrab."
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ} />

          <div className="mt-10">
            <AdSlot slot={''} label="Advertisement" minHeight={100} />
          </div>

          <div className="clay mt-10 flex flex-col items-start gap-5 p-8 text-left sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Didn&apos;t find your answer?</h2>
              <p className="mt-1 leading-relaxed text-muted-fg">
                Reach out and we&apos;ll be happy to help.
              </p>
            </div>
            <Button to="/contact" variant="primary" className="shrink-0">
              Contact us <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
