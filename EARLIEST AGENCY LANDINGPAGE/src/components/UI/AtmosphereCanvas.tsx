import { useEffect, useRef } from 'react';
import styles from './AtmosphereCanvas.module.css';

const MAX_PARTICLES = 65;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

function createParticle(w: number, h: number, initialY?: number): Particle {
  const opacity = Math.random() * 0.45 + 0.1;
  return {
    x: Math.random() * w,
    y: initialY ?? h + 20,
    size: Math.random() * 2.2 + 0.6,
    speedY: -(Math.random() * 0.4 + 0.15),
    speedX: Math.random() * 0.2 - 0.1,
    opacity,
    color: `rgba(236, 192, 151, ${opacity})`,
    wobble: Math.random() * Math.PI,
    wobbleSpeed: Math.random() * 0.02 + 0.005,
  };
}

export default function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener('mousemove', onMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(createParticle(canvas.width, canvas.height, Math.random() * canvas.height));
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.15;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 0.8;
          p.y -= (dy / dist) * force * 0.8;
        }

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          Object.assign(p, createParticle(canvas.width, canvas.height));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(236, 192, 151, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
