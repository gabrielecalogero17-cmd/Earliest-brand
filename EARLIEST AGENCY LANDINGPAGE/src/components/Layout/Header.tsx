import { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface Props {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const cls = `${styles.header} ${scrolled ? styles.scrolled : ''}`;

  return (
    <header className={cls}>
      <div className={styles.container}>
        <a href="#hero" className={`${styles.logoArea} hover-trigger`}>
          <img src="/assets/logo/logo_crest.png" alt="EARLIEST Crest" className={styles.logoImg} />
          <span className={styles.logoText}>EARLIEST</span>
        </a>

        <nav className={styles.desktopNav}>
          <a href="#services" className={`${styles.navLink} hover-trigger`}>Servizi</a>
          <a href="#pillars" className={`${styles.navLink} hover-trigger`}>Pilastri</a>
          <a href="#voice" className={`${styles.navLink} hover-trigger`}>Tono di Voce</a>
          <a href="#contact" className={`${styles.navLink} hover-trigger`}>Contatti</a>
          <a href="#merch" className={`${styles.navLink} hover-trigger`}>Collezione</a>
        </nav>

        <div>
          <button
            className={`${styles.navToggle} hover-trigger`}
            onClick={onMenuToggle}
            aria-label="Attiva Menu"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>
    </header>
  );
}
