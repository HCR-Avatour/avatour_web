FROM node:20.11.1-alpine

WORKDIR /work

ENV PATH /work/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install

COPY . ./

CMD ["bash"]