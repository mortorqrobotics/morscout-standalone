#!/bin/bash
set -m

yarn start &

runsvdir /etc/service

fg %1
