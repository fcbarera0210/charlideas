import { motion } from 'framer-motion';
import { getFeaturedProjects } from '../../data/projects';
import { ProjectCard } from '../ui/ProjectCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { STAGGER_DELAYS } from '../../utils/constants';

export const Projects = () => {
  const projects = getFeaturedProjects();
  const featuredProjects = projects.slice(0, 2);
  const otherProjects = projects.slice(2);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="proyectos" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={titleReveal.ref}
          initial="hidden"
          animate={titleReveal.isInView ? 'visible' : 'hidden'}
          variants={titleReveal.variants}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Proyectos<span className="text-[#00B4B9]">Reales</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Trabajamos con negocios y personas que quieren pasar de la idea a un producto digital claro, usable y listo para operar.
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#00B4B9] to-transparent rounded-full"></div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="h-full md:h-full"
              >
                <ProjectCard
                  project={project}
                  delay={idx * STAGGER_DELAYS.medium}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:items-stretch">
            {otherProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="h-full md:h-full"
              >
                <ProjectCard
                  project={project}
                  delay={(idx + 2) * STAGGER_DELAYS.medium}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
