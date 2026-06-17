# =============================================================================
# Stage 1: Builder
# Installs all dependencies and builds both the frontend and API server.
# =============================================================================
FROM node:22-slim AS builder

# Enable corepack so we can use pnpm without a separate install step
# Pin to the same version used locally to avoid surprise breaking changes
RUN corepack enable && corepack prepare pnpm@11.5.3 --activate

WORKDIR /workspace

# Copy workspace-level manifests first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./

# Copy library packages (referenced by the API server via workspace:* protocol)
COPY lib/ lib/

# Copy application packages
COPY artifacts/ artifacts/

# Install all workspace dependencies.
# --ignore-scripts skips postinstall scripts across all packages, which avoids
# pnpm v10+ lockfile-based build-approval checks under --frozen-lockfile.
# esbuild is then explicitly rebuilt so its native binary gets linked.
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm rebuild esbuild

# Build shared TypeScript library packages
RUN pnpm run typecheck:libs

# Build the React/Vite frontend.
# PORT and BASE_PATH are required by vite.config.ts at config-evaluation time
# even during a production build — use safe placeholder values here.
ENV PORT=3000
ENV BASE_PATH=/
ENV NODE_ENV=production
RUN pnpm --filter @workspace/jj-plumbing run build

# Build the Express API server (esbuild bundle → dist/index.mjs)
RUN pnpm --filter @workspace/api-server run build

# =============================================================================
# Stage 2: Production image
# Only the compiled artefacts are copied; no dev-deps or source code.
# =============================================================================
FROM node:22-slim AS production

WORKDIR /app

# API server bundle
COPY --from=builder /workspace/artifacts/api-server/dist/ ./dist/

# Frontend static files served by Express in production
COPY --from=builder /workspace/artifacts/jj-plumbing/dist/public/ ./public/

ENV NODE_ENV=production

# Cloud Run injects PORT automatically; the app reads it at startup
EXPOSE 8080

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
