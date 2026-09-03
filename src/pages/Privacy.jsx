import { ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Prose from '../components/Prose.jsx'
import { Section } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'

const UPDATED = 'August 29, 2026'

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description={`How ${SITE.name} handles data, cookies, and third-party advertising such as Google AdSense.`}
        path="/privacy-policy"
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />
        }
        eyebrow={
          <>
            <ShieldCheck size={16} aria-hidden="true" /> Legal
          </>
        }
        title="Privacy Policy"
        subtitle={`Last updated: ${UPDATED}`}
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <p>
              This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, or &ldquo;our&rdquo;) handles information when you
              use our website at {SITE.url} (the &ldquo;Service&rdquo;). We&apos;ve
              tried to keep it in plain language. By using the Service, you agree
              to the practices described here.
            </p>

            <h2>The short version</h2>
            <p>
              {SITE.name} is designed to work without collecting your personal
              information. We don&apos;t require an account, and the core function
              — parsing a YouTube link and downloading a thumbnail — happens
              directly in your browser. We do not receive, store, or log the
              video links you paste or the images you download.
            </p>

            <h2>Information we collect</h2>
            <h3>Information you provide</h3>
            <p>
              If you email us or use our contact form, we receive the information
              you choose to send (such as your name, email address, and message)
              so we can respond. We use it only for that purpose.
            </p>
            <h3>Information collected automatically</h3>
            <p>
              Like most websites, our hosting provider and analytics or
              advertising partners may automatically receive standard technical
              information such as your IP address, browser type, device type,
              referring pages, and general usage patterns. This helps keep the
              site secure and understand how it is used.
            </p>

            <h2>Cookies and local storage</h2>
            <p>
              We use a small amount of browser local storage to remember your
              preferences — for example, your light or dark theme choice and
              whether you have dismissed the cookie notice. These are essential
              to how the site functions and do not identify you personally.
            </p>
            <p>
              Third-party partners (described below) may set their own cookies.
              You can control or delete cookies through your browser settings at
              any time.
            </p>

            <h2>Advertising</h2>
            <p>
              We may display advertising provided by{' '}
              <strong>Google AdSense</strong>, a service operated by Google LLC.
              To show relevant ads, Google and its partners may use cookies and
              similar technologies, including the{' '}
              <strong>DoubleClick DART cookie</strong>, to serve ads based on your
              visits to this and other websites.
            </p>
            <ul>
              <li>
                Google&apos;s use of advertising cookies enables it and its
                partners to serve ads to you based on your visits to our site
                and/or other sites on the Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                You can also opt out of a third-party vendor&apos;s use of cookies
                for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aboutads.info
                </a>{' '}
                or{' '}
                <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer">
                  youradchoices.com
                </a>
                .
              </li>
            </ul>
            <p>
              For more information on how Google uses data when you use our
              partners&apos; sites or apps, see{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy &amp; Terms
              </a>
              .
            </p>

            <h2>Analytics</h2>
            <p>
              We may use privacy-respecting analytics to understand aggregate
              traffic (such as which pages are popular). Where used, this data is
              collected in aggregate and is not used to personally identify you.
            </p>

            <h2>Third-party links</h2>
            <p>
              Our Service links to external sites, including YouTube. We are not
              responsible for the privacy practices of those sites and encourage
              you to read their policies.
            </p>

            <h2>Your rights (GDPR &amp; CCPA)</h2>
            <p>
              Depending on where you live, you may have rights to access, correct,
              or delete personal information we hold about you, and to object to or
              restrict certain processing. Because we hold very little personal
              data, these requests are usually simple — contact us and we&apos;ll
              help. Visitors in the European Economic Area and California are
              specifically covered by the GDPR and CCPA respectively.
            </p>

            <h2>Children&apos;s privacy</h2>
            <p>
              The Service is not directed to children under 13, and we do not
              knowingly collect personal information from them. If you believe a
              child has provided us information, please contact us so we can remove
              it.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep contact messages only as long as needed to respond and for
              our records. We do not build profiles of visitors.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we&apos;ll revise the &ldquo;Last updated&rdquo; date at the top of
              this page. Continued use of the Service after changes means you
              accept the revised policy.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Email us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use our{' '}
              <a href="/contact">contact page</a>.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  )
}
