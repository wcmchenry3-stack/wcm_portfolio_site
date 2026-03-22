# Code Style — Portfolio Specific

See [~/.claude/standards/code-style.md](~/.claude/standards/code-style.md) for universal conventions (functional components, named exports, Tailwind ordering, import ordering, no inline styles).

## Portfolio-Specific Decisions

- No per-component CSS files — only `index.css` at root level
- `App.jsx` and page files may use default exports (React Router requirement)
- JSDoc comments required on components with non-trivial props:
  ```js
  /**
   * @param {{ company: string, roles: Array<{ title: string, bullets: string[] }> }} props
   */
  export function ExperienceItem({ company, roles }) {
  ```
