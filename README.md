# Firefox Accounts Content Server

[![Build Status: Travis](https://travis-ci.org/mozilla/fxa-content-server.svg?branch=master)](https://travis-ci.org/mozilla/fxa-content-server)
[![Coverage Status](https://img.shields.io/coveralls/mozilla/fxa-content-server.svg)](https://coveralls.io/r/mozilla/fxa-content-server)

Static server that hosts Firefox Account sign up, sign in, email verification, etc. flows.

## Prerequisites

Follow the steps outlined in:
https://github.com/mozilla/fxa-local-dev

The above link helps you to install the following pre-requisites and set up a development environment.
* node 0.10.x
* npm
* Grunt
* libgmp
* [fxa-auth-server](https://github.com/mozilla/fxa-auth-server) running on 127.0.0.1:9000.

## Development Setup

```sh
cp server/config/local.json-dist server/config/local.json
npm install
npm start
```

It will listen on <http://127.0.0.1:3030> by default.

Note: If you have issues with `npm install` please update to npm 2.0+ using `npm install -g npm@2` 
([Issue #1594](https://github.com/mozilla/fxa-content-server/issues/1594))
Note: If you have issues with bigint (gmp.h not found) that stops pm2 from being installed, install pm2
 separately using `npm install pm2` 

## Docker Based Development

To run the content server via Docker, three steps are required:

    $ docker build --rm -t mozilla/fxa_content_server .
    $ docker run --rm -v $PWD:/opt/fxa mozilla/fxa_content_server npm install
    $ docker run -it --rm -v $PWD:/opt/fxa --net=host mozilla/fxa_content_server

This method shares the codebase into the running container so that you can install npm and various modules required by package.json. It then runs FxA content server in a container, while allowing you to use your IDE of choice from your normal desktop environment to develop code.

Be sure to copy server/config/local.json-dist to server/config/local.json per usual before the final docker invocation to run the service.

Note to boot2docker users: you must edit your server/config/local.json to use the correct IP of your boot2docker VM. Check with the command: `boot2docker ip`

 Then replace the public_url IP address in local.json that reads: "public_url": "http://127.0.0.1:3030" with the IP that you noted above. It should be something like 192.168.59.103.

To stop the container, first try CTRL+C. If that does not work, run `docker ps |grep fxa_content_server` to get the hexadecimal Container ID (the first column of output). Run `docker stop nnnnnnnnnnnn` where the nnnn part is the Container ID.

## Testing

#### Prerequisites:
  * Java JDK or JRE (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
  * Selenium Server 2.45.0 ([Download](http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar))

### Setup

* Run Selenium Server
* Run the Firefox Content Server locally: `npm start`
* Run an instance of the [fxa-auth-server](https://github.com/mozilla/fxa-auth-server) at 127.0.0.1:9000.

Note: You do not have to start the servers if they are already running through pm2. You can check this by typing `./pm2 status`.

e.g. in shell form:

```sh
java -jar selenium-server-standalone-2.43.1.jar &
cd fxa-auth-server
npm start &
cd ../fxa-content-server
npm start &
```

To run tests locally with Selenium:

```sh
npm test
```

To change the default auth server edit `server/config/*.json` on your deployed instance.

```json
{
  "fxaccount_url": "http://your.auth.server.here.org"
}
```

**Note that testing with Selenium via Docker does *not* work at present, so all testing must be carried out via your normal operating system's npm & Java tooling.**

## Grunt Commands

[Grunt](http://gruntjs.com/) is used to run common tasks to build, test, and run local servers.

| TASK | DESCRIPTION |
|------|-------------|
| `grunt build` | build production resources. See [task source](grunttasks/build.js) for more documentation |
| `grunt clean` | remove any built production resources. |
| `grunt lint` | run JSHint, JSONLint, and JSCS (code style checker) on client side and testing JavaScript. |
| `grunt server` | run a local server running on port 3030 with development resources. |
| `grunt server:dist` | run a local server running on port 3030 with production resources. Production resources will be built as part of the task. |
| `grunt test` | run local Intern tests. |
| `grunt version` | stamp a new minor version. Updates the version number and creates a new CHANGELOG.md. |
| `grunt version:patch` | stamp a new patch version. Updates the version number and creates a new CHANGELOG.md. |

## Servers

* latest development - https://latest.dev.lcip.org/
* testing - https://nightly.dev.lcip.org/
* stage - https://accounts.stage.mozaws.net/
* production - https://accounts.firefox.com/

## License

MPL 2.0
