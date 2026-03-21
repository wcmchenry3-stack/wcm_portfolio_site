# Testing Standards

## Framework

- **Test runner:** Vitest
- **Component testing:** React Testing Library (`@testing-library/react`)
- **DOM matchers:** `@testing-library/jest-dom`
- **Setup file:** `src/test/setup.js` — imports `@testing-library/jest-dom`

## Setup in `vite.config.js`

```js
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.js',
}
```

## File Naming

- Test files: `ComponentName.test.jsx` (co-located with source or in `__tests__/`)
- Data tests: `filename.test.js`

## Coverage Targets

- Logic-heavy components and data files: aim 80%+
- Pure presentational components: smoke test (renders without crash) is sufficient
- Data files (`skills.js`, `experience.js`): test shape, required fields, no empty strings

## What to Test

### Data files
```js
// skills.js
- softSkills is an array of strings, length > 0
- technicalSkills is an array of strings, length > 0
- No empty strings in either array

// experience.js
- Array with length > 0
- Each entry has `company` (string)
- Each entry has either flat `title`/`period`/`bullets` OR `roles` array
- Each role has `title`, `period`, `bullets` (array of strings)
- No empty bullet strings
```

### Components

**Navbar**
- Renders skip-to-content link as first focusable element
- Skip link href is `#main-content`
- Skip link is visually hidden by default (has `sr-only` class)
- Hamburger button has `aria-expanded="false"` by default
- Hamburger button has `aria-controls="mobile-menu"`
- Clicking hamburger sets `aria-expanded="true"`
- Mobile menu closes on Escape key
- Nav links render with correct `href` values

**Footer**
- Renders LinkedIn link with `target="_blank"`
- LinkedIn link has `rel="noopener noreferrer"`
- LinkedIn link has descriptive `aria-label`

**HeroSection**
- Renders the main headline
- Headshot `<img>` has non-empty `alt` attribute
- "View Resume" link navigates to `/resume`

**SkillsSection**
- Renders an `<h2>` heading
- Soft skills are in a `<ul>` element
- Technical skills are in a `<ul>` element
- Correct number of skill items rendered

**ExperienceItem**
- Renders company name
- Renders all role titles
- Renders bullet points as `<li>` elements
- Handles both single-role and multi-role company formats

**ResumeSummary**
- Renders summary text

**Home page**
- Renders without crash
- Contains `<main>` landmark with `id="main-content"`

**Resume page**
- Renders without crash
- Contains `<main>` landmark with `id="main-content"`

## What NOT to Test

- Implementation details (component state variable names, internal function names)
- CSS class names (test behavior, not styling)
- Third-party library internals (React Router, Tailwind)

## Running Tests

```bash
npm test              # run all tests (watch mode)
npm run test:run      # single run (CI mode)
npm run test:coverage # with coverage report
```

Add to `package.json` scripts:
```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
```
