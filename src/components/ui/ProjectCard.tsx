import { memo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  span?: boolean;
  delay?: number;
}

export const ProjectCard = memo(({ project, span = false, delay = 0 }: ProjectCardProps) => {
  const handleCardClick = () => {
    if (project.deployedUrl) {
      window.open(project.deployedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInnerLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const isClickable = Boolean(project.deployedUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{
        default: { duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
        hover: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      }}
      className={`group relative rounded-3xl overflow-hidden bg-[#111827] border border-white/5 hover:border-[#00B4B9]/30 h-full flex flex-col ${span ? 'md:col-span-2 lg:col-span-2' : ''}`}
      onClick={handleCardClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : -1}
      aria-label={isClickable ? `Ver proyecto ${project.title}` : undefined}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient || 'from-slate-600 to-slate-800'} opacity-5 group-hover:opacity-10 transition-opacity duration-100`}></div>
      <div className="relative p-8 h-full flex flex-col z-10 cursor-pointer">
        <div className="flex justify-between items-start mb-6">
          <motion.div 
            className="p-3 rounded-xl bg-white/5 text-white ring-1 ring-white/10 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <img src={project.logo} alt={`Logo de ${project.title}`} className="h-8 w-auto object-contain" loading="lazy" />
          </motion.div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md">
            {project.tag}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#00B4B9] transition-colors duration-100">{project.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-8 flex-1">{project.shortDescription}</p>
        <div className="flex items-center gap-4">
          {project.deployedUrl && (
            <motion.a
              href={project.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInnerLinkClick}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center text-[#00B4B9] font-semibold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#111827] rounded"
            >
              Ver proyecto <ExternalLink size={16} className="ml-2" />
            </motion.a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleInnerLinkClick}
              className="text-slate-500 hover:text-slate-300 transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#111827] rounded p-1"
              aria-label={`Ver código de ${project.title} en GitHub`}
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';
