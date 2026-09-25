import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading.jsx';

describe('SectionHeading', () => {
  it('renders an h2 with the given id', () => {
    render(
      <SectionHeading id="impact-heading" tone="dark">
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
      <SectionHeading tone="dark">Heading only</SectionHeading>
    );
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders the intro paragraph when given (tone="dark")', () => {
    render(
      <SectionHeading tone="dark" intro="An intro sentence.">
        Heading
      </SectionHeading>
    );
    expect(screen.getByText('An intro sentence.')).toBeInTheDocument();
  });

  it('renders the intro paragraph when given (tone="light")', () => {
    render(
      <SectionHeading tone="light" intro="An intro sentence.">
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
      <SectionHeading tone="dark" intro="Intro">
        Heading
      </SectionHeading>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('text-center');
    expect(screen.getByText('Intro').className).toContain('max-w-2xl');
  });
});
