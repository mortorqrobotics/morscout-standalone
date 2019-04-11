FROM node:lts-stretch AS builder

LABEL dev=false
LABEL prod=true

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
RUN yarn install --non-interactive --frozen-lockfile

# Copy over all sources
COPY . .

# Build cli, server, and app
RUN yarn build

FROM node:lts-alpine

LABEL dev=false
LABEL prod=true

# Install Consul
COPY --from=consul:latest /bin/consul /bin/consul

# Copy Start File
COPY docker/morscout/start.sh /start.sh
COPY docker/morscout/consul.json /consul/morscout.json

WORKDIR /morscout

# Copy patches
COPY patches patches

# Install prod dependencies
COPY package*.json ./
COPY yarn.lock yarn.lock
RUN yarn install --production --non-interactive --frozen-lockfile && rm -rf packages-cache && yarn cache clean

COPY --from=builder /root/app/build/web/ ./app/build/web/
COPY --from=builder /root/server/build/ ./server/build/
CMD "/start.sh"
