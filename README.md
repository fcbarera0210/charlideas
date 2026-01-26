# Charl!deas Template Viewer

Aplicación web demo para visualizar y comparar los 3 templates del portafolio de Charl!deas.

## Características

- Menú flotante en la esquina superior derecha para cambiar entre templates
- Persistencia de la selección en localStorage
- Transiciones suaves entre templates
- Diseño minimalista que no interfiere con la visualización

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura

- `src/templates/` - Contiene los 3 templates del portafolio
- `src/components/` - Componentes reutilizables (FloatingMenu, TemplateViewer)
- `src/App.tsx` - Componente principal que maneja el estado
- `src/main.tsx` - Punto de entrada de React
