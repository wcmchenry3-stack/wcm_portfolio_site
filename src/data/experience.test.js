import { describe, it, expect } from 'vitest';
import { experience } from './experience.js';

function isDateObject(d) {
  return (
    d !== null &&
    typeof d === 'object' &&
    typeof d.year === 'number' &&
    typeof d.month === 'number' &&
    d.month >= 1 &&
    d.month <= 12
  );
}

describe('experience data', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThan(0);
  });

  it('every entry has a company string and i18nKey', () => {
    experience.forEach((job) => {
      expect(typeof job.company).toBe('string');
      expect(job.company.trim().length).toBeGreaterThan(0);
      expect(typeof job.i18nKey).toBe('string');
      expect(job.i18nKey.trim().length).toBeGreaterThan(0);
    });
  });

  it('single-role entries have title, startDate, endDate, and bullets array', () => {
    const singleRole = experience.filter((j) => !j.roles);
    singleRole.forEach((job) => {
      expect(typeof job.title).toBe('string');
      expect(job.title.trim().length).toBeGreaterThan(0);
      expect(isDateObject(job.startDate)).toBe(true);
      // endDate is either a valid date object or null (current role)
      expect(job.endDate === null || isDateObject(job.endDate)).toBe(true);
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

  it('every role has title, startDate, endDate, and non-empty bullets', () => {
    experience.forEach((job) => {
      const roles = job.roles ?? [
        {
          title: job.title,
          startDate: job.startDate,
          endDate: job.endDate,
          bullets: job.bullets,
        },
      ];
      roles.forEach((role) => {
        expect(typeof role.title).toBe('string');
        expect(role.title.trim().length).toBeGreaterThan(0);
        expect(isDateObject(role.startDate)).toBe(true);
        expect(role.endDate === null || isDateObject(role.endDate)).toBe(true);
        expect(Array.isArray(role.bullets)).toBe(true);
        expect(role.bullets.length).toBeGreaterThan(0);
        role.bullets.forEach((b) => {
          expect(b.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('startDate is before endDate when endDate is not null', () => {
    experience.forEach((job) => {
      const roles = job.roles ?? [
        { startDate: job.startDate, endDate: job.endDate },
      ];
      roles.forEach((role) => {
        if (role.endDate !== null) {
          const start = new Date(role.startDate.year, role.startDate.month - 1);
          const end = new Date(role.endDate.year, role.endDate.month - 1);
          expect(start.getTime()).toBeLessThan(end.getTime());
        }
      });
    });
  });
});
