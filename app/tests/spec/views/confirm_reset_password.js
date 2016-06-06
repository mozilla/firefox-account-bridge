/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var AuthErrors = require('lib/auth-errors');
  var Backbone = require('backbone');
  var Broker = require('models/auth_brokers/base');
  var chai = require('chai');
  var FxaClient = require('../../mocks/fxa-client');
  var Metrics = require('lib/metrics');
  var Notifier = require('lib/channels/notifier');
  var p = require('lib/promise');
  var Relier = require('models/reliers/relier');
  var sinon = require('sinon');
  var Storage = require('lib/storage');
  var TestHelpers = require('../../lib/helpers');
  var User = require('models/user');
  var View = require('views/confirm_reset_password');
  var WindowMock = require('../../mocks/window');

  var assert = chai.assert;

  describe('views/confirm_reset_password', function () {
    var EMAIL = 'testuser@testuser.com';
    var LOGIN_MESSAGE_TIMEOUT_MS = 300;
    var PASSWORD_FORGOT_TOKEN = 'fake password reset token';
    var VERIFICATION_POLL_TIMEOUT_MS = 100;

    var broker;
    var fxaClient;
    var metrics;
    var model;
    var notifier;
    var relier;
    var user;
    var view;
    var windowMock;

    function createDeps() {
      destroyView();

      fxaClient = new FxaClient();
      metrics = new Metrics();
      model = new Backbone.Model();
      notifier = new Notifier();
      relier = new Relier();
      windowMock = new WindowMock();

      sinon.stub(windowMock, 'setTimeout', window.setTimeout.bind(window));
      sinon.stub(windowMock, 'clearTimeout', window.clearTimeout.bind(window));

      broker = new Broker({
        relier: relier
      });

      user = new User({
        storage: Storage.factory('localStorage')
      });

      sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
        return p(true);
      });

      model.set({
        email: EMAIL,
        passwordForgotToken: PASSWORD_FORGOT_TOKEN
      });

      createView();
    }

    function createView () {
      view = new View({
        broker: broker,
        fxaClient: fxaClient,
        loginMessageTimeoutMS: LOGIN_MESSAGE_TIMEOUT_MS,
        metrics: metrics,
        model: model,
        notifier: notifier,
        relier: relier,
        user: user,
        verificationPollMS: VERIFICATION_POLL_TIMEOUT_MS,
        viewName: 'confirm_reset_password',
        window: windowMock
      });
    }

    function destroyView () {
      if (view) {
        view.remove();
        view.destroy();
        view = null;
      }
    }

    afterEach(function () {
      metrics.destroy();
      metrics = null;

      destroyView();
    });

    describe('render', function () {
      beforeEach(function () {
        createDeps();

        sinon.spy(broker, 'persistVerificationData');

        return view.render()
          .then(function () {
            $('#container').html(view.el);
          });
      });

      afterEach(function () {
        destroyView();
      });

      it('redirects to /reset_password if no passwordForgotToken', function () {
        model.unset('passwordForgotToken');

        createView();

        sinon.spy(view, 'navigate');

        return view.render()
          .then(function () {
            assert.isTrue(view.navigate.calledWith('reset_password'));
          });
      });

      it('`sign in` link goes to /signin in normal flow', function () {
        return view.render()
          .then(function () {
            // Check to make sure the normal signin link is drawn
            assert.equal(view.$('a[href="/signin"]').length, 1);
            assert.equal(view.$('a[href="/force_auth?email=testuser%40testuser.com"]').length, 0);
            assert.ok($('#fxa-confirm-reset-password-header').length);
          });
      });

      it('`sign in` link goes to /force_auth in force auth flow', function () {
        sinon.stub(broker, 'isForceAuth', function () {
          return true;
        });

        return view.render()
          .then(function () {
            // Check to make sure the signin link goes "back"
            assert.equal(view.$('a[href="/signin"]').length, 0);
            assert.equal(view.$('a[href="/force_auth?email=testuser%40testuser.com"]').length, 1);
          });
      });

      it('does not allow XSS emails through for forceAuth', function () {
        createDeps();

        sinon.stub(broker, 'isForceAuth', function () {
          return true;
        });

        var xssEmail = 'testuser@testuser.com" onclick="javascript:alert(1)"';

        model.set({
          email: xssEmail,
          passwordForgotToken: PASSWORD_FORGOT_TOKEN
        });

        createView();

        return view.render()
          .then(function () {
            assert.equal(view.$('a.sign-in').attr('href'), '/force_auth?email=' + encodeURIComponent(xssEmail));
            assert.isFalse(!! view.$('a.sign-in').attr('onclick'));
          });
      });

      describe('sign-in button', function () {
        describe('with relier.resetPasswordConfirm===true', function () {
          beforeEach(function () {
            relier.set('resetPasswordConfirm', true);
            return view.render();
          });

          it('is visible', function () {
            assert.ok(view.$('.sign-in').length);
          });
        });

        describe('with relier.resetPasswordConfirm===false', function () {
          beforeEach(function () {
            relier.set('resetPasswordConfirm', false);
            return view.render();
          });

          it('is not visible', function () {
            assert.equal(view.$('.sign-in').length, 0);
          });
        });
      });
    });

    describe('afterVisible', function () {
      beforeEach(function () {
        createDeps();

        sinon.spy(broker, 'persistVerificationData');
      });

      afterEach(function () {
        destroyView();
      });

      it('calls `_finishPasswordResetSameBrowser` if `_waitForConfirmation` returns session info', function () {
        var sessionInfo = { sessionToken: 'sessiontoken' };

        sinon.stub(view, '_waitForConfirmation', function () {
          return p(sessionInfo);
        });

        sinon.stub(view, '_finishPasswordResetSameBrowser', function () {
          return p();
        });

        return view.afterVisible()
          .then(function () {
            assert.isTrue(broker.persistVerificationData.called);
            assert.isTrue(
              view._finishPasswordResetSameBrowser.calledWith(sessionInfo));
            assert.isTrue(TestHelpers.isEventLogged(
              metrics, 'confirm_reset_password.verification.success'));
          });
      });

      it('calls `_finishPasswordResetDifferentBrowser` if `_waitForConfirmation` does not return session info', function () {
        sinon.stub(view, '_waitForConfirmation', function () {
          return p(null);
        });

        sinon.stub(view, '_finishPasswordResetDifferentBrowser', function () {
          return p();
        });


        return view.afterVisible()
          .then(function () {
            assert.isTrue(broker.persistVerificationData.called);
            assert.isTrue(
              view._finishPasswordResetDifferentBrowser.called);
            assert.isTrue(TestHelpers.isEventLogged(
              metrics, 'confirm_reset_password.verification.success'));
          });
      });

      it('sets the `resetPasswordConfirm` flag back to `true` after the reset completes', function () {
        sinon.stub(view, '_waitForConfirmation', function () {
          return p(null);
        });

        sinon.stub(view, '_finishPasswordResetDifferentBrowser', function () {
          return p();
        });

        relier.set('resetPasswordConfirm', false);

        return view.afterVisible()
          .then(function () {
            assert.equal(relier.get('resetPasswordConfirm'), true);
            assert.isTrue(TestHelpers.isEventLogged(
              metrics, 'confirm_reset_password.verification.success'));
          });
      });

      it('displays errors if `_waitForConfirmation` returns an error', function () {
        sinon.stub(view, '_waitForConfirmation', function () {
          return p.reject(AuthErrors.toError('UNEXPECTED_ERROR'));
        });

        sinon.spy(view, 'displayError');

        return view.afterVisible()
          .then(function () {
            var err = view.displayError.args[0][0];
            assert.isTrue(AuthErrors.is(err, 'UNEXPECTED_ERROR'));

            assert.isTrue(broker.persistVerificationData.called);
            assert.isFalse(TestHelpers.isEventLogged(
              metrics, 'confirm_reset_password.verification.success'));
          });
      });
    });

    describe('_waitForConfirmation', function () {
      beforeEach(function () {
        createDeps();
        fxaClient.isPasswordResetComplete.restore();
      });

      afterEach(function () {
        destroyView();
      });

      it('waits for the server confirmation if `complete_reset_password_tab_open` message is not received', function () {
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          return p(fxaClient.isPasswordResetComplete.callCount === 3);
        });

        return view._waitForConfirmation()
          .then(function (sessionInfo) {
            assert.isNull(sessionInfo);
          });
      });

      it('stops waiting if server returns an error', function () {
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          return p.reject(AuthErrors.toError('UNEXPECTED_ERROR'));
        });

        sinon.spy(view, '_stopWaiting');
        return view._waitForConfirmation()
          .then(assert.fail, function (err) {
            assert.isTrue(AuthErrors.is(err, 'UNEXPECTED_ERROR'));
            assert.isTrue(view._stopWaiting.called);
          });
      });

      it('waits for the `SIGNED_IN` if a `COMPLETE_RESET_PASSWORD_TAB_OPEN` is received while an XHR request is outstanding', function () {
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          // synthesize the message received while the 2nd XHR request is
          // outstanding.
          if (fxaClient.isPasswordResetComplete.callCount === 2) {
            notifier.trigger(Notifier.COMPLETE_RESET_PASSWORD_TAB_OPEN);
            return p(false).delay(100);
          }

          return p(false);
        });

        setTimeout(function () {
          notifier.trigger(Notifier.SIGNED_IN, {
            sessionToken: 'sessiontoken'
          });
        }, VERIFICATION_POLL_TIMEOUT_MS * 4);

        return view._waitForConfirmation()
          .then(function (sessionInfo) {
            assert.equal(fxaClient.isPasswordResetComplete.callCount, 2);
            assert.equal(sessionInfo.sessionToken, 'sessiontoken');
          });
      });

      it('waits for the `SIGNED_IN` notification if a `COMPLETE_RESET_PASSWORD_TAB_OPEN` notification is received', function () {
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          if (fxaClient.isPasswordResetComplete.callCount === 2) {
            // synthesize message sent afterr response received.
            setTimeout(function () {
              notifier.trigger(Notifier.COMPLETE_RESET_PASSWORD_TAB_OPEN);
            }, 10);
          }

          return p(false);
        });

        setTimeout(function () {
          notifier.trigger(Notifier.SIGNED_IN, {
            sessionToken: 'sessiontoken'
          });
        }, VERIFICATION_POLL_TIMEOUT_MS * 4);

        return view._waitForConfirmation()
          .then(function (sessionInfo) {
            assert.equal(fxaClient.isPasswordResetComplete.callCount, 2);
            assert.equal(sessionInfo.sessionToken, 'sessiontoken');
          });
      });
    });


    describe('_finishPasswordResetDifferentBrowser', function () {
      beforeEach(function () {
        createDeps();
      });

      afterEach(function () {
        destroyView();
      });

      it('redirects to page specified by broker if user verifies in a second browser', function () {
        sinon.stub(broker, 'transformLink', function () {
          // synthesize the OAuth broker.
          return '/oauth/signin';
        });

        sinon.spy(view, 'navigate');

        view._finishPasswordResetDifferentBrowser();

        // leading slash should be removed from the url.
        assert(view.navigate.calledWith('oauth/signin'));
      });
    });

    describe('_finishPasswordResetSameBrowser', function () {
      beforeEach(function () {
        createDeps();

        sinon.stub(broker, 'afterResetPasswordConfirmationPoll', function () {
          return p();
        });

        sinon.stub(user, 'setSignedInAccount', function (account) {
          return p(account);
        });

        sinon.stub(view, 'navigate', function () {
          // nothing to do
        });

        var account = user.initAccount({
          uid: 'uid'
        });

        return user.setAccount(account);
      });

      afterEach(function () {
        destroyView();
      });

      describe('with an unknown account uid', function () {
        var err;

        beforeEach(function () {
          return view._finishPasswordResetSameBrowser({ uid: 'unknown uid' })
            .then(assert.fail, function (_err) {
              err = _err;
            });
        });

        it('throws', function () {
          assert.isTrue(AuthErrors.is(err, 'UNEXPECTED_ERROR'));
        });
      });

      describe('non direct access', function () {
        beforeEach(function () {
          sinon.stub(relier, 'isDirectAccess', function () {
            return false;
          });

          user._persistAccount({
            displayName: 'fx user',
            email: 'a@a.com',
            uid: 'uid'
          });

          return view._finishPasswordResetSameBrowser({
            keyFetchToken: 'keyfetchtoken',
            uid: 'uid',
            unwrapBKey: 'unwrapbkey'
          });
        });

        it('notifies the user model with the updated signed in account', function () {
          assert.isTrue(user.setSignedInAccount.called);
          var account = user.setSignedInAccount.args[0][0];

          assert.deepEqual(
            account.pick('displayName', 'email', 'keyFetchToken', 'uid', 'unwrapBKey'),
            {
              displayName: 'fx user',
              email: 'a@a.com',
              keyFetchToken: 'keyfetchtoken',
              uid: 'uid',
              unwrapBKey: 'unwrapbkey'
            }
          );
        });

        it('notifies the broker', function () {
          assert.isTrue(broker.afterResetPasswordConfirmationPoll.called);
        });

        it('redirects to `/reset_password_complete`', function () {
          assert.isTrue(view.navigate.calledWith('reset_password_complete'));
        });
      });

      describe('direct access', function () {
        beforeEach(function () {
          sinon.stub(relier, 'isDirectAccess', function () {
            return true;
          });

          return view._finishPasswordResetSameBrowser({ uid: 'uid' });
        });

        it('redirects to `/settings`', function () {
          assert.isTrue(view.navigate.calledWith('settings'));
        });
      });
    });

    describe('submit', function () {
      beforeEach(function () {
        createDeps();

        return view.render()
          .then(function () {
            $('#container').html(view.el);
          });
      });

      afterEach(function () {
        destroyView();
      });

      it('resends the confirmation email, shows success message', function () {
        sinon.stub(view, 'retryResetPassword', function () {
          return p(true);
        });

        return view.submit()
          .then(function () {
            assert.isTrue(view.$('.success').is(':visible'));

            assert.isTrue(view.retryResetPassword.calledOnce);
            assert.isTrue(view.retryResetPassword.calledWith(
              EMAIL,
              PASSWORD_FORGOT_TOKEN
            ));
          });
      });

      it('redirects to `/reset_password` if the resend token is invalid', function () {
        sinon.stub(view, 'retryResetPassword', function () {
          return p.reject(AuthErrors.toError('INVALID_TOKEN', 'Invalid token'));
        });

        sinon.spy(view, 'navigate');

        return view.submit()
          .then(function () {
            assert.isTrue(view.navigate.calledWith('reset_password'));

            assert.isTrue(TestHelpers.isEventLogged(metrics,
                              'confirm_reset_password.resend'));
          });
      });

      it('displays other error messages if there is a problem', function () {
        sinon.stub(view, 'retryResetPassword', function () {
          return p.reject(new Error('synthesized error from auth server'));
        });

        return view.submit()
          .then(assert.fail, function (err) {
            assert.equal(err.message, 'synthesized error from auth server');
          });
      });
    });

    describe('validateAndSubmit', function () {
      beforeEach(function () {
        createDeps();

        return view.render()
          .then(function () {
            $('#container').html(view.el);
          });
      });

      afterEach(function () {
        destroyView();
      });

      it('only called after click on #resend', function () {
        var count = 0;
        view.validateAndSubmit = function () {
          count++;
        };

        view.$('section').click();
        assert.equal(count, 0);

        view.$('#resend').click();
        assert.equal(count, 1);
      });

      it('debounces resend calls - submit on first four attempts', function () {
        sinon.stub(view, 'retryResetPassword', function () {
          return p(true);
        });

        return view.validateAndSubmit()
              .then(function () {
                assert.equal(view.retryResetPassword.callCount, 1);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(view.retryResetPassword.callCount, 2);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(view.retryResetPassword.callCount, 3);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(view.retryResetPassword.callCount, 4);
                assert.equal(view.$('#resend:visible').length, 0);

                assert.isTrue(TestHelpers.isEventLogged(metrics,
                                  'confirm_reset_password.resend'));
                assert.isTrue(TestHelpers.isEventLogged(metrics,
                                  'confirm_reset_password.too_many_attempts'));
              });
      });
    });
  });
});
