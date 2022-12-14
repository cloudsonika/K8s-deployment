FROM node:18-alpine
#RUN apk add --no-cache wget
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
#RUN npm lint
#RUN npm run test

#RUN npm ci --only=development

COPY . .

EXPOSE 3146

CMD [ "npm", "start" ]
