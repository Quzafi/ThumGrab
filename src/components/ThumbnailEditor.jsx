import { useEffect, useRef, useState } from 'react'
import {
  Download,
  Loader2,
  Palette,
  RotateCcw,
  Sun,
  Type,
  X,
} from 'lucide-react'
import { saveBlob } from '../lib/download.js'
import { Button } from './ui.jsx'

const POSITIONS = {
  top: { x: 0.5, y: 0.18, align: 'center' },
  center: { x: 0.5, y: 0.52, align: 'center' },
  bottom: { x: 0.5, y: 0.84, align: 'center' },
  left: { x: 0.08, y: 0.84, align: 'left' },
}

function hexToRgba(hex, opacity) {
  const value = hex.replace('#', '')
  const red = Number.parseInt(value.slice(0, 2), 16)
  const green = Number.parseInt(value.slice(2, 4), 16)
  const blue = Number.parseInt(value.slice(4, 6), 16)
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

function wrapText(context, text, maxWidth) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (line && context.measureText(next).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 4)
}

export default function ThumbnailEditor({ imageUrl, filename, onClose }) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [overlayColor, setOverlayColor] = useState('#000000')
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [fontSize, setFontSize] = useState(64)
  const [position, setPosition] = useState('bottom')
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      imageRef.current = image
      setLoaded(true)
      setLoadError('')
    }
    image.onerror = () => setLoadError('This thumbnail could not be loaded for editing.')
    image.src = imageUrl
    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [imageUrl])

  const [badgeText, setBadgeText] = useState('')
  const [badgeColor, setBadgeColor] = useState('#e63946')
  const [badgePos, setBadgePos] = useState('top-right')

  useEffect(() => {
    const image = imageRef.current
    const canvas = canvasRef.current
    if (!image || !canvas || !loaded) return

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.filter = `brightness(${brightness}%) contrast(${contrast}%)`
    context.drawImage(image, 0, 0)
    context.filter = 'none'

    if (overlayOpacity > 0) {
      context.fillStyle = hexToRgba(overlayColor, overlayOpacity / 100)
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Render Badge Overlay if set
    if (badgeText.trim()) {
      const scale = canvas.width / 1280
      const bSize = Math.max(16, Math.round(28 * scale))
      context.font = `900 ${bSize}px Arial, sans-serif`
      const textMetrics = context.measureText(badgeText.toUpperCase())
      const padX = Math.round(18 * scale)
      const padY = Math.round(10 * scale)
      const bWidth = textMetrics.width + padX * 2
      const bHeight = bSize + padY * 2
      const margin = Math.round(24 * scale)

      let bx = margin
      let by = margin
      if (badgePos === 'top-right') bx = canvas.width - bWidth - margin
      else if (badgePos === 'bottom-left') by = canvas.height - bHeight - margin
      else if (badgePos === 'bottom-right') {
        bx = canvas.width - bWidth - margin
        by = canvas.height - bHeight - margin
      }

      // Draw Badge Background Pill / Rounded Box
      context.fillStyle = badgeColor
      context.shadowColor = 'rgba(0,0,0,0.6)'
      context.shadowBlur = 12 * scale
      context.beginPath()
      const radius = 8 * scale
      context.roundRect ? context.roundRect(bx, by, bWidth, bHeight, radius) : context.fillRect(bx, by, bWidth, bHeight)
      context.fill()
      context.shadowBlur = 0

      // Draw Badge Text
      context.fillStyle = '#ffffff'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(badgeText.toUpperCase(), bx + bWidth / 2, by + bHeight / 2)
    }

    if (text.trim()) {
      const scale = canvas.width / 1280
      const size = Math.max(18, Math.round(fontSize * scale))
      const layout = POSITIONS[position] || POSITIONS.bottom
      context.font = `800 ${size}px Arial, sans-serif`
      context.textAlign = layout.align
      context.textBaseline = 'middle'
      context.lineJoin = 'round'
      context.lineWidth = Math.max(3, size * 0.12)
      context.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      context.fillStyle = textColor
      const lines = wrapText(context, text, canvas.width * 0.84)
      const lineHeight = size * 1.12
      const startY = canvas.height * layout.y - ((lines.length - 1) * lineHeight) / 2
      const x = canvas.width * layout.x
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight
        context.strokeText(line, x, y)
        context.fillText(line, x, y)
      })
    }
  }, [brightness, contrast, fontSize, loaded, overlayColor, overlayOpacity, position, text, textColor, badgeText, badgeColor, badgePos])

  function reset() {
    setText('')
    setTextColor('#ffffff')
    setOverlayColor('#000000')
    setOverlayOpacity(0)
    setFontSize(64)
    setPosition('bottom')
    setBrightness(100)
    setContrast(100)
    setBadgeText('')
    setBadgeColor('#e63946')
    setBadgePos('top-right')
    setSaveError('')
  }

  async function downloadEdited() {
    const canvas = canvasRef.current
    if (!canvas || !loaded) return
    setSaving(true)
    setSaveError('')
    try {
      const blob = await new Promise((resolve, reject) => {
        try {
          canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('Export failed'))), 'image/jpeg', 0.94)
        } catch (error) {
          reject(error)
        }
      })
      saveBlob(blob, filename.replace(/\.jpg$/i, '-edited.jpg'))
    } catch {
      setSaveError('Editing export was blocked by the image host. Use the original Download button instead.')
    } finally {
      setSaving(false)
    }
  }

  const BADGE_PRESETS = ['4K ULTRA HD', 'LIVE', 'NEW 2026', 'MUST WATCH', 'EXPOSED', 'CHAPTER 1']

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-card p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Thumbnail editor</p>
            <h2 id="editor-title" className="mt-1 text-2xl font-bold">Edit before downloading</h2>
            <p className="mt-1 text-sm text-muted-fg">Add text, badges, and adjust the look. 100% Client-Side editing.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close thumbnail editor">
            <X size={18} aria-hidden="true" /> Close
          </Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid min-h-[16rem] place-items-center overflow-hidden rounded-2xl bg-[#111] p-3">
            {loadError ? <p className="max-w-sm text-center text-sm text-white/80">{loadError}</p> : null}
            {!loaded && !loadError ? <Loader2 className="animate-spin-slow text-white" size={30} aria-label="Loading thumbnail" /> : null}
            <canvas ref={canvasRef} className={loaded ? 'max-h-[60vh] w-auto max-w-full rounded-xl object-contain' : 'hidden'} />
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {/* Badge Overlay Selector */}
            <div className="rounded-2xl bg-muted/60 p-3">
              <label className="block text-sm font-bold text-fg mb-2">
                🏆 Badge Stamp Overlay
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {BADGE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBadgeText(badgeText === preset ? '' : preset)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      badgeText === preset
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-card text-muted-fg hover:text-fg border border-border'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="Or type custom badge text..."
                className="clay-inset w-full px-3 py-2 text-xs font-bold text-fg outline-none"
              />
              {badgeText ? (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <label className="text-xs font-bold text-fg">
                    Badge Color
                    <input
                      type="color"
                      value={badgeColor}
                      onChange={(e) => setBadgeColor(e.target.value)}
                      className="mt-1 h-8 w-full cursor-pointer rounded-lg bg-transparent"
                    />
                  </label>
                  <label className="text-xs font-bold text-fg">
                    Position
                    <select
                      value={badgePos}
                      onChange={(e) => setBadgePos(e.target.value)}
                      className="clay-inset mt-1 w-full px-2 py-1.5 text-xs font-bold outline-none"
                    >
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                    </select>
                  </label>
                </div>
              ) : null}
            </div>

            <label className="block text-sm font-bold text-fg">
              <span className="mb-2 flex items-center gap-2"><Type size={16} className="text-primary" /> Text overlay</span>
              <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Add a title to the thumbnail" className="clay-inset w-full px-4 py-3 text-fg outline-none" />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm font-bold text-fg">Text color<input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-transparent" /></label>
              <label className="text-sm font-bold text-fg">Overlay color<input type="color" value={overlayColor} onChange={(event) => setOverlayColor(event.target.value)} className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-transparent" /></label>
            </div>

            <label className="block text-sm font-bold text-fg">Text position<select value={position} onChange={(event) => setPosition(event.target.value)} className="clay-inset mt-2 w-full px-4 py-3 outline-none"><option value="top">Top</option><option value="center">Center</option><option value="bottom">Bottom</option><option value="left">Bottom left</option></select></label>

            <label className="block text-sm font-bold text-fg">Font size: {fontSize}px<input type="range" min="24" max="120" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} className="mt-2 w-full accent-red-600" /></label>
            <label className="block text-sm font-bold text-fg">Overlay opacity: {overlayOpacity}%<input type="range" min="0" max="70" value={overlayOpacity} onChange={(event) => setOverlayOpacity(Number(event.target.value))} className="mt-2 w-full accent-red-600" /></label>
            <label className="block text-sm font-bold text-fg"><span className="flex items-center gap-2"><Sun size={16} className="text-primary" /> Brightness: {brightness}%</span><input type="range" min="60" max="140" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} className="mt-2 w-full accent-red-600" /></label>
            <label className="block text-sm font-bold text-fg"><span className="flex items-center gap-2"><Palette size={16} className="text-primary" /> Contrast: {contrast}%</span><input type="range" min="60" max="160" value={contrast} onChange={(event) => setContrast(Number(event.target.value))} className="mt-2 w-full accent-red-600" /></label>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="accent" onClick={downloadEdited} disabled={!loaded || saving}>
                {saving ? <Loader2 className="animate-spin-slow" size={17} /> : <Download size={17} />}
                {saving ? 'Preparing…' : 'Download edited'}
              </Button>
              <Button variant="soft" onClick={reset}><RotateCcw size={17} /> Reset</Button>
            </div>
            {saveError ? <p className="text-sm font-semibold text-danger" role="alert">{saveError}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

