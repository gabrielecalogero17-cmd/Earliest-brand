import { useEffect, useRef } from 'react';
import Button from '../UI/Button';
import styles from './Hero.module.css';

export default function Hero() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = () => {
      if (!bgRef.current) return;
      const scrollPos = window.scrollY;
      const heroHeight = window.innerHeight;
      if (scrollPos <= heroHeight) {
        bgRef.current.style.transform = `translateY(${scrollPos * 0.35}px) scale(1.05)`;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className={`${styles.hero} hologram-trigger`} id="hero">
      <div className={styles.bgWrapper}>
        <div className={styles.overlay} />
        <img
          ref={bgRef}
          src="/assets/shooting/model_leaning_front.jpg"
          alt="EARLIEST Urban Aristocracy Campagna"
          className={styles.bgImg}
        />
      </div>

      <div className={styles.content}>
        <div className={`${styles.badge} reveal-fade`}>FONDATO NEL 1923</div>
        <h1 className={`${styles.title} reveal-fade`}>
          <span className={styles.titleLine}>DIREZIONE</span>
          <span className={`${styles.titleLine} ${styles.titleAccent}`}>CREATIVA</span>
        </h1>
        <p className={`${styles.subtitle} reveal-fade hologram-text`}>
          L'identità è un territorio ostile. Noi lo dominiamo. Progettiamo il futuro della
          nuova élite attraverso il rigore visivo e l'avanguardia metropolitana.
        </p>
        <div className={`${styles.actions} reveal-fade`}>
          <Button variant="primary" href="#services">
            <span>SERVIZI</span>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </Button>
          <Button variant="ghost" href="#contact">
            <span>CONTATTI</span>
          </Button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>SCORRI</span>
        <div className={styles.scrollLineWrapper}>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
