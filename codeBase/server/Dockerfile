#----Builder stage----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install

COPY . .

RUN npm run build

#----Production stage----
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist


CMD ["node", "dist/server.js"]
