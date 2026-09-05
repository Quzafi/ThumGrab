import { useState, useEffect } from 'react'
import {
  Sparkles,
  Key,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Loader2,
  X,
  Lock,
  Tags,
  FileText,
  Trash2,
} from 'lucide-react'
import { copyText } from '../lib/clipboard.js'
import { Button, IconBubble } from './ui.jsx'

const GEMINI_KEY_STORAGE = 'thumbgrab_gemini_api_key'

export default function AiTitleGenerator({ initialTopic = '' }) {
  const [topic, setTopic] = useState(initialTopic)
  const [apiKey, setApiKey] = useState('')
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [modalKeyInput, setModalKeyInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [titles, setTitles] = useState([])
  const [tags, setTags] = useState([])
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [copiedTags, setCopiedTags] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem(GEMINI_KEY_STORAGE) || ''
    setApiKey(savedKey)
  }, [])

  function saveKey(key) {
    const trimmed = key.trim()
    localStorage.setItem(GEMINI_KEY_STORAGE, trimmed)
    setApiKey(trimmed)
    setShowKeyModal(false)
    if (trimmed && topic) {
      runGeneration(trimmed)
    }
  }

  function removeKey() {
    localStorage.removeItem(GEMINI_KEY_STORAGE)
    setApiKey('')
    setModalKeyInput('')
  }

  async function handleGenerate(e) {
    if (e) e.preventDefault()
    if (!topic.trim()) {
      setError('Please enter a video topic, title, or keywords.')
      return
    }
    setError('')

    // Check if API key exists
    if (!apiKey) {
      setShowKeyModal(true)
      return
    }

    runGeneration(apiKey)
  }

  async function runGeneration(keyToUse) {
    setGenerating(true)
    setError('')
    setTitles([])
    setTags([])

    const prompt = `You are a YouTube growth & copywriting expert. Analyze this video topic: "${topic}".
Generate 8 high-CTR, viral YouTube title ideas (mix of Curiosity, How-To, VS, and Warning hooks).
Also generate 15 relevant SEO tags.
Format your response as valid JSON:
{
  "titles": ["Title 1", "Title 2", ...],
  "tags": ["tag1", "tag2", ...]
}`

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${keyToUse}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      )

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson?.error?.message || 'Failed to call Gemini API. Please check your key.')
      }

      const data = await res.json()
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      
      // Clean JSON string markdown blocks if present
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Could not parse AI response.')

      const parsed = JSON.parse(jsonMatch[0])
      setTitles(parsed.titles || [])
      setTags(parsed.tags || [])
    } catch (err) {
      setError(err.message || 'Error generating titles. Please verify your Gemini API Key.')
    } finally {
      setGenerating(false)
    }
  }

  async function handleCopyTitle(title, idx) {
    const ok = await copyText(title)
    if (ok) {
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 1500)
    }
  }

  async function handleCopyAllTags() {
    const ok = await copyText(tags.join(', '))
    if (ok) {
      setCopiedTags(true)
      setTimeout(() => setCopiedTags(false), 1500)
    }
  }

  return (
    <div className="clay p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <IconBubble tone="accent">
            <Sparkles size={22} className="text-accent" />
          </IconBubble>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-accent">
                BYOK Free AI
              </span>
              {apiKey ? (
                <span className="flex items-center gap-1 text-xs font-bold text-accent">
                  <Lock size={12} /> Key Saved
                </span>
              ) : null}
            </div>
            <h3 className="mt-1 text-xl font-bold">AI Viral Title & SEO Tag Generator</h3>
          </div>
        </div>

        {apiKey ? (
          <button
            onClick={removeKey}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-fg hover:text-danger"
            title="Remove stored API key"
          >
            <Trash2 size={14} /> Reset Key
          </button>
        ) : null}
      </div>

      <form onSubmit={handleGenerate} className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter video topic, keyword, or paste YouTube link..."
            className="clay-inset flex-1 px-4 py-3 text-sm font-semibold text-fg outline-none"
          />
          <Button type="submit" variant="accent" disabled={generating}>
            {generating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
            {generating ? 'Generating…' : 'Generate AI Titles'}
          </Button>
        </div>
      </form>

      {error ? (
        <p className="mt-3 rounded-xl bg-danger/10 p-3 text-xs font-bold text-danger">{error}</p>
      ) : null}

      {/* Titles Output */}
      {titles.length > 0 ? (
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-fg">
              <FileText size={16} className="text-primary" /> Generated High-CTR Title Formulas
            </h4>
            <div className="mt-3 space-y-2">
              {titles.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-xl bg-card border border-border p-3 shadow-xs"
                >
                  <p className="text-sm font-bold text-fg leading-snug">{t}</p>
                  <button
                    onClick={() => handleCopyTitle(t, idx)}
                    className="clay-btn shrink-0 px-3 py-1.5 text-xs font-bold text-primary"
                  >
                    {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                    {copiedIndex === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Output */}
          {tags.length > 0 ? (
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-bold text-fg">
                  <Tags size={16} className="text-accent" /> Recommended SEO Search Tags
                </h4>
                <button
                  onClick={handleCopyAllTags}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                >
                  {copiedTags ? <Check size={14} /> : <Copy size={14} />}
                  {copiedTags ? 'Copied All' : 'Copy All Tags'}
                </button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {tags.map((tg, i) => (
                  <span key={i} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-fg">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* GEMINI API KEY POPUP MODAL */}
      {showKeyModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog">
          <div className="relative w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl border border-border">
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute right-4 top-4 text-muted-fg hover:text-fg"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Key size={24} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-fg">Enter Free Gemini API Key</h3>
                <p className="text-xs text-muted-fg font-medium">100% Free · No credit card required · Stored in your browser</p>
              </div>
            </div>

            {/* Guide Step */}
            <div className="mt-4 rounded-xl bg-muted/60 p-4 text-xs space-y-2">
              <p className="font-bold text-fg">How to get a FREE Gemini API Key (30 Seconds):</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-fg">
                <li>Go to <strong>Google AI Studio</strong> (ai.google.dev)</li>
                <li>Sign in with your Google account</li>
                <li>Click <strong>"Get API key"</strong> and copy your free key</li>
              </ol>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary underline"
              >
                Open Google AI Studio <ExternalLink size={13} />
              </a>
            </div>

            {/* Input Box */}
            <div className="mt-5 space-y-3">
              <label className="block text-xs font-bold text-fg">
                Paste your Gemini API Key:
                <input
                  type="password"
                  value={modalKeyInput}
                  onChange={(e) => setModalKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="clay-inset mt-1 w-full px-4 py-3 text-xs font-mono font-bold text-fg outline-none"
                />
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="soft" size="sm" onClick={() => setShowKeyModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!modalKeyInput.trim()}
                  onClick={() => saveKey(modalKeyInput)}
                >
                  Save Key & Generate Titles
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
