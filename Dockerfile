FROM node:alpine

WORKDIR /demo-app

EXPOSE 3146

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm" "start"]
