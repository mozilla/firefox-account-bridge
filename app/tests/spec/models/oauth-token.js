/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'chai',
  'sinon',
  'lib/promise',
  'models/oauth-token'
],
function (chai, sinon, p, OAuthToken) {
  'use strict';

  var assert = chai.assert;

  describe('models/oauth-token', function () {
    var fxaClient;
    var oAuthToken;

    beforeEach(function () {
      fxaClient = {
        destroyOAuthToken: sinon.spy(function () {
          return p();
        })
      };

      oAuthToken = new OAuthToken({
        token: 'access_token',
        fxaClient: fxaClient
      });
    });

    describe('get', function () {
      it('returns the token', function () {
        assert.equal(oAuthToken.get('token'), 'access_token');
      });
    });

    describe('destroy', function () {
      it('destroys the token', function () {
        return oAuthToken.destroy()
          .then(function () {
            assert.isTrue(fxaClient.destroyOAuthToken.calledWith('access_token'));
          });
      });
    });
  });
});
