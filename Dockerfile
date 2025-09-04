# Backend/Dockerfile
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y lock (si existe) primero para aprovechar cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código
COPY . .

# Exponer puerto (el del contenedor)
EXPOSE 3000

# Comando de arranque
CMD ["npm", "run", "dev"]
