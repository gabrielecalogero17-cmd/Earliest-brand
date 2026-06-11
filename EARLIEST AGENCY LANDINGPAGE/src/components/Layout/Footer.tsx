import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="section-container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="/assets/logo/logo_crest.png" alt="EARLIEST Logo" className={styles.logoImg} />
              <span className={styles.logoText}>EARLIEST</span>
            </div>
            <p className={styles.brandDesc}>"LA NUOVA ÉLITE. FONDATO PER IL FUTURO."</p>
          </div>

          <div>
            <h5 className={styles.linksTitle}>NAVIGAZIONE</h5>
            <a href="#hero" className={styles.link}>Inizio</a>
            <a href="#services" className={styles.link}>Servizi</a>
<<<<<<< Updated upstream
            <a href="#merch" className={styles.link}>Lookbook</a>
            <a href="https://www.earliestagency.com/dashboard" className={styles.link}>Portale</a>
=======
            {/* <a href="#merch" className={styles.link}>Lookbook</a> */}
>>>>>>> Stashed changes
          </div>

          <div>
            <h5 className={styles.linksTitle}>ARCHIVIO</h5>
            <a href="#" className={styles.link}>Brand Book</a>
            <a href="#" className={styles.link}>Identity Guidelines</a>
            <a href="#" className={styles.link}>Termini di Sovranità</a>
          </div>

          <div>
            <h5 className={styles.linksTitle}>RADAR SOVRANO</h5>
            <p className={styles.newsletterDesc}>
              Ricevi aggiornamenti sulle release d'archivio limitate ed esclusive.
            </p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="LA TUA EMAIL..." className={styles.newsletterInput} />
              <button className={`${styles.newsletterBtn} hover-trigger`}>
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            © 2026 EARLIEST CLOTHING CO. &amp; DIREZIONE CREATIVA. TUTTI I DIRITTI RISERVATI.
          </div>
          <div className={styles.meta}>
            L'HERITAGE INCONTRA L'AVANGUARDIA. EST. 1923.
          </div>
        </div>
      </div>
    </footer>
  );
}
