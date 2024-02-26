FROM node:20.11.1 as base

RUN npm install -g create-react-app

WORKDIR /work/

COPY package*.json ./

RUN npm install

RUN dir -s

COPY . .