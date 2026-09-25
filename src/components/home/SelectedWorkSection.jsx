import { featuredProjects, supportingProjects } from '../../data/projects.js';
import { ProjectCard } from './ProjectCard.jsx';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="bg-white py-14 sm:py-20 scroll-mt-20"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          tone="dark"
          intro="A few things I've built to test ideas and sharpen how I think about product."
        >
          Selected Work
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured"
            />
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
      </Container>
    </section>
  );
}
