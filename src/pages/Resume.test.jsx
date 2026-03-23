import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import Resume from './Resume.jsx';

function renderResume() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('Resume page', () => {
  it('renders without crashing', () => {
    renderResume();
  });

  it('has a main landmark with id="main-content"', () => {
    renderResume();
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('renders the Resume h1 heading', () => {
    renderResume();
    expect(
      screen.getByRole('heading', { level: 1, name: /resume/i })
    ).toBeInTheDocument();
  });

  it('renders the Professional Summary section', () => {
    renderResume();
    expect(screen.getByText(/professional summary/i)).toBeInTheDocument();
  });

  it('renders the Experience section', () => {
    renderResume();
    expect(
      screen.getByRole('heading', { name: /experience/i })
    ).toBeInTheDocument();
  });

  it('LinkedIn link has correct href and opens in new tab', () => {
    renderResume();
    const link = screen.getByRole('link', { name: /linkedin/i });
    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/bill-mchenry/'
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
