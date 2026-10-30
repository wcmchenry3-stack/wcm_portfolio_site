import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { ScopeSection } from './ScopeSection.jsx';

function renderScope() {
  return render(
    <I18nextProvider i18n={i18n}>
      <ScopeSection />
    </I18nextProvider>
  );
}

describe('ScopeSection', () => {
  it('renders the section heading', () => {
    renderScope();
    expect(
      screen.getByRole('heading', { level: 2, name: /what i own today/i })
    ).toBeInTheDocument();
  });

  it('lists the five scope areas as label/detail pairs', () => {
    const { container } = renderScope();
    const terms = [...container.querySelectorAll('dt')].map(
      (dt) => dt.textContent
    );
    expect(terms).toEqual([
      'Portfolio',
      'Team',
      'Engineering',
      'Cadence',
      'Executives',
    ]);
    expect(container.querySelectorAll('dd')).toHaveLength(5);
  });

  it('states hiring and review ownership for the PM team', () => {
    const { container } = renderScope();
    const team = container.querySelectorAll('dd')[1];
    expect(within(team).getByText(/hiring, performance reviews/i)).toBeTruthy();
  });
});
