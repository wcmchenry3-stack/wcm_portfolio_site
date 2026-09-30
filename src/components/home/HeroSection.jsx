import { useTranslation } from 'react-i18next';
import { LINKEDIN_URL } from '../../data/brand.js';
import { proofPoints } from '../../data/impact.js';
import { experience } from '../../data/experience.js';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';

/**
 * Evidence-first hero: positioning line, headline, and the four proof
 * points (growth, economics, people, AI) as a stat row, so a recruiter
 * gets the whole story above the fold.
 */
export function HeroSection() {
  const { t } = useTranslation('home');
  const companies = experience.map((job) => job.company).join(' · ');

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-brand-dark py-14 sm:py-20"
    >
      <Container className="flex flex-col gap-7">
        <div className="flex items-center gap-4">
          <img
            src="/bill-headshot.jpg"
            alt={t('hero.headshotAlt')}
            width="72"
            height="72"
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-brand-teal"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <p className="text-sm sm:text-base leading-snug text-brand-subtle">
            <span className="font-semibold text-brand-light">
              {t('hero.eyebrow')}
            </span>
            <br />
            {t('hero.focus')}
          </p>
        </div>

        <h1
          id="hero-heading"
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-brand-light"
        >
          {t('hero.headlineLead')}{' '}
          <span className="block text-brand-accent">
            {t('hero.headlineAccent')}
          </span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-brand-subtle">
          {t('hero.subhead')}
        </p>

        <h2 className="sr-only">{t('hero.outcomesLabel')}</h2>
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-rule border-y border-brand-rule"
          role="list"
        >
          {proofPoints.map((point) => (
            <li
              key={point.id}
              className="flex flex-col gap-2 py-5 px-4 sm:py-6 sm:px-6 bg-brand-dark"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-faint">
                {t(`impact.${point.id}.label`, { defaultValue: point.label })}
              </span>
              <span className="font-display text-3xl sm:text-4xl font-semibold leading-none text-brand-light">
                {t(`impact.${point.id}.stat`, { defaultValue: point.stat })}
              </span>
              <span className="text-sm leading-snug text-brand-subtle">
                {t(`impact.${point.id}.description`, {
                  defaultValue: point.description,
                })}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="#selected-work">{t('hero.viewWork')}</Button>
            <Button to="/resume" variant="outline">
              {t('hero.viewResume')}
            </Button>
            <Button
              href={LINKEDIN_URL}
              variant="ghost"
              aria-label={t('hero.linkedinAriaLabel')}
            >
              {t('hero.connectLinkedIn')} <span aria-hidden="true">↗</span>
            </Button>
          </div>
          <p className="text-sm text-brand-faint">
            {t('hero.companiesLabel')}{' '}
            <span className="font-semibold text-brand-light">{companies}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
