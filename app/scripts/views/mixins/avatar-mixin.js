/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// helper functions for views with a profile image. Meant to be mixed into views.

define(function (require, exports, module) {
  'use strict';

  const _ = require('underscore');
  const AuthErrors = require('lib/auth-errors');
  const Notifier = require('lib/channels/notifier');
  const p = require('lib/promise');
  const ProfileErrors = require('lib/profile-errors');
  const ProfileImage = require('models/profile-image');

  var MAX_SPINNER_COMPLETE_TIME = 400; // ms

  var Mixin = {
    notifications: {
      // populated below using event name aliases
    },

    onProfileUpdate: function (/* data */) {
      // implement in view
    },

    /**
     * Adds a profile image for the account to the view, or a default image
     * if none is available.
     *
     * @param {Object} account - The account whose profile image will be shown.
     * @param {Object} [options]
     *   @param {String} [options.wrapperClass] - The class for the element into
     *                 which the profile image will be inserted.
     *   @param {Boolean} [options.spinner] - When true, show a spinner while
     *                    the profile image is loading.
     * @returns {Promise}
     */
    displayAccountProfileImage: function (account, options) {
      options = options || {};

      var avatarWrapperEl = this.$(options.wrapperClass || '.avatar-wrapper');
      var spinnerEl;

      // We'll optimize the UI for the case that the account
      // doesn't have a profile image if it's not cached
      if (this._shouldShowDefaultProfileImage(account)) {
        this.setDefaultPlaceholderAvatar(avatarWrapperEl);
      } else if (options.spinner) {
        spinnerEl = this._addLoadingSpinner(avatarWrapperEl);
      }

      return account.fetchCurrentProfileImage()
        .then((profileImage) => {
          // Cache the result to make sure we don't flash the default
          // image while fetching the latest profile image
          this._updateCachedProfileImage(profileImage, account);
          return profileImage;
        }, (err) => {
          if (! ProfileErrors.is(err, 'UNAUTHORIZED') &&
              ! AuthErrors.is(err, 'UNVERIFIED_ACCOUNT')) {
            this.logError(err);
          }
          // Ignore errors; the image will be rendered as a
          // default image if displayed
          return new ProfileImage();
        })
        .fin(() => {
          return this._completeLoadingSpinner(spinnerEl);
        })
        .then((profileImage) => {
          this._displayedProfileImage = profileImage;
          avatarWrapperEl.find(':not(.avatar-spinner)').remove();

          if (profileImage.isDefault()) {
            avatarWrapperEl
              .addClass('with-default')
              .append('<span></span>');
            this.logViewEvent('profile_image_not_shown');
          } else {
            avatarWrapperEl
              .removeClass('with-default')
              .append($(profileImage.get('img')).addClass('profile-image'));
            this.logViewEvent('profile_image_shown');
          }
        });
    },

    hasDisplayedAccountProfileImage: function () {
      return this._displayedProfileImage && ! this._displayedProfileImage.isDefault();
    },

    setDefaultPlaceholderAvatar: function (avatarWrapperEl) {
      avatarWrapperEl = avatarWrapperEl || $('.avatar-wrapper');
      avatarWrapperEl.addClass('with-default');
    },

    // Makes sure the account has an up-to-date image cache.
    // This should be called after fetching the current profile image.
    _updateCachedProfileImage: function (profileImage, account) {
      if (! account.isDefault()) {
        account.setProfileImage(profileImage);
        this.user.setAccount(account);
      }
    },

    _shouldShowDefaultProfileImage: function (account) {
      return ! account.has('profileImageUrl');
    },

    _addLoadingSpinner: function (spinnerWrapperEl) {
      if (spinnerWrapperEl) {
        return $('<span class="avatar-spinner"></span>').appendTo(spinnerWrapperEl.addClass('with-spinner'));
      }
    },

    // "Completes" the spinner, transitioning the semi-circle to a circle, and
    // then removes the spinner element.
    _completeLoadingSpinner: function (spinnerEl) {
      if (_.isUndefined(spinnerEl)) {
        return p();
      }

      var deferred = p.defer();
      spinnerEl
        .addClass('completed')
        .on('transitionend', function (event) {
          // The first transitionend event will resolve the promise, but the spinner will have
          // subsequent transitions, so we'll also hook on the transitionend event of the
          // ::after pseudoelement, which "expands" to hide the spinner.
          deferred.resolve();

          if (event.originalEvent && event.originalEvent.pseudoElement === '::after') {
            spinnerEl.remove();
          }
        });

      // Always resolve and remove the spinner after MAX_SPINNER_COMPLETE_TIME,
      // in case we don't receive the expected transitionend events, such as in
      // the case of IE.
      this.setTimeout(function transitionMaxTime () {
        deferred.resolve();
        spinnerEl.remove();
      }, MAX_SPINNER_COMPLETE_TIME);

      return deferred.promise;
    },

    logAccountImageChange: function (account) {
      // if the user already has an image set, then report a change event
      if (account.get('hadProfileImageSetBefore')) {
        this.logViewEvent('submit.change');
      } else {
        this.logViewEvent('submit.new');
      }
    },

    updateProfileImage: function (profileImage, account) {
      account.setProfileImage(profileImage);
      return this.user.setAccount(account)
        .then(_.bind(this._notifyProfileUpdate, this, account.get('uid')));
    },

    deleteDisplayedAccountProfileImage: function (account) {
      return account.deleteAvatar(this._displayedProfileImage.get('id'))
        .then(() => {
          // A blank image will clear the cache
          this.updateProfileImage(new ProfileImage(), account);
        });
    },

    updateDisplayName: function (displayName) {
      var account = this.getSignedInAccount();
      account.set('displayName', displayName);
      return this.user.setAccount(account)
        .then(_.bind(this._notifyProfileUpdate, this, account.get('uid')));
    },

    _notifyProfileUpdate: function (uid) {
      this.notifier.triggerAll(Notifier.PROFILE_CHANGE, {
        uid: uid
      });
    }
  };

  Mixin.notifications[Notifier.PROFILE_CHANGE] = 'onProfileUpdate';

  module.exports = Mixin;
});
