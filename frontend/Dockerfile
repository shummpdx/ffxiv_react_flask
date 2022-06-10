FROM node:16

WORKDIR /app

RUN apt-get update

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

RUN chown -R node:node /app/node_modules

EXPOSE 3000

CMD ["npm","run","start"]