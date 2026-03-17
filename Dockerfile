FROM node:18

WORKDIR /app

COPY package*.json ./

RUN mkdir /database

RUN npm install

COPY . .

EXPOSE 3000


CMD ["node", "server.js"]
