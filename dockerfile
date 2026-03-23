##
# This is the basic setup for the server side of the project
##

FROM node:22-alpine AS client
WORKDIR /client
COPY ./client/package*.json ./
RUN npm install
COPY ./client .
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS server
WORKDIR /server
COPY ./server/package*.json ./
RUN npm install
COPY ./server .
EXPOSE 3000
CMD [ "node", "./index.js" ]

FROM mysql:latest
ENV MYSQL_DATABASE mydb
COPY ./database /docker-entrypoint-initdb.d/

