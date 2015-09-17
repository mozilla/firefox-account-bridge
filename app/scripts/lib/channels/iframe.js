/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A channel that takes care of the IFRAME'd OAuth flow.
 *
 * An RPs origin must match the origin registered for the client_id
 * on the URL.
 */

define([
  'underscore',
  'lib/channels/duplex',
  'lib/channels/receivers/postmessage',
  'lib/channels/senders/postmessage'
], function (_, DuplexChannel, PostMessageReceiver, PostMessageSender) {
  'use strict';

  function IFrameChannel() {
    // constructor, nothing to do.
  }

  _.extend(IFrameChannel.prototype, new DuplexChannel(), {
    initialize: function (options = {}) {
      var win = options.window || window;

      var sender = this._sender = new PostMessageSender();
      sender.initialize({
        window: win.parent,
        origin: options.origin
      });

      var receiver = this._receiver = new PostMessageReceiver();
      receiver.initialize({
        window: win,
        origin: options.origin
      });

      DuplexChannel.prototype.initialize.call(this, {
        window: win,
        sender: sender,
        receiver: receiver
      });
    },

    receiveEvent: function (event) {
      return this._receiver.receiveEvent(event);
    },

    parseMessage: function (message) {
      try {
        return IFrameChannel.parse(message);
      } catch (e) {
        // invalid message, drop it on the ground.
      }
    }
  });

  IFrameChannel.stringify = function (command, data) {
    return JSON.stringify({
      command: command,
      data: data || {}
    });
  };

  IFrameChannel.parse = function (msg) {
    var parsed = JSON.parse(msg);
    if (! parsed.messageId) {
      parsed.messageId = parsed.command;
    }

    return parsed;
  };

  return IFrameChannel;
});

