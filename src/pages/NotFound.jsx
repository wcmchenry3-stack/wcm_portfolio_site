import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button.jsx';

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
        <Button to="/" size="sm" className="mt-8">
          {t('notfound.homeLink')}
        </Button>
      </div>
    </main>
  );
}
