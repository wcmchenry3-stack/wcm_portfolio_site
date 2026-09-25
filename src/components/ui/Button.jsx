import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center min-h-touch font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

/**
 * Padding per size. `size="none"` (or any value not in this map) applies
 * no built-in padding at all — the caller supplies its own `px-*`/`py-*`
 * via `className`. This is the escape hatch for a one-off spot that
 * doesn't fit either preset, without inventing a third named size for a
 * single caller, and without relying on `className` overriding a
 * built-in default (Tailwind gives same-scale spacing utilities equal
 * specificity, so an appended override isn't reliable — see NotFound.jsx
 * for the one place that needs this).
 */
const SIZES = new Map([
  ['md', 'px-6 py-3'],
  ['sm', 'px-5 py-2.5'],
]);

/**
 * Background/border/text/hover classes per variant. `outline` is keyed
 * by `outline:${surface}` as well, since — unlike `primary` and `ghost`,
 * whose colors are the same on every surface — its text and hover colors
 * genuinely depend on the surface, not just the variant.
 */
const VARIANT_COLORS = new Map([
  ['primary', 'bg-brand-teal text-white hover:bg-brand-teal-hover'],
  ['ghost', 'text-brand-light hover:text-brand-teal'],
  [
    'outline:dark',
    'border border-brand-teal text-brand-teal hover:bg-brand-navy',
  ],
  [
    'outline:navy',
    'border border-brand-teal text-brand-light hover:bg-brand-dark',
  ],
]);

/**
 * Focus ring + ring-offset color per surface. This part genuinely is a
 * pure function of surface alone (every variant on a given surface uses
 * the same ring), so it's kept as its own small table rather than
 * repeated inside every variant:surface pairing.
 */
const FOCUS_RING = new Map([
  ['dark', 'focus:ring-brand-teal focus:ring-offset-brand-dark'],
  ['navy', 'focus:ring-white focus:ring-offset-brand-navy'],
  ['light', 'focus:ring-brand-teal focus:ring-offset-brand-light'],
]);

/**
 * Shared CTA/link button used across the site.
 *
 * Renders a react-router `Link` when `to` is given, an `<a>` when `href`
 * is given (external http(s) links automatically get
 * `target="_blank" rel="noopener noreferrer"`), or a
 * `<button type="button">` otherwise. Every rendered element carries the
 * project's touch-target and focus-ring accessibility standard.
 *
 * @param {{
 *   to?: string,
 *   href?: string,
 *   variant?: 'primary' | 'outline' | 'ghost',
 *   surface?: 'dark' | 'navy' | 'light',
 *   size?: 'md' | 'sm' | 'none',
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function Button({
  to,
  href,
  variant = 'primary',
  surface = 'dark',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const colorKey = variant === 'outline' ? `outline:${surface}` : variant;
  const classes = [
    BASE,
    SIZES.get(size),
    VARIANT_COLORS.get(colorKey),
    FOCUS_RING.get(surface),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
