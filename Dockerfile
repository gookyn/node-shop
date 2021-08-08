FROM node:16.1.0

WORKDIR /usr/app/node-shop
COPY . .
RUN yarn

EXPOSE 9000
CMD yarn start
