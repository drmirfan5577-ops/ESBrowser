import { useState, useCallback } from 'react';
import type { Language } from '@/types/browser';
import { TRANSLATIONS, LANGUAGES } from '@/constants/languages';

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('es_language') as Language) || 'en';
  });

  const t = useCallback((key: string): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || key;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('es_language', lang);
  }, []);

  const currentLanguage = LANGUAGES[language];

  return {
    language,
    setLanguage,
    t,
    currentLanguage,
    isRTL: currentLanguage.dir === 'rtl',
  };
};
