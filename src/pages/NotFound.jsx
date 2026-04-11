import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="scroll-mt-20 flex-1 flex items-center justify-center bg-brand-dark px-4"
    >
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-brand-teal">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-brand-light">
          {t('notfound.heading')}
        </h1>
        <p className="mt-3 text-brand-muted">{t('notfound.description')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center min-h-touch px-6 py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark"
        >
          {t('notfound.homeLink')}
        </Link>
      </div>
    </main>
  );
}
