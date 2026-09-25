import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { ContactBar } from './ContactBar.jsx';

function renderContactBar() {
  return render(
    <I18nextProvider i18n={i18n}>
      <ContactBar />
    </I18nextProvider>
  );
}

describe('ContactBar', () => {
  it('renders the heading and CTA sentence', () => {
    renderContactBar();
    expect(
      screen.getByRole('heading', { level: 2, name: /let's talk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/interested in working together/i)
    ).toBeInTheDocument();
  });

  it('LinkedIn button opens in a new tab with noopener', () => {
    renderContactBar();
    // Accessible name comes from aria-label (contact.ariaLabel), not the
    // visible "Get in Touch on LinkedIn" text, since Button forwards it.
    const link = screen.getByRole('link', {
      name: /send a message on linkedin/i,
    });
    expect(link).toHaveTextContent(/get in touch on linkedin/i);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('email button links to a mailto address without target/rel', () => {
    renderContactBar();
    const link = screen.getByRole('link', { name: /email me/i });
    expect(link.getAttribute('href')).toMatch(/^mailto:/);
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });
});
