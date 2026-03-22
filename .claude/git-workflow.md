# Git Workflow

## Starting a Work Session (do this every time)

Before touching any code, always pull the latest `dev` from remote and branch off it.
This ensures your feature starts from the most up-to-date integration state.

```bash
# 1. Switch to dev and pull the latest from remote
git checkout dev
git pull origin dev

# 2. Create your feature or bug branch
git checkout -b feature/<name>
# or
git checkout -b fix/<name>

# 3. Start the dev server
npm run dev
```

That's it — you're ready to work.

---

## Finishing a Work Session

When your work is done and ready for review, run the full pre-commit checklist before staging anything.

### Pre-Commit Checklist (all steps required — do not skip)

```bash
# 1. Lint — zero errors required
npm run lint

# 2. All tests — unit tests + security tests must pass with zero failures
npm run test:run

# 3. Production build — must complete with no errors
npm run build

# 4. Dependency audit — no high or critical vulnerabilities
npm audit --audit-level=high
```

**Do not commit if any of the above fails.** Fix the issue first, then re-run the full checklist from the top.

### Committing and Pushing

```bash
# 5. Stage specific files (never git add . blindly)
git add <specific files>

# 6. Commit using Conventional Commits format
git commit -m "feat(scope): short description of what changed"

# 7. Push the feature branch to remote
git push -u origin feature/<name>

# 8. Open a PR on GitHub — base branch must be dev
```

**Never push directly to `dev` or `main`** — the repo requires a PR for both.

---

## Merge Rules (non-negotiable)

- **No merge conflicts** — all conflicts must be resolved before a PR can be merged. If conflicts exist, resolve them on the feature branch, re-run the pre-commit checklist, and push again.
- **All CI checks must pass** — the GitHub Actions CI pipeline runs lint, test, build, and `npm audit` on every PR. Every job must be green before merging.
- **Validation failures block merge** — if any CI job fails, the PR cannot merge. Fix the failure, push to the feature branch, and wait for CI to pass.
- **No force-merging** — do not bypass branch protection or merge a PR with failing checks under any circumstances.

---

## Branch Strategy

| Branch           | Role         | Notes                                               |
| ---------------- | ------------ | --------------------------------------------------- |
| `main`           | Production   | Auto-deploys to Render on push; never push directly |
| `dev`            | Integration  | Default branch in GitHub; never push directly       |
| `feature/<name>` | Feature work | Branch from `dev`; PR back into `dev`               |
| `fix/<name>`     | Bug fixes    | Branch from `dev`; PR back into `dev`               |
| `chore/<name>`   | Maintenance  | Branch from `dev`; PR back into `dev`               |

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
- `security:` — security hardening, header config, audit fixes

### Examples

```
feat(navbar): add skip-to-content link and mobile hamburger
fix(resume): correct heading hierarchy h3→h4 for role titles
a11y(hero): add aria-label to LinkedIn button
test(skills): add shape validation for data arrays
security: add CSP headers and OWASP ZAP scan workflow
chore: configure Vitest and React Testing Library
```

## Pull Request Process

### Opening a PR

1. Run the full pre-commit checklist — all steps must pass
2. Ensure no merge conflicts with `dev`
3. PR title: follow commit message format (`feat(scope): description`)
4. PR base: `dev` (not `main`)

### PR Checklist (in PR description)

```markdown
## Changes

- [ ] Describe what changed

## Pre-Commit Checks

- [ ] `npm run lint` — zero errors
- [ ] `npm run test:run` — zero failures
- [ ] `npm run build` — no errors
- [ ] `npm audit --audit-level=high` — no high/critical CVEs

## Accessibility

- [ ] axe DevTools — no violations on affected pages
- [ ] Keyboard-only navigation tested
- [ ] Tested at 320px viewport width
- [ ] Tested at 200% zoom
- [ ] Mobile tested at 375px

## Merge Readiness

- [ ] No merge conflicts with dev
- [ ] All GitHub Actions CI jobs are green
```

### Releasing to Production

When `dev` is stable and ready to release:

1. Open PR: `dev` → `main`
2. PR title: `release: v<semver>` or `release: <feature summary>`
3. All CI checks must pass on the `dev` → `main` PR
4. Merge triggers Render auto-deploy
5. Verify at `https://billmchenry.org` after deploy

## What Not to Do

- Never `git push --force` to `main` or `dev`
- Never bypass pre-commit hooks with `--no-verify`
- Never commit `.env` files, API keys, or credentials
- Never commit `node_modules/` or `dist/`
- Never amend pushed commits on shared branches
- Never merge a PR with failing CI checks
- Never merge a PR with unresolved conflicts
