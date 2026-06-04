import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

interface Props {
  onFinished: () => void;
}

export default function Preloader({ onFinished }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      onFinished();
    }, 2600);

    const fallback = setTimeout(() => {
      setHidden(true);
      onFinished();
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [onFinished]);

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
