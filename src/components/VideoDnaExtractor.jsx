import { useEffect, useState } from 'react'
import {
  Dna,
  Sparkles,
  Copy,
  Check,
  Zap,
  Target,
  FileText,
  Palette,
  Share2,
  CheckCircle2,
} from 'lucide-react'
import { copyText } from '../lib/clipboard.js'
import { IconBubble, Button } from './ui.jsx'

// Common power words for YouTube copywriting analysis
const POWER_WORDS = [
  'secret', 'secrets', 'best', 'top', 'worst', 'how to', 'stop', 'never',
  'easy', 'fast', 'free', 'ultimate', 'guide', 'review', 'vs', 'why', 'hack',
  'hacks', 'truth', 'exposed', 'mistake', 'mistakes', '2026', '2025', 'new',
  'insane', 'unbelievable', 'shocking', 'complete', 'simple', 'money', 'proven',
]

function analyzeTitleDna(title) {
  if (!title) {
    return {
      score: 75,
      emotionalHook: 'Informative & Direct',
      headlineType: 'Standard Title',
      powerWordsFound: [],
      lengthStatus: 'Good length',
      capitalizationStyle: 'Sentence case',
    }
  }

  const lower = title.toLowerCase()
  const words = title.split(/\s+/)
  
  // Power words check
  const foundPowerWords = POWER_WORDS.filter((pw) => lower.includes(pw))

  // Hook type determination
  let emotionalHook = 'Informative / Direct'
  if (lower.includes('why') || lower.includes('secret') || lower.includes('truth') || lower.includes('exposed')) {
    emotionalHook = '🔥 Curiosity & Intrigue'
  } else if (lower.includes('how to') || lower.includes('guide') || lower.includes('tutorial') || lower.includes('easy')) {
    emotionalHook = '💡 Educational & Actionable'
  } else if (lower.includes('stop') || lower.includes('never') || lower.includes('mistake') || lower.includes('worst')) {
    emotionalHook = '⚠️ Warning / FOMO'
  } else if (lower.includes('vs') || lower.includes('best') || lower.includes('top')) {
    emotionalHook = '⚡ High Impact Comparison'
  }

  // Headline structural type
  let headlineType = 'Statement'
  if (title.includes('?')) headlineType = 'Question Hook'
  else if (/\b\d+\b/.test(title)) headlineType = 'Numbered / Listicle'
  else if (lower.includes(' vs ') || lower.includes(' versus ')) headlineType = 'Versus Comparison'
  else if (lower.includes('how to')) headlineType = 'How-To Guide'

  // Length check
  let lengthStatus = 'Optimal (40-60 chars)'
  if (title.length < 30) lengthStatus = 'Short (Ultra-punchy)'
  else if (title.length > 70) lengthStatus = 'Long (May truncate on mobile)'

  // Score calculation
  let score = 65
  if (foundPowerWords.length > 0) score += 15
  if (headlineType !== 'Statement') score += 10
  if (title.length >= 35 && title.length <= 65) score += 10

  return {
    score: Math.min(98, score),
    emotionalHook,
    headlineType,
    powerWordsFound: Array.from(new Set(foundPowerWords)),
    lengthStatus,
    capitalizationStyle: words.some((w) => w === w.toUpperCase() && w.length > 2)
      ? 'ALL CAPS Emphasis'
      : 'Standard Case',
  }
}

export default function VideoDnaExtractor({ title, author, tags = [], videoId }) {
  const [copied, setCopied] = useState(false)
  const titleDna = analyzeTitleDna(title)

  const dnaBlueprint = `🧬 YOUTUBE VIDEO DNA BLUEPRINT 🧬
====================================
• Video Title: ${title || 'N/A'}
• Creator/Channel: ${author || 'N/A'}
• Video Link: https://youtu.be/${videoId}

1. COPYWRITING & TITLE DNA:
   - Clickability Score: ${titleDna.score}/100
   - Emotional Hook: ${titleDna.emotionalHook}
   - Headline Format: ${titleDna.headlineType}
   - Power Words: ${titleDna.powerWordsFound.join(', ') || 'None detected'}
   - Length Analysis: ${titleDna.lengthStatus}

2. SEO & TOPIC FINGERPRINT:
   - Primary Tags: ${tags.length ? tags.slice(0, 8).join(', ') : 'Generated from title'}
   - Content Archetype: ${tags.length > 5 ? 'Multi-Keyword Optimized' : 'Focused Single Topic'}

3. VISUAL STYLE DNA:
   - Recommended Thumbnail Badges: "MUST WATCH", "2026 UPDATE", "EXPOSED"
   - Recommended Aspect Ratio: 16:9 (1280x720 HD)
====================================
Extracted 100% Client-Side via ThumbGrab`

  async function handleCopyBlueprint() {
    const ok = await copyText(dnaBlueprint)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="clay mt-6 overflow-hidden p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <IconBubble tone="primary">
            <Dna size={24} className="text-primary animate-pulse" aria-hidden="true" />
          </IconBubble>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-primary">
                Content DNA Fingerprint
              </span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                1-Click Blueprint
              </span>
            </div>
            <h3 className="mt-1 text-xl font-bold">Video & Thumbnail DNA Extractor</h3>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={handleCopyBlueprint} className="shrink-0">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'DNA Blueprint Copied!' : 'Copy DNA Blueprint'}
        </Button>
      </div>

      {/* DNA Breakdown Grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Title Copywriting DNA */}
        <div className="rounded-2xl bg-muted/50 p-4 border border-border/60">
          <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-fg">
              <FileText size={16} className="text-primary" /> Title Copywriting DNA
            </h4>
            <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-black text-primary">
              {titleDna.score}/100 Score
            </span>
          </div>

          <ul className="mt-3 space-y-2.5 text-xs font-medium">
            <li className="flex justify-between items-center text-muted-fg">
              <span>Emotional Hook Type:</span>
              <span className="font-bold text-fg">{titleDna.emotionalHook}</span>
            </li>
            <li className="flex justify-between items-center text-muted-fg">
              <span>Headline Format:</span>
              <span className="font-bold text-fg">{titleDna.headlineType}</span>
            </li>
            <li className="flex justify-between items-center text-muted-fg">
              <span>Capitalization Style:</span>
              <span className="font-bold text-fg">{titleDna.capitalizationStyle}</span>
            </li>
            <li className="flex justify-between items-center text-muted-fg">
              <span>Length Check:</span>
              <span className="font-bold text-fg">{titleDna.lengthStatus}</span>
            </li>
          </ul>

          {titleDna.powerWordsFound.length > 0 ? (
            <div className="mt-3.5 border-t border-border/40 pt-2.5">
              <span className="block text-[11px] font-bold text-muted-fg uppercase mb-1">
                Detected High-CTR Power Words:
              </span>
              <div className="flex flex-wrap gap-1">
                {titleDna.powerWordsFound.map((pw) => (
                  <span key={pw} className="rounded-md bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent">
                    🔥 {pw}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Niche & SEO Tag Fingerprint */}
        <div className="rounded-2xl bg-muted/50 p-4 border border-border/60">
          <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-fg">
              <Target size={16} className="text-accent" /> Niche & Keyword Fingerprint
            </h4>
            <span className="rounded-lg bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
              SEO DNA
            </span>
          </div>

          <div className="mt-3">
            <span className="block text-[11px] font-bold text-muted-fg uppercase mb-1.5">
              Primary Keyword DNA Cluster:
            </span>
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 6).map((tag) => (
                  <span key={tag} className="rounded-lg bg-card border border-border px-2.5 py-1 text-xs font-semibold text-fg">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-fg">Keywords extracted directly from video metadata.</p>
            )}
          </div>

          <div className="mt-4 border-t border-border/40 pt-2.5">
            <span className="block text-[11px] font-bold text-muted-fg uppercase mb-1">
              Visual Strategy Prescription:
            </span>
            <p className="text-xs text-muted-fg leading-relaxed">
              Use a bold contrast badge like <span className="font-bold text-primary">"4K HD"</span> or <span className="font-bold text-accent">"NEW"</span> in our Editor to complement this video's DNA structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
