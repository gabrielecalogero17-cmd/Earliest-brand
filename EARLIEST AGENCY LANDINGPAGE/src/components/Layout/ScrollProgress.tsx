import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
}
