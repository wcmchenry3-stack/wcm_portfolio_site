import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function CareerBridgeSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="career-heading"
      className="bg-brand-dark py-14 sm:py-20"
    >
      <Container size="md" className="text-center">
        <SectionHeading
          id="career-heading"
          tone="light"
          intro={t('career.body')}
          className="mb-4"
        >
          {t('career.heading')}
        </SectionHeading>
        <Button to="/resume">{t('career.cta')}</Button>
      </Container>
    </section>
  );
}
