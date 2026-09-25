import { HeroSection } from '../components/home/HeroSection.jsx';
import { ImpactSection } from '../components/home/ImpactSection.jsx';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection.jsx';
import { CareerBridgeSection } from '../components/home/CareerBridgeSection.jsx';
import { ContactBar } from '../components/home/ContactBar.jsx';
import { PageMain } from '../components/ui/PageMain.jsx';

export default function Home() {
  return (
    <PageMain>
      <HeroSection />
      <ImpactSection />
      <SelectedWorkSection />
      <CareerBridgeSection />
      <ContactBar />
    </PageMain>
  );
}
