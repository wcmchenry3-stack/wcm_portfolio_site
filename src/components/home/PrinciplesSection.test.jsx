import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { PrinciplesSection } from './PrinciplesSection.jsx';

function renderPrinciples() {
  return render(
    <I18nextProvider i18n={i18n}>
      <PrinciplesSection />
    </I18nextProvider>
  );
}

describe('PrinciplesSection', () => {
  it('renders the section heading', () => {
    renderPrinciples();
    expect(
      screen.getByRole('heading', { level: 2, name: /principles i hold/i })
    ).toBeInTheDocument();
  });

  it('renders six principles, leading with the evidence-over-opinion rule', () => {
    renderPrinciples();
    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toHaveLength(6);
    expect(titles[0]).toBe('My opinion is interesting, but irrelevant.');
    expect(titles[1]).toBe('Teams own outcomes, not tickets.');
    expect(titles[2]).toBe('Technical health is product work.');
  });

  it('backs every principle with a proof paragraph', () => {
    renderPrinciples();
    for (const h of screen.getAllByRole('heading', { level: 3 })) {
      const proof = h.nextElementSibling;
      expect(proof.tagName).toBe('P');
      expect(proof.textContent.trim().length).toBeGreaterThan(0);
    }
  });
});
