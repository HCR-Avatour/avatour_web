FROM node:20.11.1-alpine

WORKDIR /work

COPY public/ /work/public
COPY src/ /work/src
COPY package.json /work/
# RUN npm install

RUN ls

CMD ["npm", "start"]