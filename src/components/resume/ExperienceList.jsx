import { useTranslation } from 'react-i18next';
import { experience } from '../../data/experience.js';
import { ExperienceItem } from './ExperienceItem.jsx';

export function ExperienceList() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-xl font-semibold text-brand-navy mb-6 pb-2 border-b-2 border-brand-teal"
      >
        {t('experience.heading')}
      </h2>
      <div className="space-y-8">
        {experience.map((job) => (
          <ExperienceItem key={job.company} {...job} />
        ))}
      </div>
    </section>
  );
}
