import { useTranslation } from 'react-i18next';
import { experience } from '../../data/experience.js';
import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';

/**
 * Earliest start year and latest end year across a job's roles, e.g.
 * "2015 – 2020". A current role (endDate null) ends with the localized
 * "Present".
 */
function yearRange(job, present) {
  const roles = job.roles ?? [job];
  const start = Math.min(...roles.map((r) => r.startDate.year));
  const isCurrent = roles.some((r) => r.endDate === null);
  const end = isCurrent
    ? present
    : Math.max(...roles.map((r) => r.endDate.year));
  return `${start} – ${end}`;
}

/** One line per employer, newest first, linking to the full resume. */
export function CareerSnapshotSection() {
  const { t } = useTranslation('home');
  const present = t('dates.present', { ns: 'common' });

  return (
    <section
      aria-labelledby="career-heading"
      className="bg-brand-dark py-16 sm:py-24"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-accent">
              {t('career.eyebrow')}
            </p>
            <h2
              id="career-heading"
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-brand-light"
            >
              {t('career.heading')}
            </h2>
          </div>
          <Button to="/resume" variant="outline" className="self-start">
            {t('career.cta')}
          </Button>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 border-t-2 border-brand-rule">
          {experience.map((job) => (
            <li key={job.i18nKey} className="flex flex-col gap-2 pt-6 pb-4">
              <span className="text-sm text-brand-faint">
                {yearRange(job, present)}
              </span>
              <span className="text-lg font-semibold text-brand-light">
                {job.company}
              </span>
              <span className="text-sm leading-relaxed text-brand-subtle">
                {t(`career.${job.i18nKey}`)}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
