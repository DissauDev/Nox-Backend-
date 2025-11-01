# ---------- build stage ----------
FROM node:22 AS build
WORKDIR /app

# Solo manifests para cache
COPY package*.json ./
RUN npm ci

# Copia el resto del código (incluye wait-for-it.sh si está en tu repo)
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# ---------- runtime stage ----------
FROM node:22 AS runtime
WORKDIR /app

# Copiamos lo necesario para ejecutar
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/src ./src
COPY --from=build /app/index.js ./index.js
COPY --from=build /app/app.js ./app.js
COPY --from=build /app/wait-for-it.sh ./wait-for-it.sh

# Quita dependencias de dev en runtime y da permisos al script
RUN npm prune --omit=dev && chmod +x ./wait-for-it.sh

# Ejecuta como usuario no root
USER node

EXPOSE 3000

# Espera a Postgres, luego corre migraciones y arranca el servidor
CMD ["./wait-for-it.sh", "postgres", "5432", "--", "sh", "-c", "npx prisma migrate deploy && node index.js"]
