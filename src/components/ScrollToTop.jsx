import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to top on client-side navigation (keeps back/forward feeling right).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}
