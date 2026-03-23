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
});
