import { proofPoints } from '../../data/impact.js';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function ImpactSection() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-brand-light py-14 sm:py-20"
    >
      <Container>
        <SectionHeading
          id="impact-heading"
          tone="dark"
          intro="As Principal Product Manager at eXp Realty, I own My eXp — a web and mobile platform used by real estate agents worldwide."
        >
          Proven Product Leadership
        </SectionHeading>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {proofPoints.map((point) => (
            <li
              key={point.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-brand-border"
            >
              <p className="text-3xl font-bold text-brand-teal mb-2">
                {point.stat}
              </p>
              <p className="font-semibold text-brand-dark mb-2">
                {point.headline}
              </p>
              <p className="text-sm text-brand-muted">{point.description}</p>
            </li>
          ))}
        </ul>

        <p className="text-brand-muted text-center mt-10">
          15+ years in product and technology — real estate tech, virtual
          collaboration, enterprise SaaS, and consulting.
        </p>
      </Container>
    </section>
  );
}
