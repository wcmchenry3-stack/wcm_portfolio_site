import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';

export function HeroSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-brand-dark py-16 sm:py-24"
    >
      <Container>
        <div className="flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center sm:text-start">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">
              {t('hero.location')}
            </p>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-light leading-tight mb-6"
            >
              {t('hero.headline')}
            </h1>
            <p className="text-brand-light/80 text-lg mb-8 max-w-xl">
              {t('hero.subhead')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <Button to="/resume">{t('hero.viewResume')}</Button>
              <Button href="#selected-work" variant="outline">
                {t('hero.viewWork')}
              </Button>
              <Button
                href={LINKEDIN_URL}
                variant="ghost"
                aria-label={t('hero.linkedinAriaLabel')}
              >
                {t('hero.connectLinkedIn')}
              </Button>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex-shrink-0">
            <img
              src="/bill-headshot.jpg"
              alt={t('hero.headshotAlt')}
              className="w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-brand-teal shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
