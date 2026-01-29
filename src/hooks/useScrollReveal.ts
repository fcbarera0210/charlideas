import { useInView } from 'framer-motion';
import { useRef } from 'react';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  delay?: number;
  direction?: AnimationDirection;
}

/**
 * Hook para animaciones de scroll con Framer Motion
 * Reemplaza RevealOnScroll con animaciones más ricas
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.2,
    once = true,
    delay = 0,
    direction = 'up',
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once,
    margin: '0px 0px -100px 0px',
  });

  const getVariants = () => {
    const offset = 60;
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: delay / 1000,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: offset },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -offset },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: offset },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -offset },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case 'scale':
        return {
          hidden: { ...baseVariants.hidden, scale: 0.9 },
          visible: { ...baseVariants.visible, scale: 1 },
        };
      case 'fade':
      default:
        return baseVariants;
    }
  };

  return {
    ref,
    isInView,
    variants: getVariants(),
  };
};
