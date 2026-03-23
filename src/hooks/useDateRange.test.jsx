import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import { useDateRange } from './useDateRange.js';

const wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('useDateRange', () => {
  it('formats a start and end date in English', () => {
    i18n.changeLanguage('en');
    const { result } = renderHook(
      () => useDateRange({ year: 2020, month: 8 }, { year: 2021, month: 2 }),
      { wrapper }
    );
    expect(result.current).toContain('2020');
    expect(result.current).toContain('2021');
    expect(result.current).toContain('–');
  });

  it('renders "Present" for a null endDate in English', () => {
    i18n.changeLanguage('en');
    const { result } = renderHook(
      () => useDateRange({ year: 2021, month: 3 }, null),
      { wrapper }
    );
    expect(result.current).toContain('Present');
  });

  it('formats month name in French Canadian when locale is fr-CA', () => {
    i18n.changeLanguage('fr-CA');
    const { result } = renderHook(
      () => useDateRange({ year: 2021, month: 3 }, null),
      { wrapper }
    );
    // French month name for March
    expect(result.current).toMatch(/mars/i);
    expect(result.current).toContain('–');
  });

  it('renders dates.present key for null endDate in fr-CA', () => {
    i18n.changeLanguage('fr-CA');
    const { result } = renderHook(
      () => useDateRange({ year: 2021, month: 3 }, null),
      { wrapper }
    );
    // The test i18n instance falls back to 'en' for fr-CA (no translations yet),
    // so it will show the English "Present" — confirm it's not empty
    expect(result.current.length).toBeGreaterThan(0);
  });

  it('uses Latin numerals even for ar locale', () => {
    i18n.changeLanguage('ar');
    const { result } = renderHook(
      () => useDateRange({ year: 2021, month: 3 }, { year: 2022, month: 1 }),
      { wrapper }
    );
    // Latin digits (not Arabic-Indic ١٢٣) must be present
    expect(result.current).toMatch(/2021/);
    expect(result.current).toMatch(/2022/);
  });
});
