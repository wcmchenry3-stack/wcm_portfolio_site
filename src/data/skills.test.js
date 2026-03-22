import { describe, it, expect } from 'vitest';
import { softSkills, technicalSkills } from './skills.js';

describe('softSkills', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(softSkills)).toBe(true);
    expect(softSkills.length).toBeGreaterThan(0);
  });

  it('contains only non-empty strings', () => {
    softSkills.forEach((skill) => {
      expect(typeof skill).toBe('string');
      expect(skill.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('technicalSkills', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(technicalSkills)).toBe(true);
    expect(technicalSkills.length).toBeGreaterThan(0);
  });

  it('contains only non-empty strings', () => {
    technicalSkills.forEach((skill) => {
      expect(typeof skill).toBe('string');
      expect(skill.trim().length).toBeGreaterThan(0);
    });
  });
});
