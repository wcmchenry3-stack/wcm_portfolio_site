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

### Footer
- LinkedIn link has `target="_blank"`, `rel="noopener noreferrer"`, descriptive `aria-label`

### HeroSection
- Renders main headline
- Headshot `<img>` has non-empty `alt`
- "View Resume" link navigates to `/resume`

### SkillsSection
- Renders `<h2>` heading
- Soft skills and technical skills each in a `<ul>`
- Correct number of items rendered

### ExperienceItem
- Renders company name, all role titles, bullets as `<li>` elements
- Handles both single-role and multi-role formats

### ResumeSummary
- Renders summary text

### Home / Resume pages
- Renders without crash
- Contains `<main>` landmark with `id="main-content"`

## Data File Tests

### skills.js
- `softSkills` and `technicalSkills` are non-empty string arrays with no empty strings

### experience.js
- Array with length > 0; each entry has `company`
- Each entry has flat `title/period/bullets` OR `roles` array
- No empty bullet strings
