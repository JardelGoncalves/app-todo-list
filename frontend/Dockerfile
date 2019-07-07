FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 7000

CMD [ "yarn", 'start']