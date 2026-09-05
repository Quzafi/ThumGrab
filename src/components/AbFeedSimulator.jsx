import { useState } from 'react'
import { Eye, Sun, Moon, Sparkles, Layout, Smartphone, Monitor } from 'lucide-react'
import { Button, IconBubble } from './ui.jsx'

export default function AbFeedSimulator() {
  const [imgA, setImgA] = useState('https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg')
  const [imgB, setImgB] = useState('https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg')
  const [title, setTitle] = useState('I Tested The Most Viral YouTube Thumbnail Hacks!')
  const [channel, setChannel] = useState('Creator Studio')
  const [views, setViews] = useState('240K views • 3 days ago')
  const [isDark, setIsDark] = useState(true)

  function handleFile(e, setFn) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFn(url)
    }
  }

  return (
    <div className="clay p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <IconBubble tone="primary">
            <Eye size={22} className="text-primary" />
          </IconBubble>
          <div>
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              Visual Feed Simulator
            </span>
            <h3 className="mt-1 text-xl font-bold">Side-by-Side Thumbnail A/B Test</h3>
          </div>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className="clay-btn flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-fg"
        >
          {isDark ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} className="text-indigo-400" />}
          {isDark ? 'Light Theme Preview' : 'Dark Theme Preview'}
        </button>
      </div>

      {/* Inputs */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-fg mb-1">
            Thumbnail Option A:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, setImgA)}
              className="mt-1 block w-full text-xs font-semibold text-muted-fg file:mr-2 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-primary"
            />
          </label>
        </div>
        <div>
          <label className="block text-xs font-bold text-fg mb-1">
            Thumbnail Option B:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, setImgB)}
              className="mt-1 block w-full text-xs font-semibold text-muted-fg file:mr-2 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-accent"
            />
          </label>
        </div>
      </div>

      {/* Simulated Feed View */}
      <div className={`mt-6 rounded-2xl p-4 transition-colors ${isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-black border border-gray-200'}`}>
        <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4">Simulated YouTube Feed Cards</p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card A */}
          <div className="space-y-2.5">
            <span className="inline-block rounded-md bg-primary px-2 py-0.5 text-[10px] font-black uppercase text-white">
              Variant A
            </span>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <img src={imgA} alt="Option A" className="h-full w-full object-cover" />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-bold text-white">
                14:20
              </span>
            </div>
            <div className="flex gap-3 pt-1">
              <div className="h-9 w-9 shrink-0 rounded-full bg-red-600 font-bold grid place-items-center text-white text-xs">
                CS
              </div>
              <div>
                <h4 className="line-clamp-2 text-sm font-extrabold leading-snug">{title}</h4>
                <p className="mt-1 text-xs opacity-70">{channel} • {views}</p>
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="space-y-2.5">
            <span className="inline-block rounded-md bg-accent px-2 py-0.5 text-[10px] font-black uppercase text-white">
              Variant B
            </span>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              <img src={imgB} alt="Option B" className="h-full w-full object-cover" />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-bold text-white">
                14:20
              </span>
            </div>
            <div className="flex gap-3 pt-1">
              <div className="h-9 w-9 shrink-0 rounded-full bg-red-600 font-bold grid place-items-center text-white text-xs">
                CS
              </div>
              <div>
                <h4 className="line-clamp-2 text-sm font-extrabold leading-snug">{title}</h4>
                <p className="mt-1 text-xs opacity-70">{channel} • {views}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
