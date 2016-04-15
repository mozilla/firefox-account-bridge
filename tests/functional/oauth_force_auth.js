/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'tests/lib/helpers',
  'tests/functional/lib/helpers'
], function (intern, registerSuite, TestHelpers, FunctionalHelpers) {
  var config = intern.config;
  var OAUTH_APP = config.fxaOauthApp;

  var thenify = FunctionalHelpers.thenify;

  var clearBrowserState = thenify(FunctionalHelpers.clearBrowserState);
  var createUser = FunctionalHelpers.createUser;
  var fillOutForceAuth = FunctionalHelpers.fillOutForceAuth;
  var fillOutSignUp = thenify(FunctionalHelpers.fillOutSignUp);
  var openFxaFromRp = thenify(FunctionalHelpers.openFxaFromRp);
  var openVerificationLinkInNewTab = thenify(FunctionalHelpers.openVerificationLinkInNewTab);
  var testElementDisabled = FunctionalHelpers.testElementDisabled;
  var testElementExists = FunctionalHelpers.testElementExists;
  var testElementTextInclude = FunctionalHelpers.testElementTextInclude;
  var testElementValueEquals = FunctionalHelpers.testElementValueEquals;
  var testUrlEquals = FunctionalHelpers.testUrlEquals;
  var visibleByQSA = FunctionalHelpers.visibleByQSA;

  var PASSWORD = 'password';
  var email;

  registerSuite({
    name: 'oauth force_auth',

    beforeEach: function () {
      email = TestHelpers.createEmail();
      return this.remote
        .then(clearBrowserState(this, {
          '123done': true,
          contentServer: true
        }));
    },

    'with a registered email': function () {
      return this.remote
        .then(createUser(email, PASSWORD, { preVerified: true }))
        .then(openFxaFromRp(this, 'force_auth', { query: { email: email }}))
        .then(fillOutForceAuth(PASSWORD))

        .then(testElementExists('#loggedin'))
        // redirected back to the App
        .then(testUrlEquals(OAUTH_APP));
    },

    'with an unregistered email': function () {
      return this.remote
        .then(openFxaFromRp(this, 'force_auth', {
          header: '#fxa-signup-header',
          query: { email: email }
        }))
        .then(visibleByQSA('.error'))
        .then(testElementTextInclude('.error', 'recreate'))
        // ensure the email is filled in, and not editible.
        .then(testElementValueEquals('input[type=email]', email))
        .then(testElementDisabled('input[type=email]'))
        .then(fillOutSignUp(this, email, PASSWORD, { enterEmail: false }))

        .then(testElementExists('#fxa-confirm-header'))
        .then(openVerificationLinkInNewTab(this, email, 0))

        .switchToWindow('newwindow')
        // wait for the verified window in the new tab
        .then(testElementExists('#fxa-sign-up-complete-header'))
        // user sees the name of the RP,
        // but cannot redirect
        .then(testElementTextInclude('.account-ready-service', '123done'))

        // switch to the original window
        .closeCurrentWindow()
        .switchToWindow('')

        .then(testElementExists('#loggedin'))
        // redirected back to the App
        .then(testUrlEquals(OAUTH_APP));
    }
  });
});
