import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { Button } from './ui.jsx'

const KEY = 'tg-cookie-consent'

// Lightweight consent notice. Ads/analytics should only set non-essential
// cookies after the visitor accepts (wire this to your CMP / consent-mode
// signal once AdSense is enabled).
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* ignore */
    }
  }, [])

  function decide(choice) {
    try {
      localStorage.setItem(KEY, choice)
    } catch {
      /* ignore */
    }
    setShow(false)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tg-consent', { detail: choice }))
    }
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl animate-fade-up"
    >
      <div className="clay clay-lg flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-start gap-3">
          <span className="clay-raised mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card text-primary">
            <Cookie size={20} aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-muted-fg">
            We use essential cookies to run this site and, if you accept,
            cookies to show ads and understand traffic. See our{' '}
            <Link to="/privacy-policy" className="link-underline text-fg">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <Button variant="soft" size="sm" onClick={() => decide('declined')}>
            Decline
          </Button>
          <Button variant="accent" size="sm" onClick={() => decide('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
