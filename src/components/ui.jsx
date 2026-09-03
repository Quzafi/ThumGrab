import { Link } from 'react-router-dom'

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */
export function Container({ className = '', children }) {
  return <div className={cx('container-page', className)}>{children}</div>
}

export function Section({ className = '', children, id }) {
  return (
    <section id={id} className={cx('py-14 md:py-20', className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={cx(
        'clay-chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-primary',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, center, className = '' }) {
  return (
    <div className={cx(center && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-fg">{subtitle}</p>
      ) : null}
    </div>
  )
}

export function Card({ className = '', children, as: As = 'div' }) {
  return <As className={cx('clay p-6 md:p-7', className)}>{children}</As>
}

/* ------------------------------------------------------------------ *
 * Button — renders <Link>, <a> or <button> depending on props
 * ------------------------------------------------------------------ */
const VARIANTS = {
  primary: 'bg-primary text-primary-fg',
  accent: 'bg-accent text-accent-fg',
  secondary: 'bg-secondary text-secondary-fg',
  ghost: 'bg-card text-fg',
  soft: 'bg-muted text-fg',
}

const SIZES = {
  sm: 'min-h-11 text-sm px-4 py-2',
  md: 'min-h-11 text-[0.95rem] px-5 py-2.5',
  lg: 'min-h-[3.25rem] text-base md:text-lg px-7 py-3.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  disabled,
  children,
  ...props
}) {
  const cls = cx(
    'clay-btn inline-flex items-center justify-center gap-2 font-bold',
    VARIANTS[variant],
    SIZES[size],
    disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
    className,
  )

  if (to && !disabled) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href && !disabled) {
    return (
      <a
        href={href}
        target={props.target || '_blank'}
        rel={props.rel || 'noopener noreferrer'}
        className={cls}
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ *
 * Small bits
 * ------------------------------------------------------------------ */
export function Badge({ children, tone = 'primary', className = '' }) {
  const tones = {
    primary: 'text-primary',
    accent: 'text-accent',
    muted: 'text-muted-fg',
  }
  return (
    <span
      className={cx(
        'clay-chip inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function IconBubble({ children, tone = 'primary', className = '' }) {
  const tones = {
    primary: 'text-primary',
    accent: 'text-accent',
    secondary: 'text-secondary',
  }
  return (
    <span
      className={cx(
        'clay-raised grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card',
        tones[tone],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

export { cx }
