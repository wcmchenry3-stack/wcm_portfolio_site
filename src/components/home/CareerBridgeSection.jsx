import { Button } from '../ui/Button.jsx';
import { Container } from '../ui/Container.jsx';
import { SectionHeading } from '../ui/SectionHeading.jsx';

export function CareerBridgeSection() {
  return (
    <section
      aria-labelledby="career-heading"
      className="bg-brand-dark py-14 sm:py-20"
    >
      <Container size="md" className="text-center">
        <SectionHeading
          id="career-heading"
          tone="light"
          intro="From real estate technology to virtual collaboration and enterprise SaaS, I've led product at every stage — from 0-to-1 discovery to scaling platforms used by tens of thousands of people."
        >
          15+ Years Building Products That Matter
        </SectionHeading>
        <Button to="/resume">View Full Resume</Button>
      </Container>
    </section>
  );
}
