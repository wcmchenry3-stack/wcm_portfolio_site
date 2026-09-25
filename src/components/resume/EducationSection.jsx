import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function EducationSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="education-heading">
      <SectionHeading id="education-heading" tone="resume" className="mb-3">
        {t('education.heading')}
      </SectionHeading>
      <p className="text-brand-dark leading-relaxed">
        {t('education.degree')} · {t('education.certifications')}
      </p>
    </section>
  );
}
