/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Handles the marketing snippet on the 'ready' page.
 *
 * Shows `Get Sync on Firefox for Android` for users that complete
 * signup for sync in Firefox Desktop.
 */

define(function(require, exports, module) {
  'use strict';

  var BaseView = require('views/base');
  var Cocktail = require('cocktail');
  var Constants = require('lib/constants');
  var MarketingMixin = require('views/mixins/marketing-mixin');
  var Template = require('stache!templates/marketing_snippet');

  var View = BaseView.extend({
    template: Template,

    initialize: function (options) {
      options = options || {};

      this._type = options.type;
      this._service = options.service;
    },

    context: function () {
      var shouldShowMarketing = this._shouldShowSignUpMarketing();

      return {
        showSignUpMarketing: shouldShowMarketing
      };
    },

    _shouldShowSignUpMarketing: function () {
      var isSignUp = this._type === 'sign_up';
      var isSync = this._service === Constants.FX_DESKTOP_SYNC;
      var isFirefoxMobile = this._isFirefoxMobile();

      // If the user is completing a signup for sync and ALWAYS
      // show the marketing snippet.
      return isSignUp && isSync && ! isFirefoxMobile;
    },

    _isFirefoxMobile: function () {
      // For UA information, see
      // https://developer.mozilla.org/docs/Gecko_user_agent_string_reference

      var ua = this.window.navigator.userAgent;

      // covers both B2G and Firefox for Android
      var isMobileFirefox = /Mobile/.test(ua) && /Firefox/.test(ua);
      var isTabletFirefox = /Tablet/.test(ua) && /Firefox/.test(ua);

      return isMobileFirefox || isTabletFirefox;
    }
  });

  Cocktail.mixin(
    View,
    MarketingMixin
  );

  return View;
});


