import { motion } from 'framer-motion';
import { CharlideasLogo } from '../ui/Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-[#05080C] border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CharlideasLogo className="h-8 w-8" />
            <span className="text-lg font-bold text-white">
              Charl<span className="text-[#00B4B9]">!</span>deas
            </span>
          </motion.div>

          <div className="flex gap-8 text-slate-600 text-sm">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="hover:text-[#00B4B9] transition-colors duration-150"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                style={{ transition: 'color 0.15s ease-out' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.p
            className="text-slate-600 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            © {currentYear} Charl!deas.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
