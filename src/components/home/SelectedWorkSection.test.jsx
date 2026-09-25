import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { featuredProjects, supportingProjects } from '../../data/projects.js';
import { SelectedWorkSection } from './SelectedWorkSection.jsx';

function renderSelectedWork() {
  return render(
    <I18nextProvider i18n={i18n}>
      <SelectedWorkSection />
    </I18nextProvider>
  );
}

describe('SelectedWorkSection', () => {
  it('renders the section heading and intro from the home namespace', () => {
    renderSelectedWork();
    expect(
      screen.getByRole('heading', { level: 2, name: /selected work/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a few things i've built to test ideas/i)
    ).toBeInTheDocument();
  });

  it('renders every featured and supporting project as a card', () => {
    renderSelectedWork();
    for (const project of [...featuredProjects, ...supportingProjects]) {
      expect(
        screen.getByRole('link', { name: new RegExp(project.name, 'i') })
      ).toBeInTheDocument();
      expect(screen.getByText(project.tagline)).toBeInTheDocument();
      expect(screen.getByText(project.category)).toBeInTheDocument();
    }
  });

  it('project links open in a new tab with noopener', () => {
    renderSelectedWork();
    const link = screen.getByRole('link', {
      name: new RegExp(featuredProjects[0].name, 'i'),
    });
    expect(link).toHaveAttribute('href', featuredProjects[0].href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
