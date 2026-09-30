import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../test/i18nTestInstance.js';
import Work from './Work.jsx';

describe('Work page', () => {
  it('has a main landmark and a single h1', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Work />
        </MemoryRouter>
      </I18nextProvider>
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
