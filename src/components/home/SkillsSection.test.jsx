import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../test/i18nTestInstance.js';
import { SkillsSection } from './SkillsSection.jsx';
import enHome from '../../../public/locales/en/home.json';

const wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('SkillsSection', () => {
  it('renders the section heading', () => {
    render(<SkillsSection />, { wrapper });
    expect(
      screen.getByRole('heading', { level: 2, name: enHome['skills.heading'] })
    ).toBeInTheDocument();
  });

  it('renders soft skills sub-heading', () => {
    render(<SkillsSection />, { wrapper });
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: enHome['skills.softHeading'],
      })
    ).toBeInTheDocument();
  });

  it('renders technical skills sub-heading', () => {
    render(<SkillsSection />, { wrapper });
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: enHome['skills.technicalHeading'],
      })
    ).toBeInTheDocument();
  });

  it('renders all soft skill labels in English', () => {
    render(<SkillsSection />, { wrapper });
    Object.entries(enHome)
      .filter(([key]) => key.startsWith('skills.soft.'))
      .forEach(([, label]) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
  });

  it('renders all technical skill labels in English', () => {
    render(<SkillsSection />, { wrapper });
    Object.entries(enHome)
      .filter(([key]) => key.startsWith('skills.tech.'))
      .forEach(([, label]) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
  });

  it('skills are inside list elements', () => {
    render(<SkillsSection />, { wrapper });
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBeGreaterThanOrEqual(2);
  });
});
