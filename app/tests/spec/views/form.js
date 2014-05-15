/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'jquery',
  'p-promise',
  'views/form',
  'stache!templates/test_template',
  'lib/constants',
  '../../lib/helpers'
],
function (chai, $, p, FormView, Template, Constants, TestHelpers) {
  var assert = chai.assert;

  describe('views/form', function () {
    var view;

    var View = FormView.extend({
      template: Template,

      // overridden in tests.
      formIsValid: false,
      isFormSubmitted: false,

      isValid: function () {
        return this.formIsValid;
      },

      showValidationErrors: function () {
        return this.showValidationError('body', 'invalid form');
      },

      submit: function () {
        this.isFormSubmitted = true;
      }
    });

    function testErrorDisplayed(expectedMessage) {
      return view.validateAndSubmit()
          .then(function () {
            // success callback should not be called on failure.
            assert(false, 'unexpected success');
          }, function (err) {
            assert.equal(err, expectedMessage);
            assert.isTrue(view.isErrorVisible());
          });
    }

    function testValidationErrorDisplayed(expectedMessage) {
      return view.validateAndSubmit()
          .then(function () {
            // success callback should not be called on failure.
            assert(false, 'unexpected success');
          }, function (err) {
            assert.equal(err, expectedMessage);
          });
    }

    function testFormSubmitted() {
      return view.validateAndSubmit()
                  .then(function () {
                    assert.isTrue(view.isFormSubmitted);
                  });
    }

    beforeEach(function () {
      view = new View({});

      return view.render()
          .then(function () {
            $('#container').html(view.el);
          });
    });

    afterEach(function () {
      if (view) {
        view.destroy();
        $(view.el).remove();
        view = null;
      }
    });

    describe('enableSubmitIfValid', function () {
      it('enables submit button if isValid returns true', function () {
        view.formIsValid = true;
        view.enableSubmitIfValid();
        assert.isFalse(view.$('button').hasClass('disabled'));
      });

      it('hides errors if isValid returns true', function () {
        view.displayError('this is an error');
        view.formIsValid = true;
        view.enableSubmitIfValid();
        assert.isFalse(view.isErrorVisible());
      });

      it('disabled submit button if isValid returns false', function () {
        view.formIsValid = false;
        view.enableSubmitIfValid();
        assert.isTrue(view.$('button').hasClass('disabled'));
      });
    });

    describe('validateAndSubmit', function () {
      it('submits form if isValid returns true', function () {
        view.formIsValid = true;
        return testFormSubmitted();
      });

      it('shows validation errors if isValid returns false', function () {
        view.formIsValid = false;
        return testValidationErrorDisplayed('invalid form');
      });

      it('only allows one submit at a time', function () {
        view.formIsValid = true;
        view.validateAndSubmit();
        return view.validateAndSubmit()
                  .then(function () {
                    assert(false, 'unexpected success');
                  }, function (err) {
                    assert.equal(err.message, 'submit already in progress');
                  });

      });

      it('does not submit if form is disabled', function () {
        view.formIsValid = true;
        view.disableForm();
        return view.validateAndSubmit()
                  .then(function () {
                    assert(false, 'unexpected success');
                  }, function (err) {
                    assert.equal(err.message, 'form is disabled');
                  });
      });

      it('displays error message and does not disable form if beforeSubmit throws an error', function () {
        view.formIsValid = true;
        view.beforeSubmit = function () {
          throw 'an error message';
        };

        return testErrorDisplayed('an error message')
                  .then(function () {
                    assert.isTrue(view.isFormEnabled());
                  });
      });

      it('beforeSubmit can return a false to stop form submission', function () {
        view.formIsValid = true;
        view.beforeSubmit = function () {
          return false;
        };

        return view.validateAndSubmit()
                    .then(function () {
                      assert.isFalse(view.isFormSubmitted);
                    });
      });

      it('beforeSubmit can return a promise for asynchronous operations', function () {
        view.formIsValid = true;
        view.beforeSubmit = function () {
          return p().delay(10);
        };

        return testFormSubmitted();
      });

      it('displays error message and does not re-enable form if submit throws an error', function () {
        view.formIsValid = true;
        view.submit = function () {
          throw 'an error message';
        };

        return testErrorDisplayed('an error message')
                  .then(function () {
                    assert.isFalse(view.isFormEnabled());
                  });
      });

      it('submit can return a promise for asynchronous operations', function () {
        view.formIsValid = true;
        view.submit = function () {
          return p().then(function () {
            view.isFormSubmitted = true;
          }).delay(10);
        };

        return testFormSubmitted();
      });

      it('override afterSubmit to prevent form from being re-enabled - afterSubmit errors are not displayed', function () {
        view.formIsValid = true;
        view.afterSubmit = function () {
          // do not re-enable form.
          throw new Error('error that is not displayed');
        };

        return view.validateAndSubmit()
                  .then(null, function(err) {
                    assert.equal(err.message, 'error that is not displayed');
                    assert.isFalse(view.isFormEnabled());
                  });
      });

      it('afterSubmit can return a promise for asynchronous operations', function () {
        view.formIsValid = true;
        view.afterSubmit = function () {
          return p().delay(10);
        };

        return testFormSubmitted();
      });

    });

    describe('showValidationError', function () {
      it('creates a tooltip', function() {
        view.on('validation_error', function (done) {
          assert.ok(view.$('.tooltip').length);
          done();
        });
        view.showValidationError('#focusMe', 'this is an error');
      });

      it('focuses the invalid element', function (done) {
        // wekbit fails unless focusing another element first.
        $('#otherElement').focus();

        TestHelpers.requiresFocus(function () {
          view.$('#focusMe').on('focus', function () {
            done();
          });
          view.showValidationError('#focusMe', 'this is an error');
        }, done);
      });

      it('adds invalid class to the invalid element', function () {
        view.showValidationError('#focusMe', 'this is an error');
        assert.isTrue(view.$('#focusMe').hasClass('invalid'));
      });

      it('invalid class is removed as soon as element is valid again', function (done) {
        view.on('validation_error', function () {
          assert.isTrue(view.$('#focusMe').hasClass('invalid'));

          // add a value, causing the validation error to be removed.
          $('#focusMe').val('heyya!');
          view.$('#focusMe').trigger('keydown');
        });

        view.on('validation_error_removed', function () {
          assert.isFalse(view.$('#focusMe').hasClass('invalid'));
          done();
        });

        // element is required, has no value
        view.showValidationError('#focusMe', 'Field is required');
      });
    });

    describe('getFormValues', function () {
      it('gets the value of form fields that do not have the `data-novalue` attribute', function () {
        view.$('#focusMe').val('the value');
        view.$('#otherElement').val('another value');

        var values = view.getFormValues();
        assert.equal(values.focusMe, 'the value');
        assert.equal(values.otherElement, 'another value');
        assert.isUndefined(values.novalue);
      });
    });

    describe('validateEmail', function () {
      it('returns false if an empty email', function () {
        view.$('#email').val('');
        assert.isFalse(view.validateEmail('#email'));
        assert.isFalse(view.isElementValid('#email'));
      });

      it('returns false if an invalid email', function () {
        view.$('#email').val('invalid');
        assert.isFalse(view.validateEmail('#email'));
        assert.isFalse(view.isElementValid('#email'));
      });

      it('returns true if a valid email', function () {
        view.$('#email').val('testuser@testuser.com');
        assert.isTrue(view.validateEmail('#email'));
        assert.isTrue(view.isElementValid('#email'));
      });
    });

    describe('validatePassword', function () {
      it('returns false if an empty password', function () {
        view.$('#password').val('');
        assert.isFalse(view.validatePassword('#password'));
        assert.isFalse(view.isElementValid('#password'));
      });

      it('returns false if too short a password', function () {
        view.$('#password').val('1');
        assert.isFalse(view.validatePassword('#password'));
        assert.isFalse(view.isElementValid('#password'));
      });

      it('returns true if a valid password', function () {
        view.$('#password').val(TestHelpers.createRandomHexString(Constants.PASSWORD_MIN_LENGTH));
        assert.isTrue(view.validatePassword('#password'));
        assert.isTrue(view.isElementValid('#password'));
      });
    });

    describe('validateInput', function () {
      it('returns true for an empty non-required input', function () {
        view.$('#notRequired').val('');
        assert.isTrue(view.validateInput('#notRequired'));
        assert.isTrue(view.isElementValid('#notRequired'));
      });

      it('returns true for a filled out non-required input', function () {
        view.$('#notRequired').val('value');
        assert.isTrue(view.validateInput('#notRequired'));
        assert.isTrue(view.isElementValid('#notRequired'));
      });

      it('returns false for an empty required input', function () {
        view.$('#required').val('');
        assert.isFalse(view.validateInput('#required'));
        assert.isFalse(view.isElementValid('#required'));
      });

      it('returns true for a filled out required input', function () {
        view.$('#required').val('value');
        assert.isTrue(view.validateInput('#required'));
        assert.isTrue(view.isElementValid('#required'));
      });
    });
  });
});

