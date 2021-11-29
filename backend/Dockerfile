FROM node:lts-alpine3.14

EXPOSE 3001
EXPOSE 5000

WORKDIR /usr/src/app

COPY . .

RUN npm --prefix frontend install
RUN npm run --prefix frontend prod_build
RUN npm --prefix backend install
