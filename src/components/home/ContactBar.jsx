import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { Button } from '../ui/Button.jsx';
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx';

export function ContactBar() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-label={t('contact.sectionAriaLabel', { ns: 'common' })}
      className="bg-brand-navy py-14"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-light mb-3">
          {t('contact.heading')}
        </h2>
        <p className="text-brand-light/80 mb-8">{t('contact.cta')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href={LINKEDIN_URL}
            surface="navy"
            aria-label={t('contact.ariaLabel')}
            className="gap-2"
          >
            <LinkedInIcon />
            {t('contact.button')}
          </Button>
          <Button
            href={t('contact.emailHref')}
            variant="outline"
            surface="navy"
          >
            {t('contact.emailButton')}
          </Button>
        </div>
      </div>
    </section>
  );
}
