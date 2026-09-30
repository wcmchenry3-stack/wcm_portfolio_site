import { HeroSection } from '../components/home/HeroSection.jsx';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection.jsx';
import { LeadershipSection } from '../components/home/LeadershipSection.jsx';
import { CareerSnapshotSection } from '../components/home/CareerSnapshotSection.jsx';
import { ContactBar } from '../components/home/ContactBar.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';

export default function Home() {
  return (
    <PageMain>
      <HeroSection />
      <SelectedWorkSection />
      <LeadershipSection />
      <CareerSnapshotSection />
      <ContactBar />
    </PageMain>
  );
}
