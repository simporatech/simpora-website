import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationSchema, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}

const STORAGE_KEY = 'simpora_lang';

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') {
      return saved as Language;
    }

    // Check browser language: if starts with 'es', use Spanish; otherwise default to English
    const browserLang =
      navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
    if (browserLang.toLowerCase().startsWith('es')) {
      return 'es';
    }
    return 'en';
  }
  return 'es';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Update HTML lang attribute and enforce canonical title
    document.documentElement.lang = language;
    document.title = 'SIMPORA | Simple. Powerful. Advanced';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
