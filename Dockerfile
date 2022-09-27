FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
<<<<<<< HEAD
RUN npm install -g nodemon
RUN npm install -g ts-node
=======
>>>>>>> a3c98dbcfb03c223649e121c772b773cc9e3fd5c
#RUN npm lint
#RUN npm run test

#RUN npm ci --only=development

COPY . .

EXPOSE 8080

<<<<<<< HEAD
CMD [ "npm", "start" ]
 
=======
CMD [ "node", "server.js" 
>>>>>>> a3c98dbcfb03c223649e121c772b773cc9e3fd5c
