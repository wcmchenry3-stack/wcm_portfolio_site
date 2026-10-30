import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container.jsx';

/**
 * Leadership story teasers. Each card states its own outcome, so it
 * proves something even if the reader never reaches out; only stories
 * with `cta` invite a conversation (keep that rare).
 */
const STORIES = [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4, cta: true }];

export function StoriesSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="stories-heading"
      className="bg-white py-16 sm:py-24 border-y border-brand-border"
    >
      <Container>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal-text">
          {t('stories.eyebrow')}
        </p>
        <h2
          id="stories-heading"
          className="mb-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-brand-dark"
        >
          {t('stories.heading')}
        </h2>
        <p className="max-w-2xl mb-12 text-lg leading-relaxed text-brand-ink">
          {t('stories.intro')}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
          {STORIES.map(({ n, cta }) => (
            <li
              key={n}
              className="flex flex-col gap-3 p-6 sm:p-8 bg-brand-light rounded-xl border border-brand-border"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal-text">
                {t(`stories.story_${n}.where`)}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug text-brand-dark">
                {t(`stories.story_${n}.title`)}
              </h3>
              <p className="leading-relaxed text-brand-ink">
                {t(`stories.story_${n}.body`)}
              </p>
              <p className="mt-auto pt-2 font-semibold leading-relaxed text-brand-dark">
                {t(`stories.story_${n}.outcome`)}
              </p>
              {cta && (
                <Link
                  to="/contact"
                  className="self-start inline-flex items-center min-h-touch font-semibold text-brand-teal-text underline underline-offset-4 rounded focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-light hover:text-brand-dark"
                >
                  {t(`stories.story_${n}.cta`)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
