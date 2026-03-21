# Git Workflow

## Branch Strategy

| Branch | Role | Notes |
|--------|------|-------|
| `main` | Production | Auto-deploys to Render on push; never push directly |
| `dev` | Integration | Default branch in GitHub; never push directly |
| `feature/<name>` | Feature work | Branch from `dev`; PR back into `dev` |
| `fix/<name>` | Bug fixes | Branch from `dev`; PR back into `dev` |
| `chore/<name>` | Maintenance | Branch from `dev`; PR back into `dev` |

## Branch Naming Examples

```
feature/navbar-footer
feature/home-page
feature/resume-page
fix/mobile-menu-close
chore/update-dependencies
a11y/focus-ring-audit
```

## Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types
- `feat:` — new feature or component
- `fix:` — bug fix
- `chore:` — tooling, config, dependencies
- `a11y:` — accessibility improvement
- `test:` — adding or updating tests
- `docs:` — documentation changes
- `refactor:` — code change that isn't a fix or feature
- `style:` — formatting, Tailwind class changes only

### Examples
```
feat(navbar): add skip-to-content link and mobile hamburger
fix(resume): correct heading hierarchy h3→h4 for role titles
a11y(hero): add aria-label to LinkedIn button
test(skills): add shape validation for data arrays
chore: configure Vitest and React Testing Library
```

## Pull Request Process

### Opening a PR

1. Ensure `npm run build` passes with no errors
2. Ensure `npm test` passes with no failures
3. Run axe DevTools on affected pages — no violations
4. PR title: follow commit message format (`feat(scope): description`)
5. PR base: `dev` (not `main`)

### PR Checklist (in PR description)

```markdown
## Changes
- [ ] Describe what changed

## Checklist
- [ ] `npm run build` passes
- [ ] `npm test` passes
- [ ] axe DevTools — no violations on affected pages
- [ ] Keyboard-only navigation tested
- [ ] Tested at 320px viewport width
- [ ] Tested at 200% zoom
- [ ] Mobile tested at 375px
```

### Releasing to Production

When `dev` is stable and ready to release:
1. Open PR: `dev` → `main`
2. PR title: `release: v<semver>` or `release: <feature summary>`
3. Merge triggers Render auto-deploy
4. Verify at `https://billmchenry.org` after DNS propagation

## What Not to Do

- Never `git push --force` to `main` or `dev`
- Never bypass pre-commit hooks with `--no-verify`
- Never commit `.env` files, API keys, or credentials
- Never commit `node_modules/` or `dist/`
- Never amend pushed commits on shared branches
