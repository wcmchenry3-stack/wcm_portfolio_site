# Accessibility — Portfolio Specific

See [~/.claude/standards/accessibility.md](~/.claude/standards/accessibility.md) for the full WCAG 2.2 AA criterion list, universal component patterns, and pre-PR checklist.

## Portfolio Colour Palette — Verified Contrast Ratios

| Foreground | Background | Ratio | Use |
|-----------|-----------|-------|-----|
| `#F8FAFC` | `#0F172A` | ~15:1 ✓ | Body text on dark bg |
| `#F8FAFC` | `#1E3A5F` | ~10:1 ✓ | Text on mid-blue bg |
| `#0D9488` | `#0F172A` | ~5.2:1 ✓ | Large/bold text only — verify per use |
| `#64748B` | `#F8FAFC` | ~4.6:1 ✓ | Secondary text on light bg |

When introducing new colour combinations, verify with a contrast checker before merging.

## Portfolio-Specific Tailwind Tokens

- Focus rings: `focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:outline-none`
- Skip link revealed state: `sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-brand-teal focus:text-white`
- Fixed navbar offset: `scroll-padding-top: 5rem` on `html` in `index.css`

## Axe DevTools — Portfolio Pages

Before every PR touching UI:
1. Open dev server (`npm run dev`)
2. Run axe on **Home** page — resolve all violations before merging
3. Run axe on **Resume** page — resolve all violations before merging
4. Violations are blockers; warnings must be reviewed
