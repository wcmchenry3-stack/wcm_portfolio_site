import { Link } from 'react-router-dom';

const PANEL_BG = new Map([
  ['bookshelfai', 'bg-brand-navy'],
  ['bc-arcade', 'bg-brand-deep-teal'],
]);

/**
 * The visual half of a featured card: product screenshots in phone
 * frames when we have them, otherwise the product logo. Decorative in
 * the card (the card's text carries the meaning), but screenshots keep
 * descriptive alt text since they are product evidence.
 */
function ProjectVisual({ project, t }) {
  if (project.images.length > 0) {
    return (
      <div className="flex justify-center items-end gap-3 sm:gap-4 h-full px-6 pt-8">
        {project.images.map((image, i) => (
          <img
            key={image.src}
            src={image.src}
            alt={t(`work.${project.id}.image_${i + 1}`, {
              defaultValue: image.alt,
            })}
            width="390"
            height="844"
            loading="lazy"
            className={`object-cover object-top rounded-t-2xl border-4 border-b-0 border-brand-dark ${
              i === 1
                ? 'w-28 h-60 sm:w-36 sm:h-76'
                : 'w-24 h-52 sm:w-32 sm:h-68'
            } ${i === 2 ? 'hidden sm:block' : ''}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-10">
      <img
        src={project.logo}
        alt={t('work.logoAlt', { name: project.name })}
        width="320"
        height="320"
        loading="lazy"
        className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl shadow-lg"
      />
    </div>
  );
}

/**
 * A featured project, linking to its case study at `/work/<id>`. Takes
 * `t` from the caller (SelectedWorkSection already holds a `home`
 * namespace instance) since it renders once per project.
 *
 * @param {{
 *   project: import('../../data/projects.js').featuredProjects[number],
 *   t: (key: string, options?: object) => string,
 *   headingLevel?: 2 | 3,
 * }} props
 */
export function ProjectCard({ project, t, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return (
    <article className="flex flex-col lg:flex-row bg-white rounded-2xl border border-brand-border overflow-hidden">
      <div
        className={`lg:w-[44%] shrink-0 min-h-64 overflow-hidden ${PANEL_BG.get(project.id) ?? 'bg-brand-navy'}`}
      >
        <ProjectVisual project={project} t={t} />
      </div>
      <div className="flex flex-col gap-4 p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-ink">
          {t(`work.${project.id}.category`, { defaultValue: project.category })}
        </p>
        <Heading className="font-display text-3xl font-semibold tracking-tight text-brand-dark">
          {project.name}
        </Heading>
        <p className="text-lg leading-relaxed text-brand-dark">
          {t(`work.${project.id}.tagline`, { defaultValue: project.tagline })}
        </p>
        <ul className="flex flex-col gap-2.5" role="list">
          {project.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm sm:text-base leading-snug text-brand-ink"
            >
              <span
                aria-hidden="true"
                className="font-bold text-brand-teal-text"
              >
                —
              </span>
              <span>
                {t(`work.${project.id}.bullet_${i + 1}`, {
                  defaultValue: bullet,
                })}
              </span>
            </li>
          ))}
        </ul>
        <Link
          to={`/work/${project.id}`}
          className="inline-flex items-center self-start min-h-touch gap-2 font-semibold text-brand-teal-text rounded focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 hover:text-brand-teal-hover hover:underline"
        >
          {t('work.readCaseStudy')}
          <span className="sr-only">: {project.name}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
