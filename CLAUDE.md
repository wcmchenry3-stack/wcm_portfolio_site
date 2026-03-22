# Bill McHenry Portfolio — Claude Standards

## Stack
React + Vite | Tailwind CSS | React Router v6

## Branching
- `main` → production (Render auto-deploy)
- `dev` → default branch (integration)
- `feature/*` → local work, PR into `dev`; `dev` → `main` to release

## Standards
- [Accessibility](.claude/accessibility.md) — WCAG 2.2 AA required on all UI
- [Testing](.claude/testing.md) — unit tests required for all components
- [Code style](.claude/code-style.md) — React/JS conventions
- [Git workflow](.claude/git-workflow.md) — branch strategy, commit format, pre-commit checklist, PR process

## Key Rules (non-negotiable)
- No `div` for interactive elements — use semantic HTML (`button`, `a`, `nav`, etc.)
- All images must have descriptive `alt` text; decorative images use `alt=""`
- Every interactive element must have a visible focus ring (Tailwind `focus:ring-2`)
- Touch targets minimum 44×44px
- Contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI components
- `<html lang="en">` must be present in index.html
- No inline styles — Tailwind utility classes only

## Pre-Commit Checklist (required before every commit)
Run all of the following — **do not commit if any step fails**:

```bash
npm run lint          # ESLint — zero errors required (warnings reviewed)
npm run test:run      # All unit + security tests — zero failures required
npm run build         # Production build — must complete with no errors
npm audit --audit-level=high  # No high or critical vulnerabilities
```

## Merge Rules (non-negotiable)
- **No merge conflicts** — resolve all conflicts before opening a PR
- **All CI checks must pass** — lint, test, build, and audit jobs must be green
- **No broken builds merge** — `npm run build` must succeed on the PR branch
- PRs target `dev`; only `dev` → `main` for releases

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview prod build: `npm run preview`
- Tests (watch): `npm test`
- Tests (CI/single run): `npm run test:run`
- Tests (with coverage): `npm run test:coverage`
- Lint: `npm run lint`
- Dependency audit: `npm audit --audit-level=high`
