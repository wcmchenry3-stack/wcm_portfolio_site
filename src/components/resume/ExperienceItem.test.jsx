import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { ExperienceItem } from './ExperienceItem.jsx';

const wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

const singleRoleJob = {
  company: 'Acme Corp',
  i18nKey: 'acme',
  location: 'Remote',
  title: 'Senior Product Manager',
  startDate: { year: 2020, month: 1 },
  endDate: { year: 2021, month: 12 },
  bullets: ['Led roadmap planning', 'Shipped three major features'],
};

const currentRoleJob = {
  company: 'Current Co',
  i18nKey: 'currentco',
  location: 'Remote',
  title: 'Lead PM',
  startDate: { year: 2022, month: 3 },
  endDate: null,
  bullets: ['Owns product strategy'],
};

const multiRoleJob = {
  company: 'BigCo',
  i18nKey: 'bigco',
  location: 'Various',
  roles: [
    {
      title: 'Principal PM',
      startDate: { year: 2022, month: 1 },
      endDate: null,
      bullets: ['Owned platform strategy'],
    },
    {
      title: 'Senior PM',
      startDate: { year: 2020, month: 6 },
      endDate: { year: 2021, month: 12 },
      bullets: ['Grew the analytics product'],
    },
  ],
};

describe('ExperienceItem — single role', () => {
  it('renders company name', () => {
    render(<ExperienceItem {...singleRoleJob} />, { wrapper });
    expect(screen.getByText(/acme corp/i)).toBeInTheDocument();
  });

  it('renders role title as h4', () => {
    render(<ExperienceItem {...singleRoleJob} />, { wrapper });
    expect(
      screen.getByRole('heading', { level: 4, name: /senior product manager/i })
    ).toBeInTheDocument();
  });

  it('renders bullets as list items', () => {
    render(<ExperienceItem {...singleRoleJob} />, { wrapper });
    expect(screen.getByText('Led roadmap planning')).toBeInTheDocument();
    expect(
      screen.getByText('Shipped three major features')
    ).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('renders a formatted date range', () => {
    render(<ExperienceItem {...singleRoleJob} />, { wrapper });
    // Year numbers must be visible
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText(/2021/)).toBeInTheDocument();
  });

  it('renders "Present" when endDate is null', () => {
    render(<ExperienceItem {...currentRoleJob} />, { wrapper });
    expect(screen.getByText(/present/i)).toBeInTheDocument();
  });
});

describe('ExperienceItem — multi-role', () => {
  it('renders company name', () => {
    render(<ExperienceItem {...multiRoleJob} />, { wrapper });
    expect(screen.getByText(/bigco/i)).toBeInTheDocument();
  });

  it('renders all role titles', () => {
    render(<ExperienceItem {...multiRoleJob} />, { wrapper });
    expect(
      screen.getByRole('heading', { level: 4, name: /principal pm/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 4, name: /senior pm/i })
    ).toBeInTheDocument();
  });

  it('renders all bullet points', () => {
    render(<ExperienceItem {...multiRoleJob} />, { wrapper });
    expect(screen.getByText('Owned platform strategy')).toBeInTheDocument();
    expect(screen.getByText('Grew the analytics product')).toBeInTheDocument();
  });

  it('renders "Present" for the current role and a year for the past role', () => {
    render(<ExperienceItem {...multiRoleJob} />, { wrapper });
    expect(screen.getByText(/present/i)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
  });
});
