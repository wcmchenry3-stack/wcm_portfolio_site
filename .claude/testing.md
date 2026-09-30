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

- Headline renders ("Product leader. Team builder. Still ships.") and the eyebrow leads with "Product & People Leader", not a job title
- Uses the standardized "13+ years" framing
- One `<li>` per proof point (`src/data/impact.js`), each with label, stat, and description; no "engineers supported"
- Credibility line names every employer from `experience.js`
- Headshot `<img>` has non-empty `alt`; "See the work" → `#selected-work`; "View resume" → `/resume`; LinkedIn opens in a new tab with `noopener`

### SelectedWorkSection

- Heading and intro resolve from the `home` namespace
- Each featured project (`src/data/projects.js`) has a heading and a "Read the case study" link to `/work/<id>`
- Featured screenshots carry descriptive `alt` text
- Supporting projects open externally with `rel="noopener noreferrer"` and an sr-only "(opens in new tab)"; they get no case-study heading
- `headingLevel={1}` (the `/work` page) promotes every heading by one level

### LeadershipSection

- Section heading, the three habits (`h3`), the four coaching steps in order (`h4`), and the four track-record items render

### CareerSnapshotSection

- Heading uses "13+ years in product leadership"
- One item per employer, newest first, with a year range (multi-role employers span earliest start to latest end; current role ends in "Present")
- CTA links to `/resume`

### ContactBar

- Heading and CTA sentence render
- LinkedIn button opens in a new tab with `noopener`
- "Send a message" links to `/contact`; there is no `mailto:` link anywhere

### ContactForm / Contact page

- Falls back to a LinkedIn link when `VITE_TURNSTILE_SITE_KEY` is unset
- Every field is labelled; there is no file input
- Invalid submit marks fields `aria-invalid` with visible messages and sends nothing
- Valid submit POSTs name/email/message/honeypot/Turnstile token to `/api/contact` and shows a `status` message; a 429 shows an `alert` and resets Turnstile

### Contact Worker (`workers/contact/src/lib.js`)

- Validation, honeypot and token checks; CR/LF stripped from header fields
- MIME is single-part `text/plain`, From our domain, visitor only in Reply-To
- KV fixed-window rate limiting; IPs hashed

### No personal email (`src/test/noPersonalEmail.test.js`)

- No email address outside `example.com`/`example.org`/`billmchenry.org` in `src`, `public`, `workers`, `index.html` or `render.yaml`, and no `mailto:` in site source or locales

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

### CaseStudy page (`/work/:slug`)

- For every entry in `src/data/caseStudies.js`: `<main id="main-content">`, product name as `h1`, every section renders a translated `h2` (no raw i18n keys), the on-page nav links to each section, the GitHub source link opens in a new tab, the breadcrumb links to `/work`, and "Next case study" links to the other study
- Unknown slug renders the not-found page
- BookshelfAI renders its architecture diagram (`figure`) and tradeoffs table; BC Arcade renders screenshots with `alt` text

### Home / Resume / Work pages

- Renders without crash
- Contains `<main>` landmark with `id="main-content"`
- Resume page renders the Professional Summary, Experience, Capabilities, and Education & Certifications sections

## Data File Tests

### experience.js

- Array with length > 0; each entry has `company` and `i18nKey`
- Single-role entries have `title`, `startDate`, `endDate` (or `null` for a current role), and a `bullets` array
- Multi-role entries have a `roles` array, each with the same shape
