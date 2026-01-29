import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const Hero = () => {
  const badgeReveal = useScrollReveal({ direction: 'fade', delay: 0 });
  const titleReveal = useScrollReveal({ direction: 'up', delay: 100 });
  const descriptionReveal = useScrollReveal({ direction: 'up', delay: 200 });
  const buttonsReveal = useScrollReveal({ direction: 'up', delay: 300 });

  const handleContactClick = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    const el = document.getElementById('proyectos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 sm:pt-20 z-10">
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          ref={badgeReveal.ref}
          initial="hidden"
          animate={badgeReveal.isInView ? 'visible' : 'hidden'}
          variants={badgeReveal.variants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B4B9]/10 border border-[#00B4B9]/20 text-[#00B4B9] text-xs md:text-sm font-semibold mb-6 sm:mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4B9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4B9]"></span>
            </span>
            Digitalización de negocios y landings de alto impacto
          </div>
        </motion.div>

        <motion.div
          ref={titleReveal.ref}
          initial="hidden"
          animate={titleReveal.isInView ? 'visible' : 'hidden'}
          variants={titleReveal.variants}
        >
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold mb-6 sm:mb-8 leading-normal sm:leading-tight tracking-tight">
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-[#00B4B9] to-[#0E7C6B] blur opacity-30"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#80ffdb]">
                Digitalizamos
              </span>
            </span>
            <span className="text-white block mt-3 sm:mt-2 md:mt-0 md:ml-4">
              tu negocio & tu marca
            </span>
          </h1>
        </motion.div>

        <motion.div
          ref={descriptionReveal.ref}
          initial="hidden"
          animate={descriptionReveal.isInView ? 'visible' : 'hidden'}
          variants={descriptionReveal.variants}
        >
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Desde un restaurante que necesita ordenar sus pedidos, hasta una landing para tu servicio profesional: diseñamos
            y construimos productos digitales listos para operar, sin perderse entre formularios eternos ni menús confusos.
          </p>
        </motion.div>

        <motion.div
          ref={buttonsReveal.ref}
          initial="hidden"
          animate={buttonsReveal.isInView ? 'visible' : 'hidden'}
          variants={buttonsReveal.variants}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Button onClick={handleContactClick}>
            Contar mi idea <ArrowRight size={20} />
          </Button>
          <Button variant="outline" onClick={handleProjectsClick}>
            Ver proyectos
          </Button>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-20 -translate-y-1/2 hidden lg:block opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [-6, -8, -6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="bg-[#1F2937] p-4 rounded-xl border border-white/5 backdrop-blur-md">
            <Code className="text-[#00B4B9]" size={32} />
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-20 -right-10 hidden lg:block opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [12, 14, 12],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'reverse',
          }}
        >
          <div className="bg-[#1F2937] p-4 rounded-xl border border-white/5 backdrop-blur-md">
            <Zap className="text-yellow-400" size={32} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
