import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import AbFeedSimulator from '../components/AbFeedSimulator.jsx'
import { Eye } from 'lucide-react'

export default function AbTestPage() {
  return (
    <>
      <Seo
        title="YouTube Thumbnail A/B Test Feed Simulator (Free)"
        description="Preview 2 YouTube thumbnails side-by-side in realistic YouTube Dark and Light mode feed card mockups."
        path="/ab-test"
      />
      <PageHero
        eyebrow={
          <>
            <Eye size={16} className="text-primary" /> Visual A/B Test Simulator
          </>
        }
        title="Thumbnail A/B Test Feed Simulator"
        subtitle="Compare 2 thumbnail design options side-by-side inside realistic YouTube feed card mockups before uploading."
        center
      >
        <div className="mx-auto mt-8 max-w-4xl text-left">
          <AbFeedSimulator />
        </div>
      </PageHero>
    </>
  )
}
