/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern!object',
  'intern/chai!assert',
  'require'
], function (registerSuite, assert, require) {
  'use strict';

  var PAGE_URL = 'http://localhost:3030/confirm_reset_password';

  registerSuite({
    name: 'confirm_password_reset',

    'open page, click resend': function () {

      return this.get('remote')
        .get(require.toUrl(PAGE_URL))
        .waitForElementById('fxa-confirm-reset-password-header')

        .elementById('resend')
          .click()
        .end()

        // brittle, but some processing time.
        .wait(2000)

        // Success is showing the screen
        .elementByCssSelector('.success').isDisplayed()
          .then(function (isDisplayed) {
            assert.isTrue(isDisplayed);
          })
        .end();
    }
  });
});
