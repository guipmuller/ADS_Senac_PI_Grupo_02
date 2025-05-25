FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run tsoa:gen

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "--no-warnings=ExperimentalWarning", "--import", "tsx", "bin/www.ts"]