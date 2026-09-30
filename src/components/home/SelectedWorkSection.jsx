import { useTranslation } from 'react-i18next';
import { featuredProjects, supportingProjects } from '../../data/projects.js';
import { ProjectCard } from './ProjectCard.jsx';
import { Container } from '../ui/Container.jsx';

/**
 * Featured case studies (BookshelfAI, BC Arcade) at full width, then the
 * supporting projects as a deliberately smaller "Also built" row.
 *
 * @param {{ headingLevel?: 1 | 2 }} props — `1` when this is the page's
 *   main content (the /work page), `2` on the home page.
 */
export function SelectedWorkSection({ headingLevel = 2 }) {
  const { t } = useTranslation('home');
  const Heading = `h${headingLevel}`;
  const SubHeading = `h${headingLevel + 1}`;

  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="bg-brand-light py-16 sm:py-24 scroll-mt-20"
    >
      <Container>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-teal-text">
          {t('work.eyebrow')}
        </p>
        <Heading
          id="work-heading"
          className="mb-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-brand-dark"
        >
          {t('work.heading')}
        </Heading>
        <p className="max-w-2xl mb-12 text-lg leading-relaxed text-brand-ink">
          {t('work.intro')}
        </p>

        <div className="flex flex-col gap-7 mb-16">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              t={t}
              headingLevel={headingLevel + 1}
            />
          ))}
        </div>

        <SubHeading className="mb-5 text-sm font-semibold uppercase tracking-widest text-brand-ink">
          {t('work.alsoBuilt')}
        </SubHeading>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5" role="list">
          {supportingProjects.map((project) => (
            <li key={project.id}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center gap-6 h-full p-5 sm:p-6 bg-white rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 hover:border-brand-teal"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-brand-dark">
                    {project.name}
                  </span>
                  <span className="text-sm sm:text-base leading-snug text-brand-ink">
                    {t(`work.${project.id}.tagline`, {
                      defaultValue: project.tagline,
                    })}
                  </span>
                  <span className="sr-only">{t('work.opensInNewTab')}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-xl text-brand-teal-text"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
