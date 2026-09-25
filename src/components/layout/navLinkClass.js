/**
 * Shared class fragment for the header/footer "text link" family: the
 * Navbar route links, the Footer LinkedIn link, and the LanguageSwitcher
 * trigger. Every one of them lives on the dark surface, so the focus
 * ring/offset colors are fixed here rather than parameterized.
 *
 * Deliberately excludes text color and font-weight — those still vary
 * per caller (Footer uses `text-brand-muted` with regular weight; Navbar
 * and LanguageSwitcher use `text-brand-light` with `font-medium`, and
 * Navbar's active state overrides to `text-brand-teal`) — and excludes
 * flex/gap layout, which differs per caller's icon/content arrangement.
 */
export const NAV_LINK_BASE =
  'text-sm hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark rounded px-2 py-1 min-h-touch';
