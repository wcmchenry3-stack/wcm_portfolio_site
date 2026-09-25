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
 *   intro paragraph). Deliberately has no built-in margin-bottom: the
 *   four resume sections use two different values (`mb-3` vs `mb-6`),
 *   so callers supply it via `className` rather than fighting a
 *   built-in default via class-order tricks.
 *
 * @param {{
 *   id?: string,
 *   tone: 'light' | 'dark' | 'resume',
 *   intro?: import('react').ReactNode,
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function SectionHeading({ id, tone, intro, className = '', children }) {
  if (tone === 'resume') {
    return (
      <h2
        id={id}
        className={`text-xl font-semibold text-brand-navy pb-2 border-b-2 border-brand-teal ${className}`.trim()}
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
          isLight ? 'text-brand-light mb-4' : 'text-brand-dark mb-3'
        } ${className}`.trim()}
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
