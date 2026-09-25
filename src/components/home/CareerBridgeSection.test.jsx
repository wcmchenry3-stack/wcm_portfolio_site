import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { CareerBridgeSection } from './CareerBridgeSection.jsx';

function renderCareerBridge() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <CareerBridgeSection />
      </MemoryRouter>
    </I18nextProvider>
  );
}

describe('CareerBridgeSection', () => {
  it('renders the heading and body from the home namespace', () => {
    renderCareerBridge();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /15\+ years building products that matter/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/led product at every stage/i)).toBeInTheDocument();
  });

  it('CTA link navigates to /resume', () => {
    renderCareerBridge();
    const link = screen.getByRole('link', { name: /view full resume/i });
    expect(link).toHaveAttribute('href', '/resume');
  });
});
