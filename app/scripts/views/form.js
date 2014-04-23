/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Generic module to use if a view is a form. This module provides a common
 * way to do form validation and invalid element reporting. Descendent modules
 * can provide strategies for the following functions:
 * - isValidStart (optional)
 * - isValidEnd (optional)
 * - showValidationErrorsStart (optional)
 * - showValidationErrorsEnd (optional)
 * - beforeSubmit (optional)
 * - submit (required)
 * - afterSubmit (optional)
 *
 * See documentation for an explanation of each.
 */

'use strict';

define([
  'underscore',
  'jquery',
  'p-promise',
  'lib/validate',
  'lib/silent-error',
  'views/base',
  'views/tooltip'
],
function (_, $, p, Validate, SilentError, BaseView, Tooltip) {
  var t = BaseView.t;

  /**
   * Called if `keypress` or `change` is fired on the form. If the
   * form has changed, call the specified handler.
   */
  function ifFormValuesChanged(handler) {
    return function (event) {
      // oldValues will be `undefined` the first time through.
      var oldValues = this._previousFormValues;
      var newValues = this.getFormValues();

      if (! _.isEqual(oldValues, newValues)) {
        this._previousFormValues = newValues;
        return this.invokeHandler(handler, event);
      }
    };
  }

  /**
   * Handle form-submit like operations. Only one submission is allowed
   * at a time. If a submit is already in progress, abort, throwing a silent
   * error. Otherwise, invoke the handler. If the handler throws any errors,
   * display the error.
   */
  function submitter(handler) {
    return BaseView.preventDefaultThen(function() {
      var self = this;
      var args = [].slice.call(arguments, 0);
      args.unshift(handler);

      if (self.isSubmitting()) {
        return p()
          .then(function () {
            // already submitting, get outta here.
            throw new SilentError('submit already in progress');
          });
      }

      self._isSubmitting = true;
      return p()
        .then(function () {
          return self.invokeHandler.apply(self, args);
        })
        .then(function () {
          self._isSubmitting = false;
        }, function (err) {
          self._isSubmitting = false;

          throw self.displayError(err);
        });
    });
  }

  var FormView = BaseView.extend({
    constructor: function (options) {
      BaseView.call(this, options);

      // attach events of the descendent view and this view.
      this.delegateEvents(_.extend({}, FormView.prototype.events, this.events));
    },

    events: {
      'submit form': 'validateAndSubmit',
      'keyup form': 'enableSubmitIfValid',
      'change form': 'enableSubmitIfValid'
    },

    /**
     * Get the current form values. Does not fetch the value of elements with
     * the `data-novalue` attribute.
     *
     * @method getFormValues
     */
    getFormValues: function () {
      var values = {};
      var inputEls = this.$('input,textarea,select');

      for (var i = 0, length = inputEls.length; i < length; ++i) {
        var el = $(inputEls[i]);
        // elements that have data-novalue (like password show fields)
        // are not added to the values.
        if (typeof el.attr('data-novalue') === 'undefined') {
          var name = el.attr('name') || el.attr('id');
          values[name] = el.val();
        }
      }

      return values;
    },

    //when a user begins typing in an input, grab the placeholder,
    // put it in a label and then unbind the event
    // this is done to prevent user confustion about multiple password inputs
    togglePlaceholderPattern: function() {
      var input = this.$('input');
      input.one('keypress', function(){
        var placeholder = $(this).attr('placeholder');
        if (placeholder !== '') {
          $(this).attr('placeholder','');
          $(this).prev('.label-helper').text(placeholder).animate( {'top': '-17px'}, 400);
        }
      });
    },

    enableSubmitIfValid: ifFormValuesChanged(function () {
      // the change event can be called after the form is already
      // submitted if the user presses "enter" in the form. If the
      // form is in the midst of being submitted, bail out now.
      if (this.isSubmitting()) {
        return;
      }


      if (this.isValid()) {
        this.hideError();
        this.enableForm();
      } else {
        this.disableForm();
      }
    }),

    disableForm: function () {
      this.$('button[type=submit]').addClass('disabled');
      this._isFormEnabled = false;
    },

    enableForm: function () {
      this.$('button[type=submit]').removeClass('disabled');
      this._isFormEnabled = true;
    },

    _isFormEnabled: true,
    isFormEnabled: function () {
      return !!this._isFormEnabled;
    },

    /**
     * Validate and if valid, submit the form.
     *
     * If the form is valid, three functions are run in series using
     * a promise chain: beforeSubmit, submit, and afterSubmit.
     *
     * By default, beforeSubmit and afterSubmit are used to prevent
     * multiple concurrent form submissions. The form is disbled in
     * beforeSubmit, and if no error is displayed, the form is re-enabled
     * in afterSubmit. This behavior can be overridden in subclasses.
     *
     * Form submission is prevented if beforeSubmit resolves to false.
     *
     * Functions can return a promise to allow for asynchronous operations.
     *
     * If a function throws an error or returns a rejected promise,
     * displayError will display the error to the user.
     *
     * @method validateAndSubmit
     * @return {promise}
     */
    validateAndSubmit: submitter(function () {
      var self = this;

      return p()
        .then(function () {
          if (! self.isValid()) {
            // Validation error is surfaced for testing.
            throw new SilentError(self.showValidationErrors());
          }
        })
        .then(function () {
          // the form enabled check is done after the validation check
          // so that the form's `submit` handler is triggered and validation
          // error tooltips are displayed, even if the form is disabled.
          if (! self.isFormEnabled()) {
            throw new SilentError('form is disabled');
          }
        })
        // all good, do the beforeSubmit, submit, and afterSubmit chain.
        .then(_.bind(self.beforeSubmit, self))
        .then(function (shouldSubmit) {
          // submission is opt out, not opt in.
          if (shouldSubmit !== false) {
            return self.submit();
          }
        })
        .then(_.bind(self.afterSubmit, self));
    }),

    /**
     * Checks whether the form is valid. Checks the validitity of each
     * form element. If any elements are invalid, returns false.
     *
     * No errors are displayed.
     *
     * Descendent views can override isValidStart or isValidEnd to perform
     * view specific checks.
     */
    isValid: function () {
      if (! this.isValidStart()) {
        return false;
      }

      var inputEls = this.$('input');
      for (var i = 0, length = inputEls.length; i < length; ++i) {
        var el = inputEls[i];
        if (! this.isElementValid(el)) {
          return false;
        }
      }

      return this.isValidEnd();
    },

    /**
     * Check form for validity.  isValidStart is run before
     * input elements are checked. Descendent views only need to
     * override to do any form specific checks that cannot be
     * handled by the generic handlers.
     *
     * @return true if form is valid, false otw.
     */
    isValidStart: function () {
      return true;
    },

    /**
     * Check form for validity.  isValidEnd is run after
     * input elements are checked. Descendent views only need to
     * override to do any form specific checks that cannot be
     * handled by the generic handlers.
     *
     * @return true if form is valid, false otw.
     */
    isValidEnd: function () {
      return true;
    },

    /**
     * Check to see if an element passes HTML5 form validation.
     */
    isElementValid: function (selector) {
      var el = this.$(selector);
      var type = el.attr('type');

      // email follows our own rules.
      if (type === 'email') {
        return this.validateEmail(selector);
      }

      var value = el.val();
      var isValid = !!(value && el[0].validity.valid);
      return isValid;
    },

    /**
     * Display form validation errors.
     *
     * Descendent views can override showValidationErrorsStart
     * or showValidationErrorsEnd to display view specific messages.
     */
    showValidationErrors: function () {
      this.hideError();

      if (this.showValidationErrorsStart()) {
        // only one message at a time.
        return;
      }

      var inputEls = this.$('input');
      for (var i = 0, length = inputEls.length; i < length; ++i) {
        var el = inputEls[i];
        if (! this.isElementValid(el)) {
          var fieldType = this.getElementType(el);

          if (fieldType === 'email') {
            return this.showEmailValidationError(el);
          } else if (fieldType === 'password') {
            return this.showPasswordValidationError(el);
          }

          // only one message at a time.
          return;
        }
      }

      this.showValidationErrorsEnd();
    },

    getElementType: function (el) {
      var fieldType = $(el).attr('type');

      // text fields with the password class are treated as passwords.
      // These are password fields that have been converted to text
      // fields when the user clicked on 'show'
      if (fieldType === 'text' && $(el).hasClass('password')) {
        fieldType = 'password';
      }

      return fieldType;
    },

    /**
     * Display form validition errors.  isValidStart is run before
     * input element validation errors are displayed. Descendent
     * views only need to override to show any form specific
     * validation errors that are not handled by the generic handlers.
     *
     * @return true if a validation error is displayed.
     */
    showValidationErrorsStart: function () {
    },

    /**
     * Display form validition errors.  isValidEnd is run after
     * input element validation errors are displayed. Descendent
     * views only need to override to show any form specific
     * validation errors that are not handled by the generic handlers.
     *
     * @return true if a validation error is displayed.
     */
    showValidationErrorsEnd: function () {
    },

    /**
     * Validate an email field
     *
     * @return true if email is valid, false otw.
     */
    validateEmail: function (selector) {
      var email = this.$(selector).val();
      return Validate.isEmailValid(email);
    },

    showEmailValidationError: function (which) {
      return this.showValidationError(which, t('Valid email required'));
    },

    showPasswordValidationError: function (which) {
      var passwordVal = this.$(which).val();

      var msg = passwordVal ? t('Must be at least 8 characters')
                            : t('Valid password required');

      return this.showValidationError(which, msg);
    },

    /**
     * Show a form validation error to the user in the form of a tooltip.
     */
    showValidationError: function (which, message) {
      var invalidEl = this.$(which);

      var tooltip = new Tooltip({
        message: message,
        invalidEl: invalidEl
      });

      var self = this;
      tooltip.on('destroyed', function () {
        invalidEl.removeClass('invalid');
        self.trigger('validation_error_removed', which);
      }).render().then(function () {
        // used for testing
        self.trigger('validation_error', which, message);
      });

      this.trackSubview(tooltip);

      try {
        invalidEl.addClass('invalid').get(0).focus();
      } catch (e) {
        // IE can blow up if the element is not visible.
      }

      return message;
    },

    /**
     * Descendent views can override.
     *
     * Descendent views may want to override this to allow multiple form
     * submissions or to disable form submissions. Return false or a
     * promise that resolves to false to prevent form submission.
     *
     * @return {promise || boolean || none} Reture a promise if
     *   beforeSubmit is an asynchronous operation.
     */
    beforeSubmit: function () {
      this.disableForm();
    },

    /**
     * Descendent views should override.
     *
     * Submit form data to the server. Only called if isValid returns true
     * and beforeSubmit does not return false.
     *
     * @return {promise || none} Return a promise if submit is
     *   an asynchronous operation.
     */
    submit: function () {
    },

    /**
     * Descendent views can override.
     *
     * Descendent views may want to override this to allow
     * multiple form submissions.
     *
     * @return {promise || none} Return a promise if afterSubmit is
     *   an asynchronous operation.
     */
    afterSubmit: function () {
      // A view can display an error without throwing an exception.
      // Check if the form is valid and no errors are visible before
      // re-enabling the form. The user must modify the form for it to
      // be re-enabled.
      if (! this.isErrorVisible()) {
        this.enableForm();
      }
    },

    /**
     * Check if the form is currently being submitted
     *
     * @return {boolean} true if form is being submitted, false otw.
     */
    isSubmitting: function () {
      return this._isSubmitting;
    }
  });

  /**
   * Surface submitter to other classes
   */
  FormView.submitter = submitter;

  return FormView;
});
