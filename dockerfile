# Base con SWI-Prolog
FROM swipl:latest

# Instala curl y Node.js sin borrar swipl
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Establece carpeta de trabajo
WORKDIR /app

# Copia todos los archivos del backend
COPY . .

# Instala dependencias
RUN npm install

# Expone puerto
EXPOSE 3000

# Inicia servidor
CMD ["node", "app.js"]
