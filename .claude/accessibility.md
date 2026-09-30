# Accessibility — Portfolio-Specific

See [~/.claude/standards/accessibility.md](~/.claude/standards/accessibility.md) for universal WCAG 2.2 AA rules, component patterns, and manual testing checklist.

## Verified Color Palette

These combinations meet the minimum contrast ratios — use only these:

| Foreground | Background | Ratio  | Use                                                               |
| ---------- | ---------- | ------ | ----------------------------------------------------------------- |
| `#F8FAFC`  | `#0F172A`  | ~15:1  | Primary text on dark                                              |
| `#F8FAFC`  | `#1E3A5F`  | ~10:1  | Text on brand navy                                                |
| `#0D9488`  | `#0F172A`  | ~5.2:1 | Large/bold text only — verify per use                             |
| `#64748B`  | `#F8FAFC`  | ~4.6:1 | Muted text on light bg                                            |
| `#CBD5E1`  | `#0F172A`  | 12.0:1 | `brand-subtle` — body text on dark                                |
| `#CBD5E1`  | `#1E3A5F`  | 7.8:1  | `brand-subtle` — body text on navy                                |
| `#94A3B8`  | `#0F172A`  | 7.0:1  | `brand-faint` — labels on dark (not on navy: 4.49:1)              |
| `#94A3B8`  | `#1E293B`  | 5.7:1  | `brand-faint` on `brand-panel`                                    |
| `#2DD4BF`  | `#0F172A`  | 9.6:1  | `brand-accent` — teal text on dark                                |
| `#0F766E`  | `#FFFFFF`  | 5.5:1  | `brand-teal-text` — teal text on white/light (5.2:1 on `#F8FAFC`) |
| `#475569`  | `#FFFFFF`  | 7.6:1  | `brand-ink` — secondary text on white/light                       |

Do not introduce new color combinations without verifying contrast with a tool.

## Focus Ring Standard (this project)

All interactive elements must use:

```
focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:outline-none
```

The ring/offset color changes per surface (e.g. `focus:ring-white` on the
navy `ContactBar`). Two canonical implementations exist, one per element
family — reach for the matching one instead of hand-writing focus-ring
classes on a new element:

- **CTA/link buttons** (a background or bordered pill, e.g. "View Resume",
  "Get in Touch on LinkedIn") — `src/components/ui/Button.jsx`.
- **Plain text links** (nav items, the footer LinkedIn link, the language
  switcher trigger — text with a hover color and no background/border) —
  `NAV_LINK_BASE` from `src/components/layout/navLinkClass.js`. `Button`
  doesn't fit this family: it always renders a background or border, which
  a plain nav-style text link shouldn't have.

## Skip-to-Content Link

```jsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-teal focus:text-white focus:rounded focus:ring-2 focus:ring-white"
>
  Skip to main content
</a>
```

Place as the very first child of `<body>` (inside Navbar.jsx).

## Main Content Landmark

```jsx
<main id="main-content" tabIndex={-1} className="scroll-mt-20">
```

`tabIndex={-1}` allows programmatic focus from the skip link. `scroll-mt-20` prevents fixed header overlap.
