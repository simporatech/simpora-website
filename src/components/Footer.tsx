import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/simporaData';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#121212] text-white pt-16 pb-12 border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 sm:pb-12 border-b border-white/[0.08]">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-2xl tracking-tight text-white">
                SIMPORA
              </span>
              <span className="w-2 h-2 rounded-full bg-[#97F2CC]" />
            </div>

            <p className="font-mono text-xs text-[#97F2CC] tracking-wider uppercase font-semibold">
              {t.hero.tagline}
            </p>

            <p className="font-body text-zinc-400 text-sm max-w-sm leading-relaxed">
              {t.footer.description}
            </p>

            <div className="pt-2 text-xs font-mono text-zinc-500">
              {t.footer.leadBy} {BRAND_INFO.founder} ({t.about.role})
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-sm text-zinc-300 font-body">
              <li>
                <a href="#hero" className="hover:text-[#97F2CC] transition-colors">{t.nav.home}</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#97F2CC] transition-colors">{t.nav.about}</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#97F2CC] transition-colors">{t.nav.services}</a>
              </li>
              <li>
                <a href="#solution-finder" className="hover:text-[#97F2CC] transition-colors">{t.nav.solutionFinder}</a>
              </li>
              <li>
                <a href="#filosofia" className="hover:text-[#97F2CC] transition-colors">{t.nav.philosophy}</a>
              </li>
              <li>
                <a href="#stack" className="hover:text-[#97F2CC] transition-colors">{t.nav.techStack}</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              {t.footer.contactHeading}
            </h4>
            <div className="space-y-2 text-sm font-mono text-zinc-300">
              <p className="text-xs text-zinc-400">
                Email:{' '}
                <a href={`mailto:${BRAND_INFO.email}`} className="text-white hover:text-[#97F2CC] underline">
                  {BRAND_INFO.email}
                </a>
              </p>
              <p className="text-xs text-zinc-400">
                WhatsApp:{' '}
                <a href={BRAND_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="text-white hover:text-[#97F2CC] underline">
                  {BRAND_INFO.phone}
                </a>
              </p>
              <p className="text-xs text-zinc-400">
                Web:{' '}
                <span className="text-white">{BRAND_INFO.domain}</span>
              </p>
              <p className="text-xs text-zinc-400">
                {language === 'en' ? 'Socials:' : 'Redes:'}{' '}
                <span className="text-[#97F2CC]">{BRAND_INFO.socialHandle}</span>
              </p>
            </div>

            <div className="pt-3">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-white hover:border-[#97F2CC] transition-all"
              >
                <span>{t.contact.whatsappLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#97F2CC]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} SIMPORA ({BRAND_INFO.domain}). {t.footer.rights}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-zinc-400 font-medium italic">
              "{t.footer.sloganText}"
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
              title={language === 'en' ? 'Back to top' : 'Volver arriba'}
              aria-label={language === 'en' ? 'Back to top' : 'Volver arriba'}
            >
              <ArrowUp className="w-4 h-4 text-[#97F2CC]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

