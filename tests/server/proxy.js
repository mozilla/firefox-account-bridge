/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'intern/chai!assert',
  'intern/dojo/node!../../server/lib/configuration',
  'intern/dojo/node!request'
], function (intern, registerSuite, assert, config, request) {
  'use strict';

  var httpsUrl = config.get('public_url');

  var suite = {
    name: 'auth & oauth server proxy'
  };

  // At this time, proxy is not enabled in production or stage. So
  // skip the tests (register a suite with no tests yet).
  if (intern.config.fxaProduction) {
    registerSuite(suite);
    return;
  }

  suite['#get /config returns proxied `authServerUrl` and `oAuthUrl` for IE8'] = function () {
    var dfd = this.async(1000);

    request(httpsUrl + '/config', {
      headers: {
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)'
      }
    }, dfd.callback(function (err, res) {
      var results = JSON.parse(res.body);

      assert.equal(results.authServerUrl, config.get('public_url') + '/auth');
      assert.equal(results.oAuthUrl, config.get('public_url') + '/oauth');
      assert.equal(results.profileUrl, config.get('public_url') + '/profile_api');
    }, dfd.reject.bind(dfd)));
  };

  suite['#get /config returns standard `authServerUrl` and `oAuthUrl` for all other browsers'] = function () {
    var dfd = this.async(1000);

    request(httpsUrl + '/config', dfd.callback(function (err, res) {
      var results = JSON.parse(res.body);

      assert.equal(results.authServerUrl, config.get('fxaccount_url'));
      assert.equal(results.oAuthUrl, config.get('oauth_url'));
    }, dfd.reject.bind(dfd)));
  };

  suite['#auth server proxied GET request'] = function () {
    var dfd = this.async(1000);

    var route = '/';

    request(httpsUrl + route, {
      method: 'GET'
    }, dfd.callback(function (err, res) {
      assert.equal(res.statusCode, 200);
    }, dfd.reject.bind(dfd)));
  };

  suite['#auth server proxied POST request'] = function () {
    var dfd = this.async(1000);

    var route = '/auth/v0/expect-gone';

    request(httpsUrl + route, {
      method: 'POST'
    }, dfd.callback(function (err, res) {
      assert.equal(res.statusCode, 410);
    }, dfd.reject.bind(dfd)));
  };

  /*

  // TODO - Enable when adding more tests for OAuth - see #1246

  suite['#oauth server proxied GET request'] = function () {
    var dfd = this.async(1000);

    var route = '/oauth/ver.txt';

    request(httpsUrl + route, {
      method: 'GET'
    }, dfd.callback(function (err, res) {
      assert.equal(res.statusCode, 200);
    }, dfd.reject.bind(dfd)));
  };

  suite['#oauth server proxied POST request'] = function () {
    var dfd = this.async(1000);

    var route = '/oauth/v1/authorization';

    request(httpsUrl + route, {
      method: 'POST'
    }, dfd.callback(function (err, res) {
      assert.equal(res.statusCode, 400);
    }, dfd.reject.bind(dfd)));
  };

  suite['#profile server proxied GET request'] = function () {
    var dfd = this.async(1000);


    var route = '/profile_api/';

    request(httpsUrl + route, {
      method: 'GET'
    }, dfd.callback(function (err, res) {
      assert.equal(res.statusCode, 200);
      assert.include(res.body, 'commit');
    }, dfd.reject.bind(dfd)));
  };
  */

  registerSuite(suite);
});
