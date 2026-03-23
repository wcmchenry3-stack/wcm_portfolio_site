import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { Footer } from './Footer.jsx';

const wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('Footer', () => {
  it('renders LinkedIn link with correct href', () => {
    render(<Footer />, { wrapper });
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/bill-mchenry/'
    );
  });

  it('LinkedIn link opens in new tab', () => {
    render(<Footer />, { wrapper });
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('LinkedIn link has a descriptive aria-label', () => {
    render(<Footer />, { wrapper });
    const link = screen.getByRole('link', { name: /linkedin/i });
    const label = link.getAttribute('aria-label') ?? '';
    expect(label.length).toBeGreaterThan(0);
  });

  it('renders the current year in the copyright notice', () => {
    render(<Footer />, { wrapper });
    const year = String(new Date().getFullYear());
    expect(
      screen.getByText((content) => content.includes(year)),
    ).toBeInTheDocument();
  });
});
