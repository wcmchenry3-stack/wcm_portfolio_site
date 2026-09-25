const MAX_WIDTHS = new Map([
  ['lg', 'max-w-5xl'],
  ['md', 'max-w-3xl'],
]);

/**
 * The centered, gutter-padded column every section and page body sits
 * in. `size` picks the max-width; `lg` (the site's standard column) is
 * the default, `md` is used for narrower single-column content like
 * CareerBridgeSection.
 *
 * @param {{
 *   size?: 'lg' | 'md',
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function Container({ size = 'lg', className = '', children }) {
  const classes = [
    MAX_WIDTHS.get(size),
    'mx-auto px-4 sm:px-6 lg:px-8',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <div className={classes}>{children}</div>;
}
