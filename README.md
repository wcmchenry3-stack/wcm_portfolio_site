# Bill McHenry — Portfolio Site

Personal portfolio site for Bill McHenry, Product Management Leader based in Calgary, Alberta.

## Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (utility-first, mobile-first)
- **Routing:** React Router v6
- **Testing:** Vitest + React Testing Library
- **Deployment:** Render (static site)
- **Domain:** billmchenry.org

## Branching Strategy

| Branch      | Purpose                             |
| ----------- | ----------------------------------- |
| `main`      | Production — auto-deploys to Render |
| `dev`       | Integration branch (default)        |
| `feature/*` | Feature work — PR into `dev`        |

Release flow: `feature/*` → `dev` → `main`

## Development

```bash
npm install
npm run dev       # localhost:5173
npm run build     # production build → dist/
npm run preview   # preview prod build at localhost:4173
npm test          # run unit tests
```

## Accessibility

This site targets WCAG 2.2 AA compliance. See `.claude/accessibility.md` for full standards.

## Deployment

Deployed as a static site on Render. See `.claude/git-workflow.md` for the PR → deploy process.
