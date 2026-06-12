import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Parallax({ children, offset = 50, className = '' }) {
  const ref = useRef(null);
  
  // Track the scroll progress of the component within the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress (0 to 1) to vertical movement (-offset to offset)
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, width: '100%', height: '100%' }}>
        {children}
      </motion.div>
    </div>
  );
}
