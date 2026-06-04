import { useRef } from 'react';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import styles from './Voice.module.css';

interface VoiceItem {
  title: string;
  desc: string;
}

const VOICE_ITEMS: VoiceItem[] = [
  { title: 'DIRETTO', desc: 'Poche parole. Massimo peso concettuale.' },
  { title: 'IMPLACABILE', desc: 'Nessuna giustificazione. Solo forza e chiarezza assoluta.' },
  { title: 'GEOMETRICO', desc: 'Precisione matematica ed ordine spaziale.' },
  { title: 'SILENZIOSO', desc: "Un lusso d'élite che si impone per presenza visiva." },
];

function VoiceCard({ title, desc, delay }: VoiceItem & { delay: number }) {
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
      <div className={styles.scannerBeam} />
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={`${styles.cardDesc} hologram-text`}>{desc}</p>
    </div>
  );
}

export default function Voice() {
  return (
    <section className={`${styles.section} hologram-trigger`} id="voice">
      <div className="section-container">
        <div className="reveal-fade" style={{ textAlign: 'center' }}>
          <div className="section-tag text-center">IDENTITÀ STRATEGICA</div>
          <h2 className="section-title text-center">TONO DI VOCE</h2>
          <div className="divider-line mx-auto" />
          <h3 className={`${styles.heading} text-center`}>LA VOCE IMPLACABILE</h3>
          <p className={`${styles.subheading} text-center max-w-2xl mx-auto hologram-text`}>
            Nessun romanticismo eroico o giri di parole. Comunichiamo in modo ultra-diretto,
            crudo e minimale. Pochissime parole, massimo impatto.
          </p>
        </div>

        <div className={styles.grid}>
          {VOICE_ITEMS.map((v, i) => (
            <VoiceCard key={v.title} {...v} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
