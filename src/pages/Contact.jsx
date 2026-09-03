import { useState } from 'react'
import { Mail, Send, MessageSquare, ShieldQuestion, Bug } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { Section, Card, Button, IconBubble } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'

const TOPICS = [
  { icon: MessageSquare, label: 'General feedback' },
  { icon: Bug, label: 'Report a problem' },
  { icon: ShieldQuestion, label: 'Copyright / removal' },
]

const fieldClass =
  'clay-inset w-full rounded-2xl bg-muted px-4 py-3 text-fg placeholder:text-muted-fg/70 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring'

function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const subject = String(data.get('subject') || 'General feedback')
    const message = String(data.get('message') || '')
    const body = `${message}\n\n— ${name} (${email})`
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `[${SITE.name}] ${subject}`,
    )}&body=${encodeURIComponent(body)}`
    // Open the visitor's email client with everything pre-filled.
    window.location.href = href
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-fg">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-fg">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-bold text-fg">
          Topic
        </label>
        <select id="subject" name="subject" className={fieldClass}>
          {TOPICS.map((t) => (
            <option key={t.label} value={t.label}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-fg">
          Message
        </label>
        <textarea id="message" name="message" rows={6} required className={fieldClass} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="accent" size="lg">
          <Send size={18} aria-hidden="true" /> Send message
        </Button>
        <p className="text-sm text-muted-fg">
          This opens your email app with the message ready to send.
        </p>
      </div>

      {sent ? (
        <p
          role="status"
          className="rounded-2xl bg-accent/10 px-4 py-3 text-sm font-semibold text-accent"
        >
          Your email app should have opened. If it didn&apos;t, email us directly at{' '}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
            {SITE.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with the ${SITE.name} team — feedback, bug reports, and copyright enquiries.`}
        path="/contact"
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />}
        eyebrow={
          <>
            <Mail size={16} aria-hidden="true" /> Contact
          </>
        }
        title="Contact us"
        subtitle="Questions, feedback, or a copyright concern? We read every message and try to reply within a couple of business days."
      />

      <Section className="!pt-2">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card className="!p-7 md:!p-9">
            <ContactForm />
          </Card>

          <div className="space-y-6">
            <Card>
              <IconBubble tone="accent">
                <Mail size={22} aria-hidden="true" />
              </IconBubble>
              <h2 className="!mt-5 text-lg font-bold">Email us directly</h2>
              <p className="mt-2 leading-relaxed text-muted-fg">
                Prefer your own email client? Reach us at:
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline mt-2 inline-block font-bold text-primary"
              >
                {SITE.email}
              </a>
            </Card>

            <Card>
              <h2 className="!mt-0 text-lg font-bold">What we can help with</h2>
              <ul className="mt-4 space-y-3">
                {TOPICS.map((t) => (
                  <li key={t.label} className="flex items-center gap-3 text-muted-fg">
                    <span className="clay-raised grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card text-primary">
                      <t.icon size={18} aria-hidden="true" />
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
