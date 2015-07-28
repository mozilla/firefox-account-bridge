/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var chai = require('chai');
  var FxDesktopV1Channel = require('lib/channels/fx-desktop-v1');
  var WindowMock = require('../../../mocks/window');

  var assert = chai.assert;

  describe('lib/channels/fx-desktop-v1', function () {
    var channel;
    var windowMock;

    beforeEach(function () {
      windowMock = new WindowMock();

      channel = new FxDesktopV1Channel();
      channel.initialize({
        origin: 'http://firstrun.mozilla.org',
        window: windowMock
      });
    });

    describe('public interface', function () {
      it('supports send/request', function () {
        assert.isFunction(channel.send);
        assert.isFunction(channel.request);
      });
    });

    describe('createMessageId', function () {
      it('returns the command as the message id', function () {
        assert.equal(channel.createMessageId('command'), 'command');
      });
    });

    describe('parseMessage', function () {
      it('throws an error if the message is malformed', function () {
        assert.throws(function () {
          channel.parseMessage({});
        });
      });

      it('returns the parsed message', function () {
        var fixtureMessage = {
          content: {
            status: 'ok',
            key: 'value'
          }
        };
        var expectedResult = {
          command: 'ok',
          messageId: 'ok',
          data: {
            status: 'ok',
            key: 'value'
          }
        };

        assert.deepEqual(channel.parseMessage(fixtureMessage), expectedResult);
      });
    });
  });
});


