import { HeroSection } from '../components/home/HeroSection.jsx';
import { ScopeSection } from '../components/home/ScopeSection.jsx';
import { PrinciplesSection } from '../components/home/PrinciplesSection.jsx';
import { LeadershipSection } from '../components/home/LeadershipSection.jsx';
import { StoriesSection } from '../components/home/StoriesSection.jsx';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection.jsx';
import { CareerSnapshotSection } from '../components/home/CareerSnapshotSection.jsx';
import { ContactBar } from '../components/home/ContactBar.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';

/**
 * Leadership proof first (scope, principles, how I lead, stories), then
 * the independent products as an open window into the same method.
 */
export default function Home() {
  return (
    <PageMain>
      <HeroSection />
      <ScopeSection />
      <PrinciplesSection />
      <LeadershipSection />
      <StoriesSection />
      <SelectedWorkSection />
      <CareerSnapshotSection />
      <ContactBar />
    </PageMain>
  );
}
