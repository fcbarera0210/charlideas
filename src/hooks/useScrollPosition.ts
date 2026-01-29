import { useState, useEffect } from 'react';

/**
 * Hook para detectar la posición de scroll
 * Útil para efectos como navbar que cambia al hacer scroll
 */
export const useScrollPosition = (threshold: number = 50): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
};
