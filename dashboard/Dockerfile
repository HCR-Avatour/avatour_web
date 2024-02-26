FROM node:20.11.1-alpine

SHELL ["/bin/bash", "-c"]

WORKDIR /work

COPY public/ /work/public
COPY src/ /work/src
COPY package.json /work/

RUN npm install

CMD ["npm", "start"]