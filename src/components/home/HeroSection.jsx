import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';

export function HeroSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-brand-dark py-16 sm:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <Link
                to="/resume"
                className="inline-flex items-center justify-center min-h-touch px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                {t('hero.viewResume')}
              </Link>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('hero.linkedinAriaLabel')}
                className="inline-flex items-center justify-center min-h-touch px-6 py-3 border border-brand-teal text-brand-teal font-semibold rounded-lg hover:bg-brand-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                {t('hero.connectLinkedIn')}
              </a>
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
      </div>
    </section>
  );
}
