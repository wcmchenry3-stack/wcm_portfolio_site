import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function ResumeSummary() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="summary-heading" className="mb-10">
      <SectionHeading id="summary-heading" tone="resume" className="mb-3">
        {t('summary.heading')}
      </SectionHeading>
      <p className="text-brand-dark leading-relaxed">{t('summary.body')}</p>
    </section>
  );
}
