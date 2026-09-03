import { ArrowRight, BookOpen, Download, Ruler, Palette, HelpCircle } from 'lucide-react'
import Seo from '../../components/Seo.jsx'
import PageHero from '../../components/PageHero.jsx'
import Breadcrumbs from '../../components/Breadcrumbs.jsx'
import AdSlot from '../../components/AdSlot.jsx'
import { Section, Card, Button, IconBubble } from '../../components/ui.jsx'

const GUIDES = [
  {
    to: '/guides/how-to-download-youtube-thumbnails',
    icon: Download,
    title: 'How to download YouTube thumbnails',
    body: 'A step-by-step walkthrough for desktop and mobile, plus manual methods and troubleshooting.',
    tag: 'Tutorial',
  },
  {
    to: '/guides/youtube-thumbnail-sizes',
    icon: Ruler,
    title: 'YouTube thumbnail sizes & dimensions',
    body: 'Every thumbnail resolution explained — maxres, SD, HQ and more — and which one to use where.',
    tag: 'Reference',
  },
  {
    to: '/guides/how-to-make-good-thumbnails',
    icon: Palette,
    title: 'How to make thumbnails that get clicks',
    body: 'Design principles, composition tips, and common mistakes to avoid when creating your own thumbnails.',
    tag: 'Design',
  },
]

export default function GuidesIndex() {
  return (
    <>
      <Seo
        title="Guides — YouTube Thumbnails, Sizes & Design"
        description="Free guides on downloading YouTube thumbnails, thumbnail sizes and dimensions, and how to design thumbnails that get more clicks."
        path="/guides"
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Guides' }]} />}
        eyebrow={
          <>
            <BookOpen size={16} aria-hidden="true" /> Guides
          </>
        }
        title="Guides for downloading & designing thumbnails"
        subtitle="Practical, jargon-free articles to help you grab thumbnails the right way and design ones that earn the click."
      />

      <Section className="!pt-2">
        <div className="grid gap-6 md:grid-cols-3">
          {GUIDES.map((g) => (
            <Card key={g.to} as="article" className="flex flex-col">
              <IconBubble>
                <g.icon size={22} aria-hidden="true" />
              </IconBubble>
              <span className="mt-5 text-xs font-bold uppercase tracking-widest text-accent">
                {g.tag}
              </span>
              <h2 className="mt-2 text-xl font-bold">{g.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted-fg">{g.body}</p>
              <Button to={g.to} variant="soft" className="mt-6 self-start">
                Read guide <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <AdSlot slot={''} label="Advertisement" minHeight={100} />
        </div>

        <div className="clay mt-10 flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <IconBubble tone="accent">
              <HelpCircle size={22} aria-hidden="true" />
            </IconBubble>
            <div>
              <h2 className="text-xl font-bold">Still have a question?</h2>
              <p className="mt-1 leading-relaxed text-muted-fg">
                Our FAQ covers legality, formats, Shorts, and more.
              </p>
            </div>
          </div>
          <Button to="/faq" variant="primary" className="shrink-0">
            Visit the FAQ <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </Section>
    </>
  )
}
