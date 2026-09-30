import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { featuredProjects } from '../../data/projects.js';
import { SectionHeading } from '../ui/SectionHeading.jsx';

/** Bullets per project, in the `resume` namespace under `projects.<id>`. */
const BULLET_COUNTS = new Map([
  ['bookshelfai', 3],
  ['bc-arcade', 2],
]);

/**
 * "Independent Products" — the resume's short take on the featured
 * projects, each linking to its full case study.
 */
export function ProjectsSection() {
  const { t } = useTranslation('resume');
  return (
    <section aria-labelledby="projects-heading" className="mb-10">
      <SectionHeading id="projects-heading" tone="resume" className="mb-6">
        {t('projects.heading')}
      </SectionHeading>
      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <article key={project.id}>
            <h3 className="text-lg font-bold text-brand-navy">
              {project.name}
              <span className="ms-2 text-sm font-normal text-brand-ink">
                {t(`projects.${project.id}.subtitle`)}
              </span>
            </h3>
            <ul className="mt-2 ms-5 space-y-1.5 list-disc list-outside">
              {Array.from(
                { length: BULLET_COUNTS.get(project.id) ?? 0 },
                (_, i) => (
                  <li
                    key={i}
                    className="text-sm sm:text-base leading-relaxed text-brand-dark"
                  >
                    {t(`projects.${project.id}.bullet_${i + 1}`)}
                  </li>
                )
              )}
            </ul>
            <Link
              to={`/work/${project.id}`}
              className="inline-flex items-center min-h-touch gap-1.5 text-sm font-semibold text-brand-teal-text rounded print:hidden focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 hover:underline"
            >
              {t('projects.caseStudyLink')}
              <span className="sr-only">: {project.name}</span>
              <span aria-hidden="true" className="inline-block rtl:rotate-180">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
