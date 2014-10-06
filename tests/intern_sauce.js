/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  './intern'
], function (intern) {
  'use strict';

  // override the main config file and adjust it to suit Sauce Labs
  intern.tunnel = 'SauceLabsTunnel';
  intern.tunnelOptions = {
    port: 4445,
    directDomains: [
      'lcip.org',
      'dev.lcip.org',

      'latest.dev.lcip.org',
      'oauth-latest.dev.lcip.org',
      '123done-latest.dev.lcip.org',

      'nightly.dev.lcip.org',
      'oauth-nightly.dev.lcip.org',
      '123done-nightly.dev.lcip.org',

      'stable.dev.lcip.org',
      'oauth-stable.dev.lcip.org',
      '123done-stable.dev.lcip.org',

      'mozaws.net',
      'stage.mozaws.net',
      'oauth.stage.mozaws.net',
      'profile.stage.mozaws.net',
      'api-accounts.stage.mozaws.net',
      '123done-stage.mozaws.net'
    ],
    skipSslDomains: [
      'latest.dev.lcip.org'
    ]
  };
  intern.functionalSuites = [
    'tests/functional',
    'tests/functional_oauth'
  ];

  if (intern.fxaContentRoot.indexOf('https://') === 0) {
    // test firefox specific flows only on HTTPS
    // this might have to change if we test more browsers in the future
    intern.functionalSuites.push('tests/functional/firefox/functional_firefox');
  }

  intern.environments = [
    { browserName: 'firefox', version: '32', platform: 'Windows 7' }
  ];

  return intern;
});
