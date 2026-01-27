import { useState, useEffect, useRef, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Smartphone, 
  Monitor, 
  PenTool, 
  BarChart,
  Layout,
  Code,
  Zap,
  Globe,
  Database,
  Send,
  MessageCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import { getFeaturedProjects, type Project } from '../data/projects';
import { SEO } from '../components/SEO';
import { observerOptions, getStaggerDelay } from '../utils/animations';

// --- UTILITIES & ANIMATIONS ---

const RevealOnScroll = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      observerOptions
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-12 blur-sm"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- UI COMPONENTS ---

const GlowingButton = ({ children, onClick, className = "", type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; className?: string; type?: 'button' | 'submit' | 'reset'; disabled?: boolean }) => (
  <button 
    type={type}
    onClick={onClick} 
    disabled={disabled}
    className={`relative group px-8 py-3.5 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#00B4B9] to-[#0E7C6B] transition-all duration-300 group-hover:opacity-100 opacity-90"></div>
    <div className="absolute -inset-1 bg-gradient-to-r from-[#00B4B9] to-[#00ffff] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
    <span className="relative flex items-center justify-center gap-2 z-10">{children}</span>
  </button>
);

const OutlineButton = ({ children, onClick }: { children: ReactNode; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="px-8 py-3.5 rounded-xl font-bold text-[#00B4B9] border border-[#00B4B9]/30 hover:bg-[#00B4B9]/10 hover:border-[#00B4B9] transition-all duration-300 backdrop-blur-sm"
  >
    {children}
  </button>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-20">
    <RevealOnScroll>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        {title.split(" ").map((word: string, i: number) => (
          <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#4FD1C5]" : ""}>
            {word} 
          </span>
        ))}
      </h2>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[#00B4B9] to-transparent rounded-full"></div>
    </RevealOnScroll>
  </div>
);

const CharlideasLogo = ({ className = "h-10" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.18 214.18">
    <path fill="#00B4B9" d="M162.22,214.18H52a52.11,52.11,0,0,1-52-52V52A52.11,52.11,0,0,1,52,0H162.22a52.11,52.11,0,0,1,52,52V162.22A52.11,52.11,0,0,1,162.22,214.18Z"/>
    <path fill="#ffffff" d="M121.45,156.74c-12.34,14-28.93,22.23-43,20.65-31.87-3.59-47.88-29.71-45-55.35C35.37,105,46,89.77,62,80.58c16.52-9.6,31.41-11,41.8-9.79,8.78,1,15.88,4.36,19.7,7.82a9.75,9.75,0,0,1,3.43,9c-1,6.45-8.15,12.18-11.85,11.77-1.62-.18-3.16-1.06-4.79-3.11-9-9.44-16.44-14-22.67-14.72-9-1-20.85,6.55-23.66,31.49-3.45,30.72,17.83,43.16,27.76,44.28,9.47,1.07,16.69-.69,25.8-6.92Z"/>
    <path fill="#ffffff" d="M142.1,23c7.89,0,19.29,1.4,19.52,10.23a82.41,82.41,0,0,1-.94,10.22c-2.32,14.88-9.06,64.69-13,94H136.52c-3.26-27-10-77.24-12.79-93.28a59.64,59.64,0,0,1-1.62-10.92c0-8.14,11.62-10.23,20-10.23Zm.34,163.78a19.41,19.41,0,1,1,18.95-19.4,19.16,19.16,0,0,1-18.95,19.4Z"/>
  </svg>
);

// --- SECTIONS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#0B0F17]/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CharlideasLogo className="h-9 w-9" />
          <span className="text-xl font-bold text-white tracking-tight">Charl!deas</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Proyectos', 'Filosofía', 'Servicios'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-[#00B4B9] transition-colors uppercase tracking-wider">
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              const el = document.getElementById('contacto');
              if (el) el.scrollIntoView({ behavior: 'smooth'});
            }}
            className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-all"
          >
            Contacto
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

       {/* Mobile Menu */}
       {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B0F17] border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl">
           {['Proyectos', 'Filosofía', 'Servicios', 'Contacto'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium text-slate-300 hover:text-[#00B4B9]" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00B4B9]/20 rounded-full blur-[120px] animate-float-slow"></div>
    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0A4F6E]/20 rounded-full blur-[120px] animate-float-delayed"></div>
  </div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 z-10">
    <div className="max-w-5xl mx-auto text-center relative">
      <RevealOnScroll>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B4B9]/10 border border-[#00B4B9]/20 text-[#00B4B9] text-xs md:text-sm font-semibold mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B4B9] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B4B9]"></span>
          </span>
          Digitalización de negocios y landings de alto impacto
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
          Productos que{" "}
          <span className="relative inline-block">
             <span className="absolute -inset-1 bg-gradient-to-r from-[#00B4B9] to-[#0E7C6B] blur opacity-30"></span>
             <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#80ffdb]">
               convierten ideas
             </span>
          </span>
          <span className="block text-3xl md:text-5xl md:inline text-slate-500 font-medium mt-2 md:mt-0 md:ml-4">
            en sistemas y landing pages reales.
          </span>
        </h1>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Desde un restaurante que necesita ordenar sus pedidos, hasta una landing para tu servicio profesional: diseñamos
          y construimos productos digitales listos para operar, no maquetas.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={300} className="flex flex-col sm:flex-row gap-5 justify-center">
        <GlowingButton
          onClick={() => {
            const el = document.getElementById('contacto');
            if (el) el.scrollIntoView({ behavior: 'smooth'});
          }}
        >
          Contar mi idea <ArrowRight size={20} />
        </GlowingButton>
        <OutlineButton
          onClick={() => {
            const el = document.getElementById('proyectos');
            if (el) el.scrollIntoView({ behavior: 'smooth'});
          }}
        >
          Ver proyectos reales
        </OutlineButton>
      </RevealOnScroll>

      <div className="absolute top-1/2 -left-20 -translate-y-1/2 hidden lg:block animate-float-slow opacity-20">
         <div className="bg-[#1F2937] p-4 rounded-xl border border-white/5 backdrop-blur-md rotate-[-6deg]">
            <Code className="text-[#00B4B9]" size={32} />
         </div>
      </div>
      <div className="absolute bottom-20 -right-10 hidden lg:block animate-float-delayed opacity-20">
         <div className="bg-[#1F2937] p-4 rounded-xl border border-white/5 backdrop-blur-md rotate-[12deg]">
            <Zap className="text-yellow-400" size={32} />
         </div>
      </div>
    </div>
  </section>
);

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) => (
  <div className="bg-[#111827]/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm flex items-center gap-4 hover:border-[#00B4B9]/30 transition-colors">
    <div className="h-12 w-12 rounded-lg bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9]">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-500 uppercase tracking-wide font-medium">{label}</div>
    </div>
  </div>
);

const Stats = () => (
  <section className="py-10 border-y border-white/5 bg-[#0B0F17]/50 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Layout} label="Enfoque" value="Producto" />
        <StatCard icon={Database} label="Tecnología" value="Robusta" />
        <StatCard icon={Globe} label="Experiencia" value="Real" />
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, span = false }: { project: Project; span?: boolean }) => {
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
    <div
      className={`group relative rounded-3xl overflow-hidden bg-[#111827] border border-white/5 hover:border-[#00B4B9]/30 transition-all duration-500 hover:-translate-y-2 ${span ? 'md:col-span-2 lg:col-span-2' : ''}`}
      onClick={handleCardClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient || 'from-slate-600 to-slate-800'} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative p-8 h-full flex flex-col z-10 cursor-pointer">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-xl bg-white/5 text-white ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
              <img src={project.logo} alt={`Logo de ${project.title}`} className="h-8 w-auto object-contain" loading="lazy" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md">
              {project.tag}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#00B4B9] transition-colors">{project.title}</h3>
        <p className="text-slate-400 leading-relaxed mb-8 flex-1">{project.shortDescription}</p>
        <div className="flex items-center gap-4">
          {project.deployedUrl && (
            <a 
              href={project.deployedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleInnerLinkClick}
              className="flex items-center text-[#00B4B9] font-semibold text-sm group-hover:translate-x-2 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#111827] rounded"
            >
              Ver proyecto <ExternalLink size={16} className="ml-2" />
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleInnerLinkClick}
              className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#111827] rounded p-1"
              aria-label={`Ver código de ${project.title} en GitHub`}
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = getFeaturedProjects();
  const featuredProject = projects[0]; // SushiWey como destacado
  const otherProjects = projects.slice(1);

  return (
    <section id="proyectos" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle 
          title="Proyectos reales que ya están en producción" 
          subtitle="Cuatro casos que muestran cómo convertimos ideas en sistemas y landings que la gente usa todos los días."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RevealOnScroll className="md:col-span-2 lg:col-span-2">
            <ProjectCard project={featuredProject} span={true} />
          </RevealOnScroll>
          {otherProjects.map((project, idx) => (
            <RevealOnScroll key={project.id} delay={getStaggerDelay(idx + 1)}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodStep = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="relative pl-12 border-l border-white/10 pb-12 last:pb-0">
    <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B0F17] border border-[#00B4B9] flex items-center justify-center text-[#00B4B9] font-bold text-sm shadow-[0_0_15px_rgba(0,180,185,0.3)]">
      {num}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{desc}</p>
  </div>
);

const Philosophy = () => (
  <section id="filosofía" className="py-24 bg-[#080B11] relative z-10">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
      <div className="sticky top-32">
        <SectionTitle 
          title="Cómo trabajamos"
          subtitle="Evitamos la burocracia de agencia tradicional y las implementaciones a medias. Diseñamos a partir del problema real y de cómo se usa en el día a día."
        />
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00B4B9]/10 to-transparent border border-[#00B4B9]/10 backdrop-blur-sm">
            <p className="text-[#00B4B9] font-medium italic">
                "No usamos la tecnología como fin, sino como la herramienta para resolver el problema."
            </p>
        </div>
      </div>
      <div className="pt-8">
        <RevealOnScroll>
          <MethodStep
            num="01"
            title="Entender el contexto y el negocio"
            desc="Partimos por lo básico: qué vendes, cómo trabajas hoy y qué esperas que haga la web o el sistema en la práctica."
          />
          <MethodStep
            num="02"
            title="Definir reglas y experiencia"
            desc="Aterrizamos reglas de negocio (pedidos, pagos, agendas, flujos) y las traducimos en pantallas que no necesitan manual."
          />
          <MethodStep
            num="03"
            title="Construir con tecnología adecuada"
            desc="Usamos stacks modernos e IA para acelerar, pero siempre con foco en estabilidad, performance y mantenimiento simple."
          />
          <MethodStep
            num="04"
            title="Iterar con uso real"
            desc="Después del lanzamiento, ajustamos en base a datos: qué usan tus clientes, qué te simplifica el día y qué sobra."
          />
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="servicios" className="py-20 sm:py-24 relative z-10">
     <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#111827] rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B4B9]/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Servicios <span className="text-[#00B4B9]">Simples</span></h2>
                    <ul className="space-y-4">
                        {['Sistemas Web a Medida', 'Aplicaciones de Gestión', 'Landing Pages de Impacto', 'Consultoría UX'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <div className="h-2 w-2 rounded-full bg-[#00B4B9] shadow-[0_0_10px_#00B4B9]"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 text-center"><Monitor className="mx-auto text-[#00B4B9] mb-3" /><h4 className="text-white font-bold">Web Apps</h4></div>
                    <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 text-center mt-8"><Smartphone className="mx-auto text-[#00B4B9] mb-3" /><h4 className="text-white font-bold">Mobile</h4></div>
                    <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 text-center"><PenTool className="mx-auto text-[#00B4B9] mb-3" /><h4 className="text-white font-bold">UI/UX</h4></div>
                    <div className="bg-[#0B0F17] p-6 rounded-2xl border border-white/5 text-center mt-8"><BarChart className="mx-auto text-[#00B4B9] mb-3" /><h4 className="text-white font-bold">Data</h4></div>
                </div>
            </div>
        </div>
     </div>
  </section>
);

// --- NEW CONTACT SECTION ---

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulación de envío antes de WhatsApp
    setTimeout(() => {
    setStatus('success');
    // Aquí, más adelante, se construirá el mensaje de WhatsApp usando nombre + descripción de la idea.
    // const text = `Hola Charl!deas, soy ${formData.name}. ${formData.message}`;
    // const url = `https://wa.me/TUNUMERO?text=${encodeURIComponent(text)}`;
    // window.open(url, '_blank');
    }, 1500);
  };

  if (status === 'success') {
    return (
        <div className="bg-[#111827]/50 border border-[#00B4B9]/30 p-10 rounded-[2.5rem] backdrop-blur-md text-center animate-fade-in">
            <div className="h-20 w-20 bg-[#00B4B9]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-[#00B4B9]" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje preparado!</h3>
            <p className="text-slate-400 mb-8">Cuando habilitemos el número oficial, este flujo abrirá directamente un chat de WhatsApp.</p>
            <GlowingButton onClick={() => setStatus('idle')} type="button">Enviar otro mensaje</GlowingButton>
        </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827]/30 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00B4B9]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
      
      <div className="mb-8">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
          Nombre o empresa
        </label>
        <input 
          required
          type="text" 
          placeholder="Ej. Juan de SushiWey o Estudio X"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4B9]/50 focus:ring-1 focus:ring-[#00B4B9]/50 transition-all"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="mb-10">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
          Descripción breve de la idea o negocio
        </label>
        <textarea 
          required
          rows={4}
          placeholder="Cuéntanos qué quieres digitalizar o qué tipo de landing necesitas..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00B4B9]/50 focus:ring-1 focus:ring-[#00B4B9]/50 transition-all resize-none"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>

      <GlowingButton type="submit" className="w-full py-5" disabled={status === 'sending'} onClick={() => {}}>
        {status === 'sending' ? 'Preparando mensaje...' : (
          <>
            Preparar mensaje para WhatsApp <MessageCircle size={20} />
          </>
        )}
      </GlowingButton>
      
      <p className="text-center text-slate-600 text-[10px] mt-6 uppercase tracking-tighter">
        Más adelante este botón abrirá un chat de WhatsApp con tu mensaje prellenado.
      </p>
    </form>
  );
};

const ContactSection = () => (
  <section id="contacto" className="py-32 relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 text-[#00B4B9] font-bold text-sm uppercase tracking-widest mb-6">
                <Send size={16} /> Contacto Directo
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                ¿Tienes una <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#80ffdb]">idea</span> brillante?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
                Olvida los formularios eternos y los correos que se pierden. Déjanos tu nombre y lo que necesitas, y pasemos directamente a una charla por WhatsApp.
            </p>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 rounded-lg bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9]"><MessageCircle size={20} /></div>
                    <span className="font-medium">Respuesta en menos de 24 horas</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-10 w-10 rounded-lg bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9]"><Globe size={20} /></div>
                    <span className="font-medium">Atención global, soluciones locales</span>
                </div>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200}>
            <ContactForm />
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

const Footer = () => (
    <footer className="bg-[#05080C] border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                    <CharlideasLogo className="h-8 w-8" />
                    <span className="text-lg font-bold text-white">Charl!deas</span>
                </div>
                
                <div className="flex gap-8 text-slate-600 text-sm">
                    <a href="#" className="hover:text-[#00B4B9] transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-[#00B4B9] transition-colors">GitHub</a>
                    <a href="#" className="hover:text-[#00B4B9] transition-colors">Instagram</a>
                </div>

                <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Charl!deas.</p>
            </div>
        </div>
    </footer>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] font-sans text-slate-300 selection:bg-[#00B4B9] selection:text-white overflow-x-hidden">
      <SEO />
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <Philosophy />
      <Services />
      <ContactSection />
      <Footer />
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite reverse;
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default App;