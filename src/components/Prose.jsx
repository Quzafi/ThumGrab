import { cx } from './ui.jsx'

/**
 * Long-form article styling without the Tailwind typography plugin.
 * Applies readable rhythm to plain semantic HTML (h2/h3/p/ul/ol/a/code…).
 */
export default function Prose({ children, className = '' }) {
  return (
    <div
      className={cx(
        'max-w-none text-fg',
        '[&>p]:my-4 [&>p]:text-[1.0625rem] [&>p]:leading-[1.75] [&>p]:text-muted-fg',
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-fg md:[&_h2]:text-3xl',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-fg',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-primary',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:marker:text-primary',
        '[&_li]:pl-1 [&_li]:leading-relaxed [&_li]:text-muted-fg',
        '[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent',
        '[&_strong]:font-bold [&_strong]:text-fg',
        '[&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-fg',
        '[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-fg',
        className,
      )}
    >
      {children}
    </div>
  )
}
