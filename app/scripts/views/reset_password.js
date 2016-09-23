/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var AuthErrors = require('lib/auth-errors');
  var BaseView = require('views/base');
  var Cocktail = require('cocktail');
  var FormView = require('views/form');
  var PasswordResetMixin = require('views/mixins/password-reset-mixin');
  var ServiceMixin = require('views/mixins/service-mixin');
  var Session = require('lib/session');
  var Template = require('stache!templates/reset_password');

  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'reset_password',

    initialize: function (options) {
      options = options || {};

      this._formPrefill = options.formPrefill;
    },

    context: function () {
      return {
        forceEmail: this.model.get('forceEmail')
      };
    },

    beforeRender: function () {
      var email = this.relier.get('email');
      var canSkip = this.relier.get('resetPasswordConfirm') === false;
      if (canSkip && email) {
        var self = this;
        return this._resetPassword(email)
          .then(function () {
            return false;
          })
          .fail(function (err) {
            self.model.set('error', err);
          });
      }

      return FormView.prototype.beforeRender.call(this);
    },

    afterRender: function () {
      if (this.relier.isOAuth()) {
        this.transformLinks();
      }

      FormView.prototype.afterRender.call(this);
    },

    beforeDestroy: function () {
      this._formPrefill.set('email', this.getElementValue('.email'));
    },

    submit: function () {
      return this._resetPassword(this.getElementValue('.email'));
    },

    _resetPassword: function (email) {
      var self = this;
      return self.resetPassword(email)
        .fail(function (err) {
          // clear oauth session
          Session.clear('oauth');
          if (AuthErrors.is(err, 'UNKNOWN_ACCOUNT')) {
            err.forceMessage = t('Unknown account. <a href="/signup">Sign up</a>');
            return self.displayErrorUnsafe(err);
          } else if (AuthErrors.is(err, 'USER_CANCELED_LOGIN')) {
            self.logEvent('login.canceled');
            // if user canceled login, just stop
            return;
          }
          // re-throw error, it will be handled at a lower level.
          throw err;
        });
    }
  });

  Cocktail.mixin(
    View,
    PasswordResetMixin,
    ServiceMixin
  );

  module.exports = View;
});
