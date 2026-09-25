import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './Button.jsx';

function renderButton(props, children = 'Click me') {
  return render(
    <MemoryRouter>
      <Button {...props}>{children}</Button>
    </MemoryRouter>
  );
}

describe('Button', () => {
  it('renders a react-router Link when `to` is given', () => {
    renderButton({ to: '/resume' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveAttribute('href', '/resume');
  });

  it('renders an anchor for an internal href without target/rel', () => {
    renderButton({ href: '#selected-work' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveAttribute('href', '#selected-work');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('renders an anchor for a mailto href without target/rel', () => {
    renderButton({ href: 'mailto:someone@example.com' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('adds target="_blank" and rel="noopener noreferrer" for an external http(s) href', () => {
    renderButton({ href: 'https://www.linkedin.com/in/bill-mchenry/' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a <button type="button"> when neither `to` nor `href` is given', () => {
    const onClick = vi.fn();
    renderButton({ onClick });
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveAttribute('type', 'button');
    button.click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it.each([
    ['primary', 'dark'],
    ['outline', 'dark'],
    ['ghost', 'dark'],
    ['primary', 'navy'],
    ['outline', 'navy'],
    ['primary', 'light'],
  ])(
    'applies focus-ring classes for variant=%s surface=%s',
    (variant, surface) => {
      renderButton({ to: '/resume', variant, surface });
      const link = screen.getByRole('link', { name: 'Click me' });
      expect(link.className).toContain('focus:ring-2');
      expect(link.className).toContain('focus:ring-offset-2');
      expect(link.className).toMatch(/focus:ring-(brand-teal|white)/);
    }
  );

  it('always includes the touch-target and base focus-ring classes', () => {
    renderButton({ to: '/resume' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link.className).toContain('min-h-touch');
    expect(link.className).toContain('focus:outline-none');
  });

  it('appends a passed-through className', () => {
    renderButton({ to: '/resume', className: 'mt-8 print:hidden' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link.className).toContain('mt-8');
    expect(link.className).toContain('print:hidden');
  });

  it('forwards aria-label and other rest props', () => {
    renderButton({ href: 'https://example.com', 'aria-label': 'Open example' });
    expect(
      screen.getByRole('link', { name: 'Open example' })
    ).toBeInTheDocument();
  });
});
