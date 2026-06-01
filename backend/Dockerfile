# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# ===== RUNTIME STAGE =====
FROM node:20-alpine AS runner

WORKDIR /app

# Only copy what we need
COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
COPY package.json ./

EXPOSE 5000

CMD ["node", "src/index.js"]
