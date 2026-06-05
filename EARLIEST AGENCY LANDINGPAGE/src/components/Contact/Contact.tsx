import { useState, useRef, type FormEvent } from 'react';
import Button from '../UI/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'done'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');

    setTimeout(() => {
      setSubmitState('done');

      // Toast notification
      const alertBox = document.createElement('div');
      Object.assign(alertBox.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#ecc097',
        color: '#050505',
        padding: '20px 30px',
        fontFamily: "var(--font-headline)",
        fontSize: '0.85rem',
        fontWeight: '700',
        letterSpacing: '0.25em',
        zIndex: '99999',
        boxShadow: '0 10px 30px rgba(5,5,5,0.9)',
      });
      alertBox.textContent = 'COMANDO RICEVUTO. CANALI DI IDENTITÀ ATTIVATI.';
      document.body.appendChild(alertBox);

      setTimeout(() => {
        alertBox.style.opacity = '0';
        alertBox.style.transition = 'opacity 0.8s ease';
        setTimeout(() => alertBox.remove(), 800);
      }, 4000);

      formRef.current?.reset();
      setTimeout(() => setSubmitState('idle'), 3000);
    }, 2000);
  };

  const btnContent = {
    idle: (
      <>
        <span>INVIA RICHIESTA</span>
        <span className="material-symbols-outlined">bolt</span>
      </>
    ),
    loading: (
      <>
        <span>CONNESSIONE AL SATELLITE...</span>
        <span className="material-symbols-outlined">hourglass_bottom</span>
      </>
    ),
    done: (
      <>
        <span>COMANDO STABILITO</span>
        <span className="material-symbols-outlined">done_all</span>
      </>
    ),
  };

  const btnStyles: Record<string, React.CSSProperties> = {
    idle: {},
    loading: {
      backgroundColor: 'transparent',
      color: 'var(--color-secondary)',
      borderColor: 'var(--color-secondary)',
      boxShadow: 'none',
    },
    done: {
      backgroundColor: '#ecc097',
      color: '#050505',
      borderColor: '#ecc097',
      boxShadow: '0 0 25px rgba(236,192,151,0.5)',
    },
  };

  return (
    <section className={`${styles.section} hologram-trigger`} id="contact">
      <div className="section-container">
        <div className={styles.grid}>
          <div className="reveal-slide-left">
            <div className="section-tag">CONTATTI</div>
            <h2 className="section-title">ACCESSO</h2>
            <div className="divider-line" />
            <p className={`${styles.desc} hologram-text`}>
              Selezioniamo esclusivamente brand d'élite, artisti visionari ed entità pronte a
              definire la propria supremazia sul mercato globale.
            </p>
            <p className={`${styles.desc} hologram-text`}>
              La nostra capacità produttiva è limitata. Accediamo solo a progetti ad alto valore.
            </p>

            <div className={styles.infoBlock}>
              <div className={styles.infoRow}>
                <span className="material-symbols-outlined">location_on</span>
                <span className={styles.infoVal}>MILANO | ZONA ARISTOCRATICA</span>
              </div>
              <div className={styles.infoRow}>
                <span className="material-symbols-outlined">mail</span>
                <span className={styles.infoVal}>CONTACT@EARLIEST.COM</span>
              </div>
            </div>
          </div>

          <div className={`${styles.formWrapper} reveal-slide-right`}>
            <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input type="text" id="formName" required placeholder=" " className={`${styles.formInput} hover-trigger`} />
                <label htmlFor="formName" className={styles.formLabel}>NOME BRAND / ENTITÀ</label>
                <span className={styles.formLine} />
              </div>

              <div className={styles.formGroup}>
                <input type="email" id="formEmail" required placeholder=" " className={`${styles.formInput} hover-trigger`} />
                <label htmlFor="formEmail" className={styles.formLabel}>EMAIL</label>
                <span className={styles.formLine} />
              </div>

              <div className={styles.formGroup}>
                <select id="formService" className={`${styles.formInput} ${styles.formSelect} hover-trigger`} defaultValue="">
                  <option value="" disabled hidden>SELEZIONA IL SERVIZIO</option>
                  <option value="brand_identity">01. BRAND &amp; IDENTITY</option>
                  <option value="strategy_lead_gen">02. STRATEGIA, CONTENUTI &amp; LEAD GENERATION</option>
                  <option value="fashion_merch">03. FASHION &amp; MERCHANDISING</option>
                </select>
                <span className={styles.formLine} />
              </div>

              <div className={styles.formGroup}>
                <textarea id="formMessage" required placeholder=" " rows={4} className={`${styles.formInput} ${styles.formTextarea} hover-trigger`} />
                <label htmlFor="formMessage" className={styles.formLabel}>BRIEF &amp; OBIETTIVI</label>
                <span className={styles.formLine} />
              </div>

              <Button
                type="submit"
                variant="primary"
                full
                shimmer
                style={btnStyles[submitState]}
                disabled={submitState !== 'idle'}
              >
                {btnContent[submitState]}
              </Button>

              <div className={styles.microCopy}>
                [CRITTOGRAFIA ATTIVA]: I dati inseriti sono protetti. Un nostro Direttore Creativo analizzerà il tuo ecosistema di brand ed emetterà un responso strategico entro 48 ore lavorative.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
