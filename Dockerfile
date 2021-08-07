FROM node

WORKDIR /usr/app/node-shop
COPY . .
RUN yarn

EXPOSE 9000
CMD yarn start
