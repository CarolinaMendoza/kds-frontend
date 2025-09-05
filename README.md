# React + TypeScript + Vite
Kitchen Display System (KDS)

-Descripción

Este proyecto es un módulo web para la gestión de pedidos en cocina (KDS).
Permite visualizar, actualizar y gestionar pedidos en tiempo real dentro de un restaurante.

Desarrollado con React + TypeScript, siguiendo buenas prácticas de arquitectura, estado global y modularización.

-Tecnologías utilizadas:

React 18 + TypeScript

React Router DOM (navegación)

Zustand (estado global)

Axios (consumo de API)

Material UI (UI Components + estilos modernos)

Framer Motion (animaciones)

json-server (mock API)

Vite (build tool)

-Estructura de carpetas

src/
 ┣ api/
 ┃ ┗ ordersApi.ts
 ┣ assets/
 ┃ ┣ kitchen-background.jpg
 ┃ ┗ react.svg
 ┣ features/
 ┃ ┣ home/
 ┃ ┃ ┗ pages/
 ┃ ┃   ┣ HomePage.tsx
 ┃ ┃   ┗ HomePage.module.css
 ┃ ┗ orders/
 ┃   ┣ components/
 ┃   ┃ ┣ OrderCard.tsx
 ┃   ┃ ┗ OrderCard.module.scss
 ┃   ┣ pages/
 ┃   ┃ ┣ OrdersPage.tsx
 ┃   ┃ ┗ OrdersPage.module.css
 ┃   ┗ store/
 ┃     ┗ ordersStore.ts
      ┗types/
 |     ┗ order.d.ts
 ┣ router/
 ┃ ┗ routes.tsx
 ┣ shared/
 ┃ ┗ components/
 ┃   ┗ ui/
 ┃     ┣ GlobalLoadingOverlay.tsx
 ┃     ┣ GlobalLoadingOverlay.module.css
 ┃     ┣ KDSButton.tsx
 ┃     ┗ TypewriterText.tsx
 ┣ store/
 ┃ ┗ uiStore.ts
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts


-Instalación y ejecución

1. Clonar repositorio
git clone https://github.com/tu-usuario/examen-react.git
cd examen-react

2. Instalar dependencias
npm install

3. Levantar el mock API (json-server)

En una terminal:

npx json-server --watch db.json --port 3000


Esto crea el endpoint:

http://localhost:3000/orders

4. Levantar frontend

En otra terminal:

npm run dev


App correrá en:

http://localhost:5173

- Manual de uso

En el Home verás un botón “Revisar pedidos en cocina”.

Al hacer click, aparece un loading overlay animado.

Luego se muestra la página Orders, con todas las tarjetas de pedidos.

Cada tarjeta permite avanzar el estado del pedido (Pendiente → En preparación → Listo).

Los cambios se reflejan en la API (PATCH /orders/:id).

-API Mock (json-server)

Este proyecto utiliza json-server
 como API simulada para manejar los pedidos.
El archivo db.json se encuentra en la raíz del proyecto y contiene pedidos de prueba.

-Endpoints disponibles

GET /orders → lista todos los pedidos.

GET /orders/:id → obtiene un pedido por id.

PATCH /orders/:id → actualiza parcialmente un pedido (ej: cambiar estado).

PUT /orders/:id → reemplaza un pedido completo.

-Ejemplo de db.json
{
  "orders": [
    {
      "id": 1,
      "cliente": "Juan Pérez",
      "tipo": "Delivery",
      "estado": "Pendiente",
      "hora": "2025-09-04T12:30:00Z",
      "productos": [
        { "nombre": "Pizza Pepperoni", "cantidad": 2 },
        { "nombre": "Coca Cola 500ml", "cantidad": 1 }
      ]
    },
    {
      "id": 2,
      "cliente": "María López",
      "tipo": "Mesa",
      "estado": "Pendiente",
      "hora": "2025-09-04T12:40:00Z",
      "productos": [
        { "nombre": "Ensalada César", "cantidad": 1 },
        { "nombre": "Agua sin gas", "cantidad": 2 }
      ]
    }
    // ... más pedidos en el archivo real (10 en total)
  ]
}


*El archivo completo ya contiene 10 pedidos realistas con diferentes tipos y estados (Pendiente, En preparación, Listo).


- Estado global

ordersStore.ts → pedidos (lista, loading, error, update).

uiStore.ts → controla la visibilidad del loading overlay.

- Scripts disponibles
npm run dev       # levantar app en modo desarrollo
npm run build     # compilar para producción
npm run preview   # preview de build
npm test          # correr tests 

##  Docker

Puedes levantar el frontend y el mock API en un solo paso usando Docker Compose:

docker-compose up --build

##  Demo en Producción
- Frontend (Vercel): [kds-frontend.vercel.app]
- Mock API (Render):[https://mock-api-orders-1.onrender.com]
