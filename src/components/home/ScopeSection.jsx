import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container.jsx';

const AREAS = ['portfolio', 'team', 'engineering', 'cadence', 'executives'];

/**
 * "What I own today": the current role's scope as a label/detail list,
 * so the reader sees the actual job (portfolio, team, engineering,
 * cadence, executive audience) without any discussion of titles.
 */
export function ScopeSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="scope-heading"
      className="bg-brand-navy py-14 sm:py-20"
    >
      <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-accent">
            {t('scope.eyebrow')}
          </p>
          <h2
            id="scope-heading"
            className="mb-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-brand-light"
          >
            {t('scope.heading')}
          </h2>
          <p className="leading-relaxed text-brand-subtle">
            {t('scope.intro')}
          </p>
        </div>
        <dl className="lg:col-span-2 grid grid-cols-1 border-t border-brand-rule">
          {AREAS.map((area) => (
            <div
              key={area}
              className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-6 py-4 border-b border-brand-rule"
            >
              <dt className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                {t(`scope.${area}.label`)}
              </dt>
              <dd className="sm:col-span-3 leading-relaxed text-brand-light">
                {t(`scope.${area}.body`)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
