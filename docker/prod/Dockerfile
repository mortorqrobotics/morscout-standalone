FROM node:lts-stretch as builder

LABEL maintainer="mortorqrobotics"
LABEL dev=false
LABEL prod=true
ENV NODE_ENV=production

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update &&\
    apt upgrade -y &&\
    apt -y install --no-install-recommends apt-utils 2>&1 &&\
    # Verify git and process tools are installed
    apt-get install -y git procps build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ca-certificates &&\
    rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn

RUN yarn global add react-native-cli
# Install morscout
WORKDIR /home/mortorqrobotics/morscout
COPY . .

ENV MONGOMS_DISABLE_POSTINSTALL=1
RUN yarn install --production=false --non-interactive --frozen-lockfile &&\
    yarn --cwd clients/web run build &&\
    yarn --cwd server run build

# Production
FROM node:lts-alpine


LABEL maintainer="mortorqrobotics"
LABEL dev=false
LABEL prod=true
ENV NODE_ENV=production

# Install runit for daemons & update certificates
RUN apk add --no-cache runit ca-certificates bash
COPY docker/morscout/consul.sh /etc/service/consul/run
RUN chmod agu+x /etc/service/*/run

# Copy starter script
COPY docker/morscout/prod.sh /start.sh
RUN chmod agu+x /start.sh

# Install Consul
COPY --from=consul:latest /bin/consul /bin/consul

# Copy Consul config
COPY docker/morscout/consul.json /consul/morscout.json

WORKDIR /morscout
RUN addgroup morscout &&\
  adduser morscout --disabled-password -D -h /morscout -G morscout
USER morscout
COPY patches patches

# Install prod dependencies
COPY package*.json ./
COPY **/package*.json ./

COPY yarn.lock yarn.lock
RUN yarn install --production --non-interactive --frozen-lockfile && rm -rf packages-cache && yarn cache clean

COPY --from=builder /morscout/web/build ./web/build
COPY --from=builder /morscout/server/build/ ./server/build/

CMD ["/bin/sh", "/start.sh"]
