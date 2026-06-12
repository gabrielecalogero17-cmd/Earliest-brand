import React, { useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { FormattedMessage } from 'react-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimateIn from './AnimateIn';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const x = useTransform(springX, [-1, 1], [-40, 40]);
  const y = useTransform(springY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          alt="Growth visualization background" 
          className="w-full h-full object-cover mix-blend-luminosity" 
          src="https://lh3.googleusercontent.com/aida/ADBb0uijPXodUM23WgvfVWbo2TpsIWHpZz8D08R7dLfPBD1F80LD1sFnoYHnsO757ermj9nwJgxjns43-6DkCQSFacSSrG3zusmhlE6fZSe0Sr4ezcPWPZoE8SQniKCEIrX3G482jpiij73rKimKfXpisPnhBvkxVD9osivL7gCG63cvYe3FaQrf6JzeqIQU78CghwwFbuK8E9za7qcN4p58cLnqrxteUdvBMx9e7JEcjsfdui0e-ItZ4v52zlXX" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface"></div>
      </div>
      <div className="container mx-auto px-8 md:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-4xl flex-1">
          <AnimateIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-outline-variant/15">
              <span className="flex h-2 w-2 rounded-none bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] animate-pulse"></span>
              <span className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant">
                <FormattedMessage id="hero.subtitle" />
              </span>
            </div>
          </AnimateIn>
          
          <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tight mb-8 text-on-surface leading-[0.95]">
            <AnimateIn delay={0.2}><span className="whitespace-nowrap inline-block"><FormattedMessage id="hero.title.line1" /></span></AnimateIn><br />
            <AnimateIn delay={0.3}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary inline-block">
                <FormattedMessage id="hero.title.line2" /><br />
                <FormattedMessage id="hero.title.line3" />
              </span>
            </AnimateIn>
          </h1>
          
          <AnimateIn delay={0.4}>
            <p className="text-xl md:text-2xl text-on-surface-variant font-body font-light leading-relaxed max-w-2xl mb-12">
              <FormattedMessage id="hero.description" />
            </p>
          </AnimateIn>
          
          <AnimateIn delay={0.5}>
            <div className="flex flex-wrap gap-6">
              <button className="px-10 py-5 bg-[#660000] border border-[#ECC097]/20 hover:bg-[#800000] text-white font-bold tracking-widest uppercase text-sm rounded shadow-lg hover:text-[#050505] hover:text-on-primary transition-all duration-300 group flex items-center gap-2">
                <FormattedMessage id="hero.btn.start" />
                <ArrowRight size={20} weight="regular" className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-surface-container-highest text-on-surface font-bold tracking-widest uppercase text-sm rounded hover:bg-surface-bright transition-all duration-300">
                <FormattedMessage id="hero.btn.methodology" />
              </button>
            </div>
          </AnimateIn>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/3 justify-center items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ x, y }}
            src="/assets/logo/logo_crest.png" 
            alt="EARLIEST Emblem" 
            className="w-[80%] max-w-[400px] drop-shadow-[0_0_60px_rgba(236,192,151,0.2)]" 
          />
        </div>
      </div>
    </section>
  );
}
