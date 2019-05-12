# MorScout - EXPERIMENTAL

> This is a repository for the server, app, and CLI of MorScout, the official MorTorq FRC scouting application

<!-- The cirrus badge updates every 24hrs-->
[![Build Status](https://api.cirrus-ci.com/github/mortorqrobotics/morscout-standalone.svg)](https://cirrus-ci.com/github/mortorqrobotics/morscout-standalone)
[![Known Vulnerabilities](https://snyk.io/test/github/mortorqrobotics/morscout-standalone/badge.svg)](https://snyk.io/test/github/mortorqrobotics/morscout-standalone)
[![codecov](https://codecov.io/gh/mortorqrobotics/morscout-standalone/branch/master/graph/badge.svg)](https://codecov.io/gh/mortorqrobotics/morscout-standalone)
[![iOS Build](https://build.appcenter.ms/v0.1/apps/a0fa44cd-1214-41c9-942b-a1a33bfea92b/branches/master/badge)](https://appcenter.ms)
[![Android Build](https://build.appcenter.ms/v0.1/apps/af68d026-c265-4753-a756-2764cdfe5137/branches/master/badge)](https://appcenter.ms)

- [MorScout - EXPERIMENTAL](#morscout---experimental)
  - [Installing](#installing)
    - [Docker](#docker)
      - [Production](#production)
      - [Development](#development)
    - [Native](#native)
  - [Starting](#starting)
    - [Development](#development-1)
      - [npm](#npm)
      - [yarn](#yarn)
    - [Production](#production-1)
      - [npm](#npm-1)
      - [yarn](#yarn-1)
  - [Building](#building)
    - [Web](#web)
      - [npm](#npm-2)
      - [yarn](#yarn-2)
    - [Electron](#electron)
      - [npm](#npm-3)
      - [yarn](#yarn-3)
    - [Server](#server)
      - [npm](#npm-4)
      - [yarn](#yarn-4)

## Installing

### Docker

#### Production

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone/docker/prod
docker-compose pull
```

#### Development

> Currently a work in progress

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone/docker/dev
docker-compose pull
```

### Native

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone
yarn # Or npm i
```

## Starting

### Development

> Note that the server/website can be started seperately

#### npm

`npm run start:web`

#### yarn

`yarn start:web`

### Production

#### npm

`npm start`

#### yarn

`yarn start`

## Building

### Web

#### npm

`npm run build:app`

#### yarn

`yarn build:app`

### Electron

#### npm

`npm run build:electron`

#### yarn

`yarn build:electron`

### Server

#### npm

`npm run build:server`

#### yarn

`yarn build:server`

