/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// helper functions for views with passwords. Meant to be mixed into views.

define(function (require, exports, module) {
  'use strict';


  module.exports = {
    events: {
      'change .show-password': 'onPasswordVisibilityChange',
      'keyup input.password': 'onPasswordKeyup'
    },

    onPasswordVisibilityChange: function (event) {
      var target = this.$(event.target);
      this.setPasswordVisibilityFromButton(target);

      // for docs on aria-controls, see
      // http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
      var controlsSelector = '#' + target.attr('aria-controls');
      this.focus(controlsSelector);
    },

    setPasswordVisibilityFromButton: function (button) {
      var isVisible = this.$(button).is(':checked');
      var targets = this.getAffectedPasswordInputs(button);
      this.setPasswordVisibility(isVisible, targets);
    },

    getAffectedPasswordInputs: function (button) {
      var passwordField = this.$(button).siblings('.password');
      if (this.$(button).data('synchronizeShow')) {
        passwordField = this.$('.password');
      }
      return passwordField;
    },

    setPasswordVisibility: function (isVisible, passwordField) {
      try {
        if (isVisible) {
          passwordField.attr('type', 'text').attr('autocomplete', 'off')
            .attr('autocorrect', 'off').attr('autocapitalize', 'off');
          this.logViewEvent('password.visible');
        } else {
          passwordField.attr('type', 'password');
          passwordField.removeAttr('autocomplete')
              .removeAttr('autocorrect').removeAttr('autocapitalize');
          this.logViewEvent('password.hidden');
        }
      } catch(e) {
        // IE8 blows up when changing the type of the input field. Other
        // browsers might too. Ignore the error.
      }
    },

    onPasswordKeyup: function (event) {
      var val = this.getElementValue('.password').length;
      if (val < 8) {
        this.showPasswordHelper();
      } else {
        this.hidePasswordHelper();
      }
    },

    showPasswordHelper: function () {
      this.$('.input-help').css('opacity', '1');
    },

    hidePasswordHelper: function () {
      this.$('.input-help').css('opacity', '0');
    }
  };
});
