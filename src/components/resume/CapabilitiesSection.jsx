import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function CapabilitiesSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="capabilities-heading" className="mb-10">
      <SectionHeading id="capabilities-heading" tone="resume" className="mb-3">
        {t('capabilities.heading')}
      </SectionHeading>
      <div className="space-y-2">
        <p className="text-brand-dark leading-relaxed">
          <span className="font-semibold">
            {t('capabilities.product.heading')}
          </span>{' '}
          {t('capabilities.product.items')}
        </p>
        <p className="text-brand-dark leading-relaxed">
          <span className="font-semibold">
            {t('capabilities.technical.heading')}
          </span>{' '}
          {t('capabilities.technical.items')}
        </p>
      </div>
    </section>
  );
}
