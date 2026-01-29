import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Code, Layout, Layers, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { STAGGER_DELAYS } from '../../utils/constants';

interface Capacity {
  icon: LucideIcon;
  title: string;
  items: string[];
}

interface CapacityCardProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  delay?: number;
}

const CapacityCard = ({ title, items, icon: Icon, delay = 0 }: CapacityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{
        default: { duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
        hover: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      }}
      className="bg-[#0B0F17] p-8 border border-white/5 rounded-2xl hover:border-[#00B4B9]/30 group"
    >
      <motion.div
        className="h-14 w-14 rounded-2xl bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9] mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        <Icon size={28} />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-6 tracking-tight uppercase">{title}</h3>
      <ul className="space-y-4">
        {items.map((item: string, i: number) => (
          <motion.li
            key={i}
            className="flex items-center gap-3 text-slate-400 text-sm"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (delay + i * 50) / 1000 }}
          >
            <CheckCircle2 size={16} className="text-[#00B4B9] shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Capabilities = () => {
  const capacities: Capacity[] = [
    {
      icon: Code,
      title: "Ingeniería Web",
      items: ['Web Apps Progresivas', 'Sistemas de Gestión', 'Dashboards de Datos', 'API Development']
    },
    {
      icon: Layout,
      title: "Diseño de Sistemas",
      items: ['UX / UI Architecture', 'Diseño de Interacción', 'Identidad Digital', 'Prototipado de Alta']
    },
    {
      icon: Layers,
      title: "Estrategia",
      items: ['Auditoría de Producto', 'Escalabilidad Técnica', 'Consultoría Tecnológica', 'Optimización de Flujos']
    },
  ];

  const titleReveal = useScrollReveal({ direction: 'up', delay: 0 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="servicios" className="py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="bg-[#111827] rounded-2xl sm:rounded-[3rem] p-6 sm:p-8 md:p-16 border border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B4B9]/10 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="relative z-10">
            <motion.div
              ref={titleReveal.ref}
              initial="hidden"
              animate={titleReveal.isInView ? 'visible' : 'hidden'}
              variants={titleReveal.variants}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#4FD1C5]">Capacidades</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                Abordamos cada desafío con una visión holística, combinando ingeniería de software, diseño de interfaces y estrategia de negocio.
              </p>
              <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#00B4B9] to-transparent rounded-full"></div>
            </motion.div>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {capacities.map((cap, i) => (
                <CapacityCard
                  key={i}
                  icon={cap.icon}
                  title={cap.title}
                  items={cap.items}
                  delay={i * STAGGER_DELAYS.medium}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
