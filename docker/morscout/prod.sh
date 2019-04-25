#!/bin/bash
set -m

echo Hello

node /morscout/server/build/server.js &

runsvdir /etc/service

fg %1
