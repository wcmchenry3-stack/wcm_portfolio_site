/**
 * The `<h2>` (plus optional intro paragraph) pattern repeated across
 * every section. Three tones cover every current use:
 *
 * - `light` — on a dark/navy section background (ContactBar,
 *   CareerBridgeSection). Centers itself regardless of whether the
 *   parent container also sets `text-center`.
 * - `dark` — on a light/white section background (ImpactSection,
 *   SelectedWorkSection). Centers itself and constrains the intro to
 *   `max-w-2xl` since the rest of the section (a grid) is not centered.
 * - `resume` — the resume page's sub-heading style (underlined, no
 *   intro paragraph).
 *
 * No tone bakes in a margin-bottom on the heading itself — every caller
 * supplies it via `className`. Two different callers of `light` (`mb-3`
 * on ContactBar, `mb-4` on CareerBridgeSection) and two of `resume`
 * (`mb-3` vs `mb-6`) genuinely need different values, and Tailwind gives
 * `mb-3`/`mb-4` equal specificity, so an appended `className` override
 * on top of a hardcoded default isn't reliable — the caller must always
 * be the one source of truth for this value. The intro paragraph's own
 * margin (`mb-8` for `light`, `mb-12` for `dark`) *is* baked in, since
 * every current caller of each tone already agrees on it.
 *
 * @param {{
 *   id?: string,
 *   tone: 'light' | 'dark' | 'resume',
 *   intro?: import('react').ReactNode,
 *   className: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function SectionHeading({ id, tone, intro, className, children }) {
  if (tone === 'resume') {
    return (
      <h2
        id={id}
        className={`text-xl font-semibold text-brand-navy pb-2 border-b-2 border-brand-teal ${className}`}
      >
        {children}
      </h2>
    );
  }

  const isLight = tone === 'light';

  return (
    <>
      <h2
        id={id}
        className={`text-2xl sm:text-3xl font-bold text-center ${
          isLight ? 'text-brand-light' : 'text-brand-dark'
        } ${className}`}
      >
        {children}
      </h2>
      {intro && (
        <p
          className={
            isLight
              ? 'text-brand-light/80 text-center mb-8'
              : 'text-brand-muted text-center max-w-2xl mx-auto mb-12'
          }
        >
          {intro}
        </p>
      )}
    </>
  );
}
