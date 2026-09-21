import { featuredProjects, supportingProjects } from '../../data/projects.js';
import { ProjectCard } from './ProjectCard.jsx';

export function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="bg-white py-14 sm:py-20 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="work-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-3"
        >
          Selected Work
        </h2>
        <p className="text-brand-muted text-center max-w-2xl mx-auto mb-12">
          A few things I&apos;ve built to test ideas and sharpen how I think
          about product.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {supportingProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="supporting"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
