/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'p-promise',
  'views/base',
  'views/form',
  'views/sign_in',
  'stache!templates/force_auth',
  'lib/session',
  'lib/url'
],
function (p, BaseView, FormView, SignInView, Template, Session, Url) {
  var t = BaseView.t;

  var View = SignInView.extend({
    template: Template,
    className: 'sign-in',

    initialize: function (options) {
      options = options || {};

      // forceAuth means a user must sign in as a specific user.

      // kill the user's local session, set forceAuth flag
      Session.clear();
      Session.set('forceAuth', true);

      var email = Url.searchParam('email', this.window.location.search);
      if (email) {
        // email indicates the signed in email. Use forceEmail to avoid
        // collisions across sessions.
        Session.set('forceEmail', email);
      }
    },

    context: function () {
      var fatalError = '';
      if (! Session.forceEmail) {
        fatalError = t('/force_auth requires an email');
      }

      return {
        email: Session.forceEmail,
        forceAuth: Session.forceAuth,
        fatalError: fatalError
      };
    },

    events: {
      'click a[href="/confirm_reset_password"]': 'resetPasswordNow',
      // Backbone does not add SignInView's events, so this must be duplicated.
      'change .show-password': 'onPasswordVisibilityChange'
    },

    submit: function () {
      var email = Session.forceEmail;
      var password = this.$('.password').val();

      return this.signIn(email, password);
    },

    resetPasswordNow: BaseView.cancelEventThen(FormView.submitter(function () {
      var self = this;
      return self.fxaClient.passwordReset(Session.forceEmail)
              .then(function () {
                self.navigate('confirm_reset_password');
              });
    }))
  });

  return View;
});
