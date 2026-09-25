import { useTranslation } from 'react-i18next';

export function CapabilitiesSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="capabilities-heading" className="mb-10">
      <h2
        id="capabilities-heading"
        className="text-xl font-semibold text-brand-navy mb-3 pb-2 border-b-2 border-brand-teal"
      >
        {t('capabilities.heading')}
      </h2>
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
