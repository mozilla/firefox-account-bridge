/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'underscore',
  'p-promise',
  'views/sign_in',
  'lib/session',
  'lib/oauth-mixin'
],
function (_, p, SignInView, Session, OAuthMixin) {
  var View = SignInView.extend({
    className: 'sign-in oauth-sign-in',

    initialize: function (options) {
      SignInView.prototype.initialize.call(this, options);

      this.setupOAuth();
    },

    beforeRender: function() {
      return this.setServiceInfo();
    },

    afterRender: function() {
      this.setupOAuthLinks();
    },

    onSignInSuccess: function() {
      return this.finishOAuthFlow();
    },

    onSignInUnverified: function() {
      // set the oauth parameters in the session so they are available in the email confirmation
      Session.set('oauth', this._oAuthParams);
      return SignInView.prototype.onSignInUnverified.call(this);
    },

    onPasswordResetNavigate: function () {
      Session.set('oauth', this._oAuthParams);
      this.navigate('reset_password');
    },

    onPasswordResetEmailSuccess: function () {
      Session.set('oauth', this._oAuthParams);
      this.navigate('confirm_reset_password');
    }
  });

  _.extend(View.prototype, OAuthMixin);

  return View;
});
