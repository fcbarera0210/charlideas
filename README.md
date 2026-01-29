# Charl!deas

Landing page oficial de Charl!deas - Digitalización de negocios y landings de alto impacto.

## 📋 Descripción

Charl!deas es un estudio de productos digitales que ayuda a negocios y personas a pasar de la idea a un producto digital claro, usable y listo para operar. Especializados en sistemas web, aplicaciones de gestión, landing pages y diseño UX/UI.

Este proyecto es una landing page moderna y completamente responsive que muestra nuestros servicios, capacidades y proyectos reales en producción.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con tema oscuro
- 📱 **Totalmente Responsive**: Optimizado para mobile, tablet y desktop
- 🎭 **Animaciones Fluidas**: Implementadas con Framer Motion para una experiencia de usuario excepcional
- ⚡ **Rendimiento Optimizado**: Componentes memoizados y lazy loading
- ♿ **Accesible**: Navegación por teclado y ARIA labels
- 🎯 **SEO Optimizado**: Meta tags y estructura semántica
- 📧 **Contacto Integrado**: Formulario con integración directa a WhatsApp

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones y transiciones suaves
- **Vite** - Build tool rápido y optimizado
- **Lucide React** - Iconos modernos y ligeros

## 📦 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install
```

## 💻 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El servidor se iniciará en `http://localhost:5173/`

## 🏗️ Build para Producción

```bash
# Crear build optimizado
npm run build
```

El build se generará en la carpeta `dist/` lista para desplegar.

## 👀 Preview del Build

```bash
# Previsualizar el build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── layout/          # Componentes de layout
│   │   ├── Navbar.tsx   # Barra de navegación
│   │   ├── Footer.tsx   # Pie de página
│   │   └── BackgroundEffects.tsx  # Efectos de fondo animados
│   ├── sections/        # Secciones principales
│   │   ├── Hero.tsx     # Sección hero
│   │   ├── Projects.tsx # Portafolio de proyectos
│   │   ├── Services.tsx # Servicios claros
│   │   ├── Capabilities.tsx  # Capacidades técnicas
│   │   └── ContactSection.tsx  # Formulario de contacto
│   ├── ui/              # Componentes UI reutilizables
│   │   ├── Button.tsx   # Botón con variantes
│   │   ├── Card.tsx     # Card base
│   │   ├── ProjectCard.tsx  # Card de proyecto
│   │   └── Logo.tsx     # Logo de Charl!deas
│   └── SEO.tsx          # Componente SEO
├── hooks/               # Hooks personalizados
│   ├── useScrollReveal.ts  # Animaciones de scroll
│   ├── useScrollPosition.ts  # Detección de scroll
│   └── useIntersectionObserver.ts  # Observer mejorado
├── utils/               # Utilidades
│   ├── animations.ts    # Configuraciones de animación
│   └── constants.ts    # Constantes de la aplicación
├── data/               # Datos estáticos
│   └── projects.ts     # Información de proyectos
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Características de Diseño

### Animaciones
- **Scroll Reveal**: Elementos que aparecen al hacer scroll
- **Hover Effects**: Animaciones rápidas y fluidas (100ms)
- **Stagger Animations**: Animaciones escalonadas en grids
- **Micro-interacciones**: Feedback visual en botones y cards

### Responsividad
- Breakpoints optimizados para mobile, tablet y desktop
- Grid layouts adaptativos
- Tipografía responsive
- Menú móvil con animaciones

### Accesibilidad
- Navegación por teclado completa
- ARIA labels en elementos interactivos
- Contraste de colores adecuado
- Soporte para `prefers-reduced-motion`

## 📱 Secciones

1. **Hero**: Presentación principal con call-to-action
2. **Proyectos**: Portafolio de proyectos reales en producción
3. **Servicios Claros**: Servicios ofrecidos con iconos
4. **Capacidades**: Habilidades técnicas y metodologías
5. **Contacto**: Formulario integrado con WhatsApp

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm run preview` - Previsualiza el build de producción

## 📄 Licencia

Privado - Charl!deas © 2024

## 👥 Contacto

Para más información, visita nuestra landing page o contáctanos directamente a través del formulario de contacto.

---

Desarrollado con ❤️ por Charl!deas
