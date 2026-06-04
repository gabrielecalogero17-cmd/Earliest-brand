import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolledPercent = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
      setProgress(scrolledPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
