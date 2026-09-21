import { proofPoints } from '../../data/impact.js';

export function ImpactSection() {
  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-brand-light py-14 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="impact-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-dark text-center mb-3"
        >
          Proven Product Leadership
        </h2>
        <p className="text-brand-muted text-center max-w-2xl mx-auto mb-12">
          As Principal Product Manager at eXp Realty, I own My eXp — a web and
          mobile platform used by real estate agents worldwide.
        </p>

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
      </div>
    </section>
  );
}
