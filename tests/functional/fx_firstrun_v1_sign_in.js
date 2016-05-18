/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'intern/node_modules/dojo/node!xmlhttprequest',
  'app/bower_components/fxa-js-client/fxa-client',
  'tests/lib/helpers',
  'tests/functional/lib/helpers'
], function (intern, registerSuite, nodeXMLHttpRequest, FxaClient,
  TestHelpers, FunctionalHelpers) {
  var config = intern.config;
  var AUTH_SERVER_ROOT = config.fxaAuthRoot;
  var PAGE_URL = config.fxaContentRoot + 'signin?context=iframe&service=sync';
  var NO_REDIRECT_URL = PAGE_URL + '&haltAfterSignIn=true';

  var email;
  var PASSWORD = '12345678';
  var client;

  var listenForFxaCommands = FunctionalHelpers.listenForWebChannelMessage;
  var respondToWebChannelMessage = FunctionalHelpers.respondToWebChannelMessage;
  var testIsBrowserNotified = function (context, message) {
    message = message.replace(/:/g, '-');
    return function () {
      return context.remote
       .findByCssSelector('#message-' + message)
       .end();
    };
  };

  registerSuite({
    name: 'Firstrun sign_in',

    beforeEach: function () {
      var self = this;
      email = TestHelpers.createEmail();
      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });

      return client.signUp(email, PASSWORD, { preVerified: true })
        .then(function () {
          return FunctionalHelpers.clearBrowserState(self);
        });
    },

    afterEach: function () {
      return FunctionalHelpers.clearBrowserState(this);
    },

    'sign in with an already existing account': function () {
      var self = this;

      return FunctionalHelpers.openPage(this, PAGE_URL, '#fxa-signin-header')
        .execute(listenForFxaCommands)

        .then(respondToWebChannelMessage(self, 'fxaccounts:can_link_account', { ok: true } ))


        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, PASSWORD);
        })

        .findByCssSelector('#fxa-settings-header')
        .end()

        .then(testIsBrowserNotified(self, 'fxaccounts:can_link_account'))
        .then(testIsBrowserNotified(self, 'fxaccounts:login'))

        // user should be unable to sign out.
        .then(FunctionalHelpers.noSuchElement(self, '#signout'))
        .end();
    },

    'sign in with an existing account with the `haltAfterSignIn=true` query parameter': function () {
      var self = this;

      return FunctionalHelpers.openPage(this, NO_REDIRECT_URL, '#fxa-signin-header')
        .execute(listenForFxaCommands)

        .then(respondToWebChannelMessage(self, 'fxaccounts:can_link_account', { ok: true } ))


        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, PASSWORD);
        })

        .then(testIsBrowserNotified(self, 'fxaccounts:can_link_account'))
        .then(testIsBrowserNotified(self, 'fxaccounts:login'))

        .then(FunctionalHelpers.noSuchElement(self, '#fxa-settings-header'))
        .end();
    },

    'sign in, cancel merge warning': function () {
      var self = this;
      return FunctionalHelpers.openPage(this, PAGE_URL, '#fxa-signin-header')
        .execute(listenForFxaCommands)

        .then(respondToWebChannelMessage(self, 'fxaccounts:can_link_account', { ok: false } ))


        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, PASSWORD);
        })

        .then(testIsBrowserNotified(self, 'fxaccounts:can_link_account'))

        // user should not transition to the next screen
        .then(FunctionalHelpers.noSuchElement(self, '#fxa-settings-header'))
        .end();
    }
  });
});
