import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceItem } from './ExperienceItem.jsx';

const singleRoleJob = {
  company: 'Acme Corp',
  location: 'Remote',
  title: 'Senior Product Manager',
  period: 'Jan 2020 – Dec 2021',
  bullets: ['Led roadmap planning', 'Shipped three major features'],
};

const multiRoleJob = {
  company: 'BigCo',
  location: 'Various',
  roles: [
    {
      title: 'Principal PM',
      period: 'Jan 2022 – Present',
      bullets: ['Owned platform strategy'],
    },
    {
      title: 'Senior PM',
      period: 'Jun 2020 – Dec 2021',
      bullets: ['Grew the analytics product'],
    },
  ],
};

describe('ExperienceItem — single role', () => {
  it('renders company name', () => {
    render(<ExperienceItem {...singleRoleJob} />);
    expect(screen.getByText(/acme corp/i)).toBeInTheDocument();
  });

  it('renders role title as h4', () => {
    render(<ExperienceItem {...singleRoleJob} />);
    expect(
      screen.getByRole('heading', { level: 4, name: /senior product manager/i })
    ).toBeInTheDocument();
  });

  it('renders bullets as list items', () => {
    render(<ExperienceItem {...singleRoleJob} />);
    expect(screen.getByText('Led roadmap planning')).toBeInTheDocument();
    expect(
      screen.getByText('Shipped three major features')
    ).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});

describe('ExperienceItem — multi-role', () => {
  it('renders company name', () => {
    render(<ExperienceItem {...multiRoleJob} />);
    expect(screen.getByText(/bigco/i)).toBeInTheDocument();
  });

  it('renders all role titles', () => {
    render(<ExperienceItem {...multiRoleJob} />);
    expect(
      screen.getByRole('heading', { level: 4, name: /principal pm/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 4, name: /senior pm/i })
    ).toBeInTheDocument();
  });

  it('renders all bullet points', () => {
    render(<ExperienceItem {...multiRoleJob} />);
    expect(screen.getByText('Owned platform strategy')).toBeInTheDocument();
    expect(screen.getByText('Grew the analytics product')).toBeInTheDocument();
  });
});
