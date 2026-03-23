# Code Style — Portfolio-Specific

See [~/.claude/standards/code-style.md](~/.claude/standards/code-style.md) for universal React/JS conventions.

## File Naming (this project)

- Components: `PascalCase.jsx` in `src/components/<section>/`
- Pages: `PascalCase.jsx` in `src/pages/`
- Tests: co-located as `ComponentName.test.jsx` or `filename.test.js`
- Data: `camelCase.js` in `src/data/`

## Named Exports

Always `export function ComponentName()` — never anonymous default exports.
Exception: `App.jsx` and page files may use default exports for React Router compatibility.

## Tailwind Class Order

Apply classes in this order within `className`:

1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Position (`relative`, `absolute`, `sticky`, `top-*`, `z-*`)
3. Sizing (`w-*`, `h-*`, `max-w-*`)
4. Spacing (`p-*`, `m-*`, `gap-*`)
5. Typography (`text-*`, `font-*`, `leading-*`)
6. Color/background (`bg-*`, `text-*` color, `border-*`)
7. Border/radius (`border`, `rounded-*`)
8. Shadow/opacity (`shadow-*`, `opacity-*`)
9. Transitions (`transition`, `duration-*`)
10. Responsive prefixes (`sm:`, `md:`, `lg:`) follow same order within prefix
11. State variants (`hover:`, `focus:`, `active:`) at the end

## No Per-Component CSS

Only `src/index.css` at the root level — no per-component CSS files.
