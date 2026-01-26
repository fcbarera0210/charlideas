import { useState, useEffect, useRef, type ReactNode } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Smartphone, 
  Monitor, 
  PenTool, 
  CheckCircle,
  BarChart,
  Layout,
  ExternalLink,
  Github
} from 'lucide-react';
import { getFeaturedProjects, type Project } from '../data/projects';
import { SEO } from '../components/SEO';
import { observerOptions, getStaggerDelay, hoverTransitions } from '../utils/animations';

// --- COMPONENTES UTILITY (ANIMACIÓN) ---

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const transitionClasses = isVisible 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 translate-y-10";

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out transform ${transitionClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENTES UI ---

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'outline'; className?: string; onClick?: () => void; type?: 'button' | 'submit' | 'reset' }) => {
  const baseStyle = `px-6 py-3 rounded-xl font-medium ${hoverTransitions.scale} ${hoverTransitions.color} active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2`;
  
  const variants: Record<'primary' | 'secondary' | 'outline', string> = {
    primary: "bg-[#00B4B9] text-white hover:bg-[#009da1] shadow-lg shadow-[#00B4B9]/20",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:border-[#00B4B9] hover:text-[#00B4B9]",
    outline: "border-2 border-[#00B4B9] text-[#00B4B9] hover:bg-[#00B4B9] hover:text-white"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string; subtitle?: string; align?: 'center' | 'left' }) => (
  <RevealOnScroll className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-slate-600 leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className={`h-1.5 w-24 bg-[#00B4B9] rounded-full mt-6 ${align === 'center' ? 'mx-auto' : ''}`}></div>
  </RevealOnScroll>
);

// --- ICONO SVG LOGO ---
const CharlideasLogo = ({ className = "h-10" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.18 214.18">
    <path fill="#00B4B9" d="M162.22,214.18H52a52.11,52.11,0,0,1-52-52V52A52.11,52.11,0,0,1,52,0H162.22a52.11,52.11,0,0,1,52,52V162.22A52.11,52.11,0,0,1,162.22,214.18Z"/>
    <path fill="#fefefe" d="M121.45,156.74c-12.34,14-28.93,22.23-43,20.65-31.87-3.59-47.88-29.71-45-55.35C35.37,105,46,89.77,62,80.58c16.52-9.6,31.41-11,41.8-9.79,8.78,1,15.88,4.36,19.7,7.82a9.75,9.75,0,0,1,3.43,9c-1,6.45-8.15,12.18-11.85,11.77-1.62-.18-3.16-1.06-4.79-3.11-9-9.44-16.44-14-22.67-14.72-9-1-20.85,6.55-23.66,31.49-3.45,30.72,17.83,43.16,27.76,44.28,9.47,1.07,16.69-.69,25.8-6.92Z"/>
    <path fill="#fefefe" d="M142.1,23c7.89,0,19.29,1.4,19.52,10.23a82.41,82.41,0,0,1-.94,10.22c-2.32,14.88-9.06,64.69-13,94H136.52c-3.26-27-10-77.24-12.79-93.28a59.64,59.64,0,0,1-1.62-10.92c0-8.14,11.62-10.23,20-10.23Zm.34,163.78a19.41,19.41,0,1,1,18.95-19.4,19.16,19.16,0,0,1-18.95,19.4Z"/>
  </svg>
);

// --- SECCIONES PRINCIPALES ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Qué hacemos', href: '#que-hacemos' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <CharlideasLogo className="h-10 w-10 transition-transform group-hover:scale-110 duration-300" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">Charl!deas</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-slate-600 hover:text-[#00B4B9] font-medium transition-colors">
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="py-2 px-5 text-sm" onClick={() => {}}>
            Empezar proyecto
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-slate-700 hover:text-[#00B4B9]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="w-full mt-2" onClick={() => {}}>
            Empezar proyecto
          </Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden">
    {/* Abstract Background Element */}
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#00B4B9]/20 to-[#0A4F6E]/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
    <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-[#0E7C6B]/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

    <div className="max-w-4xl mx-auto text-center">
      <RevealOnScroll>
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#00B4B9]/10 text-[#00B4B9] font-semibold text-sm mb-6">
            Estudio de Productos Digitales
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
          Productos digitales que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4B9] to-[#0A4F6E]">funcionan</span> en la vida real
        </h1>
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Diseñamos y construimos sistemas web y marcas digitales pensadas para personas, negocios y uso diario.
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={300} className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" onClick={() => document.getElementById('proyectos')?.scrollIntoView({behavior:'smooth'})}>
          Ver proyectos <ArrowRight size={20} />
        </Button>
        <Button variant="secondary" onClick={() => document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>
          Contactar
        </Button>
      </RevealOnScroll>
    </div>
  </section>
);

const About = () => (
  <section id="que-hacemos" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <RevealOnScroll className="order-2 md:order-1 relative" delay={200}>
        <div className="relative z-10 bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xl">
            {/* Visual representation of "Construction/Structure" */}
            <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9]">
                    <Layout size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Diseño</h3>
                    <p className="text-sm text-slate-500">Funcional y humano</p>
                </div>
            </div>
            <div className="h-px bg-slate-200 w-full my-4"></div>
            <div className="flex gap-4 mb-6 ml-8">
                 <div className="w-12 h-12 rounded-xl bg-[#0A4F6E]/10 flex items-center justify-center text-[#0A4F6E]">
                    <Layers size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Lógica</h3>
                    <p className="text-sm text-slate-500">Reglas de negocio claras</p>
                </div>
            </div>
            <div className="h-px bg-slate-200 w-full my-4"></div>
            <div className="flex gap-4 ml-16">
                 <div className="w-12 h-12 rounded-xl bg-[#0E7C6B]/10 flex items-center justify-center text-[#0E7C6B]">
                    <Monitor size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">Desarrollo</h3>
                    <p className="text-sm text-slate-500">Tecnología robusta</p>
                </div>
            </div>
        </div>
        <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#00B4B9]/20 rounded-3xl -z-0"></div>
      </RevealOnScroll>
      
      <div className="order-1 md:order-2">
        <SectionHeading 
            title="Más que código, creamos soluciones"
            subtitle=""
            align="left"
        />
        <div className="space-y-6 text-lg text-slate-600">
          <RevealOnScroll delay={100}>
            <p>
                En <strong>Charl!deas</strong> creamos productos digitales completos: desde la idea y el diseño, hasta el desarrollo y la puesta en producción.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p>
                No hacemos software por hacer. Construimos herramientas que se usan, se entienden y resuelven problemas reales.
            </p>
          </RevealOnScroll>
          <ul className="space-y-3 mt-4">
            {['Pensamiento de producto', 'Experiencia de usuario real', 'Criterio técnico sólido'].map((item, i) => (
                <RevealOnScroll key={i} delay={300 + (i * 100)}>
                    <li className="flex items-center gap-3 text-slate-800 font-medium">
                        <CheckCircle size={20} className="text-[#00B4B9]" /> {item}
                    </li>
                </RevealOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <RevealOnScroll delay={getStaggerDelay(index)} className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
    {/* Abstract/Mock Visual Header */}
    <div className={`h-48 w-full ${project.colorBg} relative flex items-center justify-center overflow-hidden`}>
       <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
       <div className={`transform ${hoverTransitions.scale}`}>
        <img src={project.logo} alt={`Logo de ${project.title}`} className="h-16 w-auto object-contain drop-shadow-lg" loading="lazy" />
       </div>
       <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
         {project.tag}
       </div>
    </div>
    
    <div className="p-8 flex-1 flex flex-col">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
      <p className="text-slate-600 mb-6 flex-1">{project.shortDescription}</p>
      
      <div className="mt-auto pt-6 border-t border-slate-100">
         <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map(tech => (
                <span key={tech} className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    {tech}
                </span>
            ))}
         </div>
         <div className="flex items-center gap-3">
           {project.deployedUrl && (
             <a 
               href={project.deployedUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-[#00B4B9] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:text-[#009da1] focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 rounded"
             >
               Ver proyecto <ExternalLink size={16} />
             </a>
           )}
           {project.githubUrl && (
             <a 
               href={project.githubUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 rounded p-1"
               aria-label={`Ver código de ${project.title} en GitHub`}
             >
               <Github size={18} />
             </a>
           )}
         </div>
      </div>
    </div>
  </RevealOnScroll>
);

const Projects = () => {
  const projects = getFeaturedProjects();

  return (
    <section id="proyectos" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Proyectos Destacados" 
          subtitle="No son demos. Son productos diseñados para resolver problemas reales y operar negocios."
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessItem = ({ number, title, desc, index }: { number: string; title: string; desc: string; index: number }) => (
  <RevealOnScroll delay={getStaggerDelay(index)} className="flex gap-6 group">
    <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#00B4B9] text-[#00B4B9] font-bold text-xl flex items-center justify-center group-hover:bg-[#00B4B9] group-hover:text-white ${hoverTransitions.color} duration-300`}>
      {number}
    </div>
    <div>
      <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </RevealOnScroll>
);

const Methodology = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                 <SectionHeading 
                    title="Cómo trabajamos" 
                    subtitle="Evitamos la burocracia de agencia. Nos enfocamos en lo que aporta valor al usuario final."
                    align="left"
                />
            </div>
            <div className="space-y-10">
                <ProcessItem 
                    number="1"
                    title="Entender el problema real"
                    desc="Cada proyecto parte de una necesidad, no de elegir una tecnología. Diseñamos la solución antes de escribir código."
                    index={0}
                />
                <ProcessItem 
                    number="2"
                    title="Diseño de reglas y experiencia"
                    desc="Definimos reglas claras de negocio y diseñamos interfaces que no requieran manual de instrucciones."
                    index={1}
                />
                <ProcessItem 
                    number="3"
                    title="Tecnología como herramienta"
                    desc="Usamos IA y stacks modernos para acelerar, pero mantenemos control total sobre la lógica, el diseño y la calidad."
                    index={2}
                />
            </div>
        </div>
    </div>
  </section>
);

const Services = () => {
    const services = [
        { icon: <Monitor className="text-[#00B4B9]" size={32} />, title: "Sistemas Web a Medida", desc: "Plataformas operativas complejas y paneles de control." },
        { icon: <Smartphone className="text-[#00B4B9]" size={32} />, title: "Aplicaciones de Gestión", desc: "Pedidos, agendas, finanzas y operaciones comerciales." },
        { icon: <Layout className="text-[#00B4B9]" size={32} />, title: "Páginas Web para Negocios", desc: "Landing pages de alto impacto y sitios corporativos." },
        { icon: <PenTool className="text-[#00B4B9]" size={32} />, title: "UX / UI Design", desc: "Interfaces intuitivas centradas en la facilidad de uso." },
        { icon: <Layers className="text-[#00B4B9]" size={32} />, title: "Branding Digital", desc: "Identidad visual, logotipos y lenguaje gráfico." },
        { icon: <BarChart className="text-[#00B4B9]" size={32} />, title: "Consultoría de Producto", desc: "Ayuda para transformar ideas vagas en productos viables." },
    ];

    return (
        <section id="servicios" className="py-24 bg-[#0A4F6E] text-white relative overflow-hidden">
            {/* Background Pattern */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute right-0 top-0 w-96 h-96 bg-[#00B4B9] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
             </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios Claros</h2>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg">Sin buzzwords. Soluciones tangibles para tu negocio.</p>
                    </RevealOnScroll>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <RevealOnScroll key={i} delay={i * 100} className="h-full">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors h-full">
                                <div className="bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                                <p className="text-slate-300">{s.desc}</p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => (
    <section id="contacto" className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
            <RevealOnScroll>
                <div className="w-20 h-20 bg-[#00B4B9]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#00B4B9]">
                    <CharlideasLogo className="h-10 w-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">¿Hablamos de tu idea?</h2>
                <p className="text-xl text-slate-600 mb-10">
                    Si tienes un problema en tu negocio, una idea en servilleta o necesitas una herramienta digital mejor, conversemos. Sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="primary" className="text-lg px-8 py-4" onClick={() => {}}>
                        Agendar una llamada
                    </Button>
                    <Button variant="secondary" className="text-lg px-8 py-4" onClick={() => {}}>
                        Enviar un correo
                    </Button>
                </div>
            </RevealOnScroll>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-80">
                 <CharlideasLogo className="h-6 w-6" />
                 <span className="font-bold text-slate-700">Charl!deas</span>
            </div>
            <div className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Charl!deas. Diseño y desarrollo propio.
            </div>
            <div className="flex gap-6">
                {['LinkedIn', 'Instagram', 'GitHub'].map(social => (
                    <a key={social} href="#" className="text-slate-400 hover:text-[#00B4B9] transition-colors font-medium text-sm">
                        {social}
                    </a>
                ))}
            </div>
        </div>
    </footer>
);

const App = () => {
  return (
    <div className="font-sans antialiased text-slate-600 bg-white selection:bg-[#00B4B9] selection:text-white">
      <SEO />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Methodology />
      <Services />
      <Contact />
      <Footer />
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-fill-mode: both;
        }
        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default App;