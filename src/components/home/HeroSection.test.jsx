import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HeroSection } from './HeroSection.jsx'

function renderHero() {
  return render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  )
}

describe('HeroSection', () => {
  it('renders the main headline', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /crafting innovative solutions/i
    )
  })

  it('headshot image has a descriptive alt attribute', () => {
    renderHero()
    const img = screen.getByRole('img', { name: /bill mchenry/i })
    expect(img.getAttribute('alt')).toBeTruthy()
    expect(img.getAttribute('alt').trim().length).toBeGreaterThan(0)
  })

  it('View Resume link navigates to /resume', () => {
    renderHero()
    const link = screen.getByRole('link', { name: /view resume/i })
    expect(link).toHaveAttribute('href', '/resume')
  })

  it('LinkedIn link opens in new tab with noopener', () => {
    renderHero()
    const link = screen.getByRole('link', { name: /connect on linkedin/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
