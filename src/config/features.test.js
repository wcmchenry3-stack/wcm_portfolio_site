import { describe, it, expect, afterEach, vi } from 'vitest';
import { translationsEnabled } from './features.js';

describe('translationsEnabled', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('is off when the env var is unset', () => {
    expect(translationsEnabled()).toBe(false);
  });

  it('is on only for the exact string "true"', () => {
    vi.stubEnv('VITE_ENABLE_TRANSLATIONS', 'true');
    expect(translationsEnabled()).toBe(true);
    vi.stubEnv('VITE_ENABLE_TRANSLATIONS', '1');
    expect(translationsEnabled()).toBe(false);
  });
});
