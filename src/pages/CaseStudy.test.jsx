import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import { caseStudies } from '../data/caseStudies.js';
import CaseStudy from './CaseStudy.jsx';

function renderAt(path) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe.each(caseStudies)('CaseStudy page — $name', (study) => {
  it('has a main landmark and the product name as h1', () => {
    renderAt(`/work/${study.id}`);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(
      screen.getByRole('heading', { level: 1, name: study.name })
    ).toBeInTheDocument();
  });

  it('renders every section with a translated heading (no raw keys)', () => {
    renderAt(`/work/${study.id}`);
    for (const section of study.sections) {
      const region = document.getElementById(section.key);
      expect(region).not.toBeNull();
      const heading = region.querySelector('h2');
      expect(heading.textContent).not.toMatch(/\.heading$/);
      expect(heading.textContent.trim().length).toBeGreaterThan(0);
    }
    for (const section of study.sections) {
      expect(document.body.textContent).not.toContain(
        `${study.id}.${section.key}.`
      );
    }
  });

  it('has an on-page nav linking to each section', () => {
    renderAt(`/work/${study.id}`);
    const nav = screen.getByRole('navigation', { name: /on this page/i });
    const links = nav.querySelectorAll('a');
    expect([...links].map((a) => a.getAttribute('href'))).toEqual(
      study.sections.map((s) => `#${s.key}`)
    );
  });

  it('source link opens in a new tab with noopener', () => {
    renderAt(`/work/${study.id}`);
    const link = screen.getByRole('link', { name: /view source on github/i });
    expect(link).toHaveAttribute('href', study.repo);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('breadcrumb links back to /work', () => {
    renderAt(`/work/${study.id}`);
    const crumbs = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(crumbs.querySelector('a')).toHaveAttribute('href', '/work');
  });

  it('links to the next case study', () => {
    renderAt(`/work/${study.id}`);
    const others = caseStudies.filter((s) => s.id !== study.id);
    const link = screen.getByRole('link', { name: /next case study/i });
    expect(link).toHaveAttribute('href', `/work/${others[0].id}`);
  });
});

describe('CaseStudy page — unknown slug', () => {
  it('renders the not-found page', () => {
    renderAt('/work/does-not-exist');
    expect(
      screen.getByRole('heading', { level: 1, name: /page not found/i })
    ).toBeInTheDocument();
  });
});

describe('CaseStudy page — BookshelfAI specifics', () => {
  it('renders the architecture diagram and the tradeoffs table', () => {
    renderAt('/work/bookshelfai');
    expect(screen.getByRole('figure')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /decision/i })
    ).toBeInTheDocument();
  });
});

describe('CaseStudy page — BC Arcade specifics', () => {
  it('shows product screenshots with alt text', () => {
    renderAt('/work/bc-arcade');
    expect(
      screen.getByRole('img', { name: /bc arcade lobby/i })
    ).toBeInTheDocument();
  });
});
