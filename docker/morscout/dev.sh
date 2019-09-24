#!/bin/bash
set -m
yarn --cwd server run start &

yarn --cwd client/web run start &

runsvdir /etc/service

fg %1
