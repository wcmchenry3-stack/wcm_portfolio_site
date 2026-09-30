import { SelectedWorkSection } from '../components/home/SelectedWorkSection.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';

/** `/work` — the case-study index, reusing the home page's work section. */
export default function Work() {
  return (
    <PageMain className="bg-brand-light">
      <SelectedWorkSection headingLevel={1} />
    </PageMain>
  );
}
