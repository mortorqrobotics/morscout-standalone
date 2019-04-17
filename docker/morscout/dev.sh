#!/bin/sh
set -m

nodemon /morscout/server/build/server.js &

runsvdir /etc/service
