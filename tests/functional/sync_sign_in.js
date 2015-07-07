/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'require',
  'intern/node_modules/dojo/node!xmlhttprequest',
  'app/bower_components/fxa-js-client-packaged/fxa-client',
  'tests/lib/helpers',
  'tests/functional/lib/helpers',
  'tests/functional/lib/fx-desktop'
], function (intern, registerSuite, require, nodeXMLHttpRequest, FxaClient,
        TestHelpers, FunctionalHelpers, FxDesktopHelpers) {
  var config = intern.config;
  var PAGE_URL = config.fxaContentRoot + 'signin?service=sync';

  var AUTH_SERVER_ROOT = config.fxaAuthRoot;

  var client;
  var email;
  var PASSWORD = '12345678';
  var accountData;

  var listenForFxaCommands = FxDesktopHelpers.listenForFxaCommands;
  var testIsBrowserNotifiedOfLogin = FxDesktopHelpers.testIsBrowserNotifiedOfLogin;

  function verifyUser(user, index) {
    return FunctionalHelpers.getVerificationHeaders(user, index)
      .then(function (headers) {
        var code = headers['x-verify-code'];
        return client.verifyCode(accountData.uid, code);
      });
  }

  registerSuite({
    name: 'Firefox Desktop Sync sign_in',

    beforeEach: function () {
      email = TestHelpers.createEmail();
      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });
      var self = this;
      return client.signUp(email, PASSWORD)
        .then(function (result) {
          accountData = result;
          return result;
        })
        .then(function () {
          // clear localStorage to avoid pollution from other tests.
          return FunctionalHelpers.clearBrowserState(self);
        });
    },

    teardown: function () {
      return FunctionalHelpers.clearBrowserState(this);
    },

    'sign in verified': function () {
      var self = this;
      return verifyUser(email, 0)
        .then(function () {
          return self.remote
            .get(require.toUrl(PAGE_URL))
            .setFindTimeout(intern.config.pageLoadTimeout)
            .execute(listenForFxaCommands)

            .findByCssSelector('#fxa-signin-header')
            .end()

            .then(function () {
              return FunctionalHelpers.fillOutSignIn(self, email, PASSWORD);
            })

            .then(function () {
              return testIsBrowserNotifiedOfLogin(self, email, { checkVerified: true });
            });
        });
    },


    'unverified': function () {
      var self = this;

      return self.remote
        .get(require.toUrl(PAGE_URL))
        .setFindTimeout(intern.config.pageLoadTimeout)
        .execute(listenForFxaCommands)

        .findByCssSelector('#fxa-signin-header')
        .end()

        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, PASSWORD);
        })

        .findByCssSelector('#fxa-confirm-header')
        .end()

        .then(function () {
          return testIsBrowserNotifiedOfLogin(self, email);
        });
    }
  });
});
