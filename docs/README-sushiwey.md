# 🍣 SushiWey

**SushiWey** es una aplicación web de comercio electrónico moderna diseñada para un restaurante de sushi. Permite a los clientes explorar el menú, armar pedidos personalizados y realizar pedidos que quedan registrados en el sistema para seguimiento en tiempo real. Incluye un panel de administración completo para gestionar productos, categorías, pedidos y configuraciones del local.

![SushiWey Preview](/public/logo.svg)

## 🚀 Tecnologías Utilizadas

Este proyecto está construido con un stack moderno y eficiente:

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Lenguaje:** TypeScript
-   **Estilos:** CSS Vanilla (Variables CSS globales para un diseño consistente y performante)
-   **Base de Datos:** PostgreSQL (alojada en [Neon](https://neon.tech/))
-   **Almacenamiento de Imágenes:** [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
-   **Procesamiento de Imágenes:** [Sharp](https://sharp.pixelplumbing.com/) para conversión a WebP
-   **Mapas:** [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) + [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/)
-   **Geocoding y Autocompletado:** [Google Maps API](https://developers.google.com/maps) para autocompletado de direcciones y geocoding
-   **Iconos:** [Lucide React](https://lucide.dev/)
-   **Temas:** [next-themes](https://github.com/pacocoursey/next-themes)
-   **Despliegue:** [Vercel](https://vercel.com/)

## ✨ Características Principales

### 🛒 Experiencia del Cliente
-   **Sistema de Cuentas de Cliente:**
    -   Registro de clientes con nombre, teléfono, email y contraseña
    -   Login seguro con validación de credenciales
    -   Perfil de cliente con información personal y estadísticas
    -   **Gestión de Direcciones Mejorada:**
        -   Gestión de direcciones guardadas con etiquetas (casa, trabajo, otro)
        -   **Formulario de direcciones con campos separados:** Calle, Número, Ciudad y Departamento (opcional)
        -   **Geocoding inteligente:** Prioriza la geocodificación de la ciudad, luego intenta la dirección completa para mayor precisión
        -   **Modal de mapa mejorado:** 
            -   Estructura con dimensiones correctas (90vh) para garantizar visibilidad de botones
            -   El mapa se centra automáticamente en la ubicación geocodificada cuando está disponible
            -   Fallback a Molina, Región del Maule si el geocoding falla
            -   Indicadores de loading y mensajes de error claros
        -   **Consistencia con checkout:** Mismo formulario y estructura de modal que el proceso de checkout
        -   **Validación de campos:** Requiere Calle, Número y Ciudad antes de abrir el mapa
    -   Historial completo de pedidos del cliente
    -   Edición de perfil (nombre y email)
    -   Migración automática: clientes existentes pueden completar su registro
    -   Navegación mejorada: logo y nombre clickeables para volver al inicio
    -   Botones de retroceso en pantallas de perfil
-   **Catálogo Visual:** Productos organizados por categorías con imágenes de alta calidad
-   **Búsqueda Inteligente en Header:** 
    -   Barra de búsqueda siempre accesible en el header
    -   Búsqueda en tiempo real por nombre y descripción
    -   Búsqueda sin tildes (ej: "salmon" encuentra "salmón")
    -   Filtros por categoría integrados
    -   Estado global de búsqueda compartido entre componentes
-   **Modal de Detalles de Producto:**
    -   Al hacer clic en un producto, se abre un modal con información completa
    -   Muestra imagen, nombre, descripción, precio y botón para agregar al carrito
    -   Visualización mejorada de descripciones: detecta automáticamente listas y las muestra con formato estructurado
    -   Interfaz intuitiva y responsive
-   **Carrito de Compras (Drawer):**
    -   Interfaz deslizable no intrusiva
    -   Persistencia de datos del cliente (Nombre, Teléfono, Dirección) en el navegador
    -   Cálculo automático de totales y costo de envío
    -   **Validación de Teléfono:** Campo numérico de 9 dígitos que debe comenzar con '9'
    -   **Selección de Ubicación en Mapa:**
        -   Modal interactivo con mapa para seleccionar ubicación exacta de entrega
        -   Botón de acceso rápido al mapa junto al campo de dirección
        -   Persistencia de ubicación personalizada (customLocation) que se mantiene hasta que el usuario modifique la dirección
        -   Geocoding automático de direcciones con fallback a ubicación guardada
    -   **Autocompletado de Direcciones:**
        -   Integración con Google Places API para autocompletado inteligente de direcciones
        -   Búsqueda en tiempo real mientras el usuario escribe (debounce de 300ms)
        -   Filtrado automático para direcciones en Chile
        -   Navegación por teclado (flechas arriba/abajo, Enter, Escape)
        -   Sugerencias con iconos y formato visual claro
        -   Actualización automática de coordenadas al seleccionar una dirección
    -   **Sistema de Pedidos Completo:**
    -   Selección de método de entrega: **Delivery**, **Retiro en Local** o **Consumo en Local (Dine-in)**
    -   **Pedidos Dine-in:**
        -   Creados por garzones desde el panel de garzón
        -   Requieren número de mesa
        -   Se crean automáticamente en estado "confirmado"
        -   Estado final: "listo_consumo" cuando están listos
    -   **Geolocalización Avanzada:** 
        -   Integración con mapas interactivos (Google Maps) para confirmar la ubicación exacta de entrega
        -   Modal de mapa con instrucciones claras para el usuario
        -   Persistencia inteligente de ubicación personalizada (customLocation)
        -   El usuario puede ajustar manualmente el pin en el mapa y la ubicación se guarda de forma persistente
        -   La ubicación personalizada solo se borra cuando el usuario modifica la dirección manualmente
        -   Geocoding automático con prioridad a ubicaciones guardadas
    -   **Pedidos Registrados:** Los pedidos se guardan en la base de datos con un ID único rastreable y asociación con cliente registrado
    -   **Seguimiento en Tiempo Real:** Los clientes pueden ver el estado de su pedido en tiempo real mediante una URL única
    -   **Estados del Pedido:** 
    -   Pendiente → Confirmado → En Cocina → En Delivery/Listo Retiro/Listo Consumo → Completado
    -   Nuevo estado "listo_consumo" para pedidos dine-in
    -   **Página de Confirmación:** Mensaje de confirmación con link de seguimiento después de realizar el pedido
-   **Diseño Responsive:** Optimizado para móviles y escritorio
-   **Modo Oscuro/Claro:** Adaptable a las preferencias del sistema del usuario
-   **Animaciones Sutiles:** Transiciones suaves para una mejor experiencia de usuario

### 📦 Sistema de Pedidos

-   **Flujo del Cliente:**
    -   El cliente selecciona productos, confirma el carrito e ingresa datos de envío/retiro
    -   Al confirmar, el pedido se registra en la base de datos con un ID único (formato: `SW-YYYY-NNNNNN`)
    -   El cliente recibe una página de confirmación con un link de seguimiento
    -   Puede seguir el estado de su pedido en tiempo real en `/order/[orderId]`
    -   Actualización automática cada 5 segundos del estado del pedido
    
-   **Dashboard de Administración (`/admin/orders`):**
    -   Vista en tiempo real de pedidos mediante Server-Sent Events (SSE)
    -   Filtro por defecto: muestra solo pedidos activos (pendiente, confirmado, en_cocina, en_delivery, listo_retiro)
    -   Filtro por fecha con selector de calendario (por defecto muestra el día actual)
    -   Botón "Hoy" para volver rápidamente al día actual
    -   Pedidos pendientes destacados visualmente (borde naranja, sombra, indicador pulsante)
    -   Ordenamiento: pedidos pendientes siempre aparecen primero
    -   Vista detallada de cada pedido con toda la información del cliente y productos
    
-   **Gestión de Estados:**
    -   Estados disponibles: `pendiente`, `confirmado`, `en_cocina`, `en_delivery`, `listo_retiro`, `completado`, `cancelado`
    -   Validación de transiciones entre estados (no se puede saltar estados)
    -   Al confirmar un pedido, se puede establecer tiempo estimado de entrega
    -   Cancelación disponible en estados previos a delivery/retiro con motivo requerido
    
-   **Comunicación con Clientes:**
    -   Botón de WhatsApp en la vista detallada del pedido
    -   **Formateo automático de números:** Agrega automáticamente el código de país (+56) a números chilenos para garantizar que los mensajes se envíen correctamente
    -   Genera mensaje automático con:
        -   Saludo personalizado
        -   Estado actual del pedido
        -   Tiempo estimado (si está disponible)
        -   Detalle completo del pedido
        -   URL de seguimiento en tiempo real
    -   Mensaje adaptado según el estado del pedido
    
-   **Información de Retiro en Local:**
    -   Cuando un cliente selecciona "Retiro en Local", se muestra la dirección del local en:
        -   Página de confirmación de pedido
        -   Página de seguimiento del pedido (cliente)
        -   Vista detallada del pedido (admin)
    -   Enlace directo a Google Maps con la ubicación del local
    -   Soporte para coordenadas GPS o búsqueda por dirección
    
-   **Generación de Comanda para Cocina:**
    -   Botón "Generar Comanda" en la vista detallada del pedido (admin)
    -   Modal con vista previa del PDF antes de imprimir o descargar
    -   PDF optimizado para impresoras térmicas de 80mm de ancho
    -   Altura dinámica que se ajusta al contenido (sin espacios en blanco innecesarios)
    -   Incluye: número de pedido, fecha/hora, tipo de entrega, información del cliente, lista de productos con cantidades y notas especiales
    -   Opciones para imprimir directamente o descargar el PDF

### 🛠️ Panel de Administración (`/admin`)
-   **Sistema de Roles y Permisos:**
    -   Tres roles disponibles: `admin`, `garzon` (garzón), `cocina`
    -   Control de acceso basado en roles: cada rol tiene acceso solo a sus pantallas correspondientes
    -   Redirección automática según rol al iniciar sesión
    -   Gestión de usuarios con asignación de roles desde el panel de administración
    -   Protección de rutas a nivel de layout y middleware
-   **Autenticación:** Sistema de login/logout seguro con bcrypt y cookies httpOnly
-   **Gestión de Usuarios (`/admin/users`):**
    -   Lista completa de usuarios del sistema
    -   Crear nuevos usuarios con email, contraseña y rol
    -   Editar rol de usuarios existentes
    -   Eliminar usuarios (solo administradores)
    -   Visualización de fecha de creación de cada usuario
-   **Gestión de Productos:**
    -   Crear, editar y eliminar productos del menú
    -   Toggle de disponibilidad de productos (inline)
    -   Búsqueda por texto (nombre y descripción)
    -   Filtros por categoría y disponibilidad (alineados horizontalmente en desktop)
    -   Vista responsive: tabla en desktop, cards en móvil
    -   Header con título y botón "Nuevo Producto" en la misma fila
    -   Redirección correcta: formulario de producto redirige a `/admin/products` al cancelar
    -   Validaciones client-side y server-side
    -   Notificaciones Toast para feedback inmediato
    -   **Descripciones Mejoradas:**
        -   Soporte para listas estructuradas de ingredientes o productos
        -   Detección automática de formato de lista (líneas que comienzan con `-`, `*`, números)
        -   Visualización mejorada: listas se muestran como elementos `<ul>` con mejor formato
        -   Compatibilidad hacia atrás: productos existentes con texto libre siguen funcionando
        -   Input mejorado con placeholder y ayuda sobre formato de lista
-   **Gestión de Categorías:** CRUD completo para categorías de productos
    -   Validación: no eliminar si hay productos asociados
    -   Integración dinámica en formularios
    -   Botón de cancelar en modo edición (icono X, tamaño cuadrado)
    -   Formulario responsive con acciones alineadas
-   **Gestión de Pedidos (Dashboard):**
    -   Vista en tiempo real de todos los pedidos activos
    -   Filtros por estado (Activos, Pendientes, Confirmados, En Cocina, En Delivery, Listo Retiro, Completados, Cancelados)
    -   Filtros horizontales con scroll en móvil y botones de navegación izquierda/derecha
    -   Filtro por fecha con selector de calendario (formato DD/MM/YYYY) y botón "Hoy"
    -   Botón de actualizar alineado a la derecha, icono en móvil, texto completo en desktop
    -   Botones de acción compactos en móvil (44x44px), expandidos en desktop
    -   Pedidos pendientes destacados visualmente (borde naranja, sombra, indicador pulsante)
    -   Ordenamiento automático: pedidos pendientes siempre primero
    -   Actualizaciones en tiempo real mediante Server-Sent Events (SSE)
    -   Vista detallada de cada pedido con toda la información del cliente
    -   Gestión de estados del pedido con validación de transiciones
    -   Cancelación de pedidos con motivo requerido
    -   Tiempo estimado de entrega al confirmar pedidos
    -   Botón de WhatsApp para enviar mensajes automáticos a clientes con estado del pedido y link de seguimiento
-   **Historial de Pedidos (`/admin/orders/history`):**
    -   Pantalla dedicada para consultar el historial completo de pedidos
    -   Filtros flexibles por período:
        -   **Día:** Seleccionar una fecha específica
        -   **Semana:** Mostrar pedidos de lunes a domingo de la semana seleccionada
        -   **Mes:** Mostrar todos los pedidos del mes seleccionado
    -   Resumen estadístico del período:
        -   Total de pedidos
        -   Pedidos completados
        -   Pedidos cancelados
        -   Ingresos totales
    -   Lista completa de pedidos ordenada por fecha (más recientes primero)
    -   Enlaces directos a la vista detallada de cada pedido
    -   Filtrado eficiente en base de datos usando zona horaria de Chile
-   **Gestión de Clientes (`/admin/customers`):**
    -   Lista completa de clientes registrados con información detallada
    -   Búsqueda en tiempo real con debounce (500ms) por nombre, teléfono o email
    -   Filtros de ordenamiento: Nombre, Fecha de registro, Total de pedidos, Total gastado
    -   Estadísticas por cliente: total de pedidos, total gastado, fecha del último pedido
    -   Historial de compras expandible por cliente con detalles completos de cada pedido
    -   Skeleton loader durante la carga para mejor UX
    -   Interfaz responsive y optimizada
-   **Panel de Estadísticas (`/admin/stats`):**
    -   Dashboard completo de estadísticas del negocio
    -   Gráficos separados por métrica para mejor legibilidad:
        -   Ingresos por Período (línea naranja)
        -   Cantidad de Pedidos por Período (línea azul)
        -   Productos por Ingresos (barras azules)
        -   Productos por Cantidad Vendida (barras naranjas)
        -   Ingresos por Hora del Día (barras azules)
        -   Pedidos por Hora del Día (barras naranjas)
    -   Cards de estadísticas con íconos alineados abajo a la derecha
    -   Selector de período: Hoy, Semana, Mes, Año, Personalizado
    -   Exportación de reportes en PDF y Excel
    -   Zona horaria de Chile (America/Santiago) para todas las métricas
    -   Colores del logo: naranjo y azul (#00a8c1)
-   **Configuración del Local:** 
    -   Formulario mejorado con validaciones en tiempo real
    -   Actualizar número de WhatsApp, dirección, horarios de atención y costo de envío
    -   Guardado persistente con feedback inmediato
    -   Validaciones client-side y server-side
-   **Interfaz Mejorada:** 
    -   Header consistente con la web del cliente
    -   Navegación responsive: sidebar drawer en móvil, sidebar fijo en desktop
    -   Menú hamburguesa en móvil con overlay y z-index optimizado
    -   Navegación activa en sidebar con indicadores visuales
    -   Formularios con espaciado adecuado y layout responsive
    -   Loading states en todas las operaciones
    -   Modales de confirmación para acciones destructivas
    -   Breakpoints responsive: sm (640px), md (768px), lg (1024px)
-   **Sistema de Notificaciones:** Toast notifications para todas las acciones (crear, editar, eliminar)

### 👨‍🍳 Panel de Garzón (`/waiter`)
-   **Pantalla de Toma de Pedidos:**
    -   Catálogo completo de productos disponibles
    -   Búsqueda en tiempo real por nombre o descripción
    -   Filtros por categoría
    -   Carrito de compras integrado
    -   Formulario simplificado para pedidos dine-in:
        -   Número de mesa (obligatorio)
        -   Comentarios especiales (opcional)
    -   Los pedidos se crean automáticamente en estado "confirmado" y tipo "dine_in"
    -   Diseño responsive optimizado para tablets y móviles
-   **Gestión de Pedidos del Garzón:**
    -   Lista de todos los pedidos creados por el garzón
    -   Filtros por estado (confirmado, en cocina, listo consumo, completado)
    -   Indicador visual de alertas de cocina (badge rojo con número)
    -   Vista detallada de cada pedido
    -   **Agregar productos a pedidos existentes:**
        -   Posibilidad de agregar más productos a un pedido ya creado
        -   Actualización automática de totales
        -   Útil cuando el cliente quiere agregar algo más
    -   Actualización automática cada 10 segundos sin interrumpir la visualización
    -   Sistema de alertas: notificación cuando cocina necesita atención del garzón
-   **Navegación:**
    -   Menú de navegación entre "Nuevo Pedido" y "Mis Pedidos"
    -   Badge de alertas en la pestaña "Mis Pedidos" cuando hay alertas pendientes
    -   Interfaz consistente con el panel de administración

### 🍳 Panel de Cocina (`/kitchen`)
-   **Vista de Pedidos del Día:**
    -   Muestra todos los pedidos confirmados del día actual
    -   Incluye pedidos de tipo: delivery, pickup y dine_in
    -   Muestra pedidos en estado "confirmado" y "en_cocina"
    -   Actualización automática cada 10 segundos sin interrumpir la visualización
    -   Filtro por fecha para ver pedidos de otros días
-   **Gestión de Estados:**
    -   Cambio de estado de pedidos directamente desde la pantalla
    -   Transiciones válidas: confirmado → en_cocina → listo_para_delivery/retiro/consumo
    -   Validación de transiciones de estado
    -   Estados específicos según tipo de pedido:
        -   Delivery: listo_para_delivery
        -   Pickup: listo_retiro
        -   Dine-in: listo_consumo
-   **Impresión de Comandas:**
    -   Botón para imprimir comanda de cada pedido
    -   PDF optimizado para impresoras térmicas (80mm)
    -   Incluye información específica según tipo:
        -   Dine-in: muestra número de mesa
        -   Delivery/Pickup: muestra tipo de entrega
    -   Vista previa antes de imprimir
    -   Opciones de impresión directa o descarga
-   **Sistema de Alertas:**
    -   Botón para alertar al garzón cuando hay cambios o problemas
    -   El garzón recibe notificación visual (badge rojo)
    -   La alerta se limpia automáticamente cuando el garzón revisa el pedido
    -   Comunicación bidireccional entre cocina y garzón
-   **Información de Pedidos:**
    -   Muestra número de pedido, mesa (si aplica), cliente y productos
    -   Resaltado visual de pedidos con alertas
    -   Diseño optimizado para pantallas táctiles

### 🎨 Características de UX/UI
-   **Sistema de Notificaciones Toast:** Feedback inmediato para todas las acciones
-   **Loading States:** Indicadores de carga en botones y formularios
-   **Validaciones Client-Side:** Feedback inmediato con mensajes inline
-   **Animaciones:** Transiciones suaves en modales, drawer y elementos interactivos
-   **Diseño Responsive Mobile-First:**
    -   **Web del Cliente:**
        -   Búsqueda móvil: Modal que cubre solo el header (no toda la pantalla)
        -   Header responsive con logo y navegación adaptativa
        -   Catálogo optimizado para pantallas táctiles
        -   Carrito drawer optimizado para móvil
    -   **Panel de Administración:**
        -   Sidebar responsive: Drawer deslizable en móvil, sidebar fijo en desktop
        -   Menú hamburguesa en móvil con overlay
        -   Tablas adaptativas: Vista de tarjetas (cards) en móvil, tabla en desktop
        -   Formularios responsive con campos apilados en móvil
        -   Botones con tamaño mínimo de 44x44px para touch targets
        -   Filtros horizontales con scroll en móvil
        -   Dashboard de pedidos optimizado para móvil con filtros compactos
        -   Selector de fecha con formato DD/MM/YYYY
        -   Botones de acción con iconos en móvil, texto completo en desktop
-   **Accesibilidad:** 
    -   ARIA labels en elementos interactivos
    -   Navegación por teclado mejorada
    -   Focus visible en todos los elementos
    -   Touch targets mínimos de 44x44px
-   **Optimización de Imágenes:** 
    -   Lazy loading y optimización automática con next/image
    -   Conversión automática a WebP para reducir tamaño de archivo
    -   Validación y procesamiento de imágenes en servidor
    -   Gestión automática de almacenamiento en Vercel Blob Storage

## ⚙️ Configuración e Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/sushiwey.git
    cd sushiwey
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

    ```env
    # Conexión a Base de Datos (Neon PostgreSQL)
    DATABASE_URL="postgres://usuario:password@host:port/database?sslmode=require"
    
    # Token de Vercel Blob Storage (para subida de imágenes de productos)
    # Obtén tu token en: https://vercel.com/dashboard/stores
    BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    
    # Google Maps API
    # Obtén tu API key en: https://console.cloud.google.com/google/maps-apis
    # Requiere habilitar: Maps JavaScript API, Places API y Geocoding API
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="tu_api_key_de_google_maps"
    ```
    
    **Nota sobre BLOB_READ_WRITE_TOKEN:**
    - Ve a tu [Dashboard de Vercel](https://vercel.com/dashboard/stores)
    - Crea un nuevo Blob Store o selecciona uno existente
    - Copia el token de lectura/escritura y pégalo en `.env.local`
    - Este token es necesario para subir y gestionar imágenes de productos
    
    **Nota sobre NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:**
    - Google Maps ofrece un plan gratuito con $200 USD de crédito mensual
    - Esta API key es necesaria para el autocompletado de direcciones, geocoding y los mapas
    - Puedes obtener tu API key en: https://console.cloud.google.com/google/maps-apis
    - **APIs requeridas:** Debes habilitar las siguientes APIs en Google Cloud Console:
        - Maps JavaScript API (para los mapas interactivos)
        - Places API (para autocompletado de direcciones)
        - Geocoding API (para convertir direcciones en coordenadas)
    - Google Maps ofrece mejor cobertura en zonas rurales de Chile que otras alternativas

4.  **Inicializar la Base de Datos:**
    Ejecuta el script de seed para crear las tablas y datos iniciales:
    ```bash
    node scripts/seed.js
    ```
    Esto creará:
    - Tablas: `products`, `store_info`, `users`, `categories`
    - Usuario admin por defecto: `admin@sushiwey.com` / `admin123`
    - Categorías iniciales: Rolls, Tempura, Vegetariano, Bebidas
    - Productos de ejemplo
    
    **Importante:** Para habilitar el sistema de pedidos, también debes ejecutar la migración de pedidos:
    ```bash
    npm run migrate:orders
    ```
    Esto creará las tablas `orders` y `order_items` necesarias para el sistema de pedidos.
    
    **Para habilitar el sistema de clientes:**
    ```bash
    npm run migrate:customers
    ```
    Esto creará las tablas `customers` y `customer_addresses` necesarias para el sistema de cuentas de clientes.
    
    **Opcional - Migrar clientes existentes:**
    Si ya tienes pedidos en el sistema, puedes migrar los datos de clientes existentes:
    ```bash
    npm run migrate:existing-customers
    ```
    Esto asociará los pedidos existentes con los nuevos registros de clientes.

5.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
sushiwey/
├── app/
│   ├── admin/              # Rutas del panel de administración
│   │   ├── categories/     # Gestión de categorías
│   │   ├── customers/      # Gestión de clientes
│   │   ├── edit/[id]/      # Edición de productos
│   │   ├── login/          # Página de autenticación
│   │   ├── new/            # Creación de productos
│   │   ├── orders/         # Dashboard de pedidos
│   │   │   ├── [orderId]/  # Vista detallada de pedido
│   │   │   └── history/   # Historial de pedidos con filtros
│   │   ├── settings/        # Configuración del local
│   │   ├── stats/          # Panel de estadísticas
│   │   ├── users/          # Gestión de usuarios y roles
│   │   ├── layout.tsx      # Layout del admin con sidebar y protección de roles
│   │   └── page.tsx        # Redirección según rol
│   ├── waiter/             # Rutas del panel de garzón
│   │   ├── orders/         # Lista de pedidos del garzón
│   │   │   ├── [orderId]/  # Vista detallada y agregar productos
│   │   │   └── page.tsx    # Lista de pedidos
│   │   ├── layout.tsx      # Layout del garzón con navegación
│   │   └── page.tsx        # Pantalla de toma de pedidos
│   ├── kitchen/            # Rutas del panel de cocina
│   │   ├── layout.tsx      # Layout de cocina
│   │   └── page.tsx        # Vista de pedidos del día
│   ├── api/
│   │   ├── kitchen-order/
│   │   │   └── generate/  # Endpoint para generar comanda PDF
│   │   ├── orders/
│   │   │   └── stream/     # Endpoint SSE para actualizaciones en tiempo real
│   │   ├── store-settings/ # Endpoint para obtener configuración del local
│   │   └── waiter/
│   │       └── alerts/     # Endpoint para obtener conteo de alertas del garzón
│   ├── order/              # Rutas del cliente
│   │   ├── [orderId]/      # Página de seguimiento de pedido
│   │   └── confirm/[orderId]/ # Página de confirmación de pedido
│   ├── profile/            # Rutas del perfil de cliente
│   │   ├── addresses/      # Gestión de direcciones
│   │   ├── edit/           # Edición de perfil
│   │   ├── orders/         # Historial de pedidos
│   │   └── page.tsx        # Dashboard del perfil
│   ├── login/              # Página de login de cliente
│   ├── register/           # Página de registro de cliente
│   ├── globals.css         # Estilos globales y variables CSS
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio (Catálogo)
├── components/             # Componentes reutilizables
│   ├── stats/              # Componentes de estadísticas
│   │   ├── OrderStatsCards.tsx    # Cards de estadísticas
│   │   ├── PeriodSelector.tsx     # Selector de período
│   │   ├── RevenueChart.tsx       # Gráfico de ingresos
│   │   ├── TimeAnalyticsChart.tsx # Gráfico de análisis temporal
│   │   └── TopProductsChart.tsx   # Gráfico de productos top
│   ├── AdminHeader.tsx     # Header del panel admin
│   ├── AdminSidebar.tsx    # Sidebar del admin con filtrado por roles
│   ├── CartDrawer.tsx      # Lógica del carrito y checkout con validaciones y mapa
│   ├── CategoryForm.tsx    # Formulario de categorías
│   ├── CategoryList.tsx    # Listado de categorías
│   ├── ConditionalHeader.tsx # Header condicional (oculto en admin/waiter/kitchen)
│   ├── ConfirmModal.tsx   # Modal de confirmación
│   ├── Header.tsx         # Barra de navegación principal con búsqueda integrada
│   ├── Map.tsx             # Componente de mapa (Google Maps)
│   ├── OrderActions.tsx    # Botones de acción para pedidos (cambiar estado, cancelar, WhatsApp)
│   ├── OrdersList.tsx      # Listado de pedidos en dashboard
│   ├── OrderStatusBadge.tsx # Badge de estado de pedido
│   ├── ProductCard.tsx    # Tarjeta de producto individual con modal de detalles
│   ├── ProductCatalog.tsx  # Catálogo con búsqueda integrada
│   ├── ProductForm.tsx    # Formulario de productos
│   ├── ProductGrid.tsx    # Grilla de productos por categoría
│   ├── ProductList.tsx    # Listado de productos (admin)
│   ├── ProductModal.tsx   # Modal de detalles de producto con soporte para listas
│   ├── KitchenOrderPreviewModal.tsx # Modal de vista previa de comanda PDF
│   ├── SettingsForm.tsx   # Formulario de configuración con validaciones
│   ├── ThemeProvider.tsx  # Proveedor de tema
│   ├── ThemeToggle.tsx    # Toggle de tema oscuro/claro
│   ├── Toast.tsx           # Componente de notificación Toast
│   ├── ToastContainer.tsx  # Contenedor de notificaciones
│   ├── ToggleAvailability.tsx # Toggle de disponibilidad
│   └── WaiterNavigation.tsx # Navegación del garzón con indicador de alertas
├── context/
│   ├── CartContext.tsx     # Contexto del carrito de compras
│   ├── SearchContext.tsx   # Contexto global de búsqueda
│   └── ToastContext.tsx    # Contexto de notificaciones Toast
├── lib/                    # Utilidades y lógica de servidor
│   ├── actions.ts          # Server Actions para productos
│   ├── auth.ts             # Funciones de autenticación admin con sistema de roles
│   ├── auth-actions.ts     # Server Actions de autenticación admin
│   ├── category-actions.ts # Server Actions para categorías
│   ├── customer-actions.ts # Server Actions para clientes (perfil, direcciones, admin)
│   ├── customer-auth.ts    # Funciones de autenticación de clientes
│   ├── customer-auth-actions.ts # Server Actions de autenticación de clientes
│   ├── address-actions.ts  # Server Actions para direcciones de clientes
│   ├── db.js               # Conexión a base de datos (con parser de fechas UTC)
│   ├── image-actions.ts    # Server Actions para subida y eliminación de imágenes
│   ├── image-converter.ts  # Utilidades para conversión de imágenes a WebP
│   ├── image-utils.ts      # Utilidades de validación y procesamiento de imágenes (servidor)
│   ├── image-utils-client.ts # Utilidades de validación de imágenes (cliente)
│   ├── kitchen-actions.ts  # Server Actions para cocina (obtener pedidos, cambiar estados, alertar)
│   ├── order-actions.ts    # Server Actions para pedidos
│   ├── order-utils.ts      # Utilidades de pedidos (generación de IDs, formateo de estados, zona horaria)
│   ├── kitchen-order-generator.ts # Generación de PDF de comanda para impresoras térmicas
│   ├── product-actions.ts  # Server Actions para obtener productos disponibles
│   ├── product-description-utils.ts # Utilidades para detectar y parsear listas en descripciones
│   ├── report-generator.ts # Generación de reportes PDF y Excel
│   ├── stats-actions.ts    # Server Actions para estadísticas
│   ├── settings-actions.ts # Server Actions para configuración
│   ├── store-settings.ts   # Helper para configuración del local
│   ├── user-actions.ts     # Server Actions para gestión de usuarios (CRUD con roles)
│   └── waiter-actions.ts   # Server Actions para garzón (crear pedidos dine-in, obtener pedidos, alertas)
├── scripts/
│   ├── migrations/         # Scripts SQL de migración
│   │   ├── add_roles_and_dine_in.sql # Migración para roles y pedidos dine-in
│   │   ├── create_customers_tables.sql # Migración de tablas de clientes
│   │   └── create_orders_tables.sql # Migración de tablas de pedidos
│   ├── migrate-customers.js        # Migración de tablas de clientes
│   ├── migrate-existing-customers.js # Migración de clientes existentes
│   ├── migrate-orders.js   # Migración de tablas de pedidos
│   ├── migrate-store-settings.js # Migración de configuración del local
│   ├── seed.js             # Script de inicialización de BD
│   └── test-connection.js  # Script de prueba de conexión
├── middleware.ts           # Middleware de protección de rutas
├── public/                 # Archivos estáticos (imágenes, logos)
└── types/                  # Definiciones de tipos TypeScript
```

## 📝 Notas de Desarrollo

-   **Estilos:** Se prioriza el uso de variables CSS (`var(--color-primary)`, `var(--radius-md)`) definidas en `globals.css` para mantener la coherencia visual y facilitar cambios de tema.

-   **Gestión de Imágenes:**
    -   Las imágenes se validan tanto en cliente como en servidor para seguridad
    -   El tamaño máximo permitido es 5MB antes de la conversión
    -   Todas las imágenes se convierten automáticamente a WebP para optimización
    -   Las imágenes antiguas se eliminan automáticamente al actualizar o eliminar productos
    -   Solo se almacenan imágenes de Vercel Blob Storage (las URLs externas no se eliminan)
    -   El límite de body size para Server Actions está configurado en 10MB en `next.config.ts`

-   **Gestión de Imágenes:**
    -   Las imágenes se validan tanto en cliente como en servidor para seguridad
    -   El tamaño máximo permitido es 5MB antes de la conversión
    -   Todas las imágenes se convierten automáticamente a WebP para optimización
    -   Las imágenes antiguas se eliminan automáticamente al actualizar o eliminar productos
    -   Solo se almacenan imágenes de Vercel Blob Storage (las URLs externas no se eliminan)
-   **Mapas:** 
    -   El componente `Map` se carga dinámicamente (`next/dynamic`) con `ssr: false` para evitar errores de hidratación, ya que Google Maps depende del objeto `window`.
    -   Sistema de persistencia de ubicación personalizada (`customLocation`) que permite al usuario ajustar manualmente el pin en el mapa.
    -   La ubicación personalizada se mantiene hasta que el usuario modifique la dirección manualmente.
    -   Geocoding automático con prioridad a ubicaciones guardadas para evitar llamadas innecesarias a la API.
    -   **Formulario de direcciones:** 
        -   Campos separados: Calle, Número, Ciudad y Departamento (opcional)
        -   Geocoding inteligente que prioriza la ciudad, luego la dirección completa
        -   Geocoding automático cuando el usuario ingresa una dirección, con debounce de 1 segundo
        -   El mapa se abre en un modal dedicado con dimensiones correctas (90vh) y botones siempre visibles
        -   Fallback a Molina, Región del Maule si el geocoding falla
        -   Misma estructura y funcionalidad que el formulario de checkout
-   **Autocompletado de Direcciones:**
    -   Integración con Google Places API para autocompletado inteligente de direcciones en tiempo real.
    -   El componente `AddressAutocomplete` implementa debounce (300ms) para optimizar las llamadas a la API.
    -   Filtrado automático para direcciones en Chile (`filter=countrycode:cl`).
    -   Navegación completa por teclado (flechas, Enter, Escape) para mejor accesibilidad.
    -   Actualización automática de coordenadas al seleccionar una dirección de las sugerencias.
    -   Manejo de errores y estados de carga para mejor UX.
-   **Persistencia:** 
    -   La información del cliente se guarda en `localStorage` para mejorar la experiencia de usuario en visitas recurrentes.
    -   Sistema inteligente de diferenciación entre cambios programáticos (desde localStorage) y cambios del usuario (typing) para evitar borrados accidentales de ubicación personalizada.
-   **Autenticación y Roles:** Sistema custom con bcrypt para hash de contraseñas y cookies httpOnly para sesiones. Sistema de roles (admin, garzon, cocina) con control de acceso basado en roles. El middleware protege las rutas `/admin/*`, `/waiter/*` y `/kitchen/*` (excepto `/admin/login`). Redirección automática según rol al iniciar sesión.
-   **Server Actions:** Se utilizan Server Actions de Next.js para todas las mutaciones de datos (crear, actualizar, eliminar).
-   **Base de Datos:** PostgreSQL con pool de conexiones. Las tablas se crean automáticamente al ejecutar `scripts/seed.js`, `npm run migrate:orders` y `npm run migrate:customers`.
-   **Zona Horaria:** Todas las fechas se manejan en zona horaria de Chile (America/Santiago) para mostrar correctamente las horas y fechas de los pedidos.
-   **Tiempo Real:** Sistema de actualizaciones en tiempo real mediante Server-Sent Events (SSE) para el dashboard de pedidos y seguimiento de pedidos.
-   **Notificaciones:** Sistema de Toast notifications para feedback inmediato en todas las acciones del admin.
-   **Validaciones:** Validaciones client-side y server-side para mejor UX y seguridad.
-   **Accesibilidad:** ARIA labels, focus visible y navegación por teclado mejorada.

## 🚀 Despliegue

El proyecto está optimizado para desplegarse en **Vercel**:

1.  **Preparar el build:**
    ```bash
    npm run build
    ```
    Verifica que el build se complete sin errores.

2.  **Subir código a GitHub:**
    ```bash
    git add .
    git commit -m "Preparar para despliegue"
    git push
    ```

3.  **Configurar en Vercel:**
    - Importa el repositorio en Vercel.
    - Configura la variable de entorno `DATABASE_URL` en el panel de Vercel.
    - Asegúrate de que el build command sea `npm run build` (por defecto).
    - El start command será `npm start` (por defecto).

4.  **Inicializar Base de Datos:**
    Después del primer despliegue, ejecuta los scripts de inicialización:
    ```bash
    node scripts/seed.js
    npm run migrate:orders
    ```
    O ejecuta las queries SQL manualmente desde el panel de Neon.

5.  **¡Despliega!**
    Vercel detectará automáticamente los cambios y desplegará la aplicación.

### Variables de Entorno Requeridas

-   `DATABASE_URL`: Cadena de conexión a PostgreSQL (formato: `postgres://usuario:password@host:port/database?sslmode=require`)
-   `BLOB_READ_WRITE_TOKEN`: Token de Vercel Blob Storage para gestión de imágenes
-   `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: API key de Google Maps para autocompletado de direcciones, geocoding y mapas (requerido)

### Credenciales por Defecto

Después de ejecutar `scripts/seed.js`, puedes iniciar sesión en el admin con:
-   **Email:** `admin@sushiwey.com`
-   **Contraseña:** `admin123`

⚠️ **Importante:** Cambia estas credenciales en producción.

## 🧪 Testing

Para verificar que la conexión a la base de datos funciona correctamente:

```bash
node scripts/test-connection.js
```

Este script verificará:
- La conexión a la base de datos
- La existencia de las tablas
- Una query de prueba

## 📜 Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo
-   `npm run build`: Genera el build de producción
-   `npm run start`: Inicia el servidor de producción
-   `npm run seed`: Ejecuta el script de inicialización de la base de datos (productos, categorías, usuarios)
-   `npm run migrate:orders`: Ejecuta la migración para crear las tablas de pedidos (`orders` y `order_items`)
-   `npm run migrate:customers`: Ejecuta la migración para crear las tablas de clientes (`customers` y `customer_addresses`)
-   `npm run migrate:existing-customers`: Migra clientes existentes desde pedidos a la nueva tabla de clientes
-   **Migración de roles y dine-in:** Ejecuta manualmente el SQL en `scripts/migrations/add_roles_and_dine_in.sql` para habilitar roles y pedidos dine-in

## 📋 Funcionalidades Implementadas

### ✅ Completadas
- [x] Sistema de autenticación completo
- [x] CRUD de productos
- [x] CRUD de categorías
- [x] Configuración del local
- [x] Carrito de compras con persistencia
- [x] Checkout con opciones Delivery/Retiro
- [x] **Sistema de Pedidos Completo:**
    - [x] Guardar pedidos en base de datos con ID único rastreable
    - [x] Dashboard de pedidos en tiempo real para administradores
    - [x] Gestión de estados de pedidos (Pendiente, Confirmado, En Cocina, En Delivery, Listo Retiro, Completado, Cancelado)
    - [x] Seguimiento de pedidos en tiempo real para clientes
    - [x] Filtros por estado y fecha en dashboard
    - [x] Cancelación de pedidos con motivo
    - [x] Tiempo estimado de entrega
    - [x] Integración con WhatsApp para notificar a clientes
    - [x] Formateo automático de números de teléfono con código de país (+56)
    - [x] Zona horaria de Chile para fechas y horas
- [x] Integración con WhatsApp
- [x] **Historial de Pedidos:**
    - [x] Pantalla dedicada de historial (`/admin/orders/history`)
    - [x] Filtros por día, semana y mes
    - [x] Resumen estadístico del período seleccionado
    - [x] Filtrado eficiente en base de datos con zona horaria de Chile
- [x] **Geolocalización Avanzada con Mapas:**
    - [x] Modal interactivo de mapa para selección de ubicación
    - [x] Persistencia de ubicación personalizada (customLocation)
    - [x] Botón de acceso rápido al mapa
    - [x] Geocoding inteligente con prioridad a ubicaciones guardadas y fallback a Molina
    - [x] Formulario de direcciones con campos separados (igual que checkout)
- [x] **Autocompletado de Direcciones:**
    - [x] Integración con Google Places API para autocompletado en tiempo real
    - [x] Búsqueda con debounce y filtrado para Chile
    - [x] Navegación por teclado completa
    - [x] Actualización automática de coordenadas
- [x] **Búsqueda Mejorada:**
    - [x] Barra de búsqueda siempre accesible en el header
    - [x] Búsqueda en tiempo real (sin tildes)
    - [x] Estado global de búsqueda compartido
- [x] **Modal de Detalles de Producto:**
    - [x] Vista completa de producto con imagen, descripción y precio
    - [x] Botón de agregar al carrito desde el modal
- [x] **Validaciones de Formulario:**
    - [x] Validación de teléfono (9 dígitos comenzando con 9)
    - [x] Validaciones en tiempo real en formulario de configuración
- [x] Sistema de notificaciones Toast
- [x] Loading states en formularios
- [x] Validaciones client-side y server-side
- [x] Modo oscuro/claro
- [x] Animaciones y transiciones
- [x] Mejoras de accesibilidad
- [x] **Diseño Responsive Mobile-First:**
    - [x] Búsqueda móvil optimizada (modal solo en header)
    - [x] Sidebar responsive con drawer en móvil
    - [x] Tablas adaptativas (cards en móvil, tabla en desktop)
    - [x] Formularios responsive con campos apilados en móvil
    - [x] Dashboard de pedidos optimizado para móvil
    - [x] Filtros horizontales con scroll en móvil
    - [x] Botones con touch targets mínimos (44x44px)
    - [x] Selector de fecha con formato DD/MM/YYYY
    - [x] Header de productos con título y botón en misma fila
    - [x] Botón de cancelar en edición de categorías
    - [x] Scroll en formularios de login y registro
    - [x] Padding correcto en formularios de autenticación
    - [x] Botones de retroceso en pantallas de perfil
- [x] **Sistema de Usuarios Cliente:**
    - [x] Registro de clientes con validación
    - [x] Login seguro de clientes
    - [x] Perfil de cliente con estadísticas
    - [x] **Gestión de direcciones mejorada:**
        - [x] Formulario de direcciones con campos separados (Calle, Número, Ciudad, Departamento)
        - [x] Geocoding inteligente que prioriza ciudad y luego dirección completa
        - [x] Modal de mapa con dimensiones correctas y botones siempre visibles
        - [x] Fallback a Molina si el geocoding falla
        - [x] Consistencia completa con el formulario de checkout
    - [x] Historial completo de pedidos del cliente
    - [x] Edición de perfil (nombre y email)
    - [x] Migración de clientes existentes
    - [x] Asociación de pedidos con clientes registrados
- [x] **Panel de Estadísticas:**
    - [x] Dashboard completo de estadísticas
    - [x] Gráficos separados por métrica (ingresos y pedidos)
    - [x] Productos más vendidos (por ingresos y cantidad)
    - [x] Análisis por hora del día
    - [x] Cards de estadísticas con íconos
    - [x] Selector de período (Hoy, Semana, Mes, Año, Personalizado)
    - [x] Exportación de reportes en PDF y Excel
    - [x] Zona horaria de Chile para todas las métricas
    - [x] Colores del logo (naranjo y azul)
- [x] **Gestión de Clientes en Admin:**
    - [x] Lista completa de clientes
    - [x] Búsqueda con debounce por nombre, teléfono o email
    - [x] Filtros de ordenamiento múltiples
    - [x] Estadísticas por cliente
    - [x] Historial de compras expandible
    - [x] Skeleton loader durante carga
- [x] **Información de Retiro en Local:**
    - [x] Dirección del local mostrada en confirmación de pedido
    - [x] Dirección del local en página de seguimiento (cliente)
    - [x] Dirección del local en vista detallada (admin)
    - [x] Enlace a Google Maps con ubicación del local
- [x] **Generación de Comanda para Cocina:**
    - [x] Botón para generar comanda en vista detallada del pedido
    - [x] Modal con vista previa del PDF
    - [x] PDF optimizado para impresoras térmicas (80mm de ancho)
    - [x] Altura dinámica según contenido
    - [x] Opciones de impresión y descarga
- [x] **Mejoras en Descripciones de Productos:**
    - [x] Soporte para listas estructuradas de ingredientes/productos
    - [x] Detección automática de formato de lista
    - [x] Visualización mejorada en modal de producto
    - [x] Input mejorado con ayuda y placeholder
    - [x] Compatibilidad hacia atrás con productos existentes
- [x] **Sistema de Roles y Permisos:**
    - [x] Tres roles: admin, garzon, cocina
    - [x] Control de acceso basado en roles
    - [x] Redirección automática según rol
    - [x] Gestión de usuarios desde panel admin
- [x] **Panel de Garzón:**
    - [x] Pantalla de toma de pedidos dine-in
    - [x] Catálogo de productos con búsqueda y filtros
    - [x] Gestión de pedidos del garzón
    - [x] Agregar productos a pedidos existentes
    - [x] Sistema de alertas de cocina
    - [x] Diseño responsive para móvil
    - [x] Indicador de alertas en navegación
- [x] **Panel de Cocina:**
    - [x] Vista de pedidos del día (confirmado y en_cocina)
    - [x] Cambio de estados de pedidos
    - [x] Impresión de comandas con número de mesa
    - [x] Sistema de alertas para garzones
    - [x] Actualización automática sin interrupciones
    - [x] Soporte para pedidos delivery, pickup y dine-in
- [x] **Pedidos Dine-in:**
    - [x] Tipo de pedido "dine_in"
    - [x] Campo de número de mesa
    - [x] Estado "listo_consumo"
    - [x] Asociación con garzón (waiter_id)
    - [x] Integración en comandas de cocina

## 🎯 Próximas Mejoras

Estas son ideas para considerar en el futuro:

1. **Notificaciones Push:**
   - Notificaciones en tiempo real para clientes sobre el estado de sus pedidos
   - Notificaciones para administradores sobre nuevos pedidos

2. **Sistema de Cupones y Descuentos:**
   - Generación de cupones
   - Aplicación de descuentos en pedidos
   - Promociones por período

---

Desarrollado con ❤️ para SushiWey.
