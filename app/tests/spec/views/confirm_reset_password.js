/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'mocha',
  'chai',
  'views/confirm_reset_password',
  'lib/fxa-client',
  '../../mocks/router'
],
function (mocha, chai, View, FxaClient, RouterMock) {
  /*global describe, beforeEach, afterEach, it*/
  var assert = chai.assert;

  describe('views/confirm_reset_password', function () {
    var view, router;

    beforeEach(function () {
      router = new RouterMock();
      view = new View({
        router: router
      });
      view.render();

      $('#container').html(view.el);
    });

    afterEach(function () {
      view.remove();
      view.destroy();
    });

    describe('constructor creates it', function () {
      it('is drawn', function () {
        assert.ok($('#fxa-confirm-reset-password-header').length);
      });
    });

    describe('resend', function () {
      it('resends the confirmation email', function (done) {
        var client = new FxaClient();
        var email = 'user' + Math.random() + '@testuser.com';

        client.signUp(email, 'password')
              .then(function () {
                return client.passwordReset(email);
              })
              .then(function () {
                   view.on('resent', done);
                  view.resend();
                });

      });
    });

  });
});


