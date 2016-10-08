/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const _ = require('underscore');
  const p = require('lib/promise');
  const requireOnDemand = require('lib/require-on-demand');
  const Url = require('lib/url');
  const PasswordPromptMixin = require('views/mixins/password-prompt-mixin');

  var PasswordStrengthMixin = {

    initialize: function (options) {
      this._able = options.able;
    },

    _isPasswordStrengthCheckEnabledValue: undefined,
    isPasswordStrengthCheckEnabled: function () {
      var self = this;
      if (_.isUndefined(self._isPasswordStrengthCheckEnabledValue)) {
        var abData = {
          // the window parameter will override any ab testing features
          forcePasswordStrengthCheck: Url.searchParam('passwordStrengthCheck', self.window.location.search),
          isMetricsEnabledValue: self.metrics.isCollectionEnabled(),
          uniqueUserId: self.user.get('uniqueUserId')
        };

        self._isPasswordStrengthCheckEnabledValue =
              self._able.choose('passwordStrengthCheckEnabled', abData);

        if (self._isPasswordStrengthCheckEnabledValue) {
          self._logStrengthExperimentEvent('enabled');
        }
      }
      return self._isPasswordStrengthCheckEnabledValue;
    },

    _passwordStrengthCheckerPromise: undefined,
    getPasswordStrengthChecker: function () {
      // returns a promise that resolves once the library is loaded.
      var self = this;
      if (! self._passwordStrengthCheckerPromise) {
        self._passwordStrengthCheckerPromise = requireOnDemand('passwordcheck')
          // Log any failures loading the script
          .fail(self.logError.bind(self))
          .then(function (PasswordCheck) {
            return new PasswordCheck();
          });
      }
      return self._passwordStrengthCheckerPromise;
    },

    /**
     * Check the password strength. Returns a promise that resolves
     * when the check is complete. Promise resolves to `DISABLED` if
     * password strength checker is disabled.
     *
     * Usage:
     *
     *   view.checkPasswordStrength(password)
     *     .then(function (status) {
     *      // do something with the status
     *     });
     *
     * @method checkPasswordStrength
     * @param {String} password
     *
     * @returns {Promise}
     */
    checkPasswordStrength: function (password) {
      var self = this;
      if (! self.isPasswordStrengthCheckEnabled()) {
        return p('DISABLED');
      }

      return self.getPasswordStrengthChecker()
        .then(function (passwordStrengthChecker) {
          var deferred = p.defer();
          passwordStrengthChecker(password, function (passwordCheckStatus) {
            passwordCheckStatus = passwordCheckStatus || 'UNKNOWN';

            if (passwordCheckStatus === 'BLOOMFILTER_HIT' ||
                passwordCheckStatus === 'BLOOMFILTER_MISS') {
              self._logStrengthExperimentEvent('bloomfilter_used');
            }
            if (passwordCheckStatus === 'BLOOMFILTER_HIT' ||
                passwordCheckStatus === 'ALL_LETTERS_OR_NUMBERS') {
              // display the warning prompt only if the password is ALL_LETTERS_OR_NUMBERS
              // or password is found in list of common passwords
              self.displayPasswordWarningPrompt();
            }
            self._logStrengthExperimentEvent(passwordCheckStatus);

            deferred.resolve(passwordCheckStatus);
          });
          return deferred.promise;
        });
    },

    _logStrengthExperimentEvent: function (eventNameSuffix) {
      var eventName = 'experiment.pw_strength.' + eventNameSuffix.toLowerCase();
      this.logViewEvent(eventName);
    }
  };
  module.exports = _.extend(PasswordStrengthMixin, PasswordPromptMixin);
});
