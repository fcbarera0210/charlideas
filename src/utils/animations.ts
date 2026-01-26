// Utilidades de animación mejoradas para los templates

export const easingFunctions = {
  easeInOutCubic: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOutCubic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const animationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
};

export const staggerDelays = {
  small: 50,
  medium: 100,
  large: 150,
};

// Configuración para Intersection Observer
export const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

// Clases de animación mejoradas
export const animationClasses = {
  fadeInUp: {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
    transition: 'transition-all duration-700 ease-out',
  },
  fadeIn: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
    transition: 'transition-opacity duration-500 ease-out',
  },
  scaleIn: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
    transition: 'transition-all duration-500 ease-out',
  },
  slideInRight: {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
    transition: 'transition-all duration-700 ease-out',
  },
};

// Función helper para generar delays escalonados
export const getStaggerDelay = (index: number, baseDelay: number = staggerDelays.medium): number => {
  return index * baseDelay;
};

// Configuración de transiciones para hover states
export const hoverTransitions = {
  scale: 'transition-transform duration-300 ease-out hover:scale-105',
  lift: 'transition-transform duration-300 ease-out hover:-translate-y-1',
  glow: 'transition-shadow duration-300 ease-out hover:shadow-lg hover:shadow-[#00B4B9]/20',
  color: 'transition-colors duration-300 ease-out',
};
