import { useEffect } from 'react';
import styles from './SideMenu.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { href: '#services', label: 'SERVIZI' },
  { href: '#method', label: 'IL METODO' },
  { href: '#contact', label: 'CONTATTI' },
  { href: 'https://www.earliestagency.com/dashboard', label: 'PORTALE' },
];

export default function SideMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
      <div className={styles.container}>
        <button className={`${styles.closeBtn} hover-trigger`} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.link} ${item.label === 'PORTALE' ? styles.portalLink : ''}`}
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerTagline}>FONDATO PER IL FUTURO.</div>
          <div className={styles.footerCopy}>© 2026 EARLIEST. TUTTI I DIRITTI RISERVATI.</div>
        </div>
      </div>
    </div>
  );
}
