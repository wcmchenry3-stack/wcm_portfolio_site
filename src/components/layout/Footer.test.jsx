import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer.jsx'

describe('Footer', () => {
  it('renders LinkedIn link with correct href', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/bill-mchenry/')
  })

  it('LinkedIn link opens in new tab', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('LinkedIn link has a descriptive aria-label', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /linkedin/i })
    const label = link.getAttribute('aria-label') ?? ''
    expect(label.length).toBeGreaterThan(0)
  })
})
