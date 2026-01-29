import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { CharlideasLogo } from '../ui/Logo';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollPosition(50);

  const navItems = [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Servicios', href: '#filosofía' },
    { label: 'Capacidades', href: '#servicios' },
  ];

  const handleContactClick = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-[#0B0F17]/80 backdrop-blur-md border-white/10 py-3'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.95 }}
        >
          <CharlideasLogo className="h-9 w-9" />
          <span className="text-xl font-bold text-white tracking-tight">
            Charl<span className="text-[#00B4B9]">!</span>deas
          </span>
        </motion.button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-400 hover:text-[#00B4B9] transition-colors duration-100 uppercase tracking-wider"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button
            onClick={handleContactClick}
            className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-all duration-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Contacto
          </motion.button>
        </div>

        <motion.button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0B0F17] border-b border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {[...navItems, { label: 'Contacto', href: '#contacto' }].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-slate-300 hover:text-[#00B4B9]"
                  onClick={() => {
                    setMenuOpen(false);
                    if (item.label === 'Contacto') {
                      handleContactClick();
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
