/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const BaseExperiment = require('lib/experiments/base');

  var createSaveStateDelegate = BaseExperiment.createSaveStateDelegate;

  var MailCheckExperiment = BaseExperiment.extend({
    notifications: {
      'mailcheck.clicked': createSaveStateDelegate('clicked'),
      'mailcheck.suggested': createSaveStateDelegate('suggested'),
      'mailcheck.triggered': createSaveStateDelegate('triggered'),
      'signup.submit': '_onSignupSubmit',
      'verification.success': '_onVerificationSuccess'
    },

    _onSignupSubmit: function (data, view) {
      var emailEl = view.$el.find('.email');

      var emailValue = emailEl.val();
      var mailcheckValue = emailEl.data('mailcheckValue');

      if (emailValue.length > 0 && mailcheckValue === emailValue) {
        this.saveState('corrected');
      }
    },

    _onVerificationSuccess: function () {
      this.saveState('verified');

      if (this.hasState('clicked')) {
        this.saveState('clicked.verified');
      }

      if (this.hasState('triggered')) {
        this.saveState('triggered.verified');
      }
    }
  });

  module.exports = MailCheckExperiment;
});
