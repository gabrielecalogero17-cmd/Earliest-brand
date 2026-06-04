import { useCallback, type RefObject } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export function useTiltEffect(
  ref: RefObject<HTMLElement | null>,
  options: TiltOptions = {}
) {
  const { maxTilt = 8, perspective = 1000, scale = 1.03 } = options;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    },
    [ref, maxTilt, perspective, scale]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, [ref, perspective]);

  return { handleMouseMove, handleMouseLeave };
}
