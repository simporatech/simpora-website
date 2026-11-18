import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { ScrollCircuitSpine } from './components/ScrollCircuitSpine';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesBento } from './components/ServicesBento';
import { ClientsSection } from './components/ClientsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SolutionFinder } from './components/SolutionFinder';
import { PhilosophyValues } from './components/PhilosophyValues';
import { TechStackCarousel } from './components/TechStackCarousel';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GeminiChatModal } from './components/GeminiChatModal';
import { FloatingAiButton } from './components/FloatingAiButton';
import { CustomCursor } from './components/CustomCursor';
import { CyberGridWarp } from './components/CyberGridWarp';
import { NeuralConstellation } from './components/NeuralConstellation';
import { ContactPage } from './pages/ContactPage';

interface MainLayoutProps {
  onNavigateContact?: () => void;
}

function MainLayout({ onNavigateContact }: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState('');
  const [solutionFinderPreset, setSolutionFinderPreset] = useState<string | undefined>(undefined);
  const { language } = useLanguage();

  // Ensure page starts strictly at top on load or refresh
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // When user clicks "Diagnosticar necesidad" on a service card
  const handleSelectServiceForDiagnosis = (pillarTitle: string) => {
    const text =
      language === 'en'
        ? `We need specialized engineering support in ${pillarTitle}. We want to understand the architectural scope and how to integrate it into our current business workflows.`
        : `Necesito apoyo especializado en ${pillarTitle}. Queremos entender el alcance técnico y cómo integrarlo con nuestros procesos actuales.`;

    setSolutionFinderPreset(text);
    // Smooth scroll to solution-finder
    const elem = document.getElementById('solution-finder');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks "Cotizar esta solución" in the Solution Finder
  const handleApplyDiagnosisToContact = (diagnosisSummary: string) => {
    setContactInitialMessage(diagnosisSummary);
    const elem = document.getElementById('contacto');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] selection:bg-[#97F2CC] selection:text-[#121212] relative overflow-x-clip">
      {/* Floating minimalist Navbar */}
      <Navbar onOpenChat={() => setIsChatOpen(true)} isRevealed={true} />

      {/* 1. Constelación Neuronal Holográfica Global (Fondo interactivo de partículas en toda la app) */}
      <NeuralConstellation />
      <ScrollCircuitSpine />
      <CyberGridWarp />

      <div>
        <main className="relative z-10 pt-20">
          {/* 1. Hero Section (ultra rápido, con chip NPU refinado y glow menta) */}
          <Hero
            onOpenConsultant={() => setIsChatOpen(true)}
            isRevealed={true}
          />

          {/* 2. Sobre SIMPORA (Misión, Fundador & Rigor Técnico) */}
          <AboutSection />

          {/* 3. Empresas que han confiado en SIMPORA (Social Proof & Autoridad) */}
          <ClientsSection />

          {/* 4. Servicios Principales (Bento Grid: 6 Pillars) */}
          <ServicesBento onSelectServiceForDiagnosis={handleSelectServiceForDiagnosis} />

          {/* 5. Proyectos y Productos de SIMPORA (Growy & Hotel La Posada de Copán) */}
          <ProjectsSection />

          {/* 6. SIMPORA AI Solution Finder (El gancho estrella) */}
          <SolutionFinder
            externalPreset={solutionFinderPreset}
            onApplyDiagnosisToContact={handleApplyDiagnosisToContact}
          />

          {/* 5. Filosofía & Valores (Innovación, Eficiencia, Compromiso) */}
          <PhilosophyValues />

          {/* 6. Stack Tecnológico (Infinite smooth ticker) */}
          <TechStackCarousel />

          {/* 7. Contacto ("Hablemos de tu futuro") */}
          <ContactSection initialMessage={contactInitialMessage} />
        </main>

        {/* 8. Footer */}
        <Footer />
      </div>

      {/* 9. Floating Launcher Button & Multi-turn Gemini Chat Modal */}
      <FloatingAiButton isOpen={isChatOpen} onClick={() => setIsChatOpen(true)} />
      <GeminiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      return p === '' ? '/' : p;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      setCurrentPath(p === '' ? '/' : p);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      const p = path.toLowerCase().replace(/\/+$/, '');
      setCurrentPath(p === '' ? '/' : p);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const isContactPage = currentPath === '/contact';

  return (
    <LanguageProvider>
      {/* Precision Custom Cursor with Ambient Background Mouse Glow across all routes */}
      <CustomCursor />
      {isContactPage ? (
        <ContactPage onNavigateHome={() => navigateTo('/')} />
      ) : (
        <MainLayout onNavigateContact={() => navigateTo('/contact')} />
      )}
    </LanguageProvider>
  );
}


