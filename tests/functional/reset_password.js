/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'intern/chai!assert',
  'require',
  'intern/node_modules/dojo/node!xmlhttprequest',
  'app/bower_components/fxa-js-client/fxa-client',
  'intern/node_modules/dojo/Deferred',
  'tests/lib/restmail',
  'tests/lib/helpers',
  'tests/functional/lib/helpers'
], function (intern, registerSuite, assert, require, nodeXMLHttpRequest, FxaClient, Deferred, restmail, TestHelpers, FunctionalHelpers) {
  'use strict';

  var config = intern.config;
  var AUTH_SERVER_ROOT = config.fxaAuthRoot;
  var EMAIL_SERVER_ROOT = config.fxaEmailRoot;
  var SIGNIN_PAGE_URL = config.fxaContentRoot + 'signin';
  var RESET_PAGE_URL = config.fxaContentRoot + 'reset_password';
  var CONFIRM_PAGE_URL = config.fxaContentRoot + 'confirm_reset_password';
  var COMPLETE_PAGE_URL_ROOT = config.fxaContentRoot + 'complete_reset_password';

  var PASSWORD = 'password';
  var user;
  var email;
  var code;
  var token;
  var client;

  var createRandomHexString = TestHelpers.createRandomHexString;

  function setTokenAndCodeFromEmail(user, emailNumber) {
    var fetchCount = emailNumber + 1;
    return restmail(EMAIL_SERVER_ROOT + '/mail/' + user, fetchCount)
      .then(function (emails) {
        // token and code are hex values
        token = emails[emailNumber].html.match(/token=([a-f\d]+)/)[1];
        code = emails[emailNumber].html.match(/code=([a-f\d]+)/)[1];
      });
  }


  registerSuite({
    name: 'reset_password same browser flow',

    setup: function () {
      // timeout after 90 seconds
      this.timeout = 90000;

      var self = this;
      email = TestHelpers.createEmail();
      user = TestHelpers.emailToUser(email);
      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });
      return client.signUp(email, PASSWORD, { preVerified: true })
          .then(function () {
            // clear localStorage to avoid pollution from other tests.
            return FunctionalHelpers.clearBrowserState(self);
          });
    },

    'visit confirmation screen without initiating reset_password, user is redirected to /reset_password': function () {
      return this.get('remote')
        .get(require.toUrl(CONFIRM_PAGE_URL))
        .setFindTimeout(intern.config.pageLoadTimeout)

        // user is immediately redirected to /reset_password if they have no
        // sessionToken.
        // Success is showing the screen
        .findById('fxa-reset-password-header');
    },

    'open /reset_password page from /signin': function () {
      return this.get('remote')
        .get(require.toUrl(SIGNIN_PAGE_URL))
        .findByCssSelector('a[href="/reset_password"]')
          .click()
        .end()

        .findByCssSelector('input[type=email]')
          .click()
          .type(email)
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        .findById('fxa-confirm-reset-password-header')
        .end();
    },

    'open confirm_reset_password page, click resend': function () {
      return this.get('remote')
        .get(require.toUrl(CONFIRM_PAGE_URL))
        .findById('resend')
          .click()
        .end()

        .then(function () {
          return restmail(EMAIL_SERVER_ROOT + '/mail/' + user, 2);
        })

        // Success is showing the success message
        .findByCssSelector('.success').isDisplayed()
          .then(function (isDisplayed) {
            assert.isTrue(isDisplayed);
          })
        .end()

        .findById('resend')
          .click()
        .end()

        .findById('resend')
          .click()
        .end()

        // Stills shows success message
        .findByCssSelector('.success').isDisplayed()
          .then(function (isDisplayed) {
            assert.isTrue(isDisplayed);
          })
        .end();
    },

    'start reset - get token and code from email': function () {
      return setTokenAndCodeFromEmail(user, 1);
    },

    'open complete page with missing token shows damaged screen': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with malformed token shows damaged screen': function () {
      var malformedToken = createRandomHexString(token.length - 1);
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + malformedToken + '&code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with invalid token shows expired screen': function () {
      var invalidToken = createRandomHexString(token.length);
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + invalidToken + '&code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-expired-header')
        .end();
    },

    'open complete page with missing code shows damaged screen': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with malformed code shows damanged screen': function () {
      var malformedCode = createRandomHexString(code.length - 1);
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + malformedCode + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with missing email shows damaged screen': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + code;

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with malformed email shows damaged screen': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + code + '&email=invalidemail';

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-damaged-header')
        .end();
    },

    'open complete page with valid parameters': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findByCssSelector('form input#password')
          .click()
          .type(PASSWORD)
        .end()

        .findByCssSelector('form input#vpassword')
          .click()
          .type(PASSWORD)
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        .findById('fxa-reset-password-complete-header')
        .end();
    }

  });

  registerSuite({
    name: 'try to re-use a link',

    setup: function () {
      // timeout after 90 seconds
      this.timeout = 90000;

      email = TestHelpers.createEmail();
      user = TestHelpers.emailToUser(email);
      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });

      return client.signUp(email, PASSWORD, { preVerified: true })
          .then(function () {
            return client.passwordForgotSendCode(email);
          })
          .then(function () {
            return setTokenAndCodeFromEmail(user, 0);
          });
    },

    'complete reset': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .setFindTimeout(intern.config.pageLoadTimeout)
        .findByCssSelector('form input#password')
          .click()
          .type(PASSWORD)
        .end()

        .findByCssSelector('form input#vpassword')
          .click()
          .type(PASSWORD)
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        .findById('fxa-reset-password-complete-header')
        .end();
    },

    'attempt to complete page with already used link, click resend': function () {
      var url = COMPLETE_PAGE_URL_ROOT + '?token=' + token + '&code=' + code + '&email=' + encodeURIComponent(email);

      return this.get('remote')
        .get(require.toUrl(url))
        .findById('fxa-reset-link-expired-header')
        .end()

        .findById('resend')
          .click()
        .end()

        .findById('fxa-confirm-reset-password-header')
        .end();
    }
  });


  registerSuite({
    name: 'reset_password with email specified on URL',

    setup: function () {
      email = TestHelpers.createEmail();
      var client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });
      return client.signUp(email, PASSWORD, { preVerified: true });
    },

    'open page with email on query params': function () {
      var url = RESET_PAGE_URL + '?email=' + email;
      return this.get('remote')
        .get(require.toUrl(url))
        .setFindTimeout(intern.config.pageLoadTimeout)
        .findByCssSelector('form input.email')
          .getAttribute('value')
          .then(function (resultText) {
            // email address should be pre-filled from the query param.
            assert.equal(resultText, email);
          })
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        .findById('fxa-confirm-reset-password-header')
        .end();
    }
  });


  registerSuite({
    name: 'confirm_password page transition',

    setup: function () {
      email = TestHelpers.createEmail();
      user = TestHelpers.emailToUser(email);

      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });

      return client.signUp(email, PASSWORD, { preVerified: true });
    },

    'page transitions after completion': function () {
      return this.get('remote')
        .get(require.toUrl(RESET_PAGE_URL))
        .findByCssSelector('form input.email')
          .click()
          .type(email)
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        .findById('fxa-confirm-reset-password-header')
          .then(function () {
            return client.passwordChange(email, PASSWORD, 'newpassword');
          })
        .end()

        .findById('fxa-signin-header')
        .end();
    }
  });

  registerSuite({
    name: 'reset_password with unknown email',

    setup: function () {
      email = TestHelpers.createEmail();
      return FunctionalHelpers.clearBrowserState(this);
    },

    'open /reset_password page, enter unknown email': function () {
      return this.get('remote')
        .get(require.toUrl(RESET_PAGE_URL))
        .findByCssSelector('input[type=email]')
          .click()
          .clearValue()
          .type(email)
        .end()

        .findByCssSelector('button[type="submit"]')
          .click()
        .end()

        // The error area shows a link to /signup
        .findByCssSelector('.error a[href="/signup"]')
          .click()
        .end()

        .findById('fxa-signup-header')
        .end()

        .findByCssSelector('input[type=email]')
          .getAttribute('value')
          .then(function (resultText) {
            // check the email address was written
            assert.equal(resultText, email);
          })
        .end()

        .findById('fxa-signup-header')
        .end()

        // email is prefilled on signup page
        .findByCssSelector('input[type=email]')
          .getAttribute('value')
          .then(function (resultText) {
            // check the email address was written
            assert.equal(resultText, email);
          })
        .end();
    }
  });
});
