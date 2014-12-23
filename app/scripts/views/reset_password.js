/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'underscore',
  'views/base',
  'views/form',
  'stache!templates/reset_password',
  'lib/session',
  'lib/auth-errors',
  'views/mixins/service-mixin'
],
function (_, BaseView, FormView, Template, Session, AuthErrors, ServiceMixin) {
  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'reset_password',

    context: function () {
      return {
        email: this.model.get('email') || ''
      };
    },

    afterRender: function () {
      var value = this.getElementValue('.email');
      if (value) {
        this.focus('.email');
      }

      if (this.relier.isOAuth()) {
        this.transformLinks();
      }

      FormView.prototype.afterRender.call(this);
    },

    submit: function () {
      var email = this.getElementValue('.email');

      var self = this;
      return self.fxaClient.passwordReset(email, self.relier)
        .then(function (result) {
          self.navigate('confirm_reset_password', {
            data: {
              email: email,
              passwordForgotToken: result.passwordForgotToken
            }
          });
        })
        .then(null, function (err) {
          // clear oauth session
          Session.clear('oauth');
          if (AuthErrors.is(err, 'UNKNOWN_ACCOUNT')) {
            self.model.set('email', email);
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

  _.extend(View.prototype, ServiceMixin);

  return View;
});
