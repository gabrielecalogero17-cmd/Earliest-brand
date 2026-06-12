import React, { createContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '../locales/en.json';
import itMessages from '../locales/it.json';

export const LanguageContext = createContext();

const messages = {
  en: enMessages,
  it: itMessages,
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('it'); // Default to Italian as requested

  const switchLanguage = (lang) => {
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="it">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
