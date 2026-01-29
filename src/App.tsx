import React from 'react';
import { SEO } from './components/SEO';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Capabilities } from './components/sections/Capabilities';
import { ContactSection } from './components/sections/ContactSection';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] font-sans text-slate-300 selection:bg-[#00B4B9] selection:text-white overflow-x-hidden">
      <SEO />
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Capabilities />
      <ContactSection />
      <Footer />

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite reverse;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
