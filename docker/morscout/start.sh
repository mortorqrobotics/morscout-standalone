#!/bin/sh

consul agent -config-dir /consul &
node /morscout/server/build/server.js
