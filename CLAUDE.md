# Bill McHenry Portfolio — Claude Standards

## Stack
React + Vite | Tailwind CSS | React Router v6

## Branching
- main → production (Render auto-deploy)
- dev → default branch (integration)
- feature/* → local work, PR into dev; dev → main to release

## Standards (see .claude/ for full details)
- Accessibility: WCAG 2.2 AA required on all UI → see .claude/accessibility.md
- Testing: unit tests required for all components → see .claude/testing.md
- Code style: React/JS conventions → see .claude/code-style.md
- Git workflow: commit format, PR process → see .claude/git-workflow.md

## Key Rules (non-negotiable)
- No `div` for interactive elements — use semantic HTML (`button`, `a`, `nav`, etc.)
- All images must have descriptive `alt` text; decorative images use `alt=""`
- Every interactive element must have a visible focus ring (Tailwind `focus:ring-2`)
- Touch targets minimum 44×44px
- Contrast ratio ≥ 4.5:1 for text, ≥ 3:1 for UI components
- `<html lang="en">` must be present in index.html
- No inline styles — Tailwind utility classes only
- Run `npm run build` before every PR — no broken builds merge

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview prod build: `npm run preview`
- Tests: `npm test`
