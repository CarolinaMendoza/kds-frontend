# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de servidor
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copiar la build de Vite a nginx
COPY --from=build /app/dist ./

# Reemplazar configuración de nginx (opcional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
