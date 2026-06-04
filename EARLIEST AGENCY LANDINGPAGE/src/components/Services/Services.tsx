import { useRef } from 'react';
import { services } from '../../data/services';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import Button from '../UI/Button';
import styles from './Services.module.css';

function ServiceCard({
  num,
  title,
  bullets,
  serviceKey,
  delay,
}: {
  num: string;
  title: string;
  bullets: string[];
  serviceKey: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(ref);

  const scrollToForm = () => {
    const form = document.getElementById('formService') as HTMLSelectElement | null;
    if (form) {
      form.value = serviceKey;
      form.dispatchEvent(new Event('change'));
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className={`${styles.card} reveal-fade-up`}
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.scanner} />
      <div className={styles.cardHeader}>
        <span className={styles.cardNum}>{num}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardDivider} />
      <ul className={styles.bulletsList}>
        {bullets.map((b, i) => (
          <li key={i} className={styles.bulletItem}>
            <span className={styles.bulletDot} />
            <span className={styles.bulletText}>{b}</span>
          </li>
        ))}
      </ul>
      <div className={styles.cardFooter}>
        <Button variant="ghost" full onClick={scrollToForm} className={styles.commissionBtn}>
          <span>COMMISSIONA SERVIZIO</span>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Button>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="section-container">
        <div className="reveal-fade" style={{ textAlign: 'center' }}>
          <div className="section-tag text-center">COMPETENZE</div>
          <h2 className="section-title text-center">SERVIZI</h2>
          <div className="divider-line mx-auto" />
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.serviceKey} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
