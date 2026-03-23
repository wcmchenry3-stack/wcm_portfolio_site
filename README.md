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

## Internationalization (i18n)

Supported locales: **en** (default), **fr-CA**, **es**, **hi**, **ar** (RTL).

Translation files live in `public/locales/{locale}/{namespace}.json`.
Per-key context for translators lives in `public/locales/_meta/{namespace}.meta.json`.
Protected terms (brand names, acronyms, proper nouns) are defined in `src/i18n/glossary.js`.

### Check for missing translations

```bash
npm run i18n:check
```

### Translate with OpenAI

Requires `OPENAI_API_KEY` in the environment (never commit it).

```bash
# Translate a single namespace for one locale
export OPENAI_API_KEY=sk-...
node scripts/translate.js --locale fr-CA --namespace common

# Preview without calling the API
node scripts/translate.js --locale ar --namespace resume --dry-run

# Re-translate already-translated keys
node scripts/translate.js --locale es --namespace home --force

# Use a specific model (default: gpt-4o)
node scripts/translate.js --locale hi --namespace resume --model gpt-4o-mini
```

Translate all namespaces for all locales:

```bash
for locale in fr-CA es hi ar; do
  for ns in common home resume; do
    node scripts/translate.js --locale $locale --namespace $ns
  done
done
```

### CI string check

A GitHub Actions workflow (`.github/workflows/i18n-check.yml`) runs on every PR to `dev`
and `main`. If any locale file still contains `__NEEDS_TRANSLATION__` values, it posts a
comment listing the missing keys. The check is **warn-only** — it never blocks merge.

## Accessibility

This site targets WCAG 2.2 AA compliance. See `.claude/accessibility.md` for full standards.

## Deployment

Deployed as a static site on Render. See `.claude/git-workflow.md` for the PR → deploy process.
