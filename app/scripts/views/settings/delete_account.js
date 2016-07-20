/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var BaseView = require('views/base');
  var Cocktail = require('cocktail');
  var FloatingPlaceholderMixin = require('views/mixins/floating-placeholder-mixin');
  var FormView = require('views/form');
  var PasswordMixin = require('views/mixins/password-mixin');
  var ServiceMixin = require('views/mixins/settings-panel-mixin');
  var Session = require('lib/session');
  var SettingsPanelMixin = require('views/mixins/service-mixin');
  var Template = require('stache!templates/settings/delete_account');

  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'delete-account',
    viewName: 'settings.delete-account',

    context: function () {
      return {
        email: this.getSignedInAccount().get('email')
      };
    },

    submit: function () {
      var self = this;
      var account = self.getSignedInAccount();
      var password = self.getElementValue('.password');

      return self.user.deleteAccount(account, password)
        .then(function () {
          Session.clear();
          return self.invokeBrokerMethod('afterDeleteAccount', account);
        })
        .then(function () {
          // user deleted an account
          self.logViewEvent('deleted');

          self.navigate('signup', {
            success: t('Account deleted successfully')
          }, {
            clearQueryParams: true,
          });
        });
    }
  });

  Cocktail.mixin(
    View,
    PasswordMixin,
    SettingsPanelMixin,
    ServiceMixin,
    FloatingPlaceholderMixin
  );

  module.exports = View;
});

