# ===== BUILD STAGE =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY public ./public
COPY src ./src

# Build the React app
RUN npm run build

# ===== RUNTIME STAGE (nginx) =====
FROM nginx:alpine AS runner

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files
COPY --from=builder /app/build /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
