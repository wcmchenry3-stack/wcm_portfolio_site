/**
 * Build-time feature flags, read from Vite env vars (set in the Render
 * dashboard for production; a change needs a redeploy).
 *
 * Each flag is a function rather than a constant so tests can flip it
 * with `vi.stubEnv` without re-importing modules.
 */

/**
 * Non-English locales. Off unless `VITE_ENABLE_TRANSLATIONS=true`: the
 * site renders English only and the language switcher is hidden, so
 * visitors never see half-translated copy while translations lag the
 * English (see #238).
 */
export function translationsEnabled() {
  return import.meta.env.VITE_ENABLE_TRANSLATIONS === 'true';
}
