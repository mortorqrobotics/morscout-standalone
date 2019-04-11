FROM node:lts-stretch

LABEL dev=true
LABEL prod=false

# Create app directory
WORKDIR /root

RUN apt-get update &&\
  apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev &&\
  apt-get clean
# Copy patches
COPY patches patches

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock yarn.lock
RUN yarn install && npm i -g nodemon && yarn cache clean

# Copy over all sources
VOLUME [ "/root/morscout" ]
COPY . .
# Build cli, server, and app
RUN yarn build

CMD "/bin/sh \"nodemon server/build/server.js & consul\""
