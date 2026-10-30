import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container.jsx';

const PRINCIPLES = [1, 2, 3, 4, 5, 6];

/**
 * "How I think about product": six one-line principles, each backed by
 * one piece of evidence. Deliberately short — an approach, not a
 * manifesto. Every proof traces to the resume master.
 */
export function PrinciplesSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="principles-heading"
      className="bg-white py-16 sm:py-24 border-b border-brand-border"
    >
      <Container>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal-text">
          {t('principles.eyebrow')}
        </p>
        <h2
          id="principles-heading"
          className="max-w-3xl mb-12 sm:mb-14 font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-brand-dark"
        >
          {t('principles.heading')}
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {PRINCIPLES.map((n) => (
            <li key={n} className="flex flex-col gap-3">
              <span
                aria-hidden="true"
                className="font-display text-2xl font-semibold text-brand-teal-text"
              >
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold leading-snug text-brand-dark">
                {t(`principles.principle_${n}.title`)}
              </h3>
              <p className="leading-relaxed text-brand-ink">
                {t(`principles.principle_${n}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
