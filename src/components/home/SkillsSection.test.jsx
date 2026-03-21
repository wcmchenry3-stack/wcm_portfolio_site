import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillsSection } from './SkillsSection.jsx'
import { softSkills, technicalSkills } from '../../data/skills.js'

describe('SkillsSection', () => {
  it('renders an h2 heading', () => {
    render(<SkillsSection />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders all soft skills', () => {
    render(<SkillsSection />)
    softSkills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('renders all technical skills', () => {
    render(<SkillsSection />)
    technicalSkills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('skills are inside list elements', () => {
    render(<SkillsSection />)
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThanOrEqual(2)
  })
})
