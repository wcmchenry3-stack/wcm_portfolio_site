import { useTranslation } from 'react-i18next';

export function EducationSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="education-heading">
      <h2
        id="education-heading"
        className="text-xl font-semibold text-brand-navy mb-3 pb-2 border-b-2 border-brand-teal"
      >
        {t('education.heading')}
      </h2>
      <p className="text-brand-dark leading-relaxed">
        {t('education.degree')} · {t('education.certifications')}
      </p>
    </section>
  );
}
