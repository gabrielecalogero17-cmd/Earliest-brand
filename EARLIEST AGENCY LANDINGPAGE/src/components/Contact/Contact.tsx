import { useState, useRef, type FormEvent, type ChangeEvent } from 'react';
import { getAvailableSlots } from '../../lib/booking-utils';
import { createBooking } from '../../lib/api';
import Button from '../UI/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: 'brand_identity',
    notes: '',
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewDate, setViewDate] = useState(new Date());

  const formRef = useRef<HTMLFormElement>(null);
  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const fetchSlots = async (selectedDate: string) => {
    setIsLoadingSlots(true);
    try {
      const slots = await getAvailableSlots(selectedDate);
      setAvailableSlots(slots);
    } catch (err) {
      console.error('Failed to load slots:', err);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'date' && value) {
      fetchSlots(value);
      setFormData((prev) => ({ ...prev, time: '' }));
    }
  };

  const changeMonth = (offset: number) => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() + offset);
    setViewDate(d);
  };

  const renderCalendarDays = () => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    // Monday offset (0 = Sunday, 1 = Monday)
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d);
      const ds = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isPast = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = formData.date === ds;

      days.push(
        <button
          key={d}
          type="button"
          className={`${styles.day} ${isPast || isWeekend ? styles.disabledDay : ''} ${
            isSelected ? styles.selectedDay : ''
          }`}
          disabled={isPast || isWeekend}
          onClick={() => {
            setFormData((prev) => ({ ...prev, date: ds, time: '' }));
            fetchSlots(ds);
          }}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMessage('');

    try {
      const { success, error } = await createBooking({
        first_name: formData.firstName,
        last_name: formData.lastName,
        e_mail: formData.email,
        phone_number: formData.phone,
        booking_date: `${formData.date}T${formData.time}:00`,
        type: formData.type,
        notes: formData.notes,
        booking_accepted: null,
        is_deleted: false,
      });

      if (!success) {
        throw new Error(error || 'Failed to save booking');
      }

      setSubmitState('done');

      // Elegante notifica a schermo
      const alertBox = document.createElement('div');
      Object.assign(alertBox.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#ecc097',
        color: '#050505',
        padding: '20px 30px',
        fontFamily: 'var(--font-headline)',
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

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        type: 'brand_identity',
        notes: '',
      });

      setTimeout(() => setSubmitState('idle'), 4000);
    } catch (err) {
      console.error(err);
      setSubmitState('error');
      setErrorMessage((err as Error).message || 'Si è verificato un errore durante l\'invio.');
    }
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
    error: (
      <>
        <span>ERRORE DI TRASMISSIONE</span>
        <span className="material-symbols-outlined">warning</span>
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
    error: {
      backgroundColor: '#ff4444',
      color: '#ffffff',
      borderColor: '#ff4444',
      boxShadow: '0 0 20px rgba(255,68,68,0.4)',
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
                <span className={styles.infoVal}>CATANIA | ZONA ARISTOCRATICA</span>
              </div>
              <div className={styles.infoRow}>
                <span className="material-symbols-outlined">mail</span>
                <span className={styles.infoVal}>EarliestAgency@gmail.com</span>
              </div>
            </div>
          </div>

          <div className={`${styles.formWrapper} reveal-slide-right`}>
            {submitState === 'done' ? (
              <div className={styles.successContainer}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Grazie!</h3>
                <p className={styles.successText}>
                  Richiesta inviata con successo! Ti contatteremo presto per stabilire il comando.
                </p>
              </div>
            ) : (
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="formFirstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className={`${styles.formInput} hover-trigger`}
                    />
                    <label htmlFor="formFirstName" className={styles.formLabel}>
                      NOME *
                    </label>
                    <span className={styles.formLine} />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="formLastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className={`${styles.formInput} hover-trigger`}
                    />
                    <label htmlFor="formLastName" className={styles.formLabel}>
                      COGNOME *
                    </label>
                    <span className={styles.formLine} />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      id="formEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className={`${styles.formInput} hover-trigger`}
                    />
                    <label htmlFor="formEmail" className={styles.formLabel}>
                      EMAIL *
                    </label>
                    <span className={styles.formLine} />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      type="tel"
                      id="formPhone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" "
                      className={`${styles.formInput} hover-trigger`}
                    />
                    <label htmlFor="formPhone" className={styles.formLabel}>
                      TELEFONO
                    </label>
                    <span className={styles.formLine} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <select
                    id="formService"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`${styles.formInput} ${styles.formSelect} hover-trigger`}
                  >
                    <option value="brand_identity">01. BRAND &amp; IDENTITY</option>
                    <option value="strategy_lead_gen">02. STRATEGIA, CONTENUTI &amp; LEAD GENERATION</option>
                    <option value="fashion_merch">03. FASHION &amp; MERCHANDISING</option>
                  </select>
                  <span className={styles.formLine} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.calendarLabel}>SELEZIONA DATA PREFERITA *</label>
                  <div className={styles.customCalendar}>
                    <div className={styles.calendarNav}>
                      <button
                        type="button"
                        className={`${styles.calendarNavBtn} hover-trigger`}
                        onClick={() => changeMonth(-1)}
                      >
                        &lt;
                      </button>
                      <span className={styles.calendarMonthName}>
                        {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                      </span>
                      <button
                        type="button"
                        className={`${styles.calendarNavBtn} hover-trigger`}
                        onClick={() => changeMonth(1)}
                      >
                        &gt;
                      </button>
                    </div>
                    <div className={styles.calendarWeekdays}>
                      {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((d) => (
                        <span key={d}>{d}</span>
                      ))}
                    </div>
                    <div className={styles.calendarDays}>{renderCalendarDays()}</div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.calendarLabel}>ORARIO DISPONIBILE *</label>
                  {formData.date ? (
                    isLoadingSlots ? (
                      <div className={styles.slotsLoader}>Caricamento orari in corso...</div>
                    ) : availableSlots.length > 0 ? (
                      <div className={styles.timeSlotsGrid}>
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            className={`${styles.timeChip} ${
                              formData.time === slot ? styles.timeChipSelected : ''
                            } hover-trigger`}
                            onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.noSlotsMessage}>
                        Nessun orario disponibile per la data selezionata.
                      </div>
                    )
                  ) : (
                    <div className={styles.noDateSelected}>
                      Seleziona prima una data dal calendario per visualizzare gli orari.
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    id="formNotes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    rows={4}
                    className={`${styles.formInput} ${styles.formTextarea} hover-trigger`}
                  />
                  <label htmlFor="formNotes" className={styles.formLabel}>
                    BRIEF &amp; OBIETTIVI *
                  </label>
                  <span className={styles.formLine} />
                </div>

                {submitState === 'error' && <div className={styles.formError}>{errorMessage}</div>}

                <Button
                  type="submit"
                  variant="primary"
                  full
                  shimmer
                  style={btnStyles[submitState]}
                  disabled={submitState === 'loading' || !formData.date || !formData.time}
                >
                  {btnContent[submitState]}
                </Button>

                <p className={styles.microCopy}>
                  * IL SATELLITE RICEVERÀ LA PRENOTAZIONE DOPO LA CONVALIDA ARALDICA.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
