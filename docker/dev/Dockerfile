FROM node:lts-stretch

LABEL dev=true
LABEL prod=false

# Create app directory
WORKDIR /root

RUN apt-get update &&\
  apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev &&\
  apt-get clean

# Install Consul
COPY --from=consul:latest /bin/consul /bin/consul

# Copy Consul config and install runit for daemons
RUN apk add --no-cache runit
COPY docker/morscout/consul.service /etc/service/consul/run
COPY docker/morscout/consul.json /consul/morscout.json
RUN chmod agu+x /etc/service/*/run

# Copy starter script
COPY docker/morscout/dev.sh /start.sh
RUN chmod agu+x /start.sh

# Copy patches
COPY patches patches

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock yarn.lock
RUN yarn install && npm i -g nodemon

# Copy sources
COPY . .

# Build cli, server, and app
RUN yarn build

CMD ["/start.sh"]
