FROM node:lts-stretch

LABEL maintainer="mortorqrobotics"
LABEL dev=true
LABEL prod=false
ENV NODE_ENV=development

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive
ARG USERNAME=mortorqrobotics
ARG USER_UID=1003
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME &&\
    useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME &&\
    # [Optional] Add sudo support for the non-root user
    apt update &&\
    apt upgrade -y &&\
    apt -y install --no-install-recommends apt-utils 2>&1 &&\
    # Verify git and process tools are installed
    apt-get install -y git procps build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev systemd sudo nano vim wget curl runit bash ca-certificates &&\
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME &&\
    chmod 0440 /etc/sudoers.d/$USERNAME
COPY docker/morscout/consul.sh /etc/service/consul/run
RUN chmod agu+x /etc/service/*/run

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

# Install global CLIs
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


# Install morscout
WORKDIR /home/mortorqrobotics/morscout
COPY . .
ENV MONGOMS_DISABLE_POSTINSTALL=1
RUN yarn install --non-interactive

CMD ["/bin/sh", "/start.sh"]
