# Bill McHenry Portfolio — Claude Standards
<!-- Global standards: ~/.claude/CLAUDE.md and ~/.claude/standards/ -->

## Stack
React + Vite | Tailwind CSS | React Router v6

## Branching
- `main` → production (Render auto-deploy)
- `dev` → default branch (integration)
- `feat/*`, `fix/*`, `a11y/*` → local work, PR into `dev`; `dev` → `main` to release

## Standards
- [Git workflow](~/.claude/standards/git.md) — branch strategy, commits, PR process
- [Accessibility](~/.claude/standards/accessibility.md) + [.claude/accessibility.md](.claude/accessibility.md) — WCAG 2.2 AA + portfolio colour palette
- [Testing](~/.claude/standards/testing.md) + [.claude/testing.md](.claude/testing.md) — universal patterns + component-specific cases
- [Code style](~/.claude/standards/code-style.md) — React/JS/Tailwind conventions

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
- PRs target `dev`; only `dev` → `main` for releases
- Merging `dev` → `main` triggers Render auto-deploy to billmchenry.org

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Tests (watch): `npm test`
- Tests (CI): `npm run test:run`
- Tests (coverage): `npm run test:coverage`
- Lint: `npm run lint`
- Audit: `npm audit --audit-level=high`
