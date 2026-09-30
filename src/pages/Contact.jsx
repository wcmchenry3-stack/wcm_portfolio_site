import { useTranslation } from 'react-i18next';
import { ContactForm } from '../components/contact/ContactForm.jsx';
import { Container } from '../components/ui/Container.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';

/** `/contact` — the form replaces any published email address. */
export default function Contact() {
  const { t } = useTranslation('common');
  return (
    <PageMain className="bg-brand-light">
      <Container size="md" className="py-14 sm:py-20">
        <h1 className="mb-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-brand-dark">
          {t('contact.page.title')}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-brand-ink">
          {t('contact.page.intro')}
        </p>
        <ContactForm />
      </Container>
    </PageMain>
  );
}
