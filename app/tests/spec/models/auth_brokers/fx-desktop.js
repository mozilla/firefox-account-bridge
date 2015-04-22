/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'chai',
  'sinon',
  'underscore',
  'models/auth_brokers/fx-desktop',
  'models/user',
  'lib/constants',
  'lib/auth-errors',
  'lib/channels/null',
  'lib/promise',
  'lib/session',
  '../../../mocks/window'
], function (chai, sinon, _, FxDesktopAuthenticationBroker, User,
        Constants, AuthErrors, NullChannel, p, Session, WindowMock) {
  var assert = chai.assert;

  describe('models/auth_brokers/fx-desktop', function () {
    var windowMock;
    var channelMock;
    var broker;
    var user;
    var account;

    beforeEach(function () {
      windowMock = new WindowMock();
      channelMock = new NullChannel();
      user = new User();
      account = user.initAccount({
        email: 'testuser@testuser.com'
      });

      broker = new FxDesktopAuthenticationBroker({
        window: windowMock,
        channel: channelMock,
        session: Session
      });
    });

    describe('afterLoaded', function () {
      it('sends a `loaded` message', function () {
        sinon.stub(channelMock, 'send', function (message, data, done) {
          if (message === 'loaded') {
            done(null);
          }
        });

        return broker.afterLoaded()
          .then(function () {
            assert.isTrue(channelMock.send.called);
          });
      });
    });

    describe('beforeSignIn', function () {
      it('is happy if the user clicks `yes`', function () {
        sinon.stub(channelMock, 'send', function (message, data, done) {
          if (message === 'can_link_account') {
            done(null, { data: { ok: true }});
          }
        });

        return broker.beforeSignIn('testuser@testuser.com')
          .then(function () {
            assert.isTrue(channelMock.send.called);
          });
      });

      it('throws a USER_CANCELED_LOGIN error if user rejects', function () {
        sinon.stub(channelMock, 'send', function (message, data, done) {
          if (message === 'can_link_account') {
            done(null, { data: {} });
          }
        });

        return broker.beforeSignIn('testuser@testuser.com')
          .then(assert.fail, function (err) {
            assert.isTrue(AuthErrors.is(err, 'USER_CANCELED_LOGIN'));
            assert.isTrue(channelMock.send.called);
          });
      });

      it('swallows errors returned by the browser', function () {
        sinon.stub(channelMock, 'send', function (message, data, done) {
          if (message === 'can_link_account') {
            done(new Error('uh oh'));
          }
        });

        sinon.spy(console, 'error');

        return broker.beforeSignIn('testuser@testuser.com')
          .then(function () {
            assert.isTrue(console.error.called);
            console.error.restore();
          });
      });
    });

    describe('_notifyRelierOfLogin', function () {
      it('sends a `login` message to the channel', function () {
        var data;
        sinon.stub(channelMock, 'send', function (message, _data, done) {
          if (message === 'login') {
            data = _data;

            done(null);
          }
        });

        return broker._notifyRelierOfLogin(account)
          .then(function () {
            assert.equal(data.email, 'testuser@testuser.com');
            assert.isFalse(data.verified);
            assert.isFalse(data.verifiedCanLinkAccount);
            assert.isTrue(channelMock.send.called);
          });
      });

      it('sends a `login` message to the channel using current account data', function () {
        var data;
        sinon.stub(channelMock, 'send', function (message, _data, done) {
          if (message === 'login') {
            data = _data;

            done(null);
          }
        });

        return broker._notifyRelierOfLogin(account)
          .then(function () {
            assert.equal(data.email, 'testuser@testuser.com');
            assert.isFalse(data.verified);
            assert.isFalse(data.verifiedCanLinkAccount);
            assert.isTrue(channelMock.send.called);
          });
      });

      it('tells the window not to re-verify if the user can link accounts if the question has already been asked', function () {
        var data;
        sinon.stub(channelMock, 'send', function (message, _data, done) {
          if (message === 'can_link_account') {
            return done(null, { data: { ok: true }});
          } else if (message === 'login') {
            data = _data;
            return done(null);
          }
        });

        return broker.beforeSignIn('testuser@testuser.com')
          .then(function () {
            return broker._notifyRelierOfLogin(account);
          })
          .then(function () {
            assert.equal(data.email, 'testuser@testuser.com');
            assert.isFalse(data.verified);
            assert.isTrue(data.verifiedCanLinkAccount);
            assert.isTrue(channelMock.send.called);
          });
      });

      it('indicates whether the account is verified', function () {
        // set account as verified
        account.set('verified', true);

        var data;
        sinon.stub(channelMock, 'send', function (message, _data, done) {
          if (message === 'can_link_account') {
            return done(null, { data: { ok: true }});
          } else if (message === 'login') {
            data = _data;
            return done(null);
          }
        });

        return broker.beforeSignIn('testuser@testuser.com')
          .then(function () {
            return broker._notifyRelierOfLogin(account);
          })
          .then(function () {
            assert.isTrue(data.verified);
          });
      });
    });

    describe('afterSignIn', function () {
      it('notifies the channel of login', function () {
        sinon.stub(broker, '_notifyRelierOfLogin', function () {
          return p();
        });

        return broker.afterSignIn(account)
          .then(function () {
            assert.isTrue(broker._notifyRelierOfLogin.calledWith(account));
          });
      });
    });

    describe('beforeSignUpConfirmationPoll', function () {
      it('notifies the channel of login, halts the flow', function () {
        sinon.stub(broker, '_notifyRelierOfLogin', function () {
          return p();
        });

        return broker.beforeSignUpConfirmationPoll(account)
          .then(function (result) {
            assert.isTrue(broker._notifyRelierOfLogin.calledWith(account));
            assert.isTrue(result.halt);
          });
      });
    });

    describe('afterResetPasswordConfirmationPoll', function () {
      it('notifies the channel of login', function () {
        sinon.stub(broker, '_notifyRelierOfLogin', function () {
          return p();
        });

        return broker.afterResetPasswordConfirmationPoll()
          .then(function () {
            assert.isTrue(broker._notifyRelierOfLogin.called);
          });
      });
    });

    describe('afterChangePassword', function () {
      it('notifies the channel of change_password with the new login info', function () {
        sinon.spy(channelMock, 'send', function (message, data, done) {
          done(null);
        });

        account.set({
          uid: 'uid',
          sessionToken: 'session_token',
          sessionTokenContext: 'sync',
          unwrapBKey: 'unwrap_b_key',
          keyFetchToken: 'key_fetch_token',
          customizeSync: true,
          verified: true,
          notSent: 'not_sent'
        });

        return broker.afterChangePassword(account)
          .then(function () {
            var args = channelMock.send.args[0];
            assert.equal(args[0], 'change_password');
            assert.equal(args[1].email, 'testuser@testuser.com');
            assert.equal(args[1].uid, 'uid');
            assert.equal(args[1].sessionToken, 'session_token');
            assert.equal(args[1].sessionTokenContext, 'sync');
            assert.equal(args[1].unwrapBKey, 'unwrap_b_key');
            assert.equal(args[1].customizeSync, true);
            assert.equal(args[1].verified, true);
            assert.isFalse('notSent' in args[1]);
          });
      });
    });

    describe('afterDeleteAccount', function () {
      it('notifies the channel of delete_account', function () {
        sinon.spy(channelMock, 'send', function (message, data, done) {
          done(null);
        });

        account.set('uid', 'uid');

        return broker.afterDeleteAccount(account)
          .then(function () {
            var args = channelMock.send.args[0];
            assert.equal(args[0], 'delete_account');
            assert.equal(args[1].email, 'testuser@testuser.com');
            assert.equal(args[1].uid, 'uid');
          });
      });
    });

  });
});
