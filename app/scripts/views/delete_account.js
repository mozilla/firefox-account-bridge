/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var AccountLockedMixin = require('views/mixins/account-locked-mixin');
  var AuthErrors = require('lib/auth-errors');
  var BackMixin = require('views/mixins/back-mixin');
  var BaseView = require('views/base');
  var Cocktail = require('cocktail');
  var FormView = require('views/form');
  var PasswordMixin = require('views/mixins/password-mixin');
  var ServiceMixin = require('views/mixins/service-mixin');
  var Session = require('lib/session');
  var Template = require('stache!templates/delete_account');

  var t = BaseView.t;

  var View = FormView.extend({
    // user must be authenticated to delete their account
    mustAuth: true,

    template: Template,
    className: 'delete-account',

    context: function () {
      return {
        email: this.getSignedInAccount().get('email')
      };
    },

    submit: function () {
      var self = this;
      var account = self.getSignedInAccount();
      var email = account.get('email');
      var password = self.getElementValue('.password');
      return self.fxaClient.deleteAccount(email, password)
        .then(function () {
          Session.clear();
          self.user.removeAccount(account);

          return self.broker.afterDeleteAccount(account);
        })
        .then(function () {
          // user deleted an account
          self.logScreenEvent('deleted');

          self.navigate('signup', {
            success: t('Account deleted successfully')
          });
        }, function (err) {
          if (AuthErrors.is(err, 'ACCOUNT_LOCKED')) {
            // the password is needed to poll whether the account has
            // been unlocked.
            account.set('password', password);
            return self.notifyOfLockedAccount(account);
          }

          // re-throw error, it will be handled at a lower level.
          throw err;
        });
    }
  });

  Cocktail.mixin(
    View,
    PasswordMixin,
    ServiceMixin,
    BackMixin,
    AccountLockedMixin
  );

  return View;
});

