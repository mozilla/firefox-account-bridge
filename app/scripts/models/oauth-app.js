/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * OAuthApp information
 */
define(function (require, exports, module) {
  'use strict';

  const Backbone = require('backbone');
  const Constants = require('lib/constants');

  module.exports = Backbone.Model.extend({
    defaults: {
      clientType: Constants.CLIENT_TYPE_OAUTH_APP,
      id: null,
      lastAccessTime: null,
      lastAccessTimeFormatted: null,
      name: null
    },

    destroy: function () {
      this.trigger('destroy', this);
    }
  });
});
