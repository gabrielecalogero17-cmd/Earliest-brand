import { useState, useCallback, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import CustomCursor from './components/UI/CustomCursor';
import AtmosphereCanvas from './components/UI/AtmosphereCanvas';
import ScrollProgress from './components/Layout/ScrollProgress';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Layout/Header';
import SideMenu from './components/Layout/SideMenu';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Pillars from './components/Pillars/Pillars';
import Contact from './components/Contact/Contact';
import Merch from './components/Merch/Merch';
import Footer from './components/Layout/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const onPreloaderFinished = useCallback(() => {
    // Trigger initial reveal animations in the hero
    setTimeout(() => {
      document.querySelectorAll('#hero .reveal-fade, #hero .reveal-fade-up').forEach((el) => {
        el.classList.add('reveal-active');
      });
    }, 200);
  }, []);

  // Set up IntersectionObserver for all reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    // Delay slightly to let the DOM render
    const timer = setTimeout(() => {
      document
        .querySelectorAll('.reveal-fade, .reveal-slide-left, .reveal-slide-right, .reveal-fade-up')
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>EARLIEST | Direzione Creativa &amp; Agenzia di Comunicazione</title>
        <meta
          name="description"
          content="EARLIEST è un'agenzia d'élite di direzione creativa e comunicazione fondata sul principio dell'Urban Aristocracy. Uniamo l'heritage storico all'avanguardia dello stile per brand sovrani."
        />
        <meta
          name="keywords"
          content="Direzione Creativa, Brand Identity, Agenzia di Comunicazione, Abbigliamento di Lusso, Urban Aristocracy, Earliest Abbigliamento"
        />
      </Helmet>

      <AtmosphereCanvas />
      <CustomCursor />
      <ScrollProgress />
      <Preloader onFinished={onPreloaderFinished} />

      <Header onMenuToggle={() => setMenuOpen(true)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <Hero />
        <Services />
        <Pillars />
        <Contact />
        {/* <Merch /> */}
      </main>

      <Footer />
    </HelmetProvider>
  );
}
