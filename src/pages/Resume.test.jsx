import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Resume from './Resume.jsx';

describe('Resume page', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
  });

  it('has a main landmark with id="main-content"', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('renders the Resume h1 heading', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /resume/i })
    ).toBeInTheDocument();
  });

  it('renders the Professional Summary section', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    expect(screen.getByText(/professional summary/i)).toBeInTheDocument();
  });

  it('renders the Experience section', () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /experience/i })
    ).toBeInTheDocument();
  });
});
