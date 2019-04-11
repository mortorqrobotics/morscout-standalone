#!/bin/sh

export HASHICORP_RELEASES=https://releases.hashicorp.com
export CONSUL_VERSION=1.4.4

addgroup consul
adduser -S -G consul consul

set -eux
apk add --no-cache ca-certificates curl dumb-init gnupg libcap openssl su-exec iputils jq
mkdir -p /tmp/build
cd /tmp/build
apkArch="$(apk --print-arch)"
case "${apkArch}" in \
    aarch64) consulArch='arm64' ;; \
    armhf) consulArch='arm' ;; \
    x86) consulArch='386' ;; \
    x86_64) consulArch='amd64' ;; \
    *) echo >&2 "error: unsupported architecture: ${apkArch} (see ${HASHICORP_RELEASES}/consul/${CONSUL_VERSION}/)" && exit 1 ;; \
esac
wget ${HASHICORP_RELEASES}/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_${consulArch}.zip
wget ${HASHICORP_RELEASES}/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_SHA256SUMS
grep consul_${CONSUL_VERSION}_linux_${consulArch}.zip consul_${CONSUL_VERSION}_SHA256SUMS | sha256sum -c
unzip -d /bin consul_${CONSUL_VERSION}_linux_${consulArch}.zip
cd /tmp
rm -rf /tmp/build
apk del gnupg openssl
rm -rf /root/.gnupg
consul version

mkdir -p /consul/data
mkdir -p /consul/config
chown -R consul:consul /consul
