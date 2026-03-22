# Bill McHenry Portfolio — Claude Standards
<!-- Global standards: ~/.claude/CLAUDE.md and ~/.claude/standards/ -->

## Stack
React + Vite | Tailwind CSS | React Router v6

## Branching
- `main` → production (Render auto-deploy)
- `dev` → default branch (integration)
- `feature/*` → local work, PR into `dev`; `dev` → `main` to release

## Standards
- [Accessibility](.claude/accessibility.md) — verified color palette and portfolio component patterns
- [Testing](.claude/testing.md) — portfolio component test cases
- [Code style](.claude/code-style.md) — portfolio-specific React/Tailwind conventions
- [Git workflow](.claude/git-workflow.md) — portfolio pre-commit commands and accessibility PR checklist

## Key Rules (non-negotiable)
- No `div` for interactive elements — use semantic HTML (`button`, `a`, `nav`, etc.)
- All images must have descriptive `alt` text; decorative images use `alt=""`
- Every interactive element must have a visible focus ring (Tailwind `focus:ring-2`)
- Touch targets minimum 44×44px
- Contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI components
- `<html lang="en">` must be present in index.html
- No inline styles — Tailwind utility classes only

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview prod build: `npm run preview`
- Tests (watch): `npm test`
- Tests (CI/single run): `npm run test:run`
- Tests (with coverage): `npm run test:coverage`
- Lint: `npm run lint`
- Dependency audit: `npm audit --audit-level=high`
