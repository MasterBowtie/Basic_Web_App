##
# This is the basic setup for the server side of the project
##

FROM node:22-alpine
WORKDIR /server
COPY ./server .
RUN yarn install --production
CMD [ "node", "./index.js" ]
