import { HeroSection } from '../components/home/HeroSection.jsx';
import { SkillsSection } from '../components/home/SkillsSection.jsx';
import { ContactBar } from '../components/home/ContactBar.jsx';

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="scroll-mt-20 flex-1">
      <HeroSection />
      <SkillsSection />
      <ContactBar />
    </main>
  );
}
