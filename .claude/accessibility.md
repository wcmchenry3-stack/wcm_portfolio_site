# Accessibility — Portfolio-Specific

See [~/.claude/standards/accessibility.md](~/.claude/standards/accessibility.md) for universal WCAG 2.2 AA rules, component patterns, and manual testing checklist.

## Verified Color Palette

These combinations meet the minimum contrast ratios — use only these:

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| `#F8FAFC` | `#0F172A` | ~15:1 | Primary text on dark |
| `#F8FAFC` | `#1E3A5F` | ~10:1 | Text on brand navy |
| `#0D9488` | `#0F172A` | ~5.2:1 | Large/bold text only — verify per use |
| `#64748B` | `#F8FAFC` | ~4.6:1 | Muted text on light bg |

Do not introduce new color combinations without verifying contrast with a tool.

## Focus Ring Standard (this project)

All interactive elements must use:
```
focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:outline-none
```

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
