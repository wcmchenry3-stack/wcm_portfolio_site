import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container.jsx';

const HABITS = [1, 2, 3];
const COACHING_STEPS = [1, 2, 3, 4];
const RECORDS = [1, 2, 3, 4];

/**
 * "How I lead": three leadership habits, the four-step path used to grow
 * product managers, and the people-development track record behind it.
 * Every claim here traces to the resume master — keep it that way.
 */
export function LeadershipSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="lead-heading"
      className="bg-white py-16 sm:py-24 border-y border-brand-border"
    >
      <Container>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal-text">
          {t('lead.eyebrow')}
        </p>
        <h2
          id="lead-heading"
          className="max-w-3xl mb-4 font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-brand-dark"
        >
          {t('lead.heading')}
        </h2>
        <p className="max-w-2xl mb-12 sm:mb-14 text-lg leading-relaxed text-brand-ink">
          {t('lead.intro')}
        </p>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 sm:mb-20">
          {HABITS.map((n) => (
            <li key={n} className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold text-brand-teal-text"
              >
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold text-brand-dark">
                {t(`lead.habit_${n}.title`)}
              </h3>
              <p className="leading-relaxed text-brand-ink">
                {t(`lead.habit_${n}.body`)}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-brand-dark">
            {t('lead.coaching.heading')}
          </h3>
          <p className="max-w-md leading-relaxed text-brand-ink">
            {t('lead.coaching.intro')}
          </p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2 mb-12">
          {COACHING_STEPS.map((n) => (
            <li
              key={n}
              className="flex flex-col gap-2.5 pt-6 pb-4 border-t-4 border-brand-teal"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal-text">
                {t('lead.coaching.stepLabel', { n })}
              </span>
              <h4 className="text-lg font-semibold leading-snug text-brand-dark">
                {t(`lead.coaching.step_${n}.title`)}
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-brand-ink">
                {t(`lead.coaching.step_${n}.body`)}
              </p>
            </li>
          ))}
        </ol>

        <h3 className="sr-only">{t('lead.record.heading')}</h3>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
        >
          {RECORDS.map((n) => (
            <li
              key={n}
              className="flex flex-col gap-1.5 p-6 bg-brand-light rounded-xl border border-brand-border"
            >
              <span className="font-display text-3xl font-semibold leading-tight text-brand-teal-text">
                {t(`lead.record.record_${n}.stat`)}
              </span>
              <span className="font-semibold leading-snug text-brand-dark">
                {t(`lead.record.record_${n}.label`)}
              </span>
              <span className="text-sm text-brand-ink">
                {t(`lead.record.record_${n}.where`)}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
