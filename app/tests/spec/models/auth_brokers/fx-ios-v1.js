/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'chai',
  'lib/channels/null',
  'models/auth_brokers/fx-ios-v1',
  'models/reliers/relier',
  '../../../mocks/window'
],
function (chai, NullChannel, FxiOSAuthenticationBroker, Relier, WindowMock) {
  'use strict';

  var assert = chai.assert;

  describe('models/auth_brokers/fx-ios-v1', function () {
    var channel;
    var relier;
    var windowMock;

    function createBroker () {
      return new FxiOSAuthenticationBroker({
        channel: channel,
        relier: relier,
        window: windowMock
      });
    }

    beforeEach(function () {
      channel = new NullChannel();
      relier = new Relier();
      windowMock = new WindowMock();
    });

    describe('`exclude_signup` parameter is set', function () {
      var broker;

      beforeEach(function () {
        windowMock.location.search = '?exclude_signup=1';
        broker = createBroker();
      });

      afterEach(function () {
        windowMock.location.search = '';
      });

      it('has the `signup` capability by default', function () {
        assert.isTrue(broker.hasCapability('signup'));
      });

      it('has the `interTabSignIn` capability by default', function () {
        assert.isTrue(broker.hasCapability('interTabSignIn'));
      });

      it('has the `emailVerificationMarketingSnippet` capability by default', function () {
        assert.isTrue(broker.hasCapability('emailVerificationMarketingSnippet'));
      });

      it('does not have the `syncPreferencesNotification` capability by default', function () {
        assert.isFalse(broker.hasCapability('syncPreferencesNotification'));
      });

      describe('`broker.fetch` is called', function () {
        beforeEach(function () {
          return broker.fetch();
        });

        it('does not have the `signup` capability', function () {
          assert.isFalse(broker.hasCapability('signup'));
        });

        it('`broker.SIGNUP_DISABLED_REASON` is set', function () {
          assert.instanceOf(broker.SIGNUP_DISABLED_REASON, Error);
        });
      });
    });

    describe('`exclude_signup` parameter is not set', function () {
      var broker;

      beforeEach(function () {
        broker = createBroker();
      });

      it('has the `signup` capability by default', function () {
        assert.isTrue(broker.hasCapability('signup'));
      });

      it('has the `interTabSignIn` capability by default', function () {
        assert.isTrue(broker.hasCapability('interTabSignIn'));
      });

      it('has the `emailVerificationMarketingSnippet` capability by default', function () {
        assert.isTrue(broker.hasCapability('emailVerificationMarketingSnippet'));
      });

      it('does not have the `syncPreferencesNotification` capability by default', function () {
        assert.isFalse(broker.hasCapability('syncPreferencesNotification'));
      });

      describe('`broker.fetch` is called', function () {
        beforeEach(function () {
          return broker.fetch();
        });

        it('has the `signup` capability', function () {
          assert.isTrue(broker.hasCapability('signup'));
        });

        it('`broker.SIGNUP_DISABLED_REASON` is not set', function () {
          assert.isUndefined(broker.SIGNUP_DISABLED_REASON);
        });
      });
    });
  });
});


