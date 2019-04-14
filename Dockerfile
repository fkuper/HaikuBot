FROM node:10.15-alpine

WORKDIR /haikubot

COPY package*.json ./
RUN npm ci

COPY . .

RUN ls -la
ENTRYPOINT [ "node", "./index.js" ]