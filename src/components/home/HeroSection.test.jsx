import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { proofPoints } from '../../data/impact.js';
import { experience } from '../../data/experience.js';
import { HeroSection } from './HeroSection.jsx';

function renderHero() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('HeroSection', () => {
  it('renders the main headline', () => {
    renderHero();
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/product leader\. team builder\./i);
    expect(h1).toHaveTextContent(/still ships\./i);
  });

  it('leads with the leadership positioning, not a job title', () => {
    renderHero();
    expect(screen.getByText(/product & people leader/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/principal product manager/i)
    ).not.toBeInTheDocument();
  });

  it('uses the standardized 13+ years framing', () => {
    renderHero();
    expect(screen.getByText(/13\+ years/i)).toBeInTheDocument();
  });

  it('renders one list item per proof point with label, stat and description', () => {
    renderHero();
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(proofPoints.length);
    for (const [i, point] of proofPoints.entries()) {
      const item = items.at(i);
      expect(item).toHaveTextContent(point.label);
      expect(item).toHaveTextContent(point.stat);
      expect(item).toHaveTextContent(point.description);
    }
  });

  it('does not use the ambiguous "engineers supported" proof point', () => {
    renderHero();
    expect(screen.queryByText(/engineers supported/i)).not.toBeInTheDocument();
  });

  it('names every employer in the credibility line', () => {
    renderHero();
    for (const job of experience) {
      expect(
        screen.getByText(job.company, { exact: false })
      ).toBeInTheDocument();
    }
  });

  it('headshot image has a descriptive alt attribute', () => {
    renderHero();
    const img = screen.getByRole('img', { name: /bill mchenry/i });
    expect(img.getAttribute('alt').trim().length).toBeGreaterThan(0);
  });

  it('See the work jumps to the selected work section', () => {
    renderHero();
    expect(screen.getByRole('link', { name: /see the work/i })).toHaveAttribute(
      'href',
      '#selected-work'
    );
  });

  it('View resume link navigates to /resume', () => {
    renderHero();
    const link = screen.getByRole('link', { name: /view resume/i });
    expect(link).toHaveAttribute('href', '/resume');
  });

  it('LinkedIn link opens in new tab with noopener', () => {
    renderHero();
    const link = screen.getByRole('link', { name: /on linkedin/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
