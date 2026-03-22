import { experience } from '../../data/experience.js';
import { ExperienceItem } from './ExperienceItem.jsx';

export function ExperienceList() {
  return (
    <section aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-xl font-semibold text-brand-navy mb-6 pb-2 border-b-2 border-brand-teal"
      >
        Experience
      </h2>
      <div className="space-y-8">
        {experience.map((job) => (
          <ExperienceItem key={job.company} {...job} />
        ))}
      </div>
    </section>
  );
}
