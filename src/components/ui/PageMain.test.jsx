import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageMain } from './PageMain.jsx';

describe('PageMain', () => {
  it('renders a main landmark with the skip-link target id', () => {
    render(<PageMain>content</PageMain>);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('is programmatically focusable via tabIndex=-1', () => {
    render(<PageMain>content</PageMain>);
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
  });

  it('always includes scroll-mt-20 and flex-1', () => {
    render(<PageMain>content</PageMain>);
    expect(screen.getByRole('main')).toHaveClass('scroll-mt-20', 'flex-1');
  });

  it('appends a passed-through className', () => {
    render(<PageMain className="bg-brand-light">content</PageMain>);
    expect(screen.getByRole('main')).toHaveClass('bg-brand-light');
  });

  it('renders children', () => {
    render(<PageMain>Hello</PageMain>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
