import { FileText } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Prose from '../components/Prose.jsx'
import { Section } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'

const UPDATED = 'August 29, 2026'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description={`The terms and conditions for using ${SITE.name}, the free YouTube thumbnail downloader.`}
        path="/terms"
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]} />
        }
        eyebrow={
          <>
            <FileText size={16} aria-hidden="true" /> Legal
          </>
        }
        title="Terms of Service"
        subtitle={`Last updated: ${UPDATED}`}
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{' '}
              {SITE.name} (the &ldquo;Service&rdquo;) at {SITE.url}. By accessing
              or using the Service, you agree to be bound by these Terms. If you
              don&apos;t agree, please don&apos;t use the Service.
            </p>

            <h2>1. What the Service does</h2>
            <p>
              {SITE.name} is a free tool that helps you locate and download the
              publicly available thumbnail images associated with YouTube videos.
              It reads a link you provide and retrieves the corresponding
              thumbnail directly in your browser.
            </p>

            <h2>2. Acceptable use</h2>
            <p>You agree that you will not:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of any applicable law;</li>
              <li>
                Infringe the intellectual property or other rights of any
                creator, rights-holder, or third party;
              </li>
              <li>
                Attempt to disrupt, overload, scrape at scale, or reverse-engineer
                the Service or the systems it relies on;
              </li>
              <li>
                Use downloaded thumbnails in a way that is misleading, defamatory,
                or implies endorsement you do not have.
              </li>
            </ul>

            <h2>3. Intellectual property of thumbnails</h2>
            <p>
              Thumbnails retrieved through the Service are the property of their
              respective owners — typically the creator who uploaded the video.{' '}
              {SITE.name} does not own these images and grants you no rights to
              them. You are solely responsible for ensuring that your use of any
              downloaded thumbnail is lawful, including obtaining permission where
              required. Please review our{' '}
              <a href="/disclaimer">Disclaimer</a> for more detail.
            </p>

            <h2>4. No affiliation with YouTube or Google</h2>
            <p>
              {SITE.name} is an independent service. It is not affiliated with,
              endorsed by, sponsored by, or in any way officially connected to
              YouTube or Google LLC. &ldquo;YouTube&rdquo; is a trademark of Google
              LLC. Your use of YouTube&apos;s services remains subject to
              YouTube&apos;s own Terms of Service.
            </p>

            <h2>5. Service provided &ldquo;as is&rdquo;</h2>
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without warranties of any kind, whether
              express or implied. We do not warrant that the Service will be
              uninterrupted, error-free, or that any particular thumbnail size
              will be available for a given video.
            </p>

            <h2>6. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {SITE.name} and its
              operators shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of data or profits,
              arising out of or related to your use of the Service.
            </p>

            <h2>7. Third-party advertising and links</h2>
            <p>
              The Service may display third-party advertising (for example, Google
              AdSense) and may contain links to third-party websites. We are not
              responsible for the content, products, or practices of any
              third-party advertisers or sites.
            </p>

            <h2>8. Changes to the Service and Terms</h2>
            <p>
              We may modify or discontinue the Service, and we may update these
              Terms, at any time. Material changes will be reflected by updating
              the &ldquo;Last updated&rdquo; date above. Your continued use after
              changes constitutes acceptance of the revised Terms.
            </p>

            <h2>9. Governing considerations</h2>
            <p>
              These Terms are intended to be interpreted in a manner consistent
              with applicable law. If any provision is found unenforceable, the
              remaining provisions will continue in full force.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions about these Terms? Email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit our{' '}
              <a href="/contact">contact page</a>.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  )
}
