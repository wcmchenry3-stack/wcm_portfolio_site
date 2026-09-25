import { Button } from '../ui/Button.jsx';

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
        <Button to="/resume">View Full Resume</Button>
      </div>
    </section>
  );
}
