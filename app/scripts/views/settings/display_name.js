/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const AvatarMixin = require('views/mixins/avatar-mixin');
  const BaseView = require('views/base');
  const Cocktail = require('cocktail');
  const FloatingPlaceholderMixin = require('views/mixins/floating-placeholder-mixin');
  const FormView = require('views/form');
  const SettingsPanelMixin = require('views/mixins/settings-panel-mixin');
  const Template = require('stache!templates/settings/display_name');

  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'display-name',
    viewName: 'settings.display-name',

    onProfileUpdate: function () {
      this.render();
    },

    context: function () {
      return {
        displayName: this._displayName
      };
    },

    beforeRender: function () {
      var account = this.getSignedInAccount();
      return account.fetchProfile()
        .then(() => {
          this.user.setAccount(account);
          this._displayName = account.get('displayName');
        });
    },

    submit: function () {
      var account = this.getSignedInAccount();
      var displayName = this.getElementValue('input.display-name').trim();

      return account.postDisplayName(displayName)
        .then(() => {
          this.logViewEvent('success');
          this.updateDisplayName(displayName);
          this.displaySuccess(t('Display name updated'));
          this.navigate('settings');
        });
    }
  });

  Cocktail.mixin(
    View,
    AvatarMixin,
    SettingsPanelMixin,
    FloatingPlaceholderMixin
  );

  module.exports = View;
});
