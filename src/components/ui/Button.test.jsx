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

  it.each([
    ['md', ['px-6', 'py-3']],
    ['sm', ['px-5', 'py-2.5']],
  ])('size="%s" applies its built-in padding', (size, expected) => {
    renderButton({ to: '/resume', size });
    const link = screen.getByRole('link', { name: 'Click me' });
    expected.forEach((cls) => expect(link.className).toContain(cls));
  });

  it('size="none" applies no built-in padding, leaving it entirely to className', () => {
    renderButton({ to: '/resume', size: 'none', className: 'px-6 py-2.5' });
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link.className).toContain('px-6');
    expect(link.className).toContain('py-2.5');
    expect(link.className).not.toContain('px-5');
    expect(link.className).not.toContain('px-6 py-3');
  });

  it.each([
    [
      'primary',
      'dark',
      ['bg-brand-teal', 'text-white', 'hover:bg-brand-teal-hover'],
    ],
    [
      'outline',
      'dark',
      ['border-brand-teal', 'text-brand-teal', 'hover:bg-brand-navy'],
    ],
    ['ghost', 'dark', ['text-brand-light', 'hover:text-brand-teal']],
    ['primary', 'navy', ['bg-brand-teal', 'hover:bg-brand-teal-hover']],
    ['outline', 'navy', ['text-brand-light', 'hover:bg-brand-dark']],
    ['primary', 'light', ['bg-brand-teal', 'hover:bg-brand-teal-hover']],
  ])(
    'variant=%s surface=%s renders the exact expected color classes',
    (variant, surface, expectedClasses) => {
      renderButton({ to: '/resume', variant, surface });
      const link = screen.getByRole('link', { name: 'Click me' });
      expectedClasses.forEach((cls) => expect(link.className).toContain(cls));
    }
  );

  it.each([
    ['dark', 'focus:ring-brand-teal', 'focus:ring-offset-brand-dark'],
    ['navy', 'focus:ring-white', 'focus:ring-offset-brand-navy'],
    ['light', 'focus:ring-brand-teal', 'focus:ring-offset-brand-light'],
  ])(
    'surface=%s applies the same focus ring regardless of variant',
    (surface, ring, offset) => {
      renderButton({ to: '/resume', variant: 'primary', surface });
      const link = screen.getByRole('link', { name: 'Click me' });
      expect(link.className).toContain(ring);
      expect(link.className).toContain(offset);
    }
  );
});
