FROM node:20-alpine

WORKDIR /app

# Backend setup
COPY backend/package.json ./backend/
RUN cd backend && npm install

# Frontend setup  
COPY frontend/package.json ./frontend/
RUN cd frontend && npm install && npm run build

COPY backend ./backend
COPY frontend ./frontend

EXPOSE 5002

CMD ["node", "backend/src/index.js"]
