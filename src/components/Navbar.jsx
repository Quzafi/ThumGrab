import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { Button } from './ui.jsx'
import { NAV, SITE } from '../lib/site.js'

function linkClass({ isActive }) {
  return [
    'rounded-full px-4 py-2 text-[0.95rem] font-bold transition-colors',
    isActive ? 'text-primary clay-chip' : 'text-fg/80 hover:text-primary',
  ].join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-border/70 bg-bg/85 backdrop-blur-md">
        <nav
          className="container-page flex h-16 items-center justify-between gap-4 md:h-20"
          aria-label="Main"
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-xl"
            aria-label={`${SITE.name} home`}
            onClick={() => setOpen(false)}
          >
            <Logo size={38} className="animate-float" />
            <span className="font-bold tracking-tight">{SITE.name}</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button to="/" size="sm" variant="primary" className="hidden sm:inline-flex">
              Open tool
            </Button>
            <button
              type="button"
              className="clay-btn grid h-11 w-11 shrink-0 place-items-center bg-card text-fg md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          className="border-b border-border bg-bg md:hidden"
        >
          <div className="container-page flex flex-col gap-2 py-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'clay rounded-2xl px-5 py-3 text-base font-bold',
                    isActive ? 'text-primary' : 'text-fg',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/contact" variant="accent" className="mt-1" onClick={() => setOpen(false)}>
              Contact us
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
