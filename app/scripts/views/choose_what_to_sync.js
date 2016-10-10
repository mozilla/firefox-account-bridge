/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const _ = require('underscore');
  const BackMixin = require('views/mixins/back-mixin');
  const CheckboxMixin = require('views/mixins/checkbox-mixin');
  const Cocktail = require('cocktail');
  const FormView = require('views/form');
  const Template = require('stache!templates/choose_what_to_sync');

  var View = FormView.extend({
    template: Template,
    className: 'choose-what-to-sync',

    initialize: function () {
      // Account data is passed in from sign up flow.
      this._account = this.user.initAccount(this.model.get('account'));

      // to keep the view from knowing too much about the state machine,
      // a continuation function is passed in that should be called
      // when submit has completed.
      this.onSubmitComplete = this.model.get('onSubmitComplete');
    },

    getAccount: function () {
      return this._account;
    },

    beforeRender: function () {
      // user cannot proceed if they have not initiated a sign up/in.
      if (! this.getAccount().get('sessionToken')) {
        this.navigate('signup');
        return false;
      }
    },

    context: function () {
      var account = this.getAccount();

      return {
        email: account.get('email'),
        hasBookmarkSupport: this._isEngineSupported('bookmarks'),
        hasDesktopAddonSupport: this._isEngineSupported('desktop-addons'),
        hasDesktopPreferencesSupport: this._isEngineSupported('desktop-preferences'),
        hasHistorySupport: this._isEngineSupported('history'),
        hasPasswordSupport: this._isEngineSupported('passwords'),
        hasTabSupport: this._isEngineSupported('tabs')
      };
    },

    submit: function () {
      var account = this.getAccount();
      var declinedEngines = this._getDeclinedEngines();

      this._trackUncheckedEngines(declinedEngines);

      account.set({
        customizeSync: true,
        declinedSyncEngines: declinedEngines
      });

      return this.user.setAccount(account)
        .then(this.onSubmitComplete);
    },

    /**
     * Check whether a Sync engine is supported
     *
     * @param {String} engineName
     * @returns {Boolean}
     * @private
     */
    _isEngineSupported: function (engineName) {
      var supportedEngines =
                this.broker.getCapability('chooseWhatToSyncWebV1').engines;
      return supportedEngines.indexOf(engineName) > -1;
    },


    /**
     * Get sync engines that were declined by unchecked checkboxes
     *
     * @returns {Array}
     * @private
     */
    _getDeclinedEngines: function () {
      var uncheckedEngineEls =
            this.$el.find('input[name=sync-content]').not(':checked');

      return uncheckedEngineEls.map(function () {
        return this.value;
      }).get();
    },

    /**
     * Keep track of what sync engines the user declines
     *
     * @param {Array} declinedEngines
     * @private
     */
    _trackUncheckedEngines: function (declinedEngines) {
      if (_.isArray(declinedEngines)) {
        declinedEngines.forEach((engine) => {
          this.logViewEvent('engine-unchecked.' + engine);
        });
      }
    }
  });

  Cocktail.mixin(
    View,
    BackMixin,
    CheckboxMixin
  );

  module.exports = View;
});
