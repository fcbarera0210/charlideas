import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const Card = ({ children, className = '', hover = true, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{
        default: { duration: 0.5, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
        hover: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      }}
      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${hover ? 'hover:bg-white/10 hover:border-[#00B4B9]/30' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
