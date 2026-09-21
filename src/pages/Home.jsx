import { HeroSection } from '../components/home/HeroSection.jsx';
import { ImpactSection } from '../components/home/ImpactSection.jsx';
import { SelectedWorkSection } from '../components/home/SelectedWorkSection.jsx';
import { CareerBridgeSection } from '../components/home/CareerBridgeSection.jsx';
import { ContactBar } from '../components/home/ContactBar.jsx';

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="scroll-mt-20 flex-1">
      <HeroSection />
      <ImpactSection />
      <SelectedWorkSection />
      <CareerBridgeSection />
      <ContactBar />
    </main>
  );
}
