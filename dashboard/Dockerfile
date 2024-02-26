FROM node:20.11.1 as base

RUN npm install -g create-react-app

WORKDIR /work/

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .