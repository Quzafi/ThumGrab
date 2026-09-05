import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import BatchDownloader from '../components/BatchDownloader.jsx'
import { Layers } from 'lucide-react'

export default function BatchPage() {
  return (
    <>
      <Seo
        title="Multi-URL Batch YouTube Thumbnail Downloader (Free)"
        description="Paste multiple YouTube links at once and download all Max HD thumbnails in a single ZIP file."
        path="/batch"
      />
      <PageHero
        eyebrow={
          <>
            <Layers size={16} className="text-primary" /> Multi-URL Batch Processing
          </>
        }
        title="Batch YouTube Thumbnail Downloader"
        subtitle="Paste multiple YouTube video URLs or Shorts links to download all Max HD & HQ thumbnails together."
        center
      >
        <div className="mx-auto mt-8 max-w-4xl text-left">
          <BatchDownloader />
        </div>
      </PageHero>
    </>
  )
}
