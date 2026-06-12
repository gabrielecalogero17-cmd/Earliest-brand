import React from 'react';
import { motion } from 'framer-motion';

export default function AnimateIn({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  duration = 0.6,
  flashRed = false,
  bgEnd = 'rgba(0,0,0,0)'
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialProps = { 
    opacity: 0, 
    ...directions[direction] 
  };
  
  const whileInViewProps = { 
    opacity: 1, 
    x: 0, 
    y: 0 
  };

  if (flashRed) {
    initialProps.backgroundColor = '#800000'; // start bright red
    whileInViewProps.backgroundColor = bgEnd; // animate to target bg
  }

  return (
    <motion.div
      initial={initialProps}
      whileInView={whileInViewProps}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1],
        backgroundColor: { duration: 1.2, delay: delay, ease: "easeOut" } // smooth slow fade for bg
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
