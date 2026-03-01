# Charl!deas

Sitio web oficial de **Charl!deas** — estudio de productos digitales. Landing corporativa que presenta servicios, capacidades y proyectos en producción.

---

## Descripción

Charl!deas acompaña a negocios y personas desde la idea hasta un producto digital usable y listo para operar. Nos especializamos en:

- Sistemas web a medida
- Aplicaciones de gestión y operación
- Landing pages y sitios corporativos
- Diseño UX/UI y experiencia de usuario

Este repositorio corresponde a la **landing page** del estudio: una SPA responsive que muestra quiénes somos, qué hacemos y casos reales (SushiWey, Cherry Experience, Lukita, Postly, NutriTrack).

---

## Tecnologías

| Stack        | Uso                          |
|-------------|------------------------------|
| React 18    | UI y componentes             |
| TypeScript  | Tipado y mantenibilidad     |
| Vite        | Build y dev server          |
| Tailwind CSS| Estilos y diseño responsive |
| Framer Motion | Animaciones y transiciones |
| Lucide React | Iconografía                |

---

## Requisitos

- **Node.js** 18 o superior  
- **npm** (o yarn/pnpm)

---

## Instalación y uso

```bash
# Clonar e instalar dependencias
git clone <repository-url>
cd charlideas
npm install

# Desarrollo local
npm run dev
# → http://localhost:5173

# Build para producción (ej. Vercel)
npm run build

# Vista previa del build
npm run preview
```

---

## Scripts

| Comando           | Descripción                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Servidor de desarrollo con HMR       |
| `npm run build`   | Compila TypeScript y genera build en `dist/` |
| `npm run preview`  | Sirve el contenido de `dist/` localmente     |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, efectos de fondo
│   ├── sections/        # Hero, Proyectos, Servicios, Capacidades, Contacto
│   ├── ui/              # Button, Card, ProjectCard, Logo
│   └── SEO.tsx
├── hooks/               # useScrollReveal, useScrollPosition, useIntersectionObserver
├── utils/               # animations, constants
├── data/
│   └── projects.ts      # Datos de proyectos (títulos, descripciones, logos, URLs)
├── App.tsx
├── main.tsx
└── index.css
```

La sección **Proyectos** toma los datos de `src/data/projects.ts`. Los dos primeros proyectos (por `order`) se muestran como destacados en una fila de dos columnas; el resto en grid de tres columnas.

---

## Secciones de la landing

1. **Hero** — Presentación y llamada a acción  
2. **Proyectos reales** — Portafolio (SushiWey, Cherry Experience y otros)  
3. **Servicios** — Qué ofrecemos  
4. **Capacidades** — Stack y metodología  
5. **Contacto** — Formulario con enlace a WhatsApp  

---

## Deploy (Vercel)

El proyecto está preparado para Vercel:

- Build: `npm run build`
- Directorio de salida: `dist/`
- No requiere variables de entorno para el build estándar

Conectar el repo a Vercel y usar estos valores es suficiente para un deploy correcto.

---

## Licencia y contacto

**Charl!deas** © 2024–2025. Uso privado.

Para consultas profesionales: a través del formulario de la web o los canales indicados en el sitio.
