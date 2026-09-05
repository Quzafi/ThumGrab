import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import AiTitleGenerator from '../components/AiTitleGenerator.jsx'
import { Section } from '../components/ui.jsx'
import { Sparkles } from 'lucide-react'

export default function AiTitlePage() {
  return (
    <>
      <Seo
        title="Free AI YouTube Title & Tag Generator (BYOK)"
        description="Generate 8 high-CTR viral YouTube titles and 15 search tags 100% free with your own Gemini API key."
        path="/title-generator"
      />
      <PageHero
        eyebrow={
          <>
            <Sparkles size={16} className="text-accent" /> Free Gemini AI Title Generator
          </>
        }
        title="AI YouTube Title & SEO Tag Generator"
        subtitle="Generate 8 high-CTR viral titles & 15 tag formulas using Google Gemini API. 100% Free with your own free API key."
        center
      >
        <div className="mx-auto mt-8 max-w-3xl text-left">
          <AiTitleGenerator />
        </div>
      </PageHero>
    </>
  )
}
