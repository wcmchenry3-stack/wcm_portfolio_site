import { describe, it, expect } from 'vitest';
import { experience } from './experience.js';

describe('experience data', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThan(0);
  });

  it('every entry has a company string', () => {
    experience.forEach((job) => {
      expect(typeof job.company).toBe('string');
      expect(job.company.trim().length).toBeGreaterThan(0);
    });
  });

  it('single-role entries have title, period, and bullets array', () => {
    const singleRole = experience.filter((j) => !j.roles);
    singleRole.forEach((job) => {
      expect(typeof job.title).toBe('string');
      expect(job.title.trim().length).toBeGreaterThan(0);
      expect(typeof job.period).toBe('string');
      expect(Array.isArray(job.bullets)).toBe(true);
    });
  });

  it('multi-role entries have a non-empty roles array', () => {
    const multiRole = experience.filter((j) => j.roles);
    multiRole.forEach((job) => {
      expect(Array.isArray(job.roles)).toBe(true);
      expect(job.roles.length).toBeGreaterThan(0);
    });
  });

  it('every role has title, period, and non-empty bullets', () => {
    experience.forEach((job) => {
      const roles = job.roles ?? [
        { title: job.title, period: job.period, bullets: job.bullets },
      ];
      roles.forEach((role) => {
        expect(typeof role.title).toBe('string');
        expect(role.title.trim().length).toBeGreaterThan(0);
        expect(typeof role.period).toBe('string');
        expect(Array.isArray(role.bullets)).toBe(true);
        expect(role.bullets.length).toBeGreaterThan(0);
        role.bullets.forEach((b) => {
          expect(b.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});
