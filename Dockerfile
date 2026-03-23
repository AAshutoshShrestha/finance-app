# ============================================
# Base
# ============================================
FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable

# ============================================
# Dependencies
# ============================================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ============================================
# Builder
# ============================================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Prisma client generation
RUN npx prisma generate

# Next build
RUN pnpm build

# ============================================
# Runner
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]