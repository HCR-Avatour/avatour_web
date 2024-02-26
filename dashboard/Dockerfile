FROM node:20.11.1 as base

WORKDIR /work

COPY public/ /dashboard/public
COPY src/ /dashboard/src
COPY package.json /dashboard/

RUN npm install