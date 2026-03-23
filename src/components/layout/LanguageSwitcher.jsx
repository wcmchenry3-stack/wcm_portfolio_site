import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES } from '../../i18n/locales.js';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const current = LOCALES.find((l) => l.code === i18n.language) ?? LOCALES[0];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onOutside);
    };
  }, []);

  const select = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('navbar.languageSwitcher')}
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium min-h-[44px] px-2 py-1 rounded text-brand-light hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.nativeLabel}</span>
        <svg
          aria-hidden="true"
          className="w-3 h-3 ms-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t('navbar.languageSwitcher')}
          className="absolute end-0 top-full mt-1 min-w-[9rem] bg-brand-dark border border-brand-navy rounded-lg shadow-lg py-1 z-50"
        >
          {LOCALES.map((locale) => (
            <li
              key={locale.code}
              role="option"
              aria-selected={locale.code === i18n.language}
              tabIndex={0}
              onClick={() => select(locale.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  select(locale.code);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none text-brand-light hover:bg-brand-navy hover:text-brand-teal focus:outline-none focus:bg-brand-navy focus:text-brand-teal"
            >
              <span aria-hidden="true">{locale.flag}</span>
              <span>{locale.nativeLabel}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
