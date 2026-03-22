# Accessibility Standards — WCAG 2.2 AA

## Core Principles

Every component must meet WCAG 2.2 AA. When in doubt, choose the more accessible option.

## Criterion-by-Criterion Rules

### Perceivable

- **1.1.1 Non-text content:** All `<img>` elements require `alt` text. Decorative images use `alt=""` and `aria-hidden="true"`. The headshot uses `alt="Bill McHenry, Product Manager"`.
- **1.3.1 Info & relationships:** Use semantic HTML — `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<h1>`–`<h4>`, `<ul>/<li>`. Never use `<div>` or `<span>` where a semantic element exists.
- **1.4.1 Use of color:** Never use color as the _only_ means of conveying information. Active nav link uses both color and underline/weight change.
- **1.4.3 Contrast minimum:** Normal text ≥ 4.5:1, large text ≥ 3:1. Verified palette:
  - `#F8FAFC` on `#0F172A` → ~15:1 ✓
  - `#F8FAFC` on `#1E3A5F` → ~10:1 ✓
  - `#0D9488` on `#0F172A` → ~5.2:1 ✓ (use for large/bold text only — verify per use)
  - `#64748B` on `#F8FAFC` → ~4.6:1 ✓
- **1.4.4 Resize text:** Use `rem`-based sizing. Never set fixed pixel heights on text containers. Page must be usable at 200% zoom.
- **1.4.10 Reflow:** No horizontal scrolling at 320px viewport width. All layouts use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
- **1.4.11 Non-text contrast:** Buttons, inputs, and focus rings must be ≥ 3:1 against adjacent colors.
- **1.4.12 Text spacing:** No loss of content when letter-spacing, word-spacing, line-height, or paragraph spacing are increased. Avoid fixed-height text containers.

### Operable

- **2.1.1 Keyboard:** Every interactive element is reachable and operable via keyboard alone. No mouse-only interactions.
- **2.4.1 Bypass blocks:** Skip-to-content link is the **first focusable element** in the DOM. It is visually hidden until focused. Use `className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-brand-teal focus:text-white"`. Links to `#main-content`.
- **2.4.3 Focus order:** DOM order matches visual order. Never use `tabindex > 0`.
- **2.4.7 Focus visible:** All interactive elements must have Tailwind `focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:outline-none`. Apply globally to buttons and links.
- **2.4.11 Focus not obscured (WCAG 2.2):** Fixed navbar must not fully hide a focused element. Add `scroll-padding-top: 5rem` to `html` element in `index.css`.
- **2.5.8 Target size minimum (WCAG 2.2):** All touch targets ≥ 24×24 CSS px; strongly prefer ≥ 44×44px. Use Tailwind `min-h-[44px] px-4 py-3` on buttons and nav links.

### Understandable

- **3.1.1 Language of page:** `<html lang="en">` always present in `index.html`.
- **3.2.1 On focus:** No context changes on focus (no auto-navigation, no auto-submit).

### Robust

- **4.1.2 Name, role, value:** All UI components must expose name, role, and state.

## Component Patterns

### Skip-to-Content Link

```jsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-teal focus:text-white focus:rounded focus:ring-2 focus:ring-white"
>
  Skip to main content
</a>
```

Place as the very first child of `<body>` (inside App.jsx or Navbar.jsx).

### Mobile Hamburger Button

```jsx
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
  onClick={() => setIsOpen(!isOpen)}
  className="... focus:ring-2 focus:ring-brand-teal focus:outline-none min-h-[44px] min-w-[44px]"
>
```

### Mobile Menu

```jsx
<div id="mobile-menu" role="navigation" aria-label="Mobile navigation">
```

Close on `Escape` key:

```js
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### External Links

```jsx
<a
  href="https://www.linkedin.com/in/bill-mchenry/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Bill McHenry on LinkedIn (opens in new tab)"
  className="... focus:ring-2 focus:ring-brand-teal focus:outline-none"
>
```

### Main Content Landmark

```jsx
<main id="main-content" tabIndex={-1} className="scroll-mt-20">
```

`tabIndex={-1}` allows programmatic focus from skip link. `scroll-mt-20` prevents fixed header overlap.

## Axe DevTools Usage

Before every PR:

1. Install axe DevTools browser extension (Chrome/Firefox)
2. Open dev server (`npm run dev`)
3. Run axe on Home page — resolve all violations before merging
4. Run axe on Resume page — resolve all violations before merging
5. Critical: violations are blockers; warnings should be reviewed

## Manual Testing Checklist

- [ ] Tab through entire page — every link/button receives visible focus ring
- [ ] Shift+Tab moves backwards correctly
- [ ] Enter activates buttons; Space also activates buttons
- [ ] Escape closes mobile menu
- [ ] Screen reader: navigate by headings (h, 1–6 keys in NVDA/JAWS)
- [ ] 200% browser zoom — no horizontal scroll, no content hidden
- [ ] 320px viewport — no horizontal scroll
- [ ] Skip-to-content link appears on first Tab press
