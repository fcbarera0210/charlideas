# Comtelsat Frontend

Sitio web corporativo de **Comtelsat**, empresa especializada en soluciones de telecomunicaciones, seguridad, automatizaciones y energía solar ubicada en Curicó, Chile.

## 📋 Descripción

Aplicación web desarrollada con Vue 3 que presenta los servicios y productos de Comtelsat, incluyendo:
- **Radiocomunicación**: Proyectos, ventas y servicio técnico de equipos de radiocomunicación
- **Seguridad**: Sistemas de alarma, CCTV, citofonía y gestión de flota por GPS
- **Automatizaciones**: Soluciones para portones, puertas automáticas y control de acceso
- **Energía Solar**: Paneles fotovoltaicos e iluminación solar

## ✨ Características

- 🎨 **Diseño moderno y responsive**: Interfaz adaptada para dispositivos móviles, tablets y desktop
- 🚀 **Rendimiento optimizado**: Lazy loading de imágenes y optimización de recursos
- 🎭 **Animaciones fluidas**: Integración con Animate.css para transiciones suaves
- 📱 **Navegación intuitiva**: Menú de navegación con scroll suave entre secciones
- 🖼️ **Galería multimedia**: Visualización de imágenes y videos de proyectos
- 📧 **Formulario de contacto**: Sistema de contacto para consultas y cotizaciones
- 🔥 **Integración Firebase**: Configuración lista para hosting y servicios de Firebase

## 🛠️ Tecnologías Utilizadas

### Core
- **Vue 3.3.4** - Framework JavaScript progresivo
- **TypeScript 5.1.6** - Tipado estático para JavaScript
- **Vite 4.4.9** - Build tool y servidor de desarrollo rápido

### Routing y Estado
- **Vue Router 4.2.4** - Enrutamiento para aplicaciones Vue

### Estilos
- **Sass 1.66.1** - Preprocesador CSS
- **Animate.css 4.1.1** - Biblioteca de animaciones CSS

### Optimización
- **Vue Lazyload 3.0.0** - Carga diferida de imágenes

### Backend y Hosting
- **Firebase 10.3.1** - Plataforma de desarrollo y hosting
- **Vuefire 3.1.16** - Integración de Firebase con Vue

## 📁 Estructura del Proyecto

```
comtelsat-front/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, SVGs, videos)
│   ├── components/         # Componentes Vue reutilizables
│   │   ├── CardAction.vue
│   │   ├── CardInfo.vue
│   │   ├── Footer.vue
│   │   ├── FormContact.vue
│   │   ├── Gallery.vue
│   │   ├── ModalContact.vue
│   │   ├── ModalImages.vue
│   │   ├── ModalService.vue
│   │   ├── NavBar.vue
│   │   ├── Slider.vue
│   │   └── SliderBrands.vue
│   ├── global/            # Datos globales y configuraciones
│   │   ├── Gallery.ts     # Lista de imágenes de la galería
│   │   └── Services.ts     # Catálogo de servicios
│   ├── router/            # Configuración de rutas
│   │   └── index.ts
│   ├── scss/              # Estilos globales y por componente
│   │   ├── _base.scss
│   │   ├── _variables.scss
│   │   ├── components/
│   │   └── styles.scss
│   ├── views/             # Vistas/páginas principales
│   │   ├── AboutSection.vue
│   │   ├── BrandSection.vue
│   │   ├── ContactSection.vue
│   │   ├── GallerySection.vue
│   │   ├── HomeView.vue
│   │   └── ServicesSection.vue
│   ├── App.vue            # Componente raíz
│   ├── firebaseConfig.ts   # Configuración de Firebase
│   └── main.ts            # Punto de entrada de la aplicación
├── firebase.json           # Configuración de Firebase Hosting
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior recomendada)
- **npm** o **yarn** como gestor de paquetes

## 🚀 Instalación

1. **Clonar el repositorio** (si aplica):
```bash
git clone <url-del-repositorio>
cd comtelsat-front
```

2. **Instalar dependencias**:
```bash
npm install
```

## 💻 Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con hot-reload. La aplicación estará disponible en `http://localhost:5173`

### Compilación
```bash
npm run build
```
Compila la aplicación para producción con verificación de tipos. Los archivos optimizados se generan en la carpeta `dist/`.

### Vista Previa de Producción
```bash
npm run preview
```
Sirve la versión de producción localmente para pruebas antes del despliegue.

### Verificación de Tipos
```bash
npm run type-check
```
Ejecuta la verificación de tipos TypeScript sin compilar.

### Solo Compilación (sin verificación de tipos)
```bash
npm run build-only
```
Compila la aplicación sin ejecutar la verificación de tipos (más rápido).

## ⚙️ Configuración

### Firebase

El proyecto está configurado para usar Firebase Hosting. La configuración se encuentra en:
- `src/firebaseConfig.ts` - Credenciales de Firebase
- `firebase.json` - Configuración de hosting

**Nota**: Asegúrate de tener las credenciales correctas de Firebase configuradas antes del despliegue.

### Variables de Entorno

Actualmente el proyecto utiliza la configuración base de Vite. Si necesitas variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto
2. Define tus variables con el prefijo `VITE_`:
```env
VITE_API_URL=https://api.ejemplo.com
VITE_FIREBASE_API_KEY=tu-api-key
```

### Alias de Rutas

El proyecto utiliza el alias `@` para referenciar la carpeta `src/`:

```typescript
import Component from '@/components/Component.vue'
import { service } from '@/global/Services.ts'
```

## 🎨 Estilos

El proyecto utiliza **Sass** con una arquitectura modular:

- `_base.scss` - Estilos base y reset
- `_variables.scss` - Variables globales (colores, fuentes, etc.)
- `components/` - Estilos específicos por componente
- Secciones individuales - Cada sección tiene su archivo SCSS correspondiente

## 📱 Secciones del Sitio

1. **Inicio (Slider)**: Carrusel principal con información destacada
2. **Marcas (BrandSection)**: Muestra las marcas y partners de la empresa
3. **Servicios (ServicesSection)**: Catálogo completo de servicios con modales informativos
4. **Galería (GallerySection)**: Galería de imágenes y videos de proyectos
5. **Nosotros (AboutSection)**: Información sobre la empresa
6. **Contacto (ContactSection)**: Formulario de contacto y ubicación en mapa

## 🔧 Desarrollo

### Agregar un Nuevo Servicio

Edita el archivo `src/global/Services.ts` y agrega un nuevo objeto al array `Services`:

```typescript
{
  id: '5',
  title: 'Nuevo Servicio',
  description: 'Descripción completa...',
  shortDesc: 'Descripción corta...',
  icon: iconPath,
  image: imagePath,
  iconColor: iconColorPath,
  details: [...]
}
```

### Agregar Imágenes a la Galería

Edita el archivo `src/global/Gallery.ts` e importa las nuevas imágenes:

```typescript
import nuevaImagen from '@/assets/images/nueva-imagen.webp';
// Agregar al array GalleryList
```

### Personalizar Estilos

Los estilos están organizados por componente. Para modificar estilos globales, edita `src/scss/_variables.scss` o `src/scss/_base.scss`.

## 🚢 Despliegue

### Firebase Hosting

1. **Instalar Firebase CLI** (si no lo tienes):
```bash
npm install -g firebase-tools
```

2. **Iniciar sesión en Firebase**:
```bash
firebase login
```

3. **Compilar el proyecto**:
```bash
npm run build
```

4. **Desplegar**:
```bash
firebase deploy
```

### Otros Servicios de Hosting

Después de ejecutar `npm run build`, la carpeta `dist/` contiene los archivos estáticos listos para desplegar en cualquier servicio de hosting estático (Netlify, Vercel, GitHub Pages, etc.).

## 📝 Notas de Desarrollo

- El formulario de contacto (`FormContact.vue`) actualmente solo registra los datos en consola. Se requiere implementar la integración con un backend o servicio de email.
- Firebase está configurado pero puede requerir configuración adicional según las necesidades del proyecto.
- El proyecto utiliza lazy loading para optimizar la carga de imágenes.

## 🤝 Contribución

Este es un proyecto privado de Comtelsat. Para contribuciones, contacta al equipo de desarrollo.

## 📄 Licencia

Proyecto privado - Todos los derechos reservados © Comtelsat

## 📞 Contacto

**Comtelsat**
- 📍 Ubicación: Población Santa Inés, Psje. 8, N° 52, Curicó, Maule, Chile
- 📞 Teléfono: +56 998872686
- 📧 Email: carlos@comtelsat.cl

---

Desarrollado con ❤️ usando Vue 3 y TypeScript
