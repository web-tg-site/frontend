#Зависимости
FROM oven/bun:1 as deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

#Сборка
FROM oven/bun:1 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_HOST
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ENV NEXT_PUBLIC_API_HOST=#NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

#Запуск
FROM oven/bun:1 as runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

#Копируем public
COPY --from=builder /app/public ./public

#Копируем сборку
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p public/uploads

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"