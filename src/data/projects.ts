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
    description: 'Sistema web de pedidos en línea desarrollado a medida para un restaurante de sushi real. Permite a los clientes armar y enviar pedidos desde la web y seguir su estado en tiempo real, mientras el local controla cocina, delivery, retiro y consumo en mesa desde un panel operativo. Incluye rol de garzón y cocina, generación de comandas para impresión térmica, geolocalización con Google Maps y dashboard con métricas del negocio.',
    shortDescription: 'Digitalización completa de un restaurante de sushi: pedidos online, panel de cocina y garzones, seguimiento en tiempo real y métricas del negocio.',
    tag: 'Logistica & operaciones',
    category: 'Logistics & Ops',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Real-time'],
    logo: '/logo-sushiwey.svg',
    colorBg: 'bg-gradient-to-br from-orange-400 to-red-500',
    imageGradient: 'from-orange-500 to-red-600',
      deployedUrl: 'https://sushiwey.vercel.app/',
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 1
  },
  {
    id: 'lukita',
    title: 'Lukita',
    description: 'PWA de finanzas personales enfocada en la realidad chilena (CLP sin decimales). Permite gestionar cuentas, ingresos y gastos, presupuestos por categoría, transacciones recurrentes y búsquedas avanzadas, con soporte offline y sincronización con Firebase. El foco está en tener un tablero claro mes a mes, sin planillas, y con una navegación pensada para uso diario en móvil.',
    shortDescription: 'PWA de finanzas personales: cuentas, presupuestos, recurrentes y reportes claros para entender tus gastos/ingresos sin planillas.',
    tag: 'Finanzas',
    category: 'Fintech',
    stack: ['PWA', 'React', 'Offline-first', 'IndexedDB', 'Data Viz'],
    logo: '/logo-lukita.svg',
    colorBg: 'bg-gradient-to-br from-green-400 to-[#0E7C6B]',
    imageGradient: 'from-emerald-500 to-teal-600',
      deployedUrl: 'https://lukita.vercel.app/',
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 2
  },
  {
    id: 'postly',
    title: 'Postly',
    description: 'Aplicación tipo tablero de post-its para organizar tareas personales. Está pensada para liberar la cabeza: crear columnas, arrastrar tareas, usar colores y un glosario propio, con autenticación por email y tablero privado por usuario. La prioridad del proyecto es la experiencia: drag & drop fluido, edición directa en desktop y mobile, diseño limpio y ligero para enfocarse en lo importante.',
    shortDescription: 'Tablero personal de post-its con drag & drop y tablero privado por usuario para ordenar tu día sin complicarte.',
    tag: 'Productividad',
    category: 'Productivity',
    stack: ['React', 'Interactive UX', 'Kanban', 'Drag & Drop', 'Simplicity'],
    logo: '/logo-Postly.svg',
    colorBg: 'bg-gradient-to-br from-blue-400 to-[#0A4F6E]',
    imageGradient: 'from-blue-500 to-indigo-600',
      deployedUrl: 'https://postly-three-blush.vercel.app/',
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 3
  },
  {
    id: 'nutritrack',
    title: 'NutriTrack',
    description: 'Plataforma web para registrar comidas, macros, hidratación y ejercicio con una experiencia alineada a un diseño Figma “pixel‑perfect”. Incluye autenticación, dashboard diario con rachas, estadísticas semanales, perfil con objetivos y un buscador nutricional apoyado en IA (DeepSeek + Groq) para completar información de alimentos automáticamente.',
    shortDescription: 'App web de seguimiento nutricional con dashboard diario, rachas, estadísticas y búsqueda de macros por IA para apoyar hábitos constantes.',
    tag: 'Salud y bienestar',
    category: 'HealthTech',
    stack: ['React', 'Data Visualization', 'Charts', 'Health Tracking', 'Analytics'],
    logo: '/logo-nutritrack.svg',
    colorBg: 'bg-gradient-to-br from-lime-400 to-green-600',
    imageGradient: 'from-lime-500 to-green-600',
      deployedUrl: 'https://nutritrack-nu-lyart.vercel.app/',
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 4
  },
  {
    id: 'comtelsat',
    title: 'Comtelsat',
    description:
      'Sitio corporativo para Comtelsat, empresa de telecomunicaciones, seguridad, automatizaciones y energía solar en Curicó, Chile. El frontend en Vue 3 y TypeScript organiza servicios por categoría, integra una galería multimedia y un formulario de contacto listo para conectar con backend o email. El proyecto está optimizado con Vite, lazy loading de imágenes y despliegue en Firebase Hosting para un rendimiento confiable.',
    shortDescription:
      'Sitio corporativo en Vue 3 para Comtelsat: servicios de telecomunicaciones, seguridad, automatizaciones y energía solar, optimizado y desplegado en Firebase.',
    tag: 'telecom & seguridad',
    category: 'Telecom & Seguridad',
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Sass', 'Firebase'],
    logo: '/logo-comtelsat.svg',
    colorBg: 'bg-gradient-to-br from-blue-500 to-sky-600',
    imageGradient: 'from-blue-500 to-sky-600',
      deployedUrl: 'https://comtelsat-1109.web.app/',
    githubUrl: '', // TODO: Agregar repositorio GitHub
    featured: true,
    order: 5
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
