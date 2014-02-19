/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'underscore',
  'views/base',
  'views/form',
  'stache!templates/complete_reset_password',
  'lib/fxa-client',
  'lib/session',
  'lib/url',
  'lib/password-mixin'
],
function (_, BaseView, FormView, Template, FxaClient, Session, Url, PasswordMixin) {
  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'complete_reset_password',

    events: {
      'change .show-password': 'onPasswordVisibilityChange'
    },

    context: function () {
      return {
        isSync: Session.service === 'sync'
      };
    },

    afterRender: function () {
      this.token = Url.searchParam('token');
      if (! this.token) {
        return this.displayError(t('no token specified'));
      }

      this.code = Url.searchParam('code');
      if (! this.code) {
        return this.displayError(t('no code specified'));
      }

      this.email = Url.searchParam('email');
      if (! this.email) {
        return this.displayError(t('no email specified'));
      }
    },

    isValidEnd: function () {
      return !! (this.token &&
                 this.code &&
                 this.email &&
                 this._getPassword() === this._getVPassword());
    },

    showValidationErrorsEnd: function () {
      if (this._getPassword() !== this._getVPassword()) {
        this.displayError(t('passwords do not match'));
      }
    },

    submit: function () {
      var password = this._getPassword();

      var client = new FxaClient();
      client.completePasswordReset(this.email, password, this.token, this.code)
            .done(_.bind(this._onResetCompleteSuccess, this),
                  _.bind(this._onResetCompleteFailure, this));
    },

    _onResetCompleteSuccess: function () {
      this.navigate('reset_password_complete');
    },

    _onResetCompleteFailure: function (err) {
      this.displayError(err);
    },

    _getPassword: function () {
      return this.$('#password').val();
    },

    _getVPassword: function () {
      return this.$('#vpassword').val();
    }
  });

  _.extend(View.prototype, PasswordMixin);

  return View;
});
