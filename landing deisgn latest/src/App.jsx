import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import StatsGrid from './components/StatsGrid';
import Packages from './components/Packages';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import BackToTop from './components/BackToTop';
import { useIntl } from 'react-intl';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState('bundle_earliest_elite');
  const [selectedNotes, setSelectedNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const intl = useIntl();

  const handleSelectPackage = (pkgId, pkgLabel) => {
    setSelectedPackage(pkgId);
    setSelectedNotes(intl.formatMessage({ id: 'contact.form.notes.prefill' }, { pkgLabel }));
    
    // Smooth scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <div className={`transition-all duration-1000 ease-in-out min-h-screen relative ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <Header />
        <main>
          <Hero />
          <Services />
          <Methodology />
          <StatsGrid />
          <Packages onSelectPackage={handleSelectPackage} />
          <Contact selectedPackage={selectedPackage} selectedNotes={selectedNotes} />
        </main>
        <BackToTop />
      </div>
    </>
  );
}
