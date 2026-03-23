import { useTranslation } from 'react-i18next';

/**
 * Formats a date range into a locale-aware string.
 *
 * @param {{ year: number, month: number }} startDate - 1-indexed month
 * @param {{ year: number, month: number } | null} endDate - null = present/current role
 * @returns {string} Formatted range, e.g. "March 2021 – Present" in en,
 *                   "mars 2021 – Présent" in fr-CA, "مارس ٢٠٢١ – الحاضر" in ar
 */
export function useDateRange(startDate, endDate) {
  const { i18n, t } = useTranslation('common');

  const fmt = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    // Keep Latin digits even in ar/hi — standard for international business docs
    numberingSystem: 'latn',
  });

  const start = fmt.format(new Date(startDate.year, startDate.month - 1));
  const end = endDate
    ? fmt.format(new Date(endDate.year, endDate.month - 1))
    : t('dates.present');

  return `${start} – ${end}`;
}
