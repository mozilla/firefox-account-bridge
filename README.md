# Firefox Accounts Content Server

Travis Tests: [![Build Status: Travis](https://travis-ci.org/mozilla/fxa-content-server.svg?branch=master)](https://travis-ci.org/mozilla/fxa-content-server)
Functional Tests: <a href='http://qa.stage.mozaws.net:8080/job/fxa.content-server-tests.dev/'><img src='http://qa.stage.mozaws.net:8080/job/fxa.content-server-tests.dev/badge/icon' alt='Build Status: Functional Tests' height='13'></a>

Static server that hosts Firefox Account sign up, sign in, email verification, etc. flows.

## Prerequisites

* node 0.10.x
* npm
* Grunt (`npm install -g grunt-cli`)
* PhantomJS (`npm install -g phantomjs`)
* libgmp
  * On Linux: install libgmp and libgmp-dev packages
  * On Mac OS X: brew install gmp
* [fxa-auth-server](https://github.com/mozilla/fxa-auth-server) running on 127.0.0.1:9000.

## Development Setup

```sh
cp server/config/local.json-dist server/config/local.json
npm install
npm start
```

It will listen on <http://127.0.0.1:3030> by default.

## Testing

### Setup
There is quite a bit of setup to do before you can test this service, which is non-optimal, but for now:

  * Set up SauceLabs credentials (we have an open source account: `SAUCE_USERNAME=fxa-content` `SAUCE_ACCESS_KEY=ee5354a4-3d5e-47a0-84b0-0b7aaa12a720`)
  * PhantomJS: `phantomjs --webdriver=4444` (see [Prerequisites](#prerequisites))
  * Run the Firefox Content Server locally: `npm start`
  * Run an instance of the [fxa-auth-server](https://github.com/mozilla/fxa-auth-server) at 127.0.0.1:9000.

e.g. in shell form:

```sh
export SAUCE_USERNAME=fxa-content
export SAUCE_ACCESS_KEY=ee5354a4-3d5e-47a0-84b0-0b7aaa12a720
phantomjs --webdriver=4444 &
cd fxa-auth-server
npm start &
cd ../fxa-content-server
npm start &
```

### Running the tests

To run tests locally against phantomjs:

```sh
npm test
```

To run tests against SauceLabs:

```sh
npm run test-sauce
```

### Advanced local testing using headed browsers

It is possible to run the Selenium tests against local browsers like Firefox, Chrome, and Safari.

#### Prerequisites:

  * Java JDK or JRE (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
  * Selenium Server (http://docs.seleniumhq.org/download/)

#### Configuration:

  * edit `tests/intern.js` to select the browsers to test under `environments`.
  * comment out `phantom`

#### Running the tests

  * Start the Selenium Server: `java -jar selenium-server-standalone-2.38.0.jar`
  * Stop PhantomJS if it is running.
  * from the `fxa-content-server` directory, type `npm test`


## Configuration

The default auth server is `http://api-accounts.dev.lcip.org`.  To change this,
edit `server/config/*.json` on your deployed instance.

```json
{
  "fxaccount_url": "http://your.auth.server.here.org"
}
```

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
