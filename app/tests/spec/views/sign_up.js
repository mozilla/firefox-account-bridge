/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'underscore',
  'jquery',
  'moment',
  'sinon',
  'lib/promise',
  'views/sign_up',
  'lib/session',
  'lib/auth-errors',
  'lib/metrics',
  'lib/fxa-client',
  'models/reliers/fx-desktop',
  'models/auth_brokers/base',
  '../../mocks/router',
  '../../mocks/window',
  '../../lib/helpers'
],
function (chai, _, $, moment, sinon, p, View, Session, AuthErrors, Metrics,
      FxaClient, Relier, Broker, RouterMock, WindowMock, TestHelpers) {
  var assert = chai.assert;
  var wrapAssertion = TestHelpers.wrapAssertion;

  function fillOutSignUp (email, password, opts) {
    opts = opts || {};
    var context = opts.context || window;
    var year = opts.year || '1990';
    var month = opts.month || '1';
    var date = opts.date || '1';

    context.$('[type=email]').val(email);
    context.$('[type=password]').val(password);

    if (! opts.ignoreYear) {
      $('#fxa-age-year').val(year);
      $('#fxa-age-year').change();
    }

    if (! opts.ignoreMonth) {
      $('#fxa-age-month').val(month);
      $('#fxa-age-month').change();
    }

    if (! opts.ignoreDate) {
      $('#fxa-age-date').val(date);
      $('#fxa-age-date').change();
    }

    if (context.enableSubmitIfValid) {
      context.enableSubmitIfValid();
    }
  }

  describe('views/sign_up', function () {
    var view;
    var router;
    var email;
    var metrics;
    var windowMock;
    var fxaClient;
    var relier;
    var broker;

    var now = new Date();
    var CURRENT_YEAR = now.getFullYear();

    beforeEach(function () {
      Session.clear();

      email = TestHelpers.createEmail();
      document.cookie = 'tooyoung=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      router = new RouterMock();
      windowMock = new WindowMock();
      windowMock.location.pathname = 'signup';

      metrics = new Metrics();
      relier = new Relier();
      broker = new Broker();
      fxaClient = new FxaClient();

      view = new View({
        router: router,
        metrics: metrics,
        window: windowMock,
        fxaClient: fxaClient,
        relier: relier,
        broker: broker
      });
      return view.render()
          .then(function () {
            $('#container').append(view.el);
          });
    });

    afterEach(function () {
      metrics.destroy();

      view.remove();
      view.destroy();
      document.cookie = 'tooyoung=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';

      view = router = metrics = null;
    });

    describe('render', function () {
      it('prefills email, password, and year if stored in Session (user comes from signup with existing account)', function () {
        Session.set('prefillEmail', 'testuser@testuser.com');
        Session.set('prefillPassword', 'prefilled password');
        Session.set('prefillYear', '1990');

        return view.render()
            .then(function () {
              assert.ok($('#fxa-signup-header').length);
              assert.equal(view.$('[type=email]').val(), 'testuser@testuser.com');
              assert.equal(view.$('[type=password]').val(), 'prefilled password');
              assert.ok(view.$('#fxa-1990').is(':selected'));
            });
      });

      it('prefills email with email from search parameter if Session.prefillEmail is not set', function () {
        windowMock.location.search = '?email=' + encodeURIComponent('testuser@testuser.com');

        return view.render()
            .then(function () {
              assert.equal(view.$('[type=email]').val(), 'testuser@testuser.com');
            });
      });

      it('shows choose what to sync checkbox when service is sync even after session is cleared', function () {
        relier.set('service', 'sync');
        Session.clear();

        return view.render()
            .then(function () {
              assert.equal(view.$('.customize-sync-row').length, 1);
            });
      });

      it('Shows serviceName', function () {
        var serviceName = 'my service name';
        relier.set('serviceName', serviceName);

        return view.render()
            .then(function () {
              assert.include(view.$('#fxa-signup-header').text(), serviceName);
            });
      });
    });

    describe('isValid', function () {
      it('returns true if email, password, and age are all valid', function () {
        fillOutSignUp(email, 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns false if email is empty', function () {
        fillOutSignUp('', 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns false if email is not an email address', function () {
        fillOutSignUp('testuser', 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns false if email contain one part TLD', function () {
        fillOutSignUp('a@b', 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns true if email contain two part TLD', function () {
        fillOutSignUp('a@b.c', 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns true if email contain three part TLD', function () {
        fillOutSignUp('a@b.c.d', 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns false if local side of email === 0 chars', function () {
        fillOutSignUp('@testuser.com', 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns false if local side of email > 64 chars', function () {
        var email = '';
        do {
          email += 'a';
        } while (email.length < 65);

        email += '@testuser.com';
        fillOutSignUp(email, 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns true if local side of email === 64 chars', function () {
        var email = '';
        do {
          email += 'a';
        } while (email.length < 64);

        email += '@testuser.com';
        fillOutSignUp(email, 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns false if domain side of email === 0 chars', function () {
        fillOutSignUp('testuser@', 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns false if domain side of email > 255 chars', function () {
        var domain = 'testuser.com';
        do {
          domain += 'a';
        } while (domain.length < 256);

        fillOutSignUp('testuser@' + domain, 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns true if domain side of email === 254 chars', function () {
        var domain = 'testuser.com';
        do {
          domain += 'a';
        } while (domain.length < 254);

        fillOutSignUp('a@' + domain, 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns false total length > 256 chars', function () {
        var domain = 'testuser.com';
        do {
          domain += 'a';
        } while (domain.length < 254);

        // ab@ + 254 characters = 257 chars
        fillOutSignUp('ab@' + domain, 'password', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns true if total length === 256 chars', function () {
        var email = 'testuser@testuser.com';
        do {
          email += 'a';
        } while (email.length < 256);

        fillOutSignUp(email, 'password', { context: view });
        assert.isTrue(view.isValid());
      });

      it('returns false if password is empty', function () {
        fillOutSignUp(email, '', { context: view });
        assert.isFalse(view.isValid());
      });

      it('returns false if password is invalid', function () {
        fillOutSignUp(email, 'passwor');
        assert.isFalse(view.isValid());
      });

      it('returns false if no year selected', function () {
        fillOutSignUp(email, 'password', { ignoreYear: true });
        assert.isFalse(view.isValid());
      });

      it('returns false if no month selected and the full DOB should be checked', function () {
        fillOutSignUp(email, 'password', {
          year: moment().subtract(13, 'years').year(),
          ignoreMonth: true
        });
        assert.isFalse(view.isValid());
      });

      it('returns false if no date selected and the full DOB should be checked', function () {
        fillOutSignUp(email, 'password', {
          year: moment().subtract(13, 'years').year(),
          month: moment().subtract(13, 'years').month(),
          ignoreDate: true
        });
        assert.isFalse(view.isValid());
      });
    });

    describe('showValidationErrors', function () {
      it('shows an error if the email is invalid', function (done) {
        fillOutSignUp('testuser', 'password', { context: view });

        view.on('validation_error', function (which, msg) {
          wrapAssertion(function () {
            assert.ok(msg);
          }, done);
        });

        view.showValidationErrors();
      });

      it('shows an error if the password is invalid', function (done) {
        fillOutSignUp('testuser@testuser.com', 'passwor', { context: view });

        view.on('validation_error', function (which, msg) {
          wrapAssertion(function () {
            assert.ok(msg);
          }, done);
        });

        view.showValidationErrors();
      });

      it('shows an error if no year is selected', function (done) {
        fillOutSignUp('testuser@testuser.com', 'password', { ignoreYear: true, context: view });

        view.on('validation_error', function (which, msg) {
          wrapAssertion(function () {
            assert.ok(msg);
          }, done);
        });

        view.showValidationErrors();
      });
    });

    describe('submit', function () {
      it('sends the user to `/confirm` if form filled out, not pre-verified, >= 14 years ago', function () {
        var ageToCheck = moment().subtract(14, 'years');
        var password = 'password';
        fillOutSignUp(email, password, {
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date(),
          context: view
        });

        sinon.stub(view.fxaClient, 'signUp', function () {
          return p({});
        });

        sinon.stub(view.fxaClient, 'signIn', function () {
          return p({
            verified: false
          });
        });

        return view.submit()
          .then(function () {
            assert.equal(router.page, 'confirm');
            assert.isTrue(view.fxaClient.signUp.calledWith(
                email, password, relier));
            assert.isTrue(view.fxaClient.signIn.calledWith(
                email, password, relier));
            assert.isTrue(TestHelpers.isEventLogged(metrics,
                              'signup.success'));
          });
      });

      it('notifies the broker if form filled out, pre-verified, >= 14 years ago', function () {
        relier.set('preVerifyToken', 'preverifytoken');
        var ageToCheck = moment().subtract(14, 'years');
        var password = 'password';
        fillOutSignUp(email, password, {
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date(),
          contex: view
        });

        sinon.stub(view.fxaClient, 'signUp', function () {
          return p({});
        });

        sinon.stub(view.fxaClient, 'signIn', function () {
          return p({
            verified: true
          });
        });

        sinon.stub(broker, 'afterSignIn', function () {
          return p();
        });

        return view.submit()
            .then(function () {
              assert.isTrue(broker.afterSignIn.called);
            });
      });

      it('submits form if user presses enter on the year', function (done) {
        var ageToCheck = moment().subtract(14, 'years');
        fillOutSignUp(email, 'password', {
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date(),
          context: view
        });

        sinon.stub(view, 'submit', function () {
          done();
        });

        // submit using the enter key
        var e = jQuery.Event('keydown', { which: 13 });
        $('#fxa-age-year').trigger(e);
      });

      it('sends the user to cannot_create_account screen if user selects < 13 years ago', function () {

        var ageToCheck = moment().subtract(12, 'years');
        fillOutSignUp(email, 'password', {
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date(),
          context: view
        });

        return view.submit()
          .then(function () {
            assert.equal(router.page, 'cannot_create_account');
          });
      });

      it('sends user to cannot_create_account when visiting sign up if they have already been sent there', function () {
        var ageToCheck = moment().subtract(12, 'years');
        fillOutSignUp(email, 'password', {
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date(),
          context: view
        });

        var revisitRouter = new RouterMock();
        var revisitView = new View({
          router: revisitRouter,
          relier: relier,
          fxaClient: fxaClient
        });

        return view.submit()
            .then(function () {
              assert.equal(router.page, 'cannot_create_account');
            })
            .then(function () {
              // simulate user re-visiting the /signup page after being rejected
              return revisitView.render();
            }).then(function () {
              assert.equal(revisitRouter.page, 'cannot_create_account');
            });
      });

      it('shows message allowing the user to sign in if user enters existing verified account', function () {
        sinon.stub(view.fxaClient, 'signUp', function () {
          return p.reject(AuthErrors.toError('ACCOUNT_ALREADY_EXISTS'));
        });

        fillOutSignUp(email, 'incorrect', { year: CURRENT_YEAR - 14, context: view });

        return view.submit()
          .then(function (msg) {
            assert.include(msg, '/signin');
            assert.isTrue(view.isErrorVisible());
          });
      });

      it('re-signs up unverified user with new password', function () {
        sinon.stub(view.fxaClient, 'signUp', function () {
          return p({});
        });

        sinon.stub(view.fxaClient, 'signIn', function () {
          return p({
            verified: false
          });
        });

        fillOutSignUp(email, 'incorrect', { year: CURRENT_YEAR - 14, context: view });

        return view.submit()
            .then(function () {
              assert.equal(router.page, 'confirm');
            });
      });

      it('logs, but does not display an error if user cancels signup', function () {
        sinon.stub(broker, 'beforeSignIn', function () {
          return p.reject(AuthErrors.toError('USER_CANCELED_LOGIN'));
        });

        fillOutSignUp(email, 'password', { year: CURRENT_YEAR - 14, context: view });

        return view.submit()
          .then(function () {
            assert.isTrue(broker.beforeSignIn.calledWith(email));

            assert.isFalse(view.isErrorVisible());
            assert.isTrue(TestHelpers.isEventLogged(metrics,
                'login.canceled'));
          });
      });

      it('re-throws any other errors for display', function () {
        sinon.stub(view.fxaClient, 'signUp', function () {
          return p.reject(AuthErrors.toError('SERVER_BUSY'));
        });

        fillOutSignUp(email, 'password', { year: CURRENT_YEAR - 14, context: view });

        return view.submit()
          .then(null, function (err) {
            // The errorback will not be called if the submit
            // succeeds, but the following callback always will
            // be. To ensure the errorback was called, pass
            // the error along and check its type.
            return err;
          })
          .then(function (err) {
            assert.isTrue(AuthErrors.is(err, 'SERVER_BUSY'));
          });
      });

    });

    describe('updatePasswordVisibility', function () {
      it('pw field set to text when clicked', function () {
        $('.show-password').click();
        assert.equal($('.password').attr('type'), 'text');
      });

      it('pw field set to password when clicked again', function () {
        $('.show-password').click();
        $('.show-password').click();
        assert.equal($('[type=password]').attr('type'), 'password');
      });
    });

    describe('_isUserOldEnough', function () {
      it('returns true if user is 14 year old', function () {
        var ageToCheck = moment().subtract(14, 'years');
        assert.isTrue(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns true if user is 13 years + 1 days old', function () {
        var ageToCheck = moment().subtract(13, 'years').subtract(1, 'days');
        assert.isTrue(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns true if user is 13 years and 29 days old', function () {
        var ageToCheck = moment().subtract(13, 'years').subtract(29, 'days');
        assert.isTrue(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns true if user is 13 years and 1 month old', function () {
        var ageToCheck = moment().subtract(13, 'years').subtract(1, 'months');
        assert.isTrue(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns true if user is 13 years old today - HOORAY!', function () {
        var ageToCheck = moment().subtract(13, 'years');
        assert.isTrue(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it ('returns false if user is 13 years - 1 day old - wait until tomorrow', function () {
        var ageToCheck = moment().subtract(13, 'years').add(1, 'days');
        assert.isFalse(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns false if user is 13 years - 1 month old - wait another month', function () {
        var ageToCheck = moment().subtract(13, 'years').add(1, 'months');
        assert.isFalse(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });

      it('returns false if user is 12 years old - wait another year', function () {
        var ageToCheck = moment().subtract(12, 'years');
        assert.isFalse(view._isUserOldEnough({
          year: ageToCheck.year(),
          month: ageToCheck.month(),
          date: ageToCheck.date()
        }));
      });
    });
  });
});


