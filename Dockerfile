# Multi-stage Dockerfile for Next.js (Optimized)
FROM node:24-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# C library compatibilities
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --no-frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app
RUN corepack enable pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate prisma client and build the Next.js app (standalone mode)
RUN pnpm prisma:generate
RUN pnpm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Matatkan Telemetry Next.js untuk mempercepat build/run dan privasi
ENV NEXT_TELEMETRY_DISABLED=1

# Prisma membutuhkan openssl di container production
RUN apk add --no-cache openssl

# Set up non-root user untuk keamanan container
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Salin aset statis
COPY --from=builder /app/public ./public

# Salin output standalone (yang memiliki node_modules minimal & spesifik)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Salin Prisma schema jika nanti butuh menjalankan migration/seed dari dalam container
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js secara otomatis dibuat oleh next build pada mode standalone
CMD ["node", "server.js"]
