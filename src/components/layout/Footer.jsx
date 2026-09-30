import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx';
import { Container } from '../ui/Container.jsx';
import { NAV_LINK_BASE } from './navLinkClass.js';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-brand-dark border-t border-brand-navy mt-auto">
      <Container className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-brand-muted text-sm">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('footer.linkedinAriaLabel')}
          className={`${NAV_LINK_BASE} inline-flex items-center gap-2 text-brand-muted`}
        >
          <LinkedInIcon />
          {t('footer.linkedin')}
        </a>
      </Container>
    </footer>
  );
}
