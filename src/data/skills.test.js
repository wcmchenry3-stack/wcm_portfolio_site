import { describe, it, expect } from 'vitest';
import { softSkillKeys, technicalSkillKeys } from './skills.js';

const I18N_KEY_RE = /^[\w.]+$/;

describe('softSkillKeys', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(softSkillKeys)).toBe(true);
    expect(softSkillKeys.length).toBeGreaterThan(0);
  });

  it('every key is a valid dot-separated i18n key string', () => {
    softSkillKeys.forEach((key) => {
      expect(typeof key).toBe('string');
      expect(I18N_KEY_RE.test(key)).toBe(true);
      expect(key.startsWith('skills.soft.')).toBe(true);
    });
  });
});

describe('technicalSkillKeys', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(technicalSkillKeys)).toBe(true);
    expect(technicalSkillKeys.length).toBeGreaterThan(0);
  });

  it('every key is a valid dot-separated i18n key string', () => {
    technicalSkillKeys.forEach((key) => {
      expect(typeof key).toBe('string');
      expect(I18N_KEY_RE.test(key)).toBe(true);
      expect(key.startsWith('skills.tech.')).toBe(true);
    });
  });
});
