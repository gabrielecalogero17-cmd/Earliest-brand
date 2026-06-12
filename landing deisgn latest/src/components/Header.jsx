import React, { useContext } from 'react';
import { List } from '@phosphor-icons/react';
import { FormattedMessage } from 'react-intl';
import { LanguageContext } from '../context/LanguageContext';

export default function Header() {
  const { locale, switchLanguage } = useContext(LanguageContext);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/70 dark:bg-surface/70 backdrop-blur-xl shadow-[0_48px_48px_rgba(71,71,70,0.08)]">
      <nav className="flex justify-between items-center h-20 px-8 md:px-16 max-w-full mx-auto">
        <a href="#" className="flex items-center gap-4">
          <img src="/assets/logo/logo_crest.png" alt="EARLIEST Logo" className="h-12 w-auto brightness-100 contrast-100" />
          <span className="text-xl font-display font-extrabold tracking-widest text-[#ECC097] uppercase">EARLIEST</span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          <a className="text-[#ECC097] dark:text-[#ECC097] font-semibold font-body text-label-md tracking-wider uppercase" href="#hero">
            <FormattedMessage id="nav.home" />
          </a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-[#ECC097] transition-colors duration-300 font-body text-label-md tracking-wider uppercase" href="#services">
            <FormattedMessage id="nav.services" />
          </a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-[#ECC097] transition-colors duration-300 font-body text-label-md tracking-wider uppercase" href="#methodology">
            <FormattedMessage id="nav.methodology" />
          </a>
          <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-[#ECC097] transition-colors duration-300 font-body text-label-md tracking-wider uppercase" href="#packages">
            <FormattedMessage id="nav.packages" />
          </a>
          <div className="flex items-center gap-4">
            <a className="px-6 py-2.5 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] text-white font-semibold text-label-md tracking-wider uppercase rounded-none active:scale-95 transition-all duration-300 hover:text-[#050505] hover:text-on-primary" href="#contact">
              <FormattedMessage id="nav.contact" />
            </a>
            <select
              value={locale}
              onChange={(e) => switchLanguage(e.target.value)}
              className="bg-transparent text-on-surface border border-[#ECC097]/30 hover:border-[#ECC097] outline-none px-2 py-1 text-sm font-semibold tracking-wider transition-colors duration-300 cursor-pointer"
            >
              <option value="it" className="bg-[#050505] text-on-surface">IT</option>
              <option value="en" className="bg-[#050505] text-on-surface">EN</option>
            </select>
          </div>
        </div>
        <button className="md:hidden text-on-surface">
          <List size={28} weight="regular" />
        </button>
      </nav>
    </header>
  );
}
