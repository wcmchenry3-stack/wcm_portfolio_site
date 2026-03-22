import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark rounded px-2 py-1 min-h-[44px] inline-flex items-center ${
      isActive
        ? 'text-brand-teal underline underline-offset-4'
        : 'text-brand-light hover:text-brand-teal'
    }`;

  return (
    <>
      {/* Skip-to-content link — first focusable element in the DOM */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-teal focus:text-white focus:rounded focus:ring-2 focus:ring-white focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-brand-dark border-b border-brand-navy shadow-sm">
        <nav
          aria-label="Main navigation"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        >
          {/* Logo */}
          <NavLink
            to="/"
            aria-label="Bill McHenry – home"
            className="text-brand-light font-semibold text-lg hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark rounded px-1"
          >
            Bill McHenry
          </NavLink>

          {/* Desktop nav links */}
          <ul
            className="hidden sm:flex items-center gap-2 list-none m-0 p-0"
            role="list"
          >
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/resume" className={navLinkClass}>
                Resume
              </NavLink>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={
              isOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded text-brand-light hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="sm:hidden border-t border-brand-navy bg-brand-dark"
          >
            <ul
              className="flex flex-col px-4 py-3 gap-1 list-none m-0 p-0"
              role="list"
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resume"
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
