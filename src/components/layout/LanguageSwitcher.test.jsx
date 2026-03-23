import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { LOCALES } from '../../i18n/locales.js';

const wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('LanguageSwitcher', () => {
  it('renders a button with the current locale name', () => {
    render(<LanguageSwitcher />, { wrapper });
    const btn = screen.getByRole('button', { name: /select language/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('English');
  });

  it('button has aria-expanded false by default', () => {
    render(<LanguageSwitcher />, { wrapper });
    expect(
      screen.getByRole('button', { name: /select language/i })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('button has aria-haspopup="listbox"', () => {
    render(<LanguageSwitcher />, { wrapper });
    expect(
      screen.getByRole('button', { name: /select language/i })
    ).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('opens the locale listbox on click', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders all locale options when open', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    expect(screen.getAllByRole('option')).toHaveLength(LOCALES.length);
  });

  it('marks the current locale as aria-selected', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    const selected = screen
      .getAllByRole('option')
      .filter((o) => o.getAttribute('aria-selected') === 'true');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent('English');
  });

  it('closes the listbox on Escape', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes the listbox after selecting a locale', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    const frOption = screen
      .getAllByRole('option')
      .find((o) => o.textContent.includes('Français'));
    fireEvent.click(frOption);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('all options are keyboard-reachable (tabIndex 0)', () => {
    render(<LanguageSwitcher />, { wrapper });
    fireEvent.click(screen.getByRole('button', { name: /select language/i }));
    screen.getAllByRole('option').forEach((opt) => {
      expect(opt).toHaveAttribute('tabIndex', '0');
    });
  });
});
