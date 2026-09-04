import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  onOpenChat?: () => void;
  isRevealed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isRevealed = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.clients, href: '#clientes' },
    { name: t.nav.services, href: '#servicios' },
    { name: t.nav.projects, href: '#proyectos' },
    { name: t.nav.ai, href: '#solution-finder' },
    { name: t.nav.philosophy, href: '#filosofia' },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={isRevealed ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      style={{ willChange: 'transform, opacity' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 md:px-12 ${
        scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <nav className="relative flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-white/90 backdrop-blur-md border border-black/5 shadow-xs transition-all duration-300">
          {/* Brand Logo: Functions as Home Button (Scroll to top) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
            className="flex items-center space-x-1.5 sm:space-x-2 group cursor-pointer"
            title={t.nav.home}
          >
            <div className="flex items-center font-display font-black text-xl sm:text-2xl tracking-tight text-[#121212]">
              <span>SIMPORA</span>
            </div>
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#97F2CC] group-hover:scale-150 transition-transform shadow-[0_0_8px_#97F2CC]" />
          </a>

          {/* Desktop Nav Links (Only 4 direct links) */}
          <div className="hidden lg:flex items-center space-x-7 font-body text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#121212] opacity-70 hover:opacity-100 transition-opacity tracking-tight cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Minimalist ES | EN Language Toggle */}
            <LanguageToggle />

            {/* Primary Action Button: "Contacto" (Hidden on tiny mobile to avoid overlap, present in mobile drawer) */}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contacto');
              }}
              className="hidden sm:inline-flex items-center space-x-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            >
              <span className="tracking-tight">{t.nav.contactBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#97F2CC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-black/5 shadow-lg space-y-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/5">
              <span className="text-xs font-mono text-zinc-400">Idioma / Language</span>
              <LanguageToggle />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-sm font-medium text-[#121212] opacity-75 hover:opacity-100 hover:bg-[#F5F7F8] rounded-xl transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-black/5">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contacto');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-5 rounded-full bg-[#121212] text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-xs hover:bg-black transition-all cursor-pointer"
              >
                <span>{t.nav.contactBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-[#97F2CC]" />
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};
