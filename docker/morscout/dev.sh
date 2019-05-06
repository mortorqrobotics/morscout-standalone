#!/bin/bash
set -m
yarn start:web &

/root/docker/morscout/consul.sh

fg %1
