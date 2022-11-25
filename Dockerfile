FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY next.config.ts ./next.config.ts

CMD ["yarn", "dev"]