# Client / Project Management App

Dashboard web tipo empresa para la gestión de clientes, con autenticación, control de acceso por roles y CRUD completo.

Este proyecto forma parte de mi portafolio profesional, enfocado a mostrar cómo se construye una aplicación real de gestión interna (dashboard).

---

## ✨ Funcionalidades

### 🔐 Autenticación y seguridad

- Login con JWT (mock)
- Persistencia de sesión
- Logout
- Protección de rutas
- Control de acceso por roles

### 👥 Roles

- **Admin**
  - Acceso completo
  - Gestión de clientes (CRUD)
- **User**
  - Acceso limitado
  - Sin permisos sobre clientes

### 📋 Gestión de clientes (CRUD completo)

- Listado de clientes
- Crear cliente (modal + formulario validado)
- Editar cliente (reutilizando formulario)
- Eliminar cliente con confirmación
- Búsqueda por nombre y email
- Paginación client-side
- Estados de loading y empty states

### 🧱 UI / UX

- Layout tipo dashboard (Navbar + Sidebar)
- Navegación con React Router
- Modales accesibles
- Diseño responsive
- UX orientada a aplicaciones empresariales

---

## 🧠 Stack tecnológico

- **React**
- **TypeScript**
- **Vite**
- **React Router**
- **@tanstack/react-query**
- **React Hook Form**
- **Zod**
- **Tailwind CSS**
- **Axios**
- **json-server** (API fake)
- **JWT (mock auth)**

---

## 🏗️ Arquitectura del proyecto

El proyecto sigue una arquitectura por features, común en aplicaciones reales:

src/
├── app/
│ ├── providers/ # AuthProvider, QueryProvider
│ └── router/ # Rutas protegidas y por rol
│
├── features/
│ ├── auth/ # Login, hooks y lógica de auth
│ └── clients/ # CRUD de clientes (api, hooks, forms)
│
├── components/
│ ├── layout/ # DashboardLayout, Navbar, Sidebar
│ └── ui/ # Modal, ConfirmDialog
│
├── services/ # Axios + interceptors
├── types/ # Tipos globales (Client, User, etc.)
├── utils/ # Constantes (roles)
└── styles/


Esta estructura facilita:
- Escalabilidad
- Separación de responsabilidades
- Reutilización de lógica
- Mantenimiento a largo plazo

---

## 🔑 Credenciales de prueba

### Admin

Email: admin@test.com

Password: admin123

### User

Email: user@test.com

Password: user123

---

## 🚀 Cómo ejecutar el proyecto en local

### 1️⃣ Clonar el repositorio

git clone https://github.com/delmocss/client-project-management-app.git
cd client-project-management-app

### 2️⃣ Instalar dependencias

npm install

### 3️⃣ Arrancar el frontend

npm run dev

### 4️⃣ Arrancar la API fake

npm run server

### La aplicación estará disponible en:

http://localhost:5173

### La API fake en:

http://localhost:4000