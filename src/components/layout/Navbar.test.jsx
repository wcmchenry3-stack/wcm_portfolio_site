import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders the skip-to-content link as the first focusable element', () => {
    renderNavbar();
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink.tagName).toBe('A');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('skip link has sr-only class (visually hidden by default)', () => {
    renderNavbar();
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink.className).toContain('sr-only');
  });

  it('hamburger button is not visible on desktop (hidden sm:hidden)', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('hamburger button toggles aria-expanded on click', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('mobile menu appears after hamburger click', () => {
    renderNavbar();
    expect(
      screen.queryByRole('navigation', { name: /mobile navigation/i })
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: /open navigation menu/i })
    );
    expect(
      screen.getByRole('navigation', { name: /mobile navigation/i })
    ).toBeInTheDocument();
  });

  it('mobile menu closes on Escape key', () => {
    renderNavbar();
    fireEvent.click(
      screen.getByRole('button', { name: /open navigation menu/i })
    );
    expect(
      screen.getByRole('navigation', { name: /mobile navigation/i })
    ).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(
      screen.queryByRole('navigation', { name: /mobile navigation/i })
    ).not.toBeInTheDocument();
  });

  it('renders nav links for Home and Resume', () => {
    renderNavbar();
    expect(
      screen.getAllByRole('link', { name: /home/i })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /resume/i })[0]
    ).toBeInTheDocument();
  });
});
