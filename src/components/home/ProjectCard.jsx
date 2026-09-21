export function ProjectCard({ project, variant = 'featured' }) {
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
        {project.category}
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
        {project.tagline}
      </p>
      <ul className="space-y-2" role="list">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-brand-dark/80">
            <span aria-hidden="true" className="text-brand-teal">
              &bull;
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </a>
  );
}
