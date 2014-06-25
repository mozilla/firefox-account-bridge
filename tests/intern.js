/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define(['intern/lib/args'], function (args) {
  'use strict';

  var fxaAuthRoot = args.fxaAuthRoot ? args.fxaAuthRoot : 'http://127.0.0.1:9000/v1';
  var fxaContentRoot = args.fxaContentRoot ? args.fxaContentRoot : 'http://127.0.0.1:3030/';
  var fxaEmailRoot = args.fxaEmailRoot ? args.fxaEmailRoot : 'http://127.0.0.1:9001';
  var fxaOauthApp = args.fxaOauthApp ? args.fxaOauthApp : 'http://127.0.0.1:8080/';

  return {
    // The port on which the instrumenting proxy will listen
    proxyPort: 9090,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://127.0.0.1:9090/',
    fxaAuthRoot: fxaAuthRoot,
    fxaContentRoot: fxaContentRoot,
    fxaEmailRoot: fxaEmailRoot,
    fxaOauthApp: fxaOauthApp,

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
      'selenium-version': '2.39.0'
    },

    // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
    // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
    // capabilities options specified for an environment will be copied as-is
    environments: [
      { browserName: 'firefox' }
    ],

    reporters: ['console'],

    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 3,

    // Whether or not to start Sauce Connect before running tests
    useSauceConnect: false,

    // Connection information for the remote WebDriver service. If using Sauce Labs, keep your username and password
    // in the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables unless you are sure you will NEVER be
    // publishing this configuration file somewhere
    webdriver: {
      host: 'localhost',
      port: 4444
    },

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: [ 'tests/functional/mocha', 'tests/functional' ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /./
  };

});
