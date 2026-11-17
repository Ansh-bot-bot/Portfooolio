import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navigation, type SectionId } from './components/Navigation';
import { PlaygroundSection } from './components/PlaygroundSection';
import { WorkSection } from './components/WorkSection';
import { SoundProvider } from './context/SoundContext';

const sectionIds: SectionId[] = ['home', 'about', 'work', 'playground', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.32;
      let current: SectionId = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollMarker >= top) {
            current = id;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SoundProvider>
      <div className="desk-grid-bg min-h-screen py-0 sm:py-5 lg:py-6 px-0 sm:px-3 lg:px-4">
        <CustomCursor />

        {/* Centered Notebook Paper Workspace */}
        <div className="notebook-paper mx-auto w-full sm:w-[94%] lg:w-[92%] max-w-[1760px] min-h-screen">
          <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

          <main>
            <HeroSection onContactClick={() => scrollToSection('contact')} />
            <AboutSection />
            <WorkSection />
            <PlaygroundSection />
            <ContactSection />
          </main>

          <Footer onBackToTop={() => scrollToSection('home')} />
        </div>
      </div>
    </SoundProvider>
  );
}
