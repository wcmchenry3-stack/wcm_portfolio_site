import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { featuredProjects, supportingProjects } from '../../data/projects.js';
import { SelectedWorkSection } from './SelectedWorkSection.jsx';

function renderSelectedWork(props) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <SelectedWorkSection {...props} />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('SelectedWorkSection', () => {
  it('renders the section heading and intro from the home namespace', () => {
    renderSelectedWork();
    expect(
      screen.getByRole('heading', { level: 2, name: /products i own/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/run like real products/i)).toBeInTheDocument();
  });

  it('links each featured project to its case study', () => {
    renderSelectedWork();
    for (const project of featuredProjects) {
      expect(
        screen.getByRole('heading', { level: 3, name: project.name })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', {
          name: (name) =>
            /read the case study/i.test(name) && name.includes(project.name),
        })
      ).toHaveAttribute('href', `/work/${project.id}`);
    }
  });

  it('featured screenshots carry descriptive alt text', () => {
    renderSelectedWork();
    for (const project of featuredProjects) {
      for (const image of project.images) {
        expect(screen.getByRole('img', { name: image.alt })).toHaveAttribute(
          'src',
          image.src
        );
      }
    }
  });

  it('supporting projects open externally in a new tab with noopener', () => {
    renderSelectedWork();
    for (const project of supportingProjects) {
      const link = screen.getByRole('link', {
        name: (name) => name.includes(project.name),
      });
      expect(link).toHaveAttribute('href', project.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveTextContent(/opens in new tab/i);
    }
  });

  it('keeps supporting projects secondary — no case-study links for them', () => {
    renderSelectedWork();
    for (const project of supportingProjects) {
      expect(
        screen.queryByRole('heading', { name: project.name })
      ).not.toBeInTheDocument();
    }
  });

  it('promotes headings by one level when used as the page heading', () => {
    renderSelectedWork({ headingLevel: 1 });
    expect(
      screen.getByRole('heading', { level: 1, name: /products i own/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: featuredProjects[0].name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /also built/i })
    ).toBeInTheDocument();
  });
});
