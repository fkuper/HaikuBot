FROM node:10.15-alpine

WORKDIR /haikubot

COPY package*.json ./
RUN npm ci

COPY . .

ENTRYPOINT [ "node", "./index.js" ]