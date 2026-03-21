# Code Style — React + JavaScript

## Component Rules

- **Functional components only** — no class components
- **Named exports** — always `export function ComponentName()`, never `export default function()`
- Exception: `App.jsx` and page files may use default exports for React Router compatibility

## File Naming

- Components: `PascalCase.jsx` (e.g., `HeroSection.jsx`, `ExperienceItem.jsx`)
- Data/utilities: `camelCase.js` (e.g., `skills.js`, `experience.js`)
- Test files: `ComponentName.test.jsx` or `filename.test.js`
- Pages: `PascalCase.jsx` in `src/pages/`

## Component Structure Order

1. Imports (see import ordering below)
2. Constants/helpers local to the file
3. Component function
4. PropTypes or JSDoc (if props are non-trivial)

## Import Ordering

1. React and React ecosystem (`react`, `react-router-dom`)
2. Third-party libraries
3. Internal components (`../components/...`)
4. Data/utilities (`../data/...`)
5. Styles (only `index.css` at root level; no per-component CSS)

Separate each group with a blank line.

## Tailwind Class Ordering Convention

Apply Tailwind classes in this order within a `className`:
1. Layout (`flex`, `grid`, `block`, `hidden`)
2. Position (`relative`, `absolute`, `fixed`, `sticky`, `top-*`, `z-*`)
3. Sizing (`w-*`, `h-*`, `max-w-*`, `min-h-*`)
4. Spacing (`p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `gap-*`)
5. Typography (`text-*`, `font-*`, `leading-*`, `tracking-*`)
6. Color/background (`bg-*`, `text-*` color, `border-*`)
7. Border/radius (`border`, `rounded-*`)
8. Shadow/opacity (`shadow-*`, `opacity-*`)
9. Transitions/animation (`transition`, `duration-*`, `ease-*`)
10. Responsive prefixes (`sm:`, `md:`, `lg:`) follow same order within their prefix group
11. State variants (`hover:`, `focus:`, `active:`) at the end

## No Inline Styles

Never use the `style` prop. Use Tailwind utilities. If a value isn't in Tailwind's default scale, use an arbitrary value: `className="min-h-[44px]"`.

## Props Documentation

For components with non-obvious props, add a JSDoc comment:
```js
/**
 * @param {{ company: string, roles: Array<{ title: string, period: string, bullets: string[] }> }} props
 */
export function ExperienceItem({ company, roles }) {
```

## Accessibility in JSX

- Always use `<button>` for clickable non-link elements (never `<div onClick>`)
- Always use `<a href="...">` for navigation (never `<button onClick={() => navigate(...)}>` for direct links)
- Every `<img>` must have an `alt` prop
- Every `<input>` must have a paired `<label>`

## Prohibited Patterns

```jsx
// ❌ No div click handlers
<div onClick={handleClick}>Click me</div>

// ❌ No inline styles
<div style={{ color: 'red' }}>Text</div>

// ❌ No empty alt on meaningful images
<img src="/headshot.jpg" alt="" />

// ❌ No positive tabIndex
<div tabIndex={1}>...</div>

// ✅ Correct patterns
<button onClick={handleClick}>Click me</button>
<p className="text-red-500">Text</p>
<img src="/headshot.jpg" alt="Bill McHenry, Product Manager" />
<div tabIndex={-1}>...</div>  // programmatic focus only
```
