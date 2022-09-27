FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm lint
RUN npm run test

RUN npm ci --only=development

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" 