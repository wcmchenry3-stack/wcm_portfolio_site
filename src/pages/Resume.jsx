import { useTranslation } from 'react-i18next';
import { ResumeSummary } from '../components/resume/ResumeSummary.jsx';
import { ExperienceList } from '../components/resume/ExperienceList.jsx';

export default function Resume() {
  const { t } = useTranslation('resume');
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="scroll-mt-20 flex-1 bg-brand-light"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            {t('page.title')}
          </h1>
          <a
            href="https://www.linkedin.com/in/bill-mchenry/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('page.linkedinAriaLabel')}
            className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 self-start print:hidden"
          >
            {t('page.linkedinText')}
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <ResumeSummary />
          <ExperienceList />
        </div>
      </div>
    </main>
  );
}
