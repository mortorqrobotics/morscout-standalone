# MorScout

This is a repository for the server, app, and CLI of MorScout, the official MorTorq FRC scouting application

<!-- TOC -->

- [MorScout](#morscout)
    - [Docker](#docker)
        - [Installation](#installation)
        - [Loading Container](#loading-container)
        - [Starting Container](#starting-container)
    - [Native](#native)
        - [Install](#install)
        - [Building](#building)
            - [Development](#development)
                - [App](#app)
                    - [Web](#web)
                    - [IOS](#ios)
                    - [Android](#android)
                - [Server](#server)
                - [CLI](#cli)
            - [Production](#production)
                - [App](#app-1)
                    - [Web](#web-1)
                    - [IOS](#ios-1)
                    - [Android](#android-1)
                - [Server](#server-1)
                - [CLI](#cli-1)
        - [Starting](#starting)
        - [Deploy Docker image](#deploy-docker-image)
            - [Development](#development-1)
            - [Production](#production-1)

<!-- /TOC -->

## Docker

### Installation

[Docker](https://store.docker.com/search?type=edition&offering=community)

[Container](https://github.com/eschablowski/morscout/releases)

> Just download the source file (already .tar.gz) and extract to get docker.tar

### Loading Container

`docker load docker.tar`

### Starting Container

`docker run -p <port>:8080 -d eschablowski/morscout`

## Native

### Install

Follow instructions for install for [canvas](https://www.npmjs.com/package/canvas) and then run `yarn` or `npm i`

### Building

> Always run App, Server, CLI in that order for first install

#### Development

##### App

###### Web

`yarn start:app:web` or `npm run start:app:web`

###### IOS

`yarn start:app:ios` or `npm run start:app:ios`

###### Android

`yarn start:app:android` or `npm run start:app:android`

##### Server

`yarn start:server` or `npm run start:server`

##### CLI

`yarn start:cli` or `npm run start:cli`

#### Production

##### App

###### Web

`yarn build:app:web` or `npm run build:app:web`

###### IOS

`yarn build:app:ios` or `npm run build:app:ios`

###### Android

`yarn build:app:android` or `npm run build:app:android`

##### Server

`yarn build:server` or `npm run build:server`

##### CLI

`yarn build:cli` or `npm run build:cli`

### Starting

`yarn cli` or `npm run cli` or `./cli/build/cli.js`

> Needs to be built or started(watched) first

### Deploy Docker image

#### Development

Verify Dockerfile has `RUN yarn` not `RUN yarn --production`

```bash
docker build -t <username>/morscout . # builds image and saves it in docker images
docker save <username>/morscout -o docker.tar
tar -cvzf docker.tar.gz docker.tar # this may take several minutes and is mostly just for GH release updates (limited to 2GB)
```

#### Production
Verify Dockerfile has `RUN yarn --production` not `RUN yarn`

```bash
docker build -t <username>/morscout . # builds image and saves it in docker images
docker save <username>/morscout -o docker.tar
tar -cvzf docker.tar.gz docker.tar # this may take several minutes and is mostly just for GH release updates (limited to 2GB)
```