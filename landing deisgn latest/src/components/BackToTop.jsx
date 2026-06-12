import React, { useState, useEffect } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-[#0F0000] text-[#ECC097] border border-[#ECC097]/30 shadow-[0_0_20px_rgba(236,192,151,0.1)] hover:bg-[#ECC097] hover:text-[#050505] hover:border-[#ECC097] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,192,151,0.3)] transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <ArrowUp size={24} weight="bold" className="group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
