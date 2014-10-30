/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'chai',
  'sinon',
  'lib/promise',
  'lib/auth-errors',
  'views/confirm_reset_password',
  'lib/session',
  'lib/metrics',
  'lib/channels/inter-tab',
  '../../mocks/fxa-client',
  'models/reliers/relier',
  'models/auth_brokers/base',
  '../../mocks/router',
  '../../mocks/window',
  '../../lib/helpers'
],
function (chai, sinon, p, AuthErrors, View, Session, Metrics,
      InterTabChannel, FxaClient, Relier, Broker, RouterMock,
      WindowMock, TestHelpers) {
  'use strict';

  var assert = chai.assert;

  describe('views/confirm_reset_password', function () {
    var view;
    var routerMock;
    var windowMock;
    var metrics;
    var fxaClient;
    var relier;
    var broker;
    var interTabChannel;

    beforeEach(function () {
      routerMock = new RouterMock();
      windowMock = new WindowMock();
      windowMock.location.pathname = 'confirm_reset_password';

      metrics = new Metrics();
      relier = new Relier();
      broker = new Broker({
        relier: relier
      });
      fxaClient = new FxaClient();
      interTabChannel = new InterTabChannel();

      Session.set('passwordForgotToken', 'fake password reset token');
      Session.set('email', 'testuser@testuser.com');

      sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
        return p(true);
      });

      view = new View({
        router: routerMock,
        window: windowMock,
        metrics: metrics,
        fxaClient: fxaClient,
        relier: relier,
        broker: broker,
        interTabChannel: interTabChannel,
        sessionUpdateTimeoutMS: 100
      });

      return view.render()
            .then(function () {
              $('#container').html(view.el);
            });
    });

    afterEach(function () {
      metrics.destroy();

      view.remove();
      view.destroy();

      view = metrics = null;
    });

    describe('render', function () {
      it('tells the broker to prepare for a password reset confirmation', function () {
        sinon.spy(broker, 'beforeResetPasswordConfirmationPoll');
        return view.render()
          .then(function () {
            assert.isTrue(broker.beforeResetPasswordConfirmationPoll.called);
          });
      });

      it('redirects to /reset_password if no passwordForgotToken', function () {
        Session.clear('passwordForgotToken');
        return view.render()
          .then(function () {
            assert.equal(routerMock.page, 'reset_password');
          });
      });

      it('`sign in` link goes to /signin in normal flow', function () {
        // Check to make sure the normal signin link is drawn
        assert.equal(view.$('a[href="/signin"]').length, 1);
        assert.equal(view.$('a[href="/force_auth?email=testuser%40testuser.com"]').length, 0);
        assert.ok($('#fxa-confirm-reset-password-header').length);
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
        sinon.stub(broker, 'isForceAuth', function () {
          return true;
        });

        var xssEmail = 'testuser@testuser.com" onclick="javascript:alert(1)"';
        Session.set('email', xssEmail);

        return view.render()
          .then(function () {
            assert.equal(view.$('a.sign-in').attr('href'), '/force_auth?email=' + encodeURIComponent(xssEmail));
            assert.isFalse(!! view.$('a.sign-in').attr('onclick'));
          });
      });
    });

    describe('_waitForConfirmation', function () {
      it('polls to check if user has verified, if not, retry', function () {
        var count = 0;
        fxaClient.isPasswordResetComplete.restore();
        sinon.stub(view.fxaClient, 'isPasswordResetComplete', function () {
          // force at least one cycle through the poll
          count++;
          return p(count === 2);
        });

        sinon.stub(view, 'setTimeout', function (callback) {
          callback();
        });

        return view._waitForConfirmation()
            .then(function () {
              assert.equal(view.fxaClient.isPasswordResetComplete.callCount, 2);
            });
      });
    });

    describe('render', function () {
      it('notifies the broker when the user has confirmed', function (done) {
        fxaClient.isPasswordResetComplete.restore();
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          // simulate the sessionToken being set in another tab.
          // simulate the login occurring in another tab.
          interTabChannel.emit('login', {
            sessionToken: 'sessiontoken'
          });
          return p(true);
        });

        sinon.stub(broker, 'afterResetPasswordConfirmationPoll', function () {
          return p();
        });

        sinon.stub(broker, 'shouldShowResetPasswordCompleteAfterPoll', function () {
          return true;
        });

        sinon.stub(view, 'navigate', function (url) {
          TestHelpers.wrapAssertion(function () {
            assert.equal(url, 'reset_password_complete');
          }, done);
        });

        view.render();
      });

      it('redirects to /signin if user verifies in a second browser', function (done) {
        sinon.stub(relier, 'isOAuth', function () {
          return false;
        });

        testSecondBrowserVerifyForcesSignIn('signin', done);
      });

      it('oauth flow redirects to /oauth/signin if user verifies in a second browser', function (done) {
        sinon.stub(relier, 'isOAuth', function () {
          return true;
        });

        testSecondBrowserVerifyForcesSignIn('oauth/signin', done);
      });

      function testSecondBrowserVerifyForcesSignIn(expectedPage, done) {
        fxaClient.isPasswordResetComplete.restore();
        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          return p(true);
        });

        sinon.stub(view, 'setTimeout', function (callback) {
          callback();
        });

        sinon.stub(view, 'navigate', function (page) {
          TestHelpers.wrapAssertion(function () {
            assert.equal(page, expectedPage);
            // session.email is used to pre-fill the email on
            // the signin page.
            assert.equal(Session.prefillEmail, 'testuser@testuser.com');
          }, done);
        });

        // email is cleared in initial render in beforeEach, reset it to
        // see if it makes it through to the redirect.
        Session.set('email', 'testuser@testuser.com');
        view.render();
      }

      it('displays an error if isPasswordResetComplete blows up', function (done) {
        fxaClient.isPasswordResetComplete.restore();

        sinon.stub(fxaClient, 'isPasswordResetComplete', function () {
          return p().then(function () {
            throw AuthErrors.toError('UNEXPECTED_ERROR');
          });
        });

        sinon.stub(view, 'displayError', function () {
          // if isPasswordResetComplete blows up, it will be after
          // view.render()'s promise has already resolved. Wait for the
          // error to be displayed.
          done();
        });

        view.render();
      });
    });

    describe('submit', function () {
      it('resends the confirmation email, shows success message', function () {
        sinon.stub(fxaClient, 'passwordResetResend', function () {
          return p(true);
        });

        return view.submit()
          .then(function () {
            assert.isTrue(view.$('.success').is(':visible'));

            assert.isTrue(fxaClient.passwordResetResend.calledWith(
                relier));
          });
      });

      it('redirects to `/reset_password` if the resend token is invalid', function () {
        sinon.stub(fxaClient, 'passwordResetResend', function () {
          return p().then(function () {
            throw AuthErrors.toError('INVALID_TOKEN', 'Invalid token');
          });
        });

        return view.submit()
              .then(function () {
                assert.equal(routerMock.page, 'reset_password');

                assert.isTrue(TestHelpers.isEventLogged(metrics,
                                  'confirm_reset_password.resend'));
              });
      });

      it('displays other error messages if there is a problem', function () {
        sinon.stub(fxaClient, 'passwordResetResend', function () {
          return p().then(function () {
            throw new Error('synthesized error from auth server');
          });
        });

        return view.submit()
              .then(function () {
                assert(false, 'unexpected success');
              }, function (err) {
                assert.equal(err.message, 'synthesized error from auth server');
              });
      });
    });

    describe('validateAndSubmit', function () {
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

      it('debounces resend calls - submit on first and forth attempt', function () {
        var count = 0;

        sinon.stub(fxaClient, 'passwordResetResend', function () {
          count++;
          return p(true);
        });

        return view.validateAndSubmit()
              .then(function () {
                assert.equal(count, 1);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(count, 1);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(count, 1);
                return view.validateAndSubmit();
              }).then(function () {
                assert.equal(count, 2);
                assert.equal(view.$('#resend:visible').length, 0);

                assert.isTrue(TestHelpers.isEventLogged(metrics,
                                  'confirm_reset_password.resend'));
                assert.isTrue(TestHelpers.isEventLogged(metrics,
                                  'confirm_reset_password.too_many_attempts'));
              });
      });
    });

    describe('a click on the signin link', function () {
      it('saves Session.email to Session.prefillEmail so user\'s email address is prefilled when browsing to /signin', function () {
        Session.set('email', 'testuser@testuser.com');

        view.$('a[href="/signin"]').click();
        assert.equal(Session.prefillEmail, 'testuser@testuser.com');
      });
    });
  });
});
