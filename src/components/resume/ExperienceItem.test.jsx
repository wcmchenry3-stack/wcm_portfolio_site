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

describe('ExperienceItem — translation key resolution', () => {
  it('resolves a single-role title and bullet under experience.<i18nKey>', () => {
    i18n.addResource(
      'en',
      'resume',
      'experience.transkeysingle.title',
      'Translated Single Title'
    );
    i18n.addResource(
      'en',
      'resume',
      'experience.transkeysingle.bullet_1',
      'Translated single bullet'
    );

    render(
      <ExperienceItem
        company="Translation Co"
        i18nKey="transkeysingle"
        location="Remote"
        title="Untranslated Single Title"
        startDate={{ year: 2020, month: 1 }}
        endDate={null}
        bullets={['Untranslated single bullet']}
      />,
      { wrapper }
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Translated Single Title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Translated single bullet')).toBeInTheDocument();
  });

  it('resolves a multi-role title and bullet under experience.<i18nKey>.role_<n>', () => {
    i18n.addResource(
      'en',
      'resume',
      'experience.transkeymulti.role_2.title',
      'Translated Role 2 Title'
    );
    i18n.addResource(
      'en',
      'resume',
      'experience.transkeymulti.role_2.bullet_1',
      'Translated role 2 bullet'
    );

    render(
      <ExperienceItem
        company="Translation Co"
        i18nKey="transkeymulti"
        location="Remote"
        roles={[
          {
            title: 'Untranslated Role 1 Title',
            startDate: { year: 2022, month: 1 },
            endDate: null,
            bullets: ['Untranslated role 1 bullet'],
          },
          {
            title: 'Untranslated Role 2 Title',
            startDate: { year: 2020, month: 1 },
            endDate: { year: 2021, month: 12 },
            bullets: ['Untranslated role 2 bullet'],
          },
        ]}
      />,
      { wrapper }
    );

    expect(
      screen.getByRole('heading', { level: 4, name: 'Translated Role 2 Title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Translated role 2 bullet')).toBeInTheDocument();
    // Role 1 has no matching resource, so it still falls back to the
    // English default passed as props — proving each role resolves its
    // own independent key path rather than sharing one.
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Untranslated Role 1 Title',
      })
    ).toBeInTheDocument();
  });
});
