/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A broker is a model that knows how to handle interaction with
 * the outside world.
 */
'use strict';

define([
  'underscore',
  'backbone',
  'lib/promise',
  'models/mixins/search-param'
], function (_, Backbone, p, SearchParamMixin) {

  var BaseAuthenticationBroker = Backbone.Model.extend({
    initialize: function (options) {
      options = options || {};

      this.relier = options.relier;
      this.window = options.window || window;
    },

    /**
     * initialize the broker with any necessary data.
     * @returns {Promise}
     */
    fetch: function () {
      var self = this;
      return p()
        .then(function () {
          self._isForceAuth = self._isForceAuthUrl();
        });
    },

    /**
     * Select the start page. Returned promise can resolve to a string that
     * will cause the start page to redirect. If returned promise resolves
     * to a 'falsy' value, no redirection will occur.
     * @returns {Promise}
     */
    selectStartPage: function () {
      // the default is to use the page set in the URL
      return p();
    },

    /**
     * Called before sign in. Can be used to prevent sign in.
     */
    beforeSignIn: function () {
      return p();
    },

    /**
     * Called after sign in. Can be used to notify the RP that the user
     * has signed in or signed up with a valid preVerifyToken.
     *
     * Resolve promise with an object that contains `{ halt: true }` to
     * inicate to the caller "no need to continue". An example is prevening
     * the "signin" screen from transitioning to "settings" if the browser
     * or OAuth flow completes the action.
     *
     * @return {promise}
     */
    afterSignIn: function () {
      return p();
    },

    /**
     * Called before confirmation polls to persist any data
     */
    persist: function () {
      return p();
    },

    /**
     * Called after signup email confirmation poll completes. Can be used
     * to notify the RP that the user has sucessfully signed up.
     *
     * Resolve promise with an object that contains `{ halt: true }` to
     * inicate to the caller "no need to continue". An example is prevening
     * the "signup" screen from transitioning to "signup_complete" if the
     * browser or OAuth flow completes the action.
     *
     * @return {promise}
     */
    afterSignUpConfirmationPoll: function () {
      return p();
    },

    /**
     * Called after signup email confirmation poll completes. Can be used
     * to notify the RP that the user has sucessfully signed up.
     *
     * Resolve promise with an object that contains `{ halt: true }` to
     * inicate to the caller "no need to continue". An example is prevening
     * the "signup" screen from transitioning to "signup_complete" if the
     * browser or OAuth flow completes the action.
     *
     * @return {promise}
     */
    afterResetPasswordConfirmationPoll: function () {
      return p();
    },

    /**
     * Transform the signin/signup links if necessary
     */
    transformLink: function (link) {
      return link;
    },

    /**
     * Check if the relier wants to force the user to auth with
     * a particular email.
     */
    isForceAuth: function () {
      return !! this._isForceAuth;
    },

    _isForceAuthUrl: function () {
      return this.window.location.pathname === '/force_auth';
    }
  });

  _.extend(BaseAuthenticationBroker.prototype, SearchParamMixin);

  return BaseAuthenticationBroker;
});
