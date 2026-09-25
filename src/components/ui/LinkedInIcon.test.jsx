import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LinkedInIcon } from './LinkedInIcon.jsx';

describe('LinkedInIcon', () => {
  it('renders an svg hidden from assistive tech', () => {
    const { container } = render(<LinkedInIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses the default size when no className is given', () => {
    const { container } = render(<LinkedInIcon />);
    expect(container.querySelector('svg')).toHaveClass('w-5', 'h-5');
  });

  it('applies a custom className', () => {
    const { container } = render(<LinkedInIcon className="w-4 h-4" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-4', 'h-4');
    expect(svg).not.toHaveClass('w-5');
  });
});
