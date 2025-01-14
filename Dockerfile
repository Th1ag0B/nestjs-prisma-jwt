FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY prisma ./prisma/

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npx prisma migrate 
EXPOSE 3333
CMD ["npm", "run", "dev"]


FROM base AS production-builder
RUN npm install -g @nestjs/cli  
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate

FROM base AS production

COPY .env .env
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=production-builder /app/dist /app/dist
COPY --from=production-builder /app/node_modules/.prisma /app/node_modules/.prisma
RUN npx prisma migrate
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node -e "fetch('http://localhost:3333/health').then(r => process.exit(r.ok ? 0 : 1))"
EXPOSE 3333
USER node
CMD ["npm", "start"]
