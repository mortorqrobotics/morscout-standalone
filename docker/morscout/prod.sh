#!/bin/bash
set -m

node /morscout/server/build/server.js &

runsvdir /etc/service

fg %1
