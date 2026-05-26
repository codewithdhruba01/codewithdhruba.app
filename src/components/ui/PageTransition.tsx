import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Custom premium ease-out curve
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
