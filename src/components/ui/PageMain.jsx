/**
 * The `<main>` landmark every page opens with. `id="main-content"` is
 * the skip link's target (see Navbar) and `tabIndex={-1}` lets that
 * link move focus there programmatically; `scroll-mt-20` keeps the
 * sticky header from covering it when scrolled/focused into view.
 *
 * @param {{
 *   className?: string,
 *   children: import('react').ReactNode,
 * }} props
 */
export function PageMain({ className = '', children }) {
  const classes = ['scroll-mt-20 flex-1', className].filter(Boolean).join(' ');
  return (
    <main id="main-content" tabIndex={-1} className={classes}>
      {children}
    </main>
  );
}
