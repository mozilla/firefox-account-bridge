/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Notifies the user that their sign-in confirmation email bounced.
 */
define(function (require, exports, module) {
  'use strict';

  const BackMixin = require('views/mixins/back-mixin');
  const BaseView = require('views/base');
  const Cocktail = require('cocktail');
  const Session = require('lib/session');
  const Template = require('stache!templates/sign_in_bounced');

  const SignInBouncedView = BaseView.extend({
    events: {
      'click #create-account': '_createAccount'
    },

    template: Template,

    initialize (options) {
      this._formPrefill = options.formPrefill;
    },

    setInitialContext (context) {
      context.set({ email: this.model.get('email') });
    },

    _createAccount: BaseView.preventDefaultThen(function () {
      this.user.removeAllAccounts();
      Session.clear();
      this._formPrefill.clear();
      this.navigate('signup');
    })
  });

  Cocktail.mixin(
    SignInBouncedView,
    BackMixin
  );

  module.exports = SignInBouncedView;
});

