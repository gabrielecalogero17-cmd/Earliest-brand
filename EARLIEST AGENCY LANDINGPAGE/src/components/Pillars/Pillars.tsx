import { useRef } from 'react';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import styles from './Pillars.module.css';

interface PillarData {
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
}

const PILLARS: PillarData[] = [
  {
    icon: 'gavel',
    title: 'Supremazia Estetica',
    subtitle: 'IL RIGORE DEL DESIGN',
    desc: "Potenza cruda e geometrie a 90°. Un'estetica affilata che si impone in silenzio. Nessun compromesso visivo.",
  },
  {
    icon: 'shield',
    title: 'Status Metropolitano',
    subtitle: 'ARISTOCRAZIA URBANA',
    desc: 'La ridefinizione assoluta dello status metropolitano. Presenza monumentale ed esclusiva in ogni contesto.',
  },
  {
    icon: 'workspace_premium',
    title: 'Rigore Sartoriale',
    subtitle: 'ECCELLENZA TECNICA',
    desc: "Tessuti premium da 450 GSM e cuciture a contrasto spessorate. Capi d'archivio strutturati per durare ed imporsi.",
  },
  {
    icon: 'military_tech',
    title: 'Impatto Reale',
    subtitle: 'RISULTATI CONCRETI',
    desc: "Lead generation d'élite e produzione contenuti integrata a 360°. Generiamo conversioni matematiche, zero metriche di vanità.",
  },
];

function PillarCard({ icon, title, subtitle, desc, delay }: PillarData & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTiltEffect(ref);

  return (
    <div
      ref={ref}
      className={`${styles.card} hologram-trigger reveal-fade-up`}
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.topLine} />
      <div className={styles.icon}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={`${styles.subtitle} hologram-text`}>{subtitle}</div>
      <p className={`${styles.desc} hologram-text`}>{desc}</p>
    </div>
  );
}

export default function Pillars() {
  return (
    <section className={styles.section} id="pillars">
      <div className="section-container">
        <div className="reveal-fade" style={{ textAlign: 'center' }}>
          <div className="section-tag text-center">FONDAMENTA</div>
          <h2 className="section-title text-center">I NOSTRI PILASTRI</h2>
          <div className="divider-line mx-auto" />
        </div>

        <div className={styles.grid}>
          {PILLARS.map((p, i) => (
            <PillarCard key={p.icon} {...p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
