/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const Account = require('models/account');
  const { assert } = require('chai');
  const AuthErrors = require('lib/auth-errors');
  const Constants = require('lib/constants');
  const Device = require('models/device');
  const AttachedClients = require('models/attached-clients');
  const FxaClient = require('lib/fxa-client');
  const MarketingEmailErrors = require('lib/marketing-email-errors');
  const Notifier = require('lib/channels/notifier');
  const p = require('lib/promise');
  const OAuthApp = require('models/oauth-app');
  const Session = require('lib/session');
  const SentryMetrics = require('lib/sentry');
  const sinon = require('sinon');
  const Storage = require('lib/storage');
  const User = require('models/user');

  const CODE = 'verification code';
  const EMAIL = 'a@a.com';
  const SESSION_TOKEN = 'session token';
  const UUID = '12345678-1234-1234-1234-1234567890ab';

  describe('models/user', function () {
    let fxaClientMock;
    let metrics;
    let notifier;
    let sentryMetrics;
    let storage;
    let user;

    function testRemoteSignInMessageSent(account) {
      assert.equal(notifier.triggerRemote.callCount, 1);
      const args = notifier.triggerRemote.args[0];
      assert.lengthOf(args, 2);
      assert.equal(args[0], notifier.COMMANDS.SIGNED_IN);

      assert.deepEqual(
        args[1], account.pick('keyFetchToken', 'sessionToken', 'sessionTokenContext', 'uid', 'unwrapBKey'));
    }

    beforeEach(function () {
      fxaClientMock = new FxaClient();
      metrics = {
        logError: sinon.spy(),
        logNumStoredAccounts: sinon.spy(),
        setFlowModel: sinon.spy()
      };
      notifier = new Notifier();
      sentryMetrics = new SentryMetrics();
      storage = new Storage();
      user = new User({
        metrics: metrics,
        notifier: notifier,
        sentryMetrics: sentryMetrics,
        storage,
        uniqueUserId: UUID
      });
    });

    afterEach(function () {
      user = null;
    });

    describe('initAccount', function () {
      let account;
      let email = 'a@a.com';

      beforeEach(function () {
        account = user.initAccount({
          email: email
        });
      });

      it('creates an account', function () {
        assert.equal(account.get('email'), email);
        assert.deepEqual(account.pick('email'), { email: email });
      });
    });

    it('isSyncAccount', function () {
      const account = user.initAccount({
        email: 'email',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC
      });

      assert.isTrue(user.isSyncAccount(account));
    });

    it('getAccountByUid', function () {
      return user.setAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          assert.equal(user.getAccountByUid('uid').get('uid'), 'uid');
        });
    });

    it('getAccountByEmail', function () {
      return user.setAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          assert.equal(user.getAccountByEmail('email').get('email'), 'email');
        });
    });

    it('getAccountByEmail gets the last added if there are multiple', function () {
      return user.setAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          return user.setAccount({ email: 'email', uid: 'uid2' });
        })
        .then(function () {
          return user.setAccount({ email: 'email', uid: 'uid3' });
        })
        .then(function () {
          assert.equal(user.getAccountByEmail('email').get('uid'), 'uid3');
        });
    });

    describe('sessionStatus', () => {
      it('checks and updates passed in account', () => {
        const account = user.initAccount({ email: 'TESTUSER@testuser.com', uid: 'uid' });
        sinon.spy(user, 'getSignedInAccount');
        sinon.spy(user, 'setAccount');
        sinon.stub(account, 'sessionStatus', () => p({ email: 'testuser@testuser.com' }));

        return user.sessionStatus(account)
          .then((signedInAccount) => {
            assert.isFalse(user.getSignedInAccount.called);
            assert.isTrue(user.setAccount.calledOnce);
            assert.isTrue(user.setAccount.calledWith(account));
            assert.strictEqual(signedInAccount, account);
          });
      });

      it('checks and updates the currently signed in account if no account given', () => {
        const account = user.initAccount({ email: 'TESTUSER@testuser.com', uid: 'uid' });
        sinon.stub(user, 'getSignedInAccount', () => account);
        sinon.spy(user, 'setAccount');
        sinon.stub(account, 'sessionStatus', () => p({ email: 'testuser@testuser.com' }));

        return user.sessionStatus()
          .then((signedInAccount) => {
            assert.isTrue(user.setAccount.calledOnce);
            assert.isTrue(user.setAccount.calledWith(account));
            assert.strictEqual(signedInAccount, account);
          });
      });

      it('propagates errors from the Account', () => {
        const account = user.initAccount({ email: 'email', uid: 'uid' });
        sinon.stub(user, 'getSignedInAccount', () => account);
        sinon.stub(account, 'sessionStatus', () => p.reject(AuthErrors.toError('INVALID_TOKEN')));

        return user.sessionStatus()
          .then(assert.fail, (err) => {
            assert.isTrue(AuthErrors.is(err, 'INVALID_TOKEN'));
          });
      });
    });

    it('getSignedInAccount', function () {
      const account = user.initAccount({
        email: 'email',
        uid: 'uid'
      });
      return user.setSignedInAccount(account)
        .then(function () {
          assert.equal(user.getSignedInAccount().get('uid'), account.get('uid'));
        });
    });

    it('getChooserAccount', function () {
      return user.setSignedInAccount({
        email: 'email',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC,
        uid: 'uid2'
      })
      .then(function () {
        return user.setSignedInAccount({ email: 'email', uid: 'uid' });
      })
      .then(function () {
        assert.equal(user.getChooserAccount().get('uid'), 'uid2');
      });
    });

    it('clearSignedInAccount', function () {
      sinon.spy(notifier, 'triggerRemote');
      return user.setSignedInAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          user.clearSignedInAccount();
          assert.isTrue(user.getSignedInAccount().isDefault());
          assert.equal(user.getAccountByUid('uid').get('uid'), 'uid');
          assert.equal(notifier.triggerRemote.callCount, 1);
          var args = notifier.triggerRemote.args[0];
          assert.lengthOf(args, 2);
          assert.equal(args[0], notifier.COMMANDS.SIGNED_OUT);
        });
    });

    it('removeAllAccounts', function () {
      return user.setAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          return user.setAccount({ email: 'email', uid: 'uid2' });
        })
        .then(function () {
          user.removeAllAccounts();
          assert.isTrue(user.getAccountByUid('uid').isDefault());
          assert.isTrue(user.getAccountByUid('uid2').isDefault());
        });
    });

    it('removeAccount', function () {
      var account = { email: 'email', uid: 'uid' };
      return user.setSignedInAccount(account)
        .then(function () {
          user.removeAccount(account);
          assert.isTrue(user.getAccountByUid(account.uid).isDefault());
          assert.isTrue(user.getSignedInAccount().isDefault());
        });
    });

    describe('deleteAccount', function () {
      var account;

      beforeEach(function () {
        account = user.initAccount({
          email: 'testuser@testuser.com',
          uid: 'uid'
        });

        sinon.stub(account, 'destroy', function () {
          return p();
        });

        sinon.spy(notifier, 'triggerAll');

        user._persistAccount(account);

        return user.deleteAccount(account, 'password');
      });

      it('should delegate to the account to remove itself', function () {
        assert.isTrue(account.destroy.calledOnce);
        assert.isTrue(account.destroy.calledWith('password'));
      });

      it('should remove the account from storage', function () {
        assert.isNull(user._getAccount(account.get('uid')));
      });

      it('should trigger a notification', function () {
        assert.isTrue(notifier.triggerAll.calledWith(notifier.COMMANDS.DELETE, {
          uid: account.get('uid')
        }));
      });
    });

    it('setAccount', function () {
      return user.setAccount({ email: 'email', uid: 'uid' });
    });

    describe('_persistAccount', () => {
      let account;

      beforeEach(() => {
        sinon.spy(storage, 'set');

        account = new Account({
          keyFetchToken: 'key-fetch-token',
          sessionToken: 'session-token'
        });
      });

      describe('account has uid', () => {
        it('writes the account to storage', () => {
          account.set('uid', 'uid');
          user._persistAccount(account);

          assert.isTrue(storage.set.calledOnce);
          assert.isTrue(storage.set.calledWith('accounts'));

          const accountData = storage.get('accounts');
          assert.deepEqual(accountData.uid, {
            // keyFetchToken does not persistent
            sessionToken: 'session-token',
            uid: 'uid'
          });

          assert.isFalse(metrics.logError.called);
        });
      });

      describe('account does not have a uid', () => {
        it('does not write the account to storage, logs an error', () => {
          account.unset('uid');
          user._persistAccount(account);

          assert.isFalse(storage.set.called);
          assert.isTrue(metrics.logError.calledOnce);
          const err = metrics.logError.args[0][0];
          assert.isTrue(AuthErrors.is(err, 'ACCOUNT_HAS_NO_UID'));
          assert.equal(err.context, 'persistAccount');
        });
      });
    });

    it('setSignedInAccount', function () {
      sinon.spy(notifier, 'triggerRemote');
      return user.setSignedInAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          assert.equal(user.getSignedInAccount().get('uid'), 'uid');
          assert.equal(notifier.triggerRemote.callCount, 0);
        });
    });


    describe('in memory caching of signed in account', function () {
      it('getSignedInAccount returns same instance from setSignedInAccount', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });
        return user.setSignedInAccount(account)
          .then(function () {
            assert.strictEqual(user.getSignedInAccount(), account);
          });
      });

      it('account is not cached in memory if setAccount fails', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });

        return user.setSignedInAccount({ email: 'email', uid: 'foo' })
          .then(function () {
            sinon.stub(user, 'setAccount', function () {
              return p.reject(AuthErrors.toError('UNEXPECTED_ERROR'));
            });
            return user.setSignedInAccount(account);
          })
          .then(assert.fail, function (err) {
            assert.isTrue(AuthErrors.is(err, 'UNEXPECTED_ERROR'));
            assert.isFalse(user.getSignedInAccount() === account);
          });
      });

      it('getSignedInAccount returns same instance when called multiple times', function () {
        return user.setSignedInAccount({ email: 'email', uid: 'uid' })
          .then(function () {
            assert.strictEqual(user.getSignedInAccount(), user.getSignedInAccount());
          });
      });

      it('getSignedInAccount returns same instance as getChooserAccount', function () {
        return user.setSignedInAccount({ email: 'email', uid: 'uid' })
          .then(function () {
            assert.strictEqual(user.getSignedInAccount(), user.getChooserAccount());
          });
      });

      it('getSignedInAccount does not return previously cached account after clearSignedInAccount', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });
        return user.setSignedInAccount(account)
          .then(function () {
            user.clearSignedInAccount();
            assert.isFalse(user.getSignedInAccount() === account);
          });
      });

      it('getSignedInAccount does not return previously cached account after removeAccount', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });
        return user.setSignedInAccount(account)
          .then(function () {
            user.removeAccount(account);
            assert.isFalse(user.getSignedInAccount() === account);
          });
      });

      it('getSignedInAccount does not return previously cached account after removeAllAccounts', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });
        return user.setSignedInAccount(account)
          .then(function () {
            user.removeAllAccounts();
            assert.isFalse(user.getSignedInAccount() === account);
          });
      });

      it('getSignedInAccount does not return previously cached account after setSignedInAccountByUid with different account uid', function () {
        var uid = 'abc123';
        var account = user.initAccount({ email: 'email', uid: 'uid' });

        return user.setSignedInAccount(account)
          .then(function () {
            return user.setAccount({ email: 'email', uid: uid })
              .then(function () {
                user.setSignedInAccountByUid(uid);
                assert.isFalse(user.getSignedInAccount() === account);
              });
          });
      });

      it('getSignedInAccount returns previously cached account after setSignedInAccountByUid with same account uid', function () {
        var account = user.initAccount({ email: 'email', uid: 'uid' });

        return user.setSignedInAccount(account)
          .then(function () {
            user.setSignedInAccountByUid('uid');
            assert.strictEqual(user.getSignedInAccount(), account);
          });
      });
    });

    it('setSignedInAccountByUid works if account is already cached', function () {
      var uid = 'abc123';
      sinon.spy(notifier, 'triggerRemote');
      return user.setSignedInAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          return user.setAccount({ email: 'email', uid: uid })
            .then(function () {
              user.setSignedInAccountByUid(uid);
              assert.equal(user.getSignedInAccount().get('uid'), uid);
              assert.equal(notifier.triggerRemote.callCount, 0);
            });
        });
    });

    it('setSignedInAccountByUid does nothing if account is not cached', function () {
      var uid = 'abc123';

      return user.setSignedInAccount({ email: 'email', uid: 'uid' })
        .then(function () {
          user.setSignedInAccountByUid(uid);
          assert.equal(user.getSignedInAccount().get('uid'), 'uid');
        });
    });


    it('does not upgrade if already upgraded', function () {
      var accountData = {
        email: 'a@a.com',
        sessionToken: 'session token',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC,
        uid: 'uid'
      };
      Session.set('cachedCredentials', accountData);

      sinon.stub(user, 'getSignedInAccount', function () {
        return user.initAccount({
          email: 'b@b.com',
          sessionToken: 'session token'
        });
      });

      sinon.stub(user, 'setSignedInAccount', function () { });

      return user.upgradeFromSession(Session, fxaClientMock)
        .then(function () {
          assert.isTrue(user.getSignedInAccount.called);
          assert.isTrue(user.getAccountByEmail('b@b.com').isDefault());
        });
    });

    it('upgrades an old Sync account session', function () {
      var accountData = {
        email: 'a@a.com',
        sessionToken: 'session token',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC,
        uid: 'uid'
      };
      Session.set('cachedCredentials', accountData);

      sinon.stub(user, 'setSignedInAccount', function () { });

      return user.upgradeFromSession(Session, fxaClientMock)
        .then(function () {
          assert.isTrue(user.setSignedInAccount.calledWith(accountData));
        });
    });

    it('upgrades an old Sync account session and ignores regular account session with the same email', function () {
      var accountData = {
        email: 'a@a.com',
        sessionToken: 'session token',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC,
        uid: 'uid'
      };
      Session.set('cachedCredentials', accountData);
      Session.set('email', 'a@a.com');
      Session.set('sessionToken', 'session token too');

      sinon.stub(user, 'setSignedInAccount', function () {
        return p();
      });

      return user.upgradeFromSession(Session, fxaClientMock)
        .then(function () {
          assert.isTrue(user.setSignedInAccount.calledOnce);
          assert.isTrue(user.setSignedInAccount.calledWith(accountData));
        });
    });

    it('upgrades a regular account session', function () {
      Session.set('email', 'a@a.com');
      Session.set('sessionToken', 'session token');

      sinon.stub(fxaClientMock, 'sessionStatus', function () {
        return {
          uid: 'uid'
        };
      });

      sinon.stub(user, 'setSignedInAccount', function () {
        return p();
      });

      return user.upgradeFromSession(Session, fxaClientMock)
        .then(function () {
          assert.isTrue(fxaClientMock.sessionStatus.calledWith('session token'));
          assert.isTrue(user.setSignedInAccount.calledWith({
            email: 'a@a.com',
            sessionToken: 'session token',
            sessionTokenContext: undefined,
            uid: 'uid'
          }));
        });
    });

    it('upgrades an old Sync account session and a regular account session with a different email', function () {
      var accountData = {
        email: 'a@a.com',
        sessionToken: 'session token',
        sessionTokenContext: Constants.SESSION_TOKEN_USED_FOR_SYNC,
        uid: 'uid'
      };
      Session.set('cachedCredentials', accountData);
      Session.set('email', 'b@b.com');
      Session.set('sessionToken', 'session token too');

      sinon.stub(fxaClientMock, 'sessionStatus', function () {
        return {
          uid: 'uid too'
        };
      });

      sinon.stub(user, 'setSignedInAccount', function () {
        return p();
      });

      return user.upgradeFromSession(Session, fxaClientMock)
        .then(function () {
          assert.isTrue(fxaClientMock.sessionStatus.calledWith('session token too'));
          assert.isTrue(user.setSignedInAccount.calledTwice);
        });
    });

    describe('upgradeFromFilteredData', function () {
      describe('with old style account data', function () {
        /*eslint-disable sorting/sort-object-props */
        // data is taken from localStorage of a browser profile
        // which suffered from #3466.
        var unfilteredAccounts = {
          'old-style': {
            accountData: {
              email: 'old-style@testuser.com',
              sessionToken: '9643f74d37871a572a053628109fa90f2c0e00274185bc26f391be13b0f1053a',
              sessionTokenContext: null,
              uid: 'old-style'
            },
            assertion: {
              _fxaClient: {
                _client: {
                  request: {
                    baseUri: 'https://latest.dev.lcip.org/auth/v1',
                    timeout: 30000
                  }
                },
                _signUpResendCount: 0,
                _passwordResetResendCount: 0,
                _interTabChannel: {}
              },
              _audience: 'https://oauth-latest.dev.lcip.org'
            },
            oAuthClient: {},
            profileClient: {
              profileUrl: 'https://latest.dev.lcip.org/profile'
            },
            fxaClient: {
              _client: {
                request: {
                  baseUri: 'https://latest.dev.lcip.org/auth/v1',
                  timeout: 30000
                }
              },
              _signUpResendCount: 0,
              _passwordResetResendCount: 0,
              _interTabChannel: {}
            },
            oAuthClientId: 'ea3ca969f8c6bb0d',
            uid: 'old-style',
            email: 'old-style@testuser.com',
            sessionToken: '9643f74d37871a572a053628109fa90f2c0e00274185bc26f391be13b0f1053a',
            sessionTokenContext: null,
            lastLogin: 1416927764004
          },
          'new-style': {
            email: 'new-style@testuser.com',
            sessionToken: '9643f74d37871a572a053628109fa90f2c0e00274185bc26f391be13b0f1053b',
            sessionTokenContext: null,
            uid: 'new-style'
          }
          /*eslint-enable sorting/sort-object-props */
        };

        beforeEach(function () {
          user._storage.set('accounts', unfilteredAccounts);

          sinon.spy(user, '_persistAccount');

          return user.upgradeFromUnfilteredAccountData();
        });

        it('only persists accounts that need to be persisted', function () {
          assert.equal(user._persistAccount.callCount, 1);
        });

        it('filters banned keys from old style account', function () {
          var upgraded = user._accounts()['old-style'];
          var bannedKeys = [
            'accountData',
            'assertion',
            'fxaClient',
            'oAuthClient',
            'profileClient'
          ];

          bannedKeys.forEach(function (bannedKey) {
            assert.notProperty(upgraded, bannedKey);
          });
        });

        it('saves allowed keys from old style account', function () {
          var upgraded = user._accounts()['old-style'];
          var allowedKeys = Account.ALLOWED_KEYS;

          allowedKeys.forEach(function (allowedKey) {
            assert.equal(
              upgraded[allowedKey], unfilteredAccounts['old-style'][allowedKey]);
          });
        });
      });
    });

    describe('removeAccountsWithInvalidUid', () => {
      const ACCOUNT_DATA = {
        '': { lastLogin: 1488298413174 },
        'uid1': { lastLogin: 1488298413174, uid: 'uid1' },
        'undefined': { lastLogin: 1488298413174 },
      };
      beforeEach(() => {
        storage.set('accounts', ACCOUNT_DATA);

        return user.removeAccountsWithInvalidUid();
      });

      it('removes accounts w/ empty or undefined uid', () => {
        /*
         * Remove accounts with empty or `undefined` uids.
         * See #4769. w/ e10s enabled, post account reset,
         * a phantom account with a uid of `undefined` was
         * being written to localStorage. These accounts
         * are garbage, get rid of them.
         */
        const accounts = user._accounts();
        assert.lengthOf(Object.keys(accounts), 1);
        assert.ok(accounts.uid1);
        assert.deepEqual(accounts.uid1, ACCOUNT_DATA.uid1);
      });
    });

    describe('signInAccount', function () {
      var account;
      var relierMock = {};

      describe('with a new account', function () {
        beforeEach(function () {
          account = user.initAccount({ email: 'email', uid: 'uid' });

          sinon.stub(account, 'signIn', function () {
            return p();
          });

          sinon.stub(account, 'get', function (property) {
            if (property === 'verified') {
              return true;
            }

            return property;
          });

          sinon.stub(account, 'retrySignUp', function () {
            return p();
          });

          sinon.spy(user, 'setSignedInAccount');

          sinon.spy(notifier, 'triggerRemote');

          return user.signInAccount(
            account, 'password', relierMock, { resume: 'resume token'});
        });

        it('delegates to the account', function () {
          assert.isTrue(account.signIn.calledWith(
            'password',
            relierMock,
            {
              resume: 'resume token'
            }
          ));
        });

        it('saves the account', function () {
          assert.isTrue(user.setSignedInAccount.calledWith(account));
        });

        it('notifies remote listeners of the signin', function () {
          testRemoteSignInMessageSent(account);
        });

        it('did not call account.retrySignUp', function () {
          assert.strictEqual(account.retrySignUp.callCount, 0);
        });

        it('signOutAccount behaves correctly', () => {
          sinon.stub(account, 'signOut', () => p());
          sinon.spy(user, 'clearSignedInAccount');

          return user.signOutAccount(account)
            .then(() => {
              assert.equal(account.signOut.callCount, 1);
              assert.lengthOf(account.signOut.args[0], 0);

              assert.equal(user.clearSignedInAccount.callCount, 1);
              assert.lengthOf(user.clearSignedInAccount.args[0], 0);
            });
        });
      });

      describe('with an already saved account', function () {
        beforeEach(function () {
          account = user.initAccount({
            displayName: 'fx user',
            email: 'email',
            uid: 'uid'
          });

          var oldAccount = user.initAccount({
            email: 'email',
            permissions: { foo: { bar: true } },
            uid: 'uid2'
          });

          sinon.stub(account, 'signIn', function () {
            return p();
          });

          sinon.stub(account, 'get', function (property) {
            if (property === 'verified') {
              return true;
            }

            return property;
          });

          sinon.stub(account, 'retrySignUp', function () {
            return p();
          });

          sinon.stub(user, 'setSignedInAccount', function () {
            return p(account);
          });

          sinon.stub(user, 'getAccountByUid', function () {
            return oldAccount;
          });

          return user.signInAccount(account, 'password', relierMock);
        });

        it('merges data with old and new account', function () {
          var updatedAccount = user.setSignedInAccount.args[0][0];
          assert.deepEqual(
            updatedAccount.getClientPermissions('foo'), {
              bar: true
            });
          assert.equal(updatedAccount.get('displayName'), 'fx user');
        });

        it('did not call account.retrySignUp', function () {
          assert.strictEqual(account.retrySignUp.callCount, 0);
        });
      });
    });

    describe('signUpAccount', function () {
      var account;
      var relierMock = {};

      beforeEach(function () {
        account = user.initAccount({ email: 'email', uid: 'uid' });
        sinon.stub(account, 'signUp', function () {
          return p();
        });
        sinon.stub(user, 'setSignedInAccount', function () {
          return p();
        });

        return user.signUpAccount(
          account, 'password', relierMock, { resume: 'resume token'});
      });

      it('delegates to the account', function () {
        assert.isTrue(account.signUp.calledWith(
          'password',
          relierMock,
          {
            resume: 'resume token'
          }
        ));
      });

      it('stores the updated data', function () {
        assert.isTrue(user.setSignedInAccount.calledWith(account));
      });
    });

    describe('signOutAccount', () => {
      let account;

      beforeEach(() => {
        sinon.stub(user, 'removeAccount', () => {});
        account = user.initAccount({ email: 'email', uid: 'uid' });
      });

      describe('request completes as expected', () => {
        it('delegates to the account, clears account info', () => {
          sinon.stub(account, 'signOut', () => p());

          return user.signOutAccount(account)
            .then(() => {
              assert.isTrue(account.signOut.calledOnce);
              assert.isTrue(user.removeAccount.calledOnce);
              assert.isTrue(user.removeAccount.calledWith(account));
            });
        });
      });

      describe('request fails', () => {
        it('delegates to the account, clears account info anyways', () => {
          sinon.stub(account, 'signOut', () => {
            return p.reject(AuthErrors.toError('INVALID_TOKEN'));
          });

          return user.signOutAccount(account)
            .then(assert.fail, (err) => {
              assert.isTrue(AuthErrors.is(err, 'INVALID_TOKEN'));
              assert.isTrue(account.signOut.calledOnce);
              assert.isTrue(user.removeAccount.calledOnce);
              assert.isTrue(user.removeAccount.calledWith(account));
            });
        });
      });
    });

    describe('completeAccountSignUp', function () {
      var account;

      beforeEach(function () {
        account = user.initAccount({ email: 'email', uid: 'uid' });

        sinon.spy(notifier, 'triggerRemote');
      });

      describe('without a basket error', function () {
        beforeEach(function () {
          account = user.initAccount({ email: 'email', uid: 'uid' });
          sinon.stub(account, 'verifySignUp', function () {
            return p();
          });
        });

        describe('without a sessionToken', function () {
          beforeEach(function () {
            return user.completeAccountSignUp(account, CODE);
          });

          it('delegates to the account', function () {
            assert.isTrue(account.verifySignUp.calledWith(CODE));
          });

          it('does not notify remotes of signin', function () {
            assert.isFalse(notifier.triggerRemote.called);
          });
        });

        describe('with a sessionToken', function () {
          beforeEach(function () {
            account.set('sessionToken', 'session token');
            return user.completeAccountSignUp(account, CODE);
          });

          it('notifies remotes of signin', function () {
            testRemoteSignInMessageSent(account);
          });
        });
      });

      describe('with a basket error', function () {
        var err;

        beforeEach(function () {
          err = null;

          account = user.initAccount({ email: 'email', uid: 'uid' });
          sinon.stub(account, 'verifySignUp', function () {
            return p.reject(MarketingEmailErrors.toError('USAGE_ERROR'));
          });
        });

        describe('without a sessionToken', function () {
          beforeEach(function () {
            return user.completeAccountSignUp(account, CODE)
              .then(assert.fail, function (_err) {
                err = _err;
              });
          });

          it('throws the error', function () {
            assert.isTrue(MarketingEmailErrors.is(err, 'USAGE_ERROR'));
          });

          it('does not notify remotes of signin', function () {
            assert.isFalse(notifier.triggerRemote.called);
          });
        });

        describe('with a sessionToken', function () {
          beforeEach(function () {
            account.set('sessionToken', 'session token');
            return user.completeAccountSignUp(account, CODE)
              .then(assert.fail, function (_err) {
                err = _err;
              });
          });

          it('throws the error', function () {
            assert.isTrue(MarketingEmailErrors.is(err, 'USAGE_ERROR'));
          });

          it('but still notifies remotes of signin', function () {
            testRemoteSignInMessageSent(account);
          });
        });
      });
    });

    it('changeAccountPassword changes the account password, notifies the browser', function () {
      const account = user.initAccount({
        email: 'email',
        keyFetchToken: 'old-key-fetch-token',
        sessionToken: 'old-session-token',
        sessionTokenContext: 'fx_desktop_v2',
        uid: 'uid',
        unwrapBKey: 'old-unwrap-b-key',
      });
      const newPassword = 'new_password';
      const oldPassword = 'password';
      const relierMock = {};

      sinon.stub(account, 'changePassword', () => {
        account.set({
          keyFetchToken: 'new-key-fetch-token',
          sessionToken: 'new-session-token',
          unwrapBKey: 'new-unwrap-b-key',
          verified: true,
        });

        return p();
      });
      sinon.stub(user, 'setSignedInAccount', (account) => {
        return p(account);
      });
      sinon.spy(notifier, 'triggerRemote');

      return user.changeAccountPassword(
        account, oldPassword, newPassword, relierMock)
        .then(() => {
          assert.isTrue(account.changePassword.calledWith(
            oldPassword,
            newPassword,
            relierMock
          ));

          assert.isTrue(user.setSignedInAccount.calledWith(account));

          assert.equal(notifier.triggerRemote.callCount, 1);
          const changePasswordCommand = notifier.COMMANDS.CHANGE_PASSWORD;

          const args = notifier.triggerRemote.args[0];
          assert.equal(args[0], changePasswordCommand);

          assert.deepEqual(args[1], {
            email: 'email',
            keyFetchToken: 'new-key-fetch-token',
            sessionToken: 'new-session-token',
            uid: 'uid',
            unwrapBKey: 'new-unwrap-b-key',
            verified: true
          });
        });
    });

    describe('completeAccountPasswordReset', function () {
      var account;
      var relierMock = {};

      beforeEach(function () {
        account = user.initAccount({ email: 'email', uid: 'uid' });

        sinon.stub(account, 'completePasswordReset', function () {
          return p();
        });

        sinon.stub(user, 'setSignedInAccount', function (account) {
          return p(account);
        });

        sinon.spy(notifier, 'triggerRemote');

        return user.completeAccountPasswordReset(
          account, 'password', 'token', 'code', relierMock);
      });

      it('delegates to the account', function () {
        assert.isTrue(account.completePasswordReset.calledWith(
          'password',
          'token',
          'code',
          relierMock
        ));
      });

      it('saves the updated account data', function () {
        assert.isTrue(user.setSignedInAccount.calledWith(account));
      });

      it('notifies remote listeners', function () {
        testRemoteSignInMessageSent(account);
      });
    });

    describe('pickResumeTokenInfo', function () {
      it('returns the uniqueUserId', function () {
        var resumeTokenInfo = user.pickResumeTokenInfo();
        assert.equal(resumeTokenInfo.uniqueUserId, UUID);
      });
    });

    describe('fetchAccountDevices', function () {
      var account;
      var devices;

      beforeEach(function () {
        account = user.initAccount({});
        sinon.stub(account, 'fetchDevices', function () {
          return p();
        });

        devices = new AttachedClients([], {
          notifier: {
            on: sinon.spy()
          }
        });

        return user.fetchAccountDevices(account, devices);
      });

      it('delegates to the account to fetch devices', function () {
        assert.isTrue(account.fetchDevices.calledWith(devices));
      });
    });

    describe('fetchAccountOAuthApps', function () {
      var account;
      var oAuthApps;

      beforeEach(function () {
        account = user.initAccount({});
        sinon.stub(account, 'fetchOAuthApps', function () {
          return p();
        });

        oAuthApps = new AttachedClients([], {
          notifier: {
            on: sinon.spy()
          }
        });

        return user.fetchAccountOAuthApps(account, oAuthApps);
      });

      it('delegates to the account to fetch devices', function () {
        assert.isTrue(account.fetchOAuthApps.calledWith(oAuthApps));
      });
    });

    describe('destroyAccountDevice', function () {
      var account;
      var device;

      beforeEach(() => {
        account = user.initAccount({
          email: 'a@a.com',
          sessionToken: 'session token',
          uid: 'the uid'
        });

        sinon.stub(account, 'destroyDevice', () => p());
        sinon.stub(account, 'fetch', () => p());
        sinon.spy(user, 'removeAccount');

        device = new Device({
          id: 'device-1',
          name: 'alpha',
          sessionToken: 'session token'
        });

        return user.setSignedInAccount(account);
      });

      describe('with a remote device', () => {
        beforeEach(() => {
          device.set('isCurrentDevice', false);
          return user.destroyAccountDevice(account, device);
        });

        it('delegates to the account, does not remove the account', () => {
          assert.isTrue(account.destroyDevice.calledWith(device));
          assert.isFalse(user.removeAccount.called);
        });
      });

      describe('with the current account\'s current device', () => {
        beforeEach(() => {
          device.set('isCurrentDevice', true);
          return user.destroyAccountDevice(account, device);
        });

        it('delegates to the account, removes the account', () => {
          assert.isTrue(account.destroyDevice.calledWith(device));
          assert.isTrue(user.removeAccount.calledOnce);
          assert.isTrue(user.removeAccount.calledWith(account));
        });
      });
    });

    describe('destroyAccountApp', function () {
      var oAuthApp;
      var account;

      beforeEach(function () {
        account = user.initAccount({});
        sinon.stub(account, 'destroyOAuthApp', function () {
          return p();
        });

        oAuthApp = new OAuthApp({
          id: 'oauth-1',
          name: 'oauthy',
        });

        return user.destroyAccountApp(account, oAuthApp);
      });

      it('delegates to the account to destroy the device', function () {
        assert.isTrue(account.destroyOAuthApp.calledWith(oAuthApp));
      });
    });

    describe('checkAccountUidExists', function () {
      var account;
      var exists;

      beforeEach(function () {
        account = user.initAccount({
          email: EMAIL,
          sessionToken: SESSION_TOKEN,
          uid: UUID
        });

        sinon.stub(account, 'checkUidExists', function () {
          return p(false);
        });

        sinon.spy(user, 'removeAccount');

        return user.checkAccountUidExists(account)
          .then(function (_exists) {
            exists = _exists;
          });
      });

      it('delegates to the account model', function () {
        assert.isTrue(account.checkUidExists.called);
      });

      it('removes the account if it does not exist', function () {
        assert.isTrue(user.removeAccount.calledWith(account));
      });

      it('returns a promise that resolves to whether the account exists', function () {
        assert.isFalse(exists);
      });
    });

    describe('checkAccountEmailExists', function () {
      var account;
      var exists;

      beforeEach(function () {
        account = user.initAccount({
          email: EMAIL,
          sessionToken: SESSION_TOKEN,
          uid: UUID
        });

        sinon.stub(account, 'checkEmailExists', function () {
          return p(false);
        });

        sinon.spy(user, 'removeAccount');

        return user.checkAccountEmailExists(account)
          .then(function (_exists) {
            exists = _exists;
          });
      });

      it('delegates to the account model', function () {
        assert.isTrue(account.checkEmailExists.called);
      });

      it('removes the account if it does not exist', function () {
        assert.isTrue(user.removeAccount.calledWith(account));
      });

      it('returns a promise that resolves to whether the account exists', function () {
        assert.isFalse(exists);
      });
    });

    describe('rejectAccountUnblockCode', () => {
      const UNBLOCK_CODE = '12345678';
      let account;

      beforeEach(() => {
        account = user.initAccount({});
        sinon.stub(account, 'rejectUnblockCode', () => p());

        return user.rejectAccountUnblockCode(account, UNBLOCK_CODE);
      });

      it('delegates to the account', () => {
        assert.isTrue(account.rejectUnblockCode.calledOnce);
        assert.isTrue(account.rejectUnblockCode.calledWith(UNBLOCK_CODE));
      });
    });

    describe('logNumStoredAccounts', () => {
      let account;

      beforeEach(() => {
        account = user.initAccount({
          email: 'testuser@testuser.com',
          uid: 'uid'
        });
      });

      it('logs the number of stored accounts', () => {
        // no accounts to begin with.
        user.logNumStoredAccounts();
        assert.equal(metrics.logNumStoredAccounts.callCount, 1);
        assert.isTrue(metrics.logNumStoredAccounts.calledWith(0));

        // add an account to storage.
        user._persistAccount(account);
        user.logNumStoredAccounts();
        assert.equal(metrics.logNumStoredAccounts.callCount, 2);
        assert.isTrue(metrics.logNumStoredAccounts.calledWith(1));
      });
    });

    describe('isSignedInAccount', () => {
      let account;

      beforeEach(() => {
        account = user.initAccount({ email: 'testuser@testuser.com', uid: 'uid' });
      });

      describe('no signed in user', () => {
        it('returns false', () => {
          user.clearSignedInAccount();
          assert.isFalse(user.isSignedInAccount(account));
        });
      });

      describe('no signed in user, pass in a `default` account', () => {
        it('returns false', () => {
          user.clearSignedInAccount();
          assert.isFalse(user.isSignedInAccount(user.initAccount({})));
        });
      });

      describe('different signed in user', () => {
        it('returns false', () => {
          const signedInAccount = user.initAccount({
            email: 'testuser2@testuser.com',
            uid: 'uid2'
          });

          return user.setSignedInAccount(signedInAccount)
            .then(() => {
              assert.isFalse(user.isSignedInAccount(account));
            });
        });
      });

      describe('is the signed in user', () => {
        it('returns true', () => {
          return user.setSignedInAccount(account)
            .then(() => {
              assert.isTrue(user.isSignedInAccount(account));
            });
        });
      });
    });
  });
});
