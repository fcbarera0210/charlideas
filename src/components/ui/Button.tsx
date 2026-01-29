import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  'aria-label'?: string;
}

export const Button = memo(({ 
  children, 
  onClick, 
  className = '', 
  type = 'button', 
  disabled = false,
  variant = 'primary',
  'aria-label': ariaLabel
}: ButtonProps) => {
  if (variant === 'primary') {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className={`relative group px-8 py-3.5 rounded-xl font-bold text-white overflow-hidden disabled:opacity-50 disabled:scale-100 ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00B4B9] to-[#0E7C6B] transition-opacity duration-100 group-hover:opacity-100 opacity-90"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00B4B9] to-[#00ffff] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-100"></div>
        <span className="relative flex items-center justify-center gap-2 z-10">{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className={`px-8 py-3.5 rounded-xl font-bold text-[#00B4B9] border border-[#00B4B9]/30 hover:bg-[#00B4B9]/10 hover:border-[#00B4B9] transition-all duration-100 backdrop-blur-sm disabled:opacity-50 ${className}`}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
