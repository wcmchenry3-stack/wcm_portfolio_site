import { Link } from 'react-router-dom';

export function CareerBridgeSection() {
  return (
    <section
      aria-labelledby="career-heading"
      className="bg-brand-dark py-14 sm:py-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="career-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-light mb-4"
        >
          15+ Years Building Products That Matter
        </h2>
        <p className="text-brand-light/80 mb-8">
          From real estate technology to virtual collaboration and enterprise
          SaaS, I&apos;ve led product at every stage &mdash; from 0-to-1
          discovery to scaling platforms used by tens of thousands of people.
        </p>
        <Link
          to="/resume"
          className="inline-flex items-center justify-center min-h-touch px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
        >
          View Full Resume
        </Link>
      </div>
    </section>
  );
}
