import styles from './ServicesDetail.module.css';

interface ServiceDetailItem {
  num: string;
  title: string;
  subtitle: string;
  philosophicQuote: string;
  desc: string;
  deliverables: string[];
}

const DETAILS: ServiceDetailItem[] = [
  {
    num: '01',
    title: 'BRAND & IDENTITY',
    subtitle: 'L\'ARALDICA VISIVA',
    philosophicQuote: 'Il design non è mera decorazione; è l\'affermazione di una sovranità visiva.',
    desc: 'Progettiamo sistemi visivi implacabili che comunicano stabilità, autorità ed eccellenza estetica immediata. Ogni logo, crest e scelta cromatica è studiato con rigore geometrico ed equilibrio storico.',
    deliverables: [
      'Logo & Crest Design Araldico',
      'Manuale di Sovranità Visiva (Brand Book)',
      'Sviluppo di Font di Comando Personali',
      'Architettura Verbale e Tono di Voce'
    ]
  },
  {
    num: '02',
    title: 'STRATEGIA & LEAD GENERATION',
    subtitle: 'LA CONQUISTA MATEMATICA',
    philosophicQuote: 'Niente metriche di vanità. Costruiamo canali di acquisizione d\'élite per risultati reali.',
    desc: 'Escludiamo il superfluo per concentrarci su conversioni matematiche. Uniamo l\'ingegneria dei flussi di traffico a una produzione multimediale (foto, video, editoriali) di altissima qualità visiva per posizionare il brand al vertice.',
    deliverables: [
      'Sistemi Integrati di Lead Generation d\'Élite',
      'Produzione Video & Foto Editoriali (Campagne)',
      'Distribuzione Mediatica & PR di Comando',
      'Copywriting Strategico ad Alto Impatto'
    ]
  },
  {
    num: '03',
    title: 'FASHION & MERCHANDISING',
    subtitle: 'L\'ARCHIVIO SARTORIALE',
    philosophicQuote: 'L\'abbigliamento è l\'estensione fisica dell\'identità. Creiamo capi strutturati per imporsi.',
    desc: 'Curiamo l\'abbigliamento come un archivio storico del brand. Dalla selezione rigorosa di tessuti premium (fino a 450 GSM) alla campionatura dei tagli sartoriali e al packaging araldico su misura.',
    deliverables: [
      'Apparel Design & Schede Tecniche (Tech Packs)',
      'Selezione Tessuti Premium & Fit Testing (450 GSM)',
      'Progettazione di Dettagli e Cuciture Anatomiche',
      'Packaging Personalizzato & Cartellini Storici'
    ]
  }
];

export default function ServicesDetail() {
  return (
    <section className={styles.section} id="method">
      <div className="section-container">
        <div className="reveal-fade" style={{ textAlign: 'center' }}>
          <div className="section-tag text-center">APPROFONDIMENTO</div>
          <h2 className="section-title text-center">IL NOSTRO METODO</h2>
          <div className="divider-line mx-auto" />
        </div>

        <div className={styles.list}>
          {DETAILS.map((d, i) => (
            <div key={d.num} className={`${styles.item} reveal-fade-up`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className={styles.grid}>
                <div className={styles.headerColumn}>
                  <span className={styles.num}>{d.num}</span>
                  <h3 className={styles.title}>{d.title}</h3>
                  <span className={`${styles.subtitle} hologram-text`}>{d.subtitle}</span>
                </div>
                
                <div className={styles.contentColumn}>
                  <blockquote className={styles.quote}>"{d.philosophicQuote}"</blockquote>
                  <p className={styles.desc}>{d.desc}</p>
                </div>

                <div className={styles.deliverablesColumn}>
                  <h4 className={styles.delivTitle}>OUTPUT CHIAVE</h4>
                  <ul className={styles.delivList}>
                    {d.deliverables.map((item, idx) => (
                      <li key={idx} className={styles.delivItem}>
                        <span className={styles.dot} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
