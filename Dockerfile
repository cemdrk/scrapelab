
FROM node:20-alpine

RUN npm install -g npm

WORKDIR /solution

COPY . /solution
