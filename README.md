# Aplicación de Gestión de Clientes y Proyectos

Dashboard de nivel empresarial para gestionar clientes y proyectos, con autenticación JWT, control de acceso basado en roles y operaciones CRUD completas.

Este proyecto es parte de mi portafolio profesional, mostrando las mejores prácticas en la construcción de aplicaciones web modernas y listas para producción.

---

## ✨ Características

### 🔐 Autenticación y Seguridad

La autenticación está completamente implementada usando JWT y control de acceso basado en roles.

**Para la implementación en producción**, la autenticación está simulada para permitir explorar la interfaz sin requerir un servicio backend. Simplemente ingresa cualquier credencial para iniciar sesión.

- Autenticación basada en JWT (simulada en producción)
- Persistencia de sesión con localStorage
- Funcionalidad de cerrar sesión
- Protección de rutas
- Control de acceso basado en roles (RBAC)
- Modo demo para previsualizaciones en vivo

### 👥 Roles y Permisos

- **Admin**
  - Acceso completo del sistema
  - Gestión de clientes (CRUD)
  - Gestión de proyectos (CRUD)
  - Dashboard con todas las métricas
  
- **Usuario**
  - Acceso limitado
  - Proyectos solo lectura
  - Sin permisos de gestión de clientes/proyectos
  - Resumen del dashboard

### 📊 Gestión de Clientes

Operaciones CRUD completas para la gestión de clientes:
- Listado de clientes con búsqueda y paginación
- Crear cliente (modal con validación de formulario)
- Editar detalles del cliente
- Eliminar cliente con confirmación
- Búsqueda por nombre y correo electrónico
- Paginación del lado del cliente
- Estados de carga y estados vacíos

### 📈 Gestión de Proyectos

Gestión completa del ciclo de vida del proyecto:
- Listado de proyectos con seguimiento de estado
- Crear proyecto (asociar con clientes)
- Editar detalles del proyecto
- Eliminar proyecto con confirmación
- Búsqueda por nombre o cliente
- Seguimiento de estado (pendiente, activo, completado)
- Relaciones con clientes
- Paginación y filtrado

### 🎨 UI / UX

- Diseño de dashboard empresarial (Navbar + Sidebar)
- Navegación React Router
- Modales y diálogos accesibles
- Diseño completamente responsivo
- Soporte de modo oscuro con alternador de tema
- Animaciones Framer Motion en toda la aplicación
- Estilos profesionales con Tailwind CSS
- Transiciones e interacciones suaves
- Indicadores de carga y estados vacíos

---

## 🧠 Stack Tecnológico

- **React 19** - Librería UI
- **TypeScript** - Seguridad de tipos
- **Vite** - Herramienta de compilación y servidor de desarrollo
- **React Router v7** - Enrutamiento
- **TanStack React Query** - Gestión del estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Axios** - Cliente HTTP
- **JWT Decode** - Análisis de tokens
- **json-server** - API REST simulada
- **json-server-auth** - Autenticación simulada
- **ESLint** - Linting de código

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un patrón de arquitectura basada en características, común en aplicaciones modernas escalables:

```
src/
├── app/
│   ├── pages/           # Componentes de página
│   ├── providers/       # Proveedores de contexto (Auth, Query, Theme)
│   ├── router/          # Definiciones de rutas y guardias
│   └── App.tsx
│
├── features/
│   ├── auth/            # Característica de autenticación
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── schema.ts
│   │   ├── types.ts
│   │   └── components/
│   ├── clients/         # Característica de clientes
│   │   ├── api.ts
│   │   ├── hooks.ts
│   │   ├── schema.ts
│   │   └── components/
│   └── projects/        # Característica de proyectos
│       ├── api.ts
│       ├── hooks.ts
│       ├── schema.ts
│       └── components/
│
├── components/
│   ├── layout/          # Componentes de layout (Navbar, Sidebar)
│   └── ui/              # Componentes UI reutilizables (Modal, ConfirmDialog)
│
├── services/            # Configuración del servicio API
├── types/               # Tipos globales de TypeScript
├── utils/               # Constantes y utilidades
└── styles/              # Estilos globales
```

**Beneficios de esta arquitectura:**
- Escalabilidad - Fácil de agregar nuevas características
- Separación de conceptos - Límites claros
- Reutilización de código - Componentes y hooks compartidos
- Mantenibilidad - Rápido para encontrar y actualizar código

---

## 🎯 Aspectos Destacados de Características

### Modo Oscuro
- Soporte completo de modo oscuro
- Persistencia de tema
- Transiciones suaves entre temas

### Animaciones
- Transiciones suaves de página
- Animaciones de entrada de componentes
- Estados de botón interactivos (hover, tap, deshabilitado)
- Indicadores de progreso y estados de carga

### Validación de Formularios
- Validación en tiempo real con Zod
- Mensajes de error claros
- Manejo de errores a nivel de campo

### Gestión de Estado
- React Query para estado del servidor
- React Context para estado de auth/theme
- Actualizaciones optimistas para mejor UX

### Diseño Responsivo
- Enfoque mobile-first
- Puntos de ruptura de Tailwind CSS
- Interacciones amigables para tacto

---

## 🔑 Credenciales de Prueba

### Cuenta Admin
- **Correo Electrónico:** admin@test.com
- **Contraseña:** admin123

### Cuenta Usuario
- **Correo Electrónico:** user@test.com  
- **Contraseña:** user123

**Nota:** En modo producción/demo, cualquier credencial funcionará para permitir explorar la interfaz completa de la aplicación.

---

## 🚀 Empezando

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/delmocss/client-project-management-app.git
cd client-project-management-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Iniciar la API simulada (en otra terminal)**
```bash
npm run server
```

### Puntos de Acceso

- **Frontend:** http://localhost:5173
- **API Simulada:** http://localhost:4000
- **Modo Demo:** https://client-project-management-app.vercel.app

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run server` - Inicia el servidor JSON simulado
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar compilación de producción
- `npm run lint` - Ejecutar ESLint

---

## 📦 Compilar para Producción

```bash
npm run build
```

La compilación de producción:
- Habilita el modo de autenticación demo (login simulado)
- Optimiza el tamaño del bundle
- Genera archivos minificados en `dist/`
- Listo para deploy

**Para la implementación en producción:**
- La autenticación funciona en modo demo sin ningún backend
- Todos los datos se almacenan en memoria (se borran al actualizar)
- Perfecto para mostrar la interfaz/experiencia de usuario

---

## 📝 Licencia

MIT

---

## 👨‍💻 Acerca De

Este proyecto demuestra prácticas de desarrollo React de nivel profesional incluyendo:
- Patrones y hooks modernos de React
- Mejores prácticas de TypeScript
- Arquitectura de componentes
- Gestión de estado
- Manejo y validación de formularios
- Enrutamiento y autenticación
- Principios de UI/UX
- Diseño responsivo

Adecuado para aplicaciones de portafolio y producción.
