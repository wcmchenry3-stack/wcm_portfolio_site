# Testing — Portfolio Specific

See [~/.claude/standards/testing.md](~/.claude/standards/testing.md) for universal conventions (80% threshold, what not to test, accessible query priority).

## Stack
Vitest + React Testing Library + `@testing-library/jest-dom`

```bash
npm test              # watch mode
npm run test:run      # single run (CI)
npm run test:coverage # with coverage report
```

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
- Skip link is visually hidden by default (`sr-only` class)
- Hamburger has `aria-expanded="false"` by default, `aria-controls="mobile-menu"`
- Clicking hamburger sets `aria-expanded="true"`
- Mobile menu closes on Escape key
- Nav links render with correct `href` values

**Footer**
- LinkedIn link has `target="_blank"`, `rel="noopener noreferrer"`, descriptive `aria-label`

**HeroSection**
- Renders main headline
- Headshot `<img>` has non-empty `alt` attribute
- "View Resume" link navigates to `/resume`

**SkillsSection**
- Renders `<h2>` heading
- Soft and technical skills both in `<ul>` elements
- Correct number of skill items rendered

**ExperienceItem**
- Renders company name, all role titles, bullet points as `<li>`
- Handles both single-role and multi-role formats

**Pages (Home, Resume)**
- Renders without crash
- Contains `<main>` landmark with `id="main-content"`
