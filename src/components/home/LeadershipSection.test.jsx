import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { LeadershipSection } from './LeadershipSection.jsx';

function renderLeadership() {
  return render(
    <I18nextProvider i18n={i18n}>
      <LeadershipSection />
    </I18nextProvider>
  );
}

describe('LeadershipSection', () => {
  it('renders the section heading', () => {
    renderLeadership();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /accountable for all of it/i,
      })
    ).toBeInTheDocument();
  });

  it('is the #how-i-lead anchor target', () => {
    const { container } = renderLeadership();
    expect(container.querySelector('section#how-i-lead')).toBeInTheDocument();
  });

  it('renders the four parts of the manager job in order', () => {
    renderLeadership();
    const pillars = screen
      .getAllByRole('heading', { level: 3 })
      .slice(0, 4)
      .map((h) => h.textContent);
    expect(pillars).toEqual(['Hire', 'Manage', 'Develop', 'Organize']);
  });

  it('uses authority language, not mentoring language, for the pillars', () => {
    renderLeadership();
    expect(screen.queryByText(/mentor/i)).not.toBeInTheDocument();
  });

  it('renders the four coaching steps in order', () => {
    renderLeadership();
    const steps = screen.getAllByRole('heading', { level: 4 });
    expect(steps.map((h) => h.textContent)).toEqual([
      'Give them a domain, not a backlog',
      'Teach discovery, not feature intake',
      'Clear the busywork',
      'Hand over the roadmap',
    ]);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
  });

  it('renders the people-development track record', () => {
    renderLeadership();
    const heading = screen.getByRole('heading', { name: /track record/i });
    const list = heading.nextElementSibling;
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent(/6 yrs/);
    expect(items[0]).toHaveTextContent(/managing product managers/i);
    expect(items[1]).toHaveTextContent(/4 → PMs/);
    expect(items[2]).toHaveTextContent(/up to Senior PM/);
  });
});
