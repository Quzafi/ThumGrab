import { Eyebrow } from './ui.jsx'

/**
 * Standard hero for content pages: optional breadcrumb slot, eyebrow, h1,
 * subtitle, and any extra children (e.g. the tool, CTAs).
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumbs, children, center }) {
  return (
    <header className="relative">
      <div className={center ? 'container-page py-12 text-center md:py-16' : 'container-page py-12 md:py-16'}>
        {breadcrumbs}
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h1 className={center ? 'mx-auto max-w-3xl text-4xl md:text-5xl' : 'max-w-3xl text-4xl md:text-5xl'}>
          {title}
        </h1>
        {subtitle ? (
          <p
            className={
              center
                ? 'mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-fg md:text-xl'
                : 'mt-5 max-w-2xl text-lg leading-relaxed text-muted-fg md:text-xl'
            }
          >
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  )
}
