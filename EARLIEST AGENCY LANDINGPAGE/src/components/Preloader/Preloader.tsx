import { useState, useEffect, useMemo } from 'react';
import styles from './Preloader.module.css';

interface Props {
  onFinished: () => void;
}

const pageLoadTime = typeof window !== 'undefined' ? Date.now() : 0;

export default function Preloader({ onFinished }: Props) {
  const shouldSkip = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hasSkip = searchParams.get('skip') === 'true';
      const hasUtm = searchParams.has('utm_source');

      const lastVisited = localStorage.getItem('earliest_visited');
      let isRecentVisit = false;
      if (lastVisited) {
        const visitTime = parseInt(lastVisited, 10);
        if (!isNaN(visitTime) && pageLoadTime - visitTime < 24 * 60 * 60 * 1000) {
          isRecentVisit = true;
        }
      }
      return hasSkip || hasUtm || isRecentVisit;
    } catch {
      return false;
    }
  }, []);

  const [hidden, setHidden] = useState(shouldSkip);

  useEffect(() => {
    if (shouldSkip) {
      onFinished();
      return;
    }

    const timer = setTimeout(() => {
      setHidden(true);
      onFinished();
      try {
        localStorage.setItem('earliest_visited', Date.now().toString());
      } catch {
        // Ignore
      }
    }, 2600);

    const fallback = setTimeout(() => {
      setHidden(true);
      onFinished();
      try {
        localStorage.setItem('earliest_visited', Date.now().toString());
      } catch {
        // Ignore
      }
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [onFinished, shouldSkip]);

  if (shouldSkip) return null;


  return (
    <div className={`${styles.preloader} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.content}>
        <div className={styles.crestWrapper}>
          <svg className={styles.svg} viewBox="0 0 100 100" width="120" height="120">
            <circle
              cx="50" cy="50" r="45"
              stroke="#ecc097" strokeWidth="1.5" fill="none"
              className={styles.circlePath}
            />
            <path
              d="M50 25 L65 40 L65 65 L50 80 L35 65 L35 40 Z"
              stroke="#660000" strokeWidth="2" fill="none"
              className={styles.shieldPath}
            />
            <text
              x="50" y="58"
              fontFamily="'Syne', sans-serif" fontSize="22" fontWeight="800"
              fill="#ecc097" textAnchor="middle"
              className={styles.letterPath}
            >
              E
            </text>
          </svg>
        </div>
        <h2 className={styles.title}>EARLIEST</h2>
        <div className={styles.tagline}>LA NUOVA ÉLITE</div>
      </div>
    </div>
  );
}
