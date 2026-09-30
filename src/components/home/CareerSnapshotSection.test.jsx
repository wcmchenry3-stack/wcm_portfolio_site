import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { experience } from '../../data/experience.js';
import { CareerSnapshotSection } from './CareerSnapshotSection.jsx';

function renderCareer() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <CareerSnapshotSection />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('CareerSnapshotSection', () => {
  it('uses the standardized 13+ years heading', () => {
    renderCareer();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /13\+ years in product leadership/i,
      })
    ).toBeInTheDocument();
  });

  it('lists every employer with a year range, newest first', () => {
    renderCareer();
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(experience.length);
    expect(items[0]).toHaveTextContent('eXp Realty');
    expect(items[0]).toHaveTextContent('2024 – Present');
    // Multi-role employers span their earliest start to latest end.
    const omnitracs = items.find((li) => li.textContent.includes('Omnitracs'));
    expect(omnitracs).toHaveTextContent('2015 – 2020');
  });

  it('CTA links to the full resume', () => {
    renderCareer();
    expect(screen.getByRole('link', { name: /full resume/i })).toHaveAttribute(
      'href',
      '/resume'
    );
  });
});
