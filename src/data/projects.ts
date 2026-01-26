export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string; // Para cards
  tag: string;
  category: string;
  stack: string[];
  logo: string;
  colorBg: string;
  imageGradient?: string;
  deployedUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: 'sushiwey',
    title: 'SushiWey',
    description: 'Sistema web desarrollado a medida para un local de sushi real. Permite a los clientes realizar pedidos en línea y seguir su estado en tiempo real, mientras el negocio gestiona órdenes, clientes, direcciones, métricas y operación diaria desde un panel administrativo. Incluye flujos completos de compra, tracking de pedidos, generación de comandas, geolocalización y un dashboard operativo pensado para uso real, incluso desde dispositivos móviles.',
    shortDescription: 'Sistema web completo para un local de comida. Gestiona pedidos online, tracking en tiempo real y panel operativo. Una herramienta crítica para el negocio diario.',
    tag: 'Sistema Operativo',
    category: 'Logistics & Ops',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Real-time'],
    logo: '/logo-sushiwey.svg',
    colorBg: 'bg-gradient-to-br from-orange-400 to-red-500',
    imageGradient: 'from-orange-500 to-red-600',
    deployedUrl: '', // TODO: Agregar URL desplegada
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 1
  },
  {
    id: 'lukita',
    title: 'Lukita',
    description: 'Aplicación de finanzas personales creada para el control diario del dinero. Permite gestionar cuentas, ingresos, gastos, presupuestos y movimientos recurrentes, con soporte offline-first y sincronización automática. El foco del proyecto está en la simplicidad, el uso real y la flexibilidad mensual, adaptándose a la forma en que las personas realmente administran su dinero.',
    shortDescription: 'App de finanzas personales offline-first. Presupuestos flexibles, soporte multidivisa y sincronización. Diseñada para la realidad financiera cotidiana.',
    tag: 'Finanzas / Producto',
    category: 'Fintech',
    stack: ['PWA', 'React', 'Offline-first', 'IndexedDB', 'Data Viz'],
    logo: '/logo-lukita.svg',
    colorBg: 'bg-gradient-to-br from-green-400 to-[#0E7C6B]',
    imageGradient: 'from-emerald-500 to-teal-600',
    deployedUrl: '', // TODO: Agregar URL desplegada
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 2
  },
  {
    id: 'postly',
    title: 'Postly',
    description: 'Aplicación de gestión de tareas visual basada en tableros y post-its. Está diseñada para uso personal, priorizando la claridad mental, la rapidez y la mínima fricción. El proyecto se centra en decisiones de experiencia de usuario: drag & drop fluido, edición directa, uso en móvil y una interfaz limpia que evita la sobrecarga de opciones.',
    shortDescription: 'Gestión de tareas visual inspirada en post-its. Prioriza la claridad mental y la rapidez sobre funciones complejas. Drag & drop fluido.',
    tag: 'Productividad / UX',
    category: 'Productivity',
    stack: ['React', 'Interactive UX', 'Kanban', 'Drag & Drop', 'Simplicity'],
    logo: '/logo-Postly.svg',
    colorBg: 'bg-gradient-to-br from-blue-400 to-[#0A4F6E]',
    imageGradient: 'from-blue-500 to-indigo-600',
    deployedUrl: '', // TODO: Agregar URL desplegada
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 3
  },
  {
    id: 'nutritrack',
    title: 'NutriTrack',
    description: 'Plataforma de seguimiento nutricional enfocada en hábitos diarios. Permite registrar comidas, macros, hidratación y actividad física, entregando visualizaciones claras y cálculos automáticos. El proyecto explora el uso de datos, visualización y apoyo automatizado para mejorar la conciencia alimentaria y la constancia.',
    shortDescription: 'Plataforma de seguimiento nutricional basada en datos y hábitos. Visualización de macros, registro de actividad y cálculos automáticos.',
    tag: 'Health / Data',
    category: 'HealthTech',
    stack: ['React', 'Data Visualization', 'Charts', 'Health Tracking', 'Analytics'],
    logo: '/logo-nutritrack.svg',
    colorBg: 'bg-gradient-to-br from-lime-400 to-green-600',
    imageGradient: 'from-lime-500 to-green-600',
    deployedUrl: '', // TODO: Agregar URL desplegada
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 4
  }
];

// Función helper para obtener proyectos destacados
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
};

// Función helper para obtener un proyecto por ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
