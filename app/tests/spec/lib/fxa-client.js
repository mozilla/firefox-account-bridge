/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'mocha',
  'chai',
  'jquery',
  'lib/fxa-client'
],
function (mocha, chai, $, FxaClientWrapper) {
  /*global beforeEach, describe, it*/
  var assert = chai.assert;
  var email;
  var password = 'password';
  var client;

  describe('lib/fxa-client', function () {
    beforeEach(function () {
      client = new FxaClientWrapper();
      email = 'testuser' + Math.random() + '@testuser.com';
    });

    describe('signUp', function () {
      it('signs up a user with email/password', function (done) {
        client.signUp(email, password)
          .then(function () {
            assert.isTrue(true);
            done();
          }, function (err) {
            assert.fail(err);
            done();
          });
      });
    });

    describe('signIn', function () {
      it('signs a user in with email/password', function (done) {
        client.signUp(email, password)
          .then(function () {
            client.signIn(email, password)
                  .then(function () {
                    assert.isTrue(true);
                    done();
                  }, function (err) {
                    assert.fail(err);
                    done();
                  });
          }, function (err) {
            assert.fail(err);
            done();
          });
      });
    });

    describe('verifyCode', function () {
    });

    describe('requestPasswordReset', function () {
      it('requests a password reset', function (done) {
        client.signUp(email, password)
          .then(function () {
            client.signIn(email, password)
              .then(function () {
                client.requestPasswordReset(email)
                  .then(function () {
                    assert.isTrue(true);
                    done();
                  }, function (err) {
                    assert.fail(err);
                    done();
                  });
              });
          });
      });
    });

    describe('completePasswordReset', function () {
    });
  });
});

