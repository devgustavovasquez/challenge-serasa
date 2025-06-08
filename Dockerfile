# Base stage
FROM node:22-alpine AS base
WORKDIR /api

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true

RUN corepack enable

# Build stage
FROM base AS builder

COPY . .
RUN pnpm install --frozen-lockfile

RUN pnpm build

# Production stage
FROM base AS runner

ENV NODE_ENV=production

COPY --from=builder /api/package.json ./
COPY --from=builder /api/pnpm-lock.yaml ./
COPY --from=builder /api/dist ./dist
COPY --from=builder /api/prisma ./prisma

RUN pnpm install --prod

RUN pnpm prisma generate

RUN pnpm seed

EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
