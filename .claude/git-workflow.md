# Git Workflow

See [~/.claude/standards/git.md](~/.claude/standards/git.md) for universal branch strategy, conventional commits, and PR process.

## Portfolio Pre-Commit Commands

Run all before staging — do not commit if any step fails:

```bash
npm run lint          # ESLint — zero errors required
npm run test:run      # All unit + security tests — zero failures
npm run build         # Production build — no errors
npm audit --audit-level=high  # No high/critical CVEs
```

## Portfolio PR Accessibility Checklist

Add to every PR that touches UI:

```markdown
## Accessibility
- [ ] axe DevTools — no violations on affected pages
- [ ] Keyboard-only navigation tested
- [ ] Tested at 320px viewport width
- [ ] Tested at 200% zoom
- [ ] Mobile tested at 375px
```

## Releasing to Production

1. Open PR: `dev` → `main`
2. PR title: `release: v<semver>` or `release: <feature summary>`
3. All CI checks must pass
4. Merge triggers Render auto-deploy
5. Verify at `https://billmchenry.org` after deploy
