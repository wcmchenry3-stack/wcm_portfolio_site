import { useTranslation } from 'react-i18next';
import { ResumeSummary } from '../components/resume/ResumeSummary.jsx';
import { ExperienceList } from '../components/resume/ExperienceList.jsx';
import { CapabilitiesSection } from '../components/resume/CapabilitiesSection.jsx';
import { EducationSection } from '../components/resume/EducationSection.jsx';
import { LINKEDIN_URL } from '../data/brand.js';
import { Button } from '../components/ui/Button.jsx';

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
          <Button
            href={LINKEDIN_URL}
            surface="light"
            size="sm"
            aria-label={t('page.linkedinAriaLabel')}
            className="self-start print:hidden"
          >
            {t('page.linkedinText')}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6 sm:p-10">
          <ResumeSummary />
          <ExperienceList />
          <CapabilitiesSection />
          <EducationSection />
        </div>
      </div>
    </main>
  );
}
