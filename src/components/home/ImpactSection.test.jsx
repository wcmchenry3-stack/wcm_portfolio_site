import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { proofPoints } from '../../data/impact.js';
import { ImpactSection } from './ImpactSection.jsx';

function renderImpact() {
  return render(
    <I18nextProvider i18n={i18n}>
      <ImpactSection />
    </I18nextProvider>
  );
}

describe('ImpactSection', () => {
  it('renders the section heading from the home namespace', () => {
    renderImpact();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /proven product leadership/i,
      })
    ).toBeInTheDocument();
  });

  it('renders the intro sentence', () => {
    renderImpact();
    expect(
      screen.getByText(/principal product manager at exp realty/i)
    ).toBeInTheDocument();
  });

  it('renders one list item per proof point, with stat, headline, and description', () => {
    renderImpact();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(proofPoints.length);
    for (const point of proofPoints) {
      expect(screen.getByText(point.stat)).toBeInTheDocument();
      expect(screen.getByText(point.headline)).toBeInTheDocument();
      expect(screen.getByText(point.description)).toBeInTheDocument();
    }
  });

  it('renders the outro sentence', () => {
    renderImpact();
    expect(
      screen.getByText(/15\+ years in product and technology/i)
    ).toBeInTheDocument();
  });
});
