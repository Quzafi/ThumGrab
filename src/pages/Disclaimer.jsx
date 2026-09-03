import { AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Prose from '../components/Prose.jsx'
import { Section } from '../components/ui.jsx'
import { SITE } from '../lib/site.js'

const UPDATED = 'August 29, 2026'

export default function Disclaimer() {
  return (
    <>
      <Seo
        title="Disclaimer"
        description={`Copyright, fair use, and trademark disclaimer for ${SITE.name}, an independent YouTube thumbnail downloader.`}
        path="/disclaimer"
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Disclaimer' }]} />}
        eyebrow={
          <>
            <AlertTriangle size={16} aria-hidden="true" /> Legal
          </>
        }
        title="Disclaimer"
        subtitle={`Last updated: ${UPDATED}`}
      />

      <Section className="!pt-2">
        <div className="mx-auto max-w-3xl">
          <Prose>
            <h2>No affiliation with YouTube or Google</h2>
            <p>
              {SITE.name} is an independent tool. It is{' '}
              <strong>
                not affiliated with, endorsed by, sponsored by, or in any way
                officially connected to YouTube or Google LLC
              </strong>
              . &ldquo;YouTube&rdquo; and the YouTube logo are trademarks of Google
              LLC. All product names, logos, and brands are property of their
              respective owners and are used for identification purposes only.
            </p>

            <h2>Copyright of thumbnails</h2>
            <p>
              The thumbnail images accessible through {SITE.name} are the
              intellectual property of the individuals or organizations that
              created and uploaded the associated videos. {SITE.name} does not
              claim any ownership of, and does not host, these images — they are
              retrieved directly from YouTube&apos;s public image servers to your
              own device.
            </p>

            <h2>Your responsibility</h2>
            <p>
              You are solely responsible for how you use any thumbnail you
              download. By using this Service you acknowledge and agree that:
            </p>
            <ul>
              <li>
                You will respect the copyright and other rights of the
                thumbnail&apos;s owner;
              </li>
              <li>
                You will not republish, redistribute, or commercially exploit a
                thumbnail you do not own without obtaining permission from the
                rights-holder;
              </li>
              <li>
                You will not use a thumbnail in any way that is misleading or that
                implies endorsement, affiliation, or authorship you do not have.
              </li>
            </ul>

            <h2>Fair use</h2>
            <p>
              In some jurisdictions, limited use of copyrighted material for
              purposes such as criticism, commentary, news reporting, teaching,
              scholarship, or research may qualify as &ldquo;fair use&rdquo; (or a
              similar exception). Fair use is fact-specific and varies by country.
              Nothing on this site is legal advice — if you are unsure whether your
              intended use is permitted, consult a qualified legal professional.
            </p>

            <h2>Intended purpose</h2>
            <p>
              {SITE.name} is provided to help creators access their own
              thumbnails and to allow designers, students, and researchers to
              reference thumbnails for legitimate purposes. It is not intended to
              facilitate copyright infringement of any kind.
            </p>

            <h2>Copyright complaints</h2>
            <p>
              We respect intellectual property rights. Because we do not host any
              thumbnail images ourselves, the most effective route for content
              removal is usually through YouTube. However, if you are a
              rights-holder with a concern about how our Service is being used,
              please contact us at{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond
              promptly.
            </p>

            <h2>No warranty</h2>
            <p>
              The Service and all information on this site are provided on an
              &ldquo;as is&rdquo; basis without warranties of any kind. We make no
              guarantee regarding availability, accuracy, or fitness for a
              particular purpose. Your use of the Service is at your own risk. See
              our <a href="/terms">Terms of Service</a> for more.
            </p>
          </Prose>
        </div>
      </Section>
    </>
  )
}
