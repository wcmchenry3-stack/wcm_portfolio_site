import { useTranslation } from 'react-i18next';

export function ResumeSummary() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="summary-heading" className="mb-10">
      <h2
        id="summary-heading"
        className="text-xl font-semibold text-brand-navy mb-3 pb-2 border-b-2 border-brand-teal"
      >
        {t('summary.heading')}
      </h2>
      <p className="text-brand-dark leading-relaxed">{t('summary.body')}</p>
    </section>
  );
}
