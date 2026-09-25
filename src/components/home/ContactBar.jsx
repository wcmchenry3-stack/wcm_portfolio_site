import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { Button } from '../ui/Button.jsx';
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function ContactBar() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-label={t('contact.sectionAriaLabel', { ns: 'common' })}
      className="bg-brand-navy py-14"
    >
      <Container className="text-center">
        <SectionHeading tone="light" intro={t('contact.cta')}>
          {t('contact.heading')}
        </SectionHeading>
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
      </Container>
    </section>
  );
}
