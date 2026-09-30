import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { ContactBar } from './ContactBar.jsx';

function renderContactBar() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <ContactBar />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('ContactBar', () => {
  it('renders the heading and CTA sentence', () => {
    renderContactBar();
    expect(
      screen.getByRole('heading', { level: 2, name: /let.s talk/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/compare notes on product leadership/i)
    ).toBeInTheDocument();
  });

  it('LinkedIn button opens in a new tab with noopener', () => {
    renderContactBar();
    // Accessible name comes from aria-label (contact.ariaLabel), not the
    // visible "Message on LinkedIn" text, since Button forwards it.
    const link = screen.getByRole('link', {
      name: /message bill mchenry on linkedin/i,
    });
    expect(link).toHaveTextContent(/message on linkedin/i);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('message button goes to the contact form, not a mailto link', () => {
    renderContactBar();
    const link = screen.getByRole('link', { name: /send a message/i });
    expect(link).toHaveAttribute('href', '/contact');
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});
