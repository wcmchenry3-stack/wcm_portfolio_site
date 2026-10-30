import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { StoriesSection } from './StoriesSection.jsx';

function renderStories() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <StoriesSection />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('StoriesSection', () => {
  it('renders the section heading', () => {
    renderStories();
    expect(
      screen.getByRole('heading', { level: 2, name: /in practice/i })
    ).toBeInTheDocument();
  });

  it('renders four story teasers, each with a title and a stated outcome', () => {
    renderStories();
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(within(item).getByRole('heading', { level: 3 })).toBeTruthy();
      expect(item.querySelectorAll('p').length).toBeGreaterThanOrEqual(2);
    }
    expect(items[1]).toHaveTextContent(/both shipped on the date/i);
  });

  it('invites a conversation on exactly one story, linking to /contact', () => {
    renderStories();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/contact');
  });

  it('keeps proprietary specifics out of the public teasers', () => {
    const { container } = renderStories();
    expect(container.textContent).not.toMatch(/\$6M|influencer|chairman|CEO/i);
  });
});
