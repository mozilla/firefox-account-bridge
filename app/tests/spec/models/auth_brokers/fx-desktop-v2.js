/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var chai = require('chai');
  var FxDesktopV2AuthenticationBroker = require('models/auth_brokers/fx-desktop-v2');
  var NullChannel = require('lib/channels/null');
  var p = require('lib/promise');
  var sinon = require('sinon');
  var WindowMock = require('../../../mocks/window');

  var assert = chai.assert;

  describe('models/auth_brokers/fx-desktop-v2', function () {
    var windowMock;
    var channelMock;

    var broker;

    beforeEach(function () {
      windowMock = new WindowMock();
      channelMock = new NullChannel();
      channelMock.send = function () {
        return p();
      };
      channelMock.request = function () {
        return p();
      };

      broker = new FxDesktopV2AuthenticationBroker({
        window: windowMock,
        channel: channelMock
      });
    });

    describe('afterLoaded', function () {
      it('sends an `fxaccounts:loaded` message', function () {
        sinon.spy(channelMock, 'send');
        return broker.afterLoaded()
          .then(function () {
            assert.isTrue(channelMock.send.calledWith('fxaccounts:loaded'));
          });
      });
    });

    describe('getChannel', function () {
      it('creates a channel if not already available', function () {
        delete broker._channel;
        assert.ok(broker.getChannel());
      });
    });
  });
});
