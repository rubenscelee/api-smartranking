FROM node:16-alpine
LABEL maintainer="Rubens Celestino"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN apt-get install iproute2


COPY . /usr/src/app 
 
EXPOSE 8080

CMD [ "npm","run", "start:dev" ]