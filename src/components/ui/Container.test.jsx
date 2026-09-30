import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Container } from './Container.jsx';

describe('Container', () => {
  it('defaults to the lg max-width', () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass('max-w-5xl');
  });

  it('maps size="md" to max-w-3xl', () => {
    const { container } = render(<Container size="md">content</Container>);
    expect(container.firstChild).toHaveClass('max-w-3xl');
    expect(container.firstChild).not.toHaveClass('max-w-5xl');
  });

  it('always includes the responsive gutter padding', () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass(
      'mx-auto',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );
  });

  it('appends a passed-through className', () => {
    const { container } = render(
      <Container className="text-center py-8">content</Container>
    );
    expect(container.firstChild).toHaveClass('text-center', 'py-8');
  });

  it('renders children', () => {
    const { getByText } = render(<Container>Hello</Container>);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
