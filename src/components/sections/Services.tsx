import { motion } from 'framer-motion';
import { Monitor, Smartphone, Layout, PenTool, Layers, BarChart } from 'lucide-react';
import { Card } from '../ui/Card';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { STAGGER_DELAYS } from '../../utils/constants';

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const Services = () => {
  const services: Service[] = [
    { icon: <Monitor className="text-[#00B4B9]" size={32} />, title: "Sistemas Web a Medida", desc: "Plataformas operativas complejas y paneles de control." },
    { icon: <Smartphone className="text-[#00B4B9]" size={32} />, title: "Aplicaciones de Gestión", desc: "Pedidos, agendas, finanzas y operaciones comerciales." },
    { icon: <Layout className="text-[#00B4B9]" size={32} />, title: "Páginas Web para Negocios", desc: "Landing pages de alto impacto y sitios corporativos." },
    { icon: <PenTool className="text-[#00B4B9]" size={32} />, title: "UX / UI Design", desc: "Interfaces intuitivas centradas en la facilidad de uso." },
    { icon: <Layers className="text-[#00B4B9]" size={32} />, title: "Branding Digital", desc: "Identidad visual, logotipos y lenguaje gráfico." },
    { icon: <BarChart className="text-[#00B4B9]" size={32} />, title: "Consultoría de Producto", desc: "Ayuda para transformar ideas vagas en productos viables." },
  ];

  const titleReveal = useScrollReveal({ direction: 'up', delay: 0 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="filosofía" className="py-24 bg-[#080B11] relative z-10">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <motion.div
          className="absolute right-0 top-0 w-96 h-96 bg-[#00B4B9] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={titleReveal.ref}
          initial="hidden"
          animate={titleReveal.isInView ? 'visible' : 'hidden'}
          variants={titleReveal.variants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Servicios<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#4FD1C5]">Claros</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No usamos la tecnología como fin, sino como la herramienta para resolver el problema.
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#00B4B9] to-transparent rounded-full mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <Card delay={i * STAGGER_DELAYS.small} className="h-full">
                <motion.div
                  className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-300">{service.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
