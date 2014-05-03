/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// mock in a channel

define([
], function() {
  'use strict';

  function ChannelMock() {
    this.canLinkAccountOk = true;
    this._messageCount = {};
  }

  ChannelMock.prototype = {
    getMessageCount: function(message) {
      return this._messageCount[message] || 0;
    },

    send: function(message, data, done) {
      this.message = message;
      this.data = data;
      if (!this._messageCount[message]) {
        this._messageCount[message] = 0;
      }
      this._messageCount[message] += 1;
      switch (message)
      {
      case 'can_link_account':
        this.onCanLinkAccount(data, done);
        break;
      default:
        if (done) {
          done();
        }
      }
    },

    onCanLinkAccount: function(data, done) {
      done(null, { data: { ok: this.canLinkAccountOk } });
    }
  };

  return ChannelMock;
});
