/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'jquery',
  'backbone',
  'lib/session',
  'views/sign_in',
  'views/sign_up',
  'views/confirm',
  'views/legal',
  'views/tos',
  'views/pp',
  'views/cannot_create_account',
  'views/complete_sign_up',
  'views/reset_password',
  'views/confirm_reset_password',
  'views/complete_reset_password',
  'views/ready',
  'views/settings',
  'views/change_password',
  'views/delete_account'
],
function (
  $,
  Backbone,
  Session,
  SignInView,
  SignUpView,
  ConfirmView,
  LegalView,
  TosView,
  PpView,
  CannotCreateAccountView,
  CompleteSignUpView,
  ResetPasswordView,
  ConfirmResetPasswordView,
  CompleteResetPasswordView,
  ReadyView,
  SettingsView,
  ChangePasswordView,
  DeleteAccountView
) {

  function showView(View, options) {
    return function () {
      this.showView(new View(options || {}));
    };
  }

  var Router = Backbone.Router.extend({
    routes: {
      '(/)': 'redirectToSignupOrSettings',
      'signin(/)': showView(SignInView),
      'signin_complete(/)': showView(ReadyView, { type: 'sign_in' }),
      'signup(/)': showView(SignUpView),
      'signup_complete(/)': showView(ReadyView, { type: 'sign_up' }),
      'cannot_create_account(/)': showView(CannotCreateAccountView),
      'verify_email(/)': showView(CompleteSignUpView),
      'confirm(/)': showView(ConfirmView),
      'settings(/)': showView(SettingsView),
      'change_password(/)': showView(ChangePasswordView),
      'delete_account(/)': showView(DeleteAccountView),
      'legal(/)': showView(LegalView),
      'legal/terms(/)': showView(TosView),
      'legal/privacy(/)': showView(PpView),
      'reset_password(/)': showView(ResetPasswordView),
      'confirm_reset_password(/)': showView(ConfirmResetPasswordView),
      'complete_reset_password(/)': showView(CompleteResetPasswordView),
      'reset_password_complete(/)': showView(ReadyView, { type: 'reset_password' }),
      'force_auth(/)': showView(SignInView, { forceAuth: true })
    },

    initialize: function (options) {
      options = options || {};

      this.window = options.window || window;

      this.$stage = $('#stage');

      this.watchAnchors();
    },

    navigate: function (url) {
      // Only add search parameters if they do not already exist.
      // Search parameters are added to the URLs because they are sometimes
      // used to pass state from the browser to the screens. Perhaps we should
      // take the search parameters on startup, toss them into Session, and
      // forget about this malarky?
      if (! /\?/.test(url)) {
        url = url + this.window.location.search;
      }

      return Backbone.Router.prototype.navigate.call(
                            this, url, { trigger: true });
    },

    redirectToSignupOrSettings: function () {
      if (Session.sessionToken) {
        this.navigate('/settings');
      } else {
        this.navigate('/signup');
      }
    },

    showView: function (view) {
      if (this.currentView) {
        this.currentView.destroy();
        Session.set('canGoBack', true);
      } else {
        // user can only go back if there is a screen to go back to.
        // this is used for the TOS/PP pages where there is no
        // back button if the user browses there directly.
        Session.set('canGoBack', false);
      }

      this.currentView = view;

      // render will return false if the view could not be
      // rendered for any reason, including if the view was
      // automatically redirected.
      if (this.currentView.render()) {
        // Render the new view
        this.$stage.html(this.currentView.el);

        // explicitly set the display: block using .css. When embedded
        // in about:accounts, the content is not yet visible and show will
        // not display the element.
        this.$stage.css('display', 'block');
        this.currentView.afterVisible();

        // The user may be scrolled part way down the page
        // on screen transition. Force them to the top of the page.
        this.window.scrollTo(0, 0);
      }
    },

    watchAnchors: function () {
      var self = this;
      $(document).on('click', 'a[href^="/"]', function (event) {
        if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          event.preventDefault();

          // Remove leading slashes
          var url = $(event.target).attr('href').replace(/^\//, '');

          // Instruct Backbone to trigger routing events
          self.navigate(url);
        }
      });
    }
  });

  return Router;
});
