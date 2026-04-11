import { useTranslation } from 'react-i18next';
import { softSkillKeys, technicalSkillKeys } from '../../data/skills.js';

export function SkillsSection() {
  const { t } = useTranslation('home');

  return (
    <section
      aria-labelledby="skills-heading"
      className="bg-brand-light py-14 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="skills-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-12"
        >
          {t('skills.heading')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-brand-border">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">
              {t('skills.softHeading')}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {softSkillKeys.map((key) => (
                <li key={key}>
                  <span className="inline-block bg-brand-navy text-brand-light text-sm font-medium px-3 py-1.5 rounded-full">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-brand-border">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">
              {t('skills.technicalHeading')}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {technicalSkillKeys.map((key) => (
                <li key={key}>
                  <span className="inline-block bg-brand-teal text-white text-sm font-medium px-3 py-1.5 rounded-full">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
