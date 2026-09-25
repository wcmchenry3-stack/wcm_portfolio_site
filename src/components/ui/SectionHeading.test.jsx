import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading.jsx';

describe('SectionHeading', () => {
  it('renders an h2 with the given id', () => {
    render(
      <SectionHeading id="impact-heading" tone="dark" className="mb-3">
        Proven Product Leadership
      </SectionHeading>
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Proven Product Leadership',
    });
    expect(heading).toHaveAttribute('id', 'impact-heading');
  });

  it('renders no intro paragraph when none is given', () => {
    const { container } = render(
      <SectionHeading tone="dark" className="mb-3">
        Heading only
      </SectionHeading>
    );
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders the intro paragraph when given (tone="dark")', () => {
    render(
      <SectionHeading tone="dark" intro="An intro sentence." className="mb-3">
        Heading
      </SectionHeading>
    );
    expect(screen.getByText('An intro sentence.')).toBeInTheDocument();
  });

  it('renders the intro paragraph when given (tone="light")', () => {
    render(
      <SectionHeading tone="light" intro="An intro sentence." className="mb-3">
        Heading
      </SectionHeading>
    );
    expect(screen.getByText('An intro sentence.')).toBeInTheDocument();
  });

  it('tone="resume" renders only the heading, with no built-in margin', () => {
    render(
      <SectionHeading tone="resume" className="mb-6">
        Experience
      </SectionHeading>
    );
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Experience',
    });
    expect(heading.className).toContain('border-b-2');
    expect(heading.className).toContain('mb-6');
    expect(heading.className).not.toMatch(/\bmb-3\b/);
  });

  it('tone="dark" centers the heading and constrains intro width', () => {
    render(
      <SectionHeading tone="dark" intro="Intro" className="mb-3">
        Heading
      </SectionHeading>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('text-center');
    expect(screen.getByText('Intro').className).toContain('max-w-2xl');
  });

  // Regression test: SectionHeading previously baked mb-4 into every
  // tone="light" heading, which silently changed ContactBar's original
  // mb-3 spacing when it was migrated onto this shared component.
  it('tone="light"/"dark" bake in no margin — two callers can use different values', () => {
    const { rerender } = render(
      <SectionHeading tone="light" className="mb-3">
        Let&apos;s talk.
      </SectionHeading>
    );
    let heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('mb-3');
    expect(heading.className).not.toMatch(/\bmb-4\b/);

    rerender(
      <SectionHeading tone="light" className="mb-4">
        15+ Years Building Products That Matter
      </SectionHeading>
    );
    heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('mb-4');
    expect(heading.className).not.toMatch(/\bmb-3\b/);
  });
});
