/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'sinon',
  'lib/promise',
  'lib/constants',
  'lib/assertion',
  'lib/profile-client',
  'lib/oauth-client',
  'lib/auth-errors',
  'models/account'
],
function (chai, sinon, p, Constants, Assertion, ProfileClient,
    OAuthClient, AuthErrors, Account) {
  var assert = chai.assert;

  describe('models/account', function () {
    var account;
    var assertion;
    var oAuthClient;
    var profileClient;
    var EMAIL = 'user@example.domain';
    var UID = '6d940dd41e636cc156074109b8092f96';
    var URL = 'http://127.0.0.1:1112/avatar/example.jpg';
    var CLIENT_ID = 'client_id';

    beforeEach(function () {
      assertion = new Assertion();
      oAuthClient = new OAuthClient();
      profileClient = new ProfileClient();

      account = new Account({
        oAuthClient: oAuthClient,
        assertion: assertion,
        profileClient: profileClient,
        oAuthClientId: CLIENT_ID,
        accountData: {
          email: EMAIL,
          uid: UID
        }
      });
    });

    afterEach(function () {
      account = null;
    });

    describe('fetch', function () {

      it('does not fetch without a sessionToken', function () {
        return account.fetch()
          .then(function () {
            assert.isUndefined(account.verified);
            assert.isUndefined(account.accessToken);
            assert.isUndefined(account.sessionToken);
          });
      });

      it('fetches access token and sets verified state', function () {
        account.sessionToken = 'abc123';
        sinon.stub(assertion, 'generate', function () {
          return p('assertion');
        });
        sinon.stub(oAuthClient, 'getToken', function () {
          return p({ 'access_token': 'access token' });
        });

        return account.fetch()
          .then(function () {
            assert.isTrue(assertion.generate.calledWith('abc123'));
            assert.isTrue(oAuthClient.getToken.calledWith({
              'client_id': CLIENT_ID,
              assertion: 'assertion',
              scope: 'profile:write'
            }));

            assert.isTrue(account.verified);
            assert.equal(account.accessToken, 'access token');
          });
      });

      it('fails to fetch access token with an unverified account', function () {
        account.sessionToken = 'abc123';
        sinon.stub(assertion, 'generate', function () {
          return p.reject(AuthErrors.toError('UNVERIFIED_ACCOUNT'));
        });

        return account.fetch()
          .then(function () {
            assert.isFalse(account.verified);
            assert.isUndefined(account.accessToken);
          });
      });

      it('fails to fetch with other errors', function () {
        account.sessionToken = 'abc123';
        sinon.stub(assertion, 'generate', function () {
          return p.reject(AuthErrors.toError('UNKNOWN_ACCOUNT'));
        });
        return account.fetch()
          .then(assert.fail, function () {
            assert.isUndefined(account.accessToken);
          });
      });

    });

    it('isVerified returns false if account is unverified', function () {
      account.sessionToken = 'abc123';
      sinon.stub(assertion, 'generate', function () {
        return p.reject(AuthErrors.toError('UNVERIFIED_ACCOUNT'));
      });

      return account.isVerified()
        .then(function (isVerified) {
          assert.isFalse(isVerified);
        });
    });

    it('isVerified fails if an error occurs', function () {
      account.sessionToken = 'abc123';
      sinon.stub(assertion, 'generate', function () {
        return p.reject(AuthErrors.toError('UNKNOWN_ACCOUNT'));
      });

      return account.isVerified()
        .then(assert.fail, function () {
          // success
          return;
        });
    });

    describe('with an access token', function () {
      var accessToken = 'access token';

      beforeEach(function () {
        account.sessionToken = 'abc123';
        sinon.stub(assertion, 'generate', function () {
          return p('assertion');
        });
        sinon.stub(oAuthClient, 'getToken', function () {
          return p({ 'access_token': accessToken });
        });
      });

      it('has a profile client', function () {
        return account.profileClient()
          .then(function (profileClient) {
            assert.ok(profileClient);
          });
      });

      it('isVerified returns true', function () {
        return account.isVerified()
          .then(function (isVerified) {
            assert.isTrue(isVerified);
          });
      });

      describe('avatars', function () {
        it('gets an avatar', function () {
          sinon.stub(profileClient, 'getAvatar', function () {
            return p({ avatar: URL, id: 'foo' });
          });
          return account.getAvatar()
            .then(function (result) {
              assert.isTrue(profileClient.getAvatar.calledWith(accessToken));
              assert.equal(result.avatar, URL);
              assert.equal(result.id, 'foo');
            });
        });

        it('gets avatars', function () {
          sinon.stub(profileClient, 'getAvatars', function () {
            return {
              avatars: [
                { id: 'foo', selected: true, url: URL },
                { id: 'bar', selected: false, url: 'barurl' }
              ]
            };
          });

          return account.getAvatars()
            .then(function (result) {
              assert.isTrue(profileClient.getAvatars.calledWith(accessToken));
              assert.ok(result.avatars);
              assert.equal(result.avatars.length, 2);
              assert.equal(result.avatars[0].url, URL);
            });
        });

        it('post an avatar url', function () {
          var IMG_URL = 'https://secure.gravatar.com/deadbeef';
          sinon.stub(profileClient, 'postAvatar', function () {
            return p();
          });

          return account.postAvatar(IMG_URL, true)
            .then(function () {
              assert.isTrue(profileClient.postAvatar.calledWith(accessToken, IMG_URL, true));
            });
        });

        it('delete an avatar', function () {
          var ID = 'deadbeef';
          sinon.stub(profileClient, 'deleteAvatar', function () {
            return p();
          });

          return account.deleteAvatar(ID)
            .then(function () {
              assert.isTrue(profileClient.deleteAvatar.calledWith(accessToken, ID));
            });
        });

        it('upload an image', function () {
          var DATA = 'image data';
          sinon.stub(profileClient, 'uploadAvatar', function () {
            return { url: URL };
          });

          return account.uploadAvatar(DATA)
            .then(function (result) {
              assert.isTrue(profileClient.uploadAvatar.calledWith(accessToken, DATA));
              assert.equal(result.url, URL);
            });
        });

      });
    });

    it('isFromSync returns true in the right context', function () {
      account.sessionTokenContext = Constants.FX_DESKTOP_CONTEXT;
      assert.isTrue(account.isFromSync());
    });

    it('isFromSync returns false in the wrong context', function () {
      delete account.sessionTokenContext;
      assert.isFalse(account.isFromSync());
    });

    it('initializes with data from the right keys', function () {
      account = new Account({
        accountData: {
          email: EMAIL,
          uid: UID,
          sessionToken: 'abc123',
          foo: 'bar'
        }
      });

      assert.ok(account.email);
      assert.isUndefined(account.foo);
    });

    it('toData returns data for the right keys', function () {
      account = new Account({
        accountData: {
          email: EMAIL,
          uid: UID,
          sessionToken: 'abc123',
          foo: 'bar'
        }
      });

      var data = account.toData();

      assert.isUndefined(data.foo);
      assert.ok(data.email);
    });

  });
});
