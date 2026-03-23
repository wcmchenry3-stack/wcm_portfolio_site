import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { Navbar } from './Navbar.jsx';

function renderNavbar() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('Navbar', () => {
  it('renders the skip-to-content link as the first focusable element', () => {
    renderNavbar();
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink.tagName).toBe('A');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('skip link has sr-only class (visually hidden by default)', () => {
    renderNavbar();
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink.className).toContain('sr-only');
  });

  it('hamburger button is present with aria-expanded false by default', () => {
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

  it('renders the language switcher button', () => {
    renderNavbar();
    expect(
      screen.getAllByRole('button', { name: /select language/i })[0]
    ).toBeInTheDocument();
  });
});
