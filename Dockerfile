FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node
#RUN npm lint
#RUN npm run test

#RUN npm ci --only=development

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
