import { useTranslation } from 'react-i18next';
import { experience } from '../../data/experience.js';
import { ExperienceItem } from './ExperienceItem.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function ExperienceList() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="experience-heading" className="mb-10">
      <SectionHeading id="experience-heading" tone="resume" className="mb-6">
        {t('experience.heading')}
      </SectionHeading>
      <div className="space-y-8">
        {experience.map((job) => (
          <ExperienceItem key={job.company} {...job} />
        ))}
      </div>
    </section>
  );
}
