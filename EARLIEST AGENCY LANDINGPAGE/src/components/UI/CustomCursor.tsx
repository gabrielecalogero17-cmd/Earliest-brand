import { useEffect, useRef, useCallback } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const LERP = 0.12;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (followerRef.current) followerRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (followerRef.current) followerRef.current.style.opacity = '1';
    };

    const onDown = () => {
      dotRef.current?.classList.add(styles.clicking);
      followerRef.current?.classList.add(styles.clicking);
    };
    const onUp = () => {
      dotRef.current?.classList.remove(styles.clicking);
      followerRef.current?.classList.remove(styles.clicking);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    let raf: number;
    const animate = () => {
      const { x, y } = mouse.current;

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }

      followerPos.current.x += (x - followerPos.current.x) * LERP;
      followerPos.current.y += (y - followerPos.current.y) * LERP;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  /* Global hover triggers – delegate to document level */
  const addHover = useCallback(() => {
    dotRef.current?.classList.add(styles.hovered);
    followerRef.current?.classList.add(styles.hovered);
  }, []);
  const removeHover = useCallback(() => {
    dotRef.current?.classList.remove(styles.hovered);
    followerRef.current?.classList.remove(styles.hovered);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const selector =
      '.hover-trigger, a, button, input, select, textarea, .garment-card';

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(selector)) {
        addHover();
        return;
      }

      try {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === 'pointer') {
          addHover();
        }
      } catch {
        // Ignore
      }
    };

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest(selector)) {
        removeHover();
        return;
      }

      try {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === 'pointer') {
          removeHover();
        }
      } catch {
        // Ignore
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [addHover, removeHover, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className={styles.cursor} />
      <div ref={followerRef} className={styles.follower} />
    </>
  );
}
