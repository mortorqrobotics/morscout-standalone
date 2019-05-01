FROM node:lts-stretch

LABEL maintainer="mortorqrobotics"
LABEL dev=true
LABEL prod=false
ENV NODE_ENV=development

# Create app directory
WORKDIR /root

RUN apt-get update &&\
  apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev &&\
  apt-get clean
# Copy patches
COPY patches patches
COPY .snyk .snyk

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock yarn.lock
RUN yarn install --non-interactive --frozen-lockfile


# Copy Sources
COPY . .
VOLUME [ "/root" ]

# Copy starter script
COPY docker/morscout/prod.sh /start.sh
RUN chmod agu+x /start.sh

# Install Consul
COPY --from=consul:latest /bin/consul /bin/consul

# Copy Consul config
COPY docker/morscout/consul.json /consul/morscout.json

CMD ["/bin/sh", "/start.sh"]
