# Testing — Portfolio Component Cases

See [~/.claude/standards/testing.md](~/.claude/standards/testing.md) for universal conventions (coverage thresholds, accessible query priority, what not to test).

## Framework

- **Test runner:** Vitest (globals: true, environment: jsdom)
- **Setup file:** `src/test/setup.js` — imports `@testing-library/jest-dom`
- **Run:** `npm run test:run` (CI), `npm test` (watch), `npm run test:coverage`

## Component Test Cases

### Navbar

- Renders skip-to-content link as first focusable element with `href="#main-content"`
- Skip link has `sr-only` class by default
- Hamburger has `aria-expanded="false"` by default, `aria-controls="mobile-menu"`
- Clicking hamburger sets `aria-expanded="true"`
- Mobile menu closes on Escape key
- Mobile menu is exposed as a `<nav>` landmark, not a `div` with `role="navigation"`
- Clicking a mobile nav link closes the menu (`aria-expanded` returns to `false`)

### Footer

- LinkedIn link has `target="_blank"`, `rel="noopener noreferrer"`, descriptive `aria-label`

### HeroSection

- Renders main headline
- Headshot `<img>` has non-empty `alt`
- "View Resume" link navigates to `/resume`

### ImpactSection

- Heading and intro sentence resolve from the `home` namespace
- One `<li>` per proof point (`src/data/impact.js`), each with its stat, headline, and description
- Outro sentence renders

### SelectedWorkSection

- Heading and intro resolve from the `home` namespace
- Every featured and supporting project (`src/data/projects.js`) renders as a card with its name, category, and tagline
- Project links open in a new tab with `rel="noopener noreferrer"`

### CareerBridgeSection

- Heading and body resolve from the `home` namespace
- CTA link navigates to `/resume`

### ContactBar

- Heading and CTA sentence render
- LinkedIn button opens in a new tab with `noopener`
- Email button links to a `mailto:` address without `target`/`rel`

### LanguageSwitcher

- Root element carries `data-testid="language-switcher"` (the print stylesheet's target — see `src/index.css`)
- Trigger button shows the current locale, has `aria-haspopup="listbox"` and `aria-expanded`
- Opens a `listbox` of all `LOCALES` on click; exactly one option is `aria-selected`
- Closes on Escape and after selecting a locale; all options are keyboard-reachable

### ExperienceItem

- Renders company name, all role titles, bullets as `<li>` elements
- Handles both single-role and multi-role formats
- Single-role and multi-role entries each resolve translations under their own independent i18n key path (`experience.<key>` vs `experience.<key>.role_<n>`)

### UI primitives (`src/components/ui/`)

- `Button` — renders `Link`/`<a>`/`<button>` based on `to`/`href`/neither; external `http(s)` hrefs get `target="_blank" rel="noopener noreferrer"`; every variant/surface combo includes the focus-ring classes
- `Container` — `size` maps to the right max-width class; always includes the gutter padding
- `SectionHeading` — renders the heading with the given `id`; intro is optional; `tone="resume"` has no built-in margin (callers supply it via `className`)
- `PageMain` — `id="main-content"`, `tabIndex={-1}`, always includes `scroll-mt-20 flex-1`
- `LinkedInIcon` — `aria-hidden="true"`; default and custom sizing

### Home / Resume pages

- Renders without crash
- Contains `<main>` landmark with `id="main-content"`
- Resume page renders the Professional Summary, Experience, Capabilities, and Education & Certifications sections

## Data File Tests

### experience.js

- Array with length > 0; each entry has `company` and `i18nKey`
- Single-role entries have `title`, `startDate`, `endDate` (or `null` for a current role), and a `bullets` array
- Multi-role entries have a `roles` array, each with the same shape
