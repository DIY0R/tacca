FROM node:16.15.0

WORKDIR /tacca

COPY package*.json ./

RUN npm install

COPY  . .

COPY  ./dist ./dist

CMD ["npm","run","start:dev"]