import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center min-h-touch font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

const SIZES = new Map([
  ['md', 'px-6 py-3'],
  ['sm', 'px-5 py-2.5'],
]);

/**
 * Visual style for each variant+surface combination actually used on the
 * site, including the focus ring/offset colors appropriate for that
 * surface. Keyed as `${variant}:${surface}` rather than composed
 * orthogonally, since only a handful of combinations are ever needed and
 * a lookup avoids producing nonsensical pairings (e.g. a white ring on a
 * light surface).
 */
const STYLES = new Map([
  [
    'primary:dark',
    'bg-brand-teal text-white hover:bg-brand-teal-hover focus:ring-brand-teal focus:ring-offset-brand-dark',
  ],
  [
    'outline:dark',
    'border border-brand-teal text-brand-teal hover:bg-brand-navy focus:ring-brand-teal focus:ring-offset-brand-dark',
  ],
  [
    'ghost:dark',
    'text-brand-light hover:text-brand-teal focus:ring-brand-teal focus:ring-offset-brand-dark',
  ],
  [
    'primary:navy',
    'bg-brand-teal text-white hover:bg-brand-teal-hover focus:ring-white focus:ring-offset-brand-navy',
  ],
  [
    'outline:navy',
    'border border-brand-teal text-brand-light hover:bg-brand-dark focus:ring-white focus:ring-offset-brand-navy',
  ],
  [
    'primary:light',
    'bg-brand-teal text-white hover:bg-brand-teal-hover focus:ring-brand-teal focus:ring-offset-brand-light',
  ],
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
 *   size?: 'md' | 'sm',
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
  const classes = [
    BASE,
    SIZES.get(size),
    STYLES.get(`${variant}:${surface}`),
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
