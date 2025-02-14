FROM node:19-bullseye

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 7000

CMD [ "npm", "start" ]   