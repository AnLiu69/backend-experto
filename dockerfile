# Imagen base con Node.js y SWI-Prolog
FROM swipl:latest

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del backend
COPY . .

# Instalar Node.js y npm
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install

# Exponer el puerto
EXPOSE $PORT

# Comando para iniciar el servidor
CMD ["node", "app.js"]
