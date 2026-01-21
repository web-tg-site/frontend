# Используем node:20-slim (Debian)
FROM node:20-slim AS deps
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Сборка
FROM node:20-slim AS builder
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Заглушка URL для генерации
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/mydb"
RUN npx prisma generate

RUN yarn build

RUN yarn install --production --frozen-lockfile && yarn cache clean

# Запуск
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl

USER node

COPY --chown=node:node package.json ./

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma

# --- ВАЖНО: КОПИРУЕМ КОНФИГ ПРИЗМЫ ---
COPY --chown=node:node --from=builder /app/prisma.config.ts ./
# -------------------------------------

USER root
# Устанавливаем tsx глобально, чтобы читать prisma.config.ts
RUN npm install -g tsx prisma
USER node

EXPOSE 4000

# Запускаем
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main"]