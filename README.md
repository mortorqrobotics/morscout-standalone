# MorScout - Experimental <!-- omit in toc -->

[![Build Status](https://api.cirrus-ci.com/github/mortorqrobotics/morscout-standalone.svg)](https://cirrus-ci.com/github/mortorqrobotics/morscout-standalone)
[![Known Vulnerabilities](https://snyk.io/test/github/mortorqrobotics/morscout-standalone/badge.svg)](https://snyk.io/test/github/mortorqrobotics/morscout-standalone)
[![codecov](https://codecov.io/gh/mortorqrobotics/morscout-standalone/branch/master/graph/badge.svg)](https://codecov.io/gh/mortorqrobotics/morscout-standalone)
[![iOS Build](https://build.appcenter.ms/v0.1/apps/a0fa44cd-1214-41c9-942b-a1a33bfea92b/branches/master/badge)](https://appcenter.ms)
[![Android Build](https://build.appcenter.ms/v0.1/apps/af68d026-c265-4753-a756-2764cdfe5137/branches/master/badge)](https://appcenter.ms)
[![VSCode Remote Containers](https://img.shields.io/badge/VSCode%20Remote%20Containers-Enabled-brightgreen)](https://code.visualstudio.com/docs/remote/containers)

- [VSCode Remote Containers (recommended way Develop)](#vscode-remote-containers-recommended-way-develop)
- [Installing](#installing)
  - [Docker](#docker)
    - [Production](#production)
    - [Development](#development)
  - [Native](#native)
- [Starting Development](#starting-development)
  - [Web](#web)
  - [Server](#server)
  - [Docker (Starts both web and server in sync)](#docker-starts-both-web-and-server-in-sync)
- [Building](#building)
  - [Web](#web-1)
  - [Electron](#electron)
  - [Server](#server-1)

## VSCode Remote Containers (recommended way Develop)

1. Install [Docker](https://hub.docker.com/search/?type=edition&offering=community)
2. Install [VSCode Remote](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) or [VSCode Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Run the `Remote-Containers: Open Folder in Container` command and select the morscout-standalone folder
4. Enjoy the isolation

## Installing

### Docker

#### Production

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone/docker/prod
docker-compose -f docker-compose.yml -f ../docker-common.yml pull
```

#### Development

> Recommended

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone/docker/dev
docker-compose -f docker-compose.yml -f ../docker-common.yml pull
```

### Native

```bash
git clone https://github.com/mortorqrobotics/morscout-standalone.git
cd morscout-standalone
yarn
```

## Starting Development

> Note that the server/website can be started seperately and run in sync

### Web
```bash
cd clients/web
yarn start
```

### Server

> This needs web to have been built

```bash
cd server
yarn start
```

### Docker (Starts both web and server in sync)

```bash
cd morscout-standalone/docker/dev
docker-compose -f docker-compose.yml -f ../docker-common.yml up
```

## Building

### Web

```bash
cd clients/web
yarn build
```

### Electron

```bash
cd clients/electron
yarn build
```

### Server

```bash
cd server
yarn build
```
