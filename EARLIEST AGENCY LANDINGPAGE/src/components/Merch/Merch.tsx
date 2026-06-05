import { useState, useRef, useEffect, useCallback } from 'react';
import { garments, type Garment } from '../../data/garments';
import Button from '../UI/Button';
import styles from './Merch.module.css';

/* ─── Garment Card ─────────────────────────────────────── */
function GarmentCard({
  garment,
  onSelect,
}: {
  garment: Garment;
  onSelect: (g: Garment) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const maxTilt = 15;
    const rotX = ((cy - y) / cy) * maxTilt;
    const rotY = ((x - cx) / cx) * -maxTilt;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    el.style.setProperty('--x', `${xPct}%`);
    el.style.setProperty('--y', `${yPct}%`);
    el.style.transition = 'transform 0.15s cubic-bezier(0.25,1,0.5,1), box-shadow 0.3s ease, border-color 0.4s';
    el.style.transform = `translateY(-24px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    el.style.boxShadow = '0 40px 80px rgba(5,5,5,0.95), 0 20px 40px rgba(236,192,151,0.25)';
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.65s cubic-bezier(0.16,1,0.3,1), border-color 0.4s';
    el.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.boxShadow = 'none';
    el.style.setProperty('--x', '50%');
    el.style.setProperty('--y', '50%');
  };

  return (
    <div
      ref={ref}
      className={`${styles.card} hover-trigger garment-card`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelect(garment)}
    >
      <div className={styles.glare} />
      <div className={styles.imgHolder}>
        <img src={garment.img} alt={garment.title} className={styles.img} loading="lazy" />
        <div className={styles.imgOverlay}>
          <span className={styles.viewBtn}>DETTAGLI DI COMANDO</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.category}>{garment.tag}</div>
        <h3 className={styles.cardTitle}>{garment.title}</h3>
        <div className={styles.price}>{garment.price}</div>
      </div>
    </div>
  );
}

/* ─── Garment Modal ────────────────────────────────────── */
function GarmentModal({
  garment,
  onClose,
}: {
  garment: Garment | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (garment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [garment]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleOrder = () => {
    onClose();
    setTimeout(() => {
      // Auto-select "03. FASHION & MERCHANDISING" in the form dropdown
      const serviceSelect = document.getElementById('formService') as HTMLSelectElement | null;
      if (serviceSelect) {
        serviceSelect.value = 'fashion_merch';
        serviceSelect.dispatchEvent(new Event('change'));
      }

      // Pre-populate the brief description textarea with a professional B2B request
      const messageTextarea = document.getElementById('formMessage') as HTMLTextAreaElement | null;
      if (messageTextarea) {
        messageTextarea.value = `Richiesta di accesso all'archivio capi riservato ai partner per il case study: "${garment?.title}". Desideriamo valutare la qualità di manifattura per il nostro brand ed esplorare una collaborazione di Direzione Creativa e Produzione Tessile.`;
        messageTextarea.dispatchEvent(new Event('change'));
      }

      // Smooth scroll to the contact form
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className={`${styles.modal} ${garment ? styles.modalActive : ''}`}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <button className={`${styles.modalClose} hover-trigger`} onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {garment && (
          <div className={styles.modalGrid}>
            <div className={styles.modalGallery}>
              <img src={garment.img} alt={garment.title} className={styles.modalLargeImg} />
            </div>
            <div className={styles.modalDetails}>
              <div className={styles.modalTag}>{garment.tag}</div>
              <h2 className={styles.modalTitle}>{garment.title}</h2>
              <div className={styles.modalPrice}>{garment.price}</div>
              <div className="divider-line" />
              <p className={styles.modalDesc}>{garment.desc}</p>

              <div className={styles.specs}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>VESTIBILITÀ:</span>
                  <span className={styles.specVal}>{garment.fit}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>CUCITURE:</span>
                  <span className={styles.specVal}>{garment.stitching}</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>TESSUTO:</span>
                  <span className={styles.specVal}>Cotone Premium Spazzolato da 450 GSM</span>
                </div>
              </div>

              <Button variant="primary" full onClick={handleOrder}>
                <span>RICHIEDI ACCESSO ALL'ARCHIVIO CAPI (Riservato ai Partner)</span>
                <span className="material-symbols-outlined">workspace_premium</span>
              </Button>

              <div className={styles.disclaimer}>
                *EDIZIONE LIMITATA D'ARCHIVIO. OGNI CAPO INCARNA UNA PRESENZA SOVRANA.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Merch Section (Infinite Scroll Slider) ───────────── */
export default function Merch() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);

  // Clone items 3× for infinite scroll illusion
  const tripled = [...garments, ...garments, ...garments];

  // Infinite scroll setup
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateBounds = () => {
      const totalWidth = wrapper.scrollWidth;
      const oneSet = totalWidth / 3;
      if (wrapper.scrollLeft === 0 && oneSet > 0) {
        wrapper.scrollLeft = oneSet;
      }
    };

    updateBounds();
    const t1 = setTimeout(updateBounds, 400);
    const t2 = setTimeout(updateBounds, 1200);
    window.addEventListener('load', updateBounds);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('load', updateBounds);
    };
  }, []);

  const handleInfiniteLoop = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const oneSet = wrapper.scrollWidth / 3;
    if (oneSet <= 0) return;
    if (wrapper.scrollLeft >= oneSet * 2) {
      wrapper.scrollLeft -= oneSet;
    } else if (wrapper.scrollLeft <= oneSet - window.innerWidth) {
      wrapper.scrollLeft += oneSet;
    }
  }, []);

  // Drag support
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let rafId: number;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      wrapper.style.cursor = 'grabbing';
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      velocity = 0;
      cancelAnimationFrame(rafId);
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      wrapper.style.cursor = 'grab';
      applyInertia();
    };

    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      wrapper.scrollLeft = scrollLeft - (x - startX) * 1.5;
      handleInfiniteLoop();

      const now = Date.now();
      const elapsed = now - lastTime;
      if (elapsed > 0) {
        velocity = (e.pageX - lastX) / elapsed;
        lastX = e.pageX;
        lastTime = now;
      }
    };

    const applyInertia = () => {
      if (Math.abs(velocity) < 0.1) return;
      const step = () => {
        wrapper.scrollLeft -= velocity * 15;
        velocity *= 0.92;
        handleInfiniteLoop();
        if (Math.abs(velocity) > 0.05 && !isDown) {
          rafId = requestAnimationFrame(step);
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY * 1.2;
        handleInfiniteLoop();
      }
    };

    wrapper.addEventListener('mousedown', onDown);
    wrapper.addEventListener('mouseup', onUp);
    wrapper.addEventListener('mouseleave', onUp);
    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      wrapper.removeEventListener('mousedown', onDown);
      wrapper.removeEventListener('mouseup', onUp);
      wrapper.removeEventListener('mouseleave', onUp);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafId);
    };
  }, [handleInfiniteLoop]);

  return (
    <>
      <section className={styles.section} id="merch">
        <div className="section-container-fluid">
          <div className="section-container">
            <div className="reveal-fade" style={{ textAlign: 'center' }}>
              <div className="section-tag text-center">ARCHIVIO PRODUZIONI</div>
              <h2 className="section-title text-center">Case Study di Manifattura e Direzione Creativa</h2>
              <div className="divider-line mx-auto" />
            </div>
          </div>

          <div className={`${styles.sliderWrapper} reveal-fade`} ref={wrapperRef}>
            <div className={styles.slider}>
              {tripled.map((g, i) => (
                <GarmentCard key={`${g.id}-${i}`} garment={g} onSelect={setSelectedGarment} />
              ))}
            </div>
          </div>

          <div className={`${styles.sliderHint} text-center reveal-fade`}>
            <span className="material-symbols-outlined">drag_indicator</span>
            <span className={styles.hintText}>TRASCINA O SCORRI PER SCOPRIRE LA COLLEZIONE</span>
          </div>
        </div>
      </section>

      <GarmentModal garment={selectedGarment} onClose={() => setSelectedGarment(null)} />
    </>
  );
}
