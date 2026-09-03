import { useId, useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { JsonLd } from './Seo.jsx'

/**
 * Accessible FAQ accordion (button + aria-expanded/-controls, region panel).
 * `items`: [{ q, a, node? }] — `a` is a plain-text answer used for both the
 * default rendering and the FAQPage schema; pass `node` for richer markup
 * (schema still uses the plain-text `a`).
 */
export default function FaqAccordion({ items, withSchema = true, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const baseId = useId()

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-b-${i}`
        const panelId = `${baseId}-p-${i}`
        return (
          <div key={it.q} className="clay overflow-hidden p-0">
            <h3 className="!mt-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-bold text-fg"
              >
                <span>{it.q}</span>
                <span className="clay-raised grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card text-primary">
                  {isOpen ? (
                    <Minus size={16} aria-hidden="true" />
                  ) : (
                    <Plus size={16} aria-hidden="true" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="-mt-1 px-5 pb-5 leading-relaxed text-muted-fg [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2"
            >
              {it.node || <p>{it.a}</p>}
            </div>
          </div>
        )
      })}

      {withSchema ? (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((it) => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
          }}
        />
      ) : null}
    </div>
  )
}
