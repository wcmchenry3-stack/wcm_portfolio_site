import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function CapabilitiesSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="capabilities-heading" className="mb-10">
      <SectionHeading id="capabilities-heading" tone="resume" className="mb-3">
        {t('capabilities.heading')}
      </SectionHeading>
      <p className="text-brand-dark leading-relaxed">
        {t('capabilities.items')}
      </p>
    </section>
  );
}
