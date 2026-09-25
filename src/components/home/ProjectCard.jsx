/**
 * Renders one project's card. Takes `t` from the caller
 * (SelectedWorkSection, which already holds a `home`-namespace instance)
 * rather than calling `useTranslation` itself, since this renders once
 * per project.
 *
 * @param {{
 *   project: { id: string, name: string, category: string, tagline: string, bullets: string[], href: string },
 *   variant?: 'featured' | 'supporting',
 *   t: (key: string, options?: object) => string,
 * }} props
 */
export function ProjectCard({ project, variant = 'featured', t }) {
  const isFeatured = variant === 'featured';

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white rounded-xl border border-brand-border shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
        isFeatured ? 'p-8' : 'p-6'
      }`}
    >
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-teal mb-3">
        {t(`work.${project.id}.category`, { defaultValue: project.category })}
      </span>
      <h3
        className={`font-bold text-brand-dark mb-2 group-hover:text-brand-teal transition-colors ${
          isFeatured ? 'text-2xl' : 'text-xl'
        }`}
      >
        {project.name}
      </h3>
      <p
        className={`text-brand-muted mb-4 ${isFeatured ? 'text-base' : 'text-sm'}`}
      >
        {t(`work.${project.id}.tagline`, { defaultValue: project.tagline })}
      </p>
      <ul className="space-y-2" role="list">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-brand-dark/80">
            <span aria-hidden="true" className="text-brand-teal">
              &bull;
            </span>
            <span>
              {t(`work.${project.id}.bullet_${i + 1}`, {
                defaultValue: bullet,
              })}
            </span>
          </li>
        ))}
      </ul>
    </a>
  );
}
