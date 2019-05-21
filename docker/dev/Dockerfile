#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM node:lts

LABEL maintainer="mortorqrobotics"
LABEL dev=true
LABEL prod=false
ENV NODE_ENV=development

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update &&\
    apt upgrade &&\
    apt -y install --no-install-recommends apt-utils 2>&1 &&\
    # Verify git and process tools are installed
    apt-get install -y git procps build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev systemd apt-utils nano vim wget curl

# Remove outdated yarn from /opt and install via package
# so it can be easily updated via apt-get upgrade yarn
RUN rm -rf /opt/yarn-* \
    && rm -f /usr/local/bin/yarn \
    && rm -f /usr/local/bin/yarnpkg \
    && apt-get install -y curl apt-transport-https lsb-release \
    && curl -sS https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/pubkey.gpg | apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends yarn

# Install Dependencies
RUN yarn global add nodemon eslint jest snyk webpack-cli react-native-cli

# Add system services
COPY docker/morscout/consul.service /lib/systemd/system/consul.service
RUN systemctl enable consul

ENV DEBIAN_FRONTEND=dialog

# Copy starter script
COPY docker/morscout/dev.sh /start.sh
RUN chmod agu+x /start.sh

# Install Consul
COPY --from=consul:latest /bin/consul /bin/consul

# Copy Consul config
COPY docker/morscout/consul.json /consul/morscout.json

CMD ["/bin/sh", "/start.sh"]
