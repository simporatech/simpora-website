import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-[#F5F7F8] border border-black/[0.06] shadow-2xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => handleSelect('es')}
        className={`relative px-2.5 py-1 text-[11px] font-mono font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'es'
            ? 'text-[#121212]'
            : 'text-zinc-400 hover:text-zinc-700'
        }`}
        aria-pressed={language === 'es'}
      >
        {language === 'es' && (
          <motion.span
            layoutId="activeLangBubble"
            className="absolute inset-0 rounded-full bg-white border border-black/[0.06] shadow-xs"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1">
          <span>ES</span>
          {language === 'es' && <span className="w-1 h-1 rounded-full bg-[#97F2CC]" />}
        </span>
      </button>

      <span className="w-px h-3 bg-black/10 mx-0.5" />

      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`relative px-2.5 py-1 text-[11px] font-mono font-bold rounded-full transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'text-[#121212]'
            : 'text-zinc-400 hover:text-zinc-700'
        }`}
        aria-pressed={language === 'en'}
      >
        {language === 'en' && (
          <motion.span
            layoutId="activeLangBubble"
            className="absolute inset-0 rounded-full bg-white border border-black/[0.06] shadow-xs"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1">
          <span>EN</span>
          {language === 'en' && <span className="w-1 h-1 rounded-full bg-[#97F2CC]" />}
        </span>
      </button>
    </div>
  );
};
