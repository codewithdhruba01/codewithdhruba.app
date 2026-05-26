import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  className = '',
  once = true,
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium cubic-bezier easing curve for organic motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
