FROM node:lts-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

EXPOSE 3000
USER node
CMD ["npm", "run", "start:prod"]
