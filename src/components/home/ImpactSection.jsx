import { useTranslation } from 'react-i18next';
import { proofPoints } from '../../data/impact.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function ImpactSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-brand-light py-14 sm:py-20"
    >
      <Container>
        <SectionHeading
          id="impact-heading"
          tone="dark"
          intro={t('impact.intro')}
          className="mb-3"
        >
          {t('impact.heading')}
        </SectionHeading>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {proofPoints.map((point) => (
            <li
              key={point.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-brand-border"
            >
              <p className="text-3xl font-bold text-brand-teal mb-2">
                {point.stat}
              </p>
              <p className="font-semibold text-brand-dark mb-2">
                {t(`impact.${point.id}.headline`, {
                  defaultValue: point.headline,
                })}
              </p>
              <p className="text-sm text-brand-muted">
                {t(`impact.${point.id}.description`, {
                  defaultValue: point.description,
                })}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-brand-muted text-center mt-10">
          {t('impact.outro')}
        </p>
      </Container>
    </section>
  );
}
