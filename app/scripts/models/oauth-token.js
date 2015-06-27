/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Keeps track of OAuth tokens. Allows a consumer to destroy
 * OAuth tokens when no longer needed without the need to interace
 * with an Account model.
 */

define([
  'backbone'
], function (Backbone) {
  'use strict';

  var Model = Backbone.Model.extend({
    defaults: {
      token: undefined
    },

    initialize: function (options) {
      options = options || {};

      this._fxaClient = options.fxaClient;
      this.set('token', options.token);
    },

    destroy: function () {
      return this._fxaClient.destroyOAuthToken(this.get('token'));
    }
  });

  return Model;
});


