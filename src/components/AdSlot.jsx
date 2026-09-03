import { useEffect, useRef } from 'react'
import { ADSENSE } from '../lib/site.js'
import { cx } from './ui.jsx'

/**
 * A single ad placement.
 *
 * Before AdSense approval (ADSENSE.client === ''), this renders a clearly
 * labelled placeholder so you can see where ads will appear.
 *
 * After approval: set ADSENSE.client + the slot id, and this renders a real
 * <ins class="adsbygoogle"> unit and asks AdSense to fill it.
 */
export default function AdSlot({
  slot,
  format = 'auto',
  label = 'Advertisement',
  minHeight = 120,
  className = '',
}) {
  const ref = useRef(null)
  const pushed = useRef(false)
  const enabled = Boolean(ADSENSE.client && slot)

  useEffect(() => {
    if (!enabled || pushed.current) return
    try {
      // eslint-disable-next-line no-multi-assign
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      /* AdSense script not ready yet */
    }
  }, [enabled])

  return (
    <div className={cx('mx-auto w-full max-w-3xl', className)}>
      <p className="mb-1.5 text-center text-[0.65rem] font-bold uppercase tracking-widest text-muted-fg/70">
        {label}
      </p>
      {enabled ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE.client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="clay-inset grid place-items-center rounded-2xl text-center"
          style={{ minHeight }}
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-muted-fg/70">
            Ad space — enable AdSense in <code className="font-mono">src/lib/site.js</code>
          </span>
        </div>
      )}
    </div>
  )
}
