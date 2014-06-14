/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern!object',
  'intern/chai!assert',
  'intern/dojo/node!../../server/lib/configuration',
  'intern/dojo/node!request'
], function (registerSuite, assert, config, request) {
  'use strict';

  var httpsUrl = config.get('public_url');
  var httpUrl = httpsUrl.replace(config.get('port'), config.get('http_port'));

  var suite = {
    name: 'front end routes'
  };

  var routes = {
    '/config': { statusCode: 200, headerAccept: 'application/json' },
    '/signin': { statusCode: 200 },
    '/signin_complete': { statusCode: 200 },
    '/signup': { statusCode: 200 },
    '/signup_complete': { statusCode: 200 },
    '/confirm': { statusCode: 200 },
    '/settings': { statusCode: 200 },
    '/change_password': { statusCode: 200 },
    '/legal': { statusCode: 200 },
    '/legal/terms': { statusCode: 200 },
    '/legal/privacy': { statusCode: 200 },
    '/cannot_create_account': { statusCode: 200 },
    '/verify_email': { statusCode: 200 },
    '/reset_password': { statusCode: 200 },
    '/confirm_reset_password': { statusCode: 200 },
    '/complete_reset_password': { statusCode: 200 },
    '/reset_password_complete': { statusCode: 200 },
    '/delete_account': { statusCode: 200 },
    '/force_auth': { statusCode: 200 },
    '/tests/index.html': { statusCode: 200 },
    '/tests/index.html?coverage': { statusCode: 200 },
    '/500.html': { statusCode: 200 },
    '/503.html': { statusCode: 200 },
    '/ver.json': { statusCode: 200, headerAccept: 'application/json' },
    '/non_existent': { statusCode: 404 },
    '/boom': { statusCode: 500 },
    '/legal/non_existent': { statusCode: 404 },
    '/en-US/legal/non_existent': { statusCode: 404 },
    '/cookies_disabled': { statusCode: 200 }
  };

  var iframeAllowedRoutes = [
    '/legal/terms',
    '/legal/privacy'
  ];

  function routeTest(route, expectedStatusCode, requestOptions) {
    suite['#https get ' + httpsUrl + route] = function () {
      var dfd = this.async(1000);

      request(httpsUrl + route, requestOptions, dfd.callback(function (err, res) {
        checkHeaders(route, res.headers);
        assert.equal(res.statusCode, expectedStatusCode);
      }, dfd.reject.bind(dfd)));
    };

    // test to ensure http->https redirection works as expected.
    suite['#http get ' + httpUrl + route] = function () {
      var dfd = this.async(1000);

      request(httpUrl + route, requestOptions, dfd.callback(function (err, res) {
        checkHeaders(route, res.headers);
        assert.equal(res.statusCode, expectedStatusCode);
      }, dfd.reject.bind(dfd)));
    };
  }

  Object.keys(routes).forEach(function (key) {
    var requestOptions = {
      headers: {
        'Accept': routes[key].headerAccept || 'text/html'
      }
    };

    routeTest(key, routes[key].statusCode, requestOptions);
  });

  registerSuite(suite);

  function checkHeaders(route, headers) {
    if (iframeAllowedRoutes.indexOf(route) >= 0) {
      assert.notOk(headers.hasOwnProperty('x-frame-options'));
    } else {
      assert.ok(headers.hasOwnProperty('x-frame-options'));
    }
    if (config.get('csp')) {
      if (config.get('csp_mode') === 'report-only') {
        assert.ok(headers.hasOwnProperty('content-security-policy-report-only'));
      } else {
        assert.ok(headers.hasOwnProperty('content-security-policy'));
      }
    }
  }

});
