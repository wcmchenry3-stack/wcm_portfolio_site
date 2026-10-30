import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import Home from './Home.jsx';

function renderHome() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('Home page', () => {
  it('renders without crashing', () => {
    renderHome();
  });

  it('has a main landmark with id="main-content"', () => {
    renderHome();
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('puts the leadership proof ahead of the independent products', () => {
    renderHome();
    const sections = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    const order = [
      /what i own today/i,
      /principles i hold/i,
      /accountable for all of it/i,
      /in practice/i,
      /products i build on my own time/i,
      /13\+ years in product/i,
    ].map((pattern) => sections.findIndex((text) => pattern.test(text)));
    expect(order).not.toContain(-1);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it('never shows the retired $6M figure', () => {
    renderHome();
    expect(screen.getByRole('main').textContent).not.toContain('$6M');
  });
});
