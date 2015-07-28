/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var _ = require('underscore');
  var chai = require('chai');
  var FloatingPlaceholderMixin = require('views/mixins/floating-placeholder-mixin');
  var FormView = require('views/form');
  var Template = require('stache!templates/test_template');

  var assert = chai.assert;

  var TestView = FormView.extend({
    template: Template,
    afterRender: function () {
      this.initializePlaceholderFields();
    }
  });

  _.extend(TestView.prototype, FloatingPlaceholderMixin);

  describe('lib/floating-placeholder-mixin', function () {
    var view;

    beforeEach(function () {
      view = new TestView();
      return view.render();
    });

    it('no action if enter is pressed with no other input', function () {
      console.log('val: %s', view.$('#float_me').length);
      var event = new $.Event('input');
      event.which = 13;

      view.$('#float_me').trigger(event);

      assert.equal(view.$('#float_me').attr('placeholder'), 'placeholder text');
      assert.equal(view.$('.label-helper').text(), '');
    });

    it('floats the placeholder if the input changes', function () {
      view.$('#float_me').val('a');

      var event = new $.Event('input');
      event.which = 13;

      view.$('#float_me').trigger(event);

      assert.equal(typeof view.$('#float_me').attr('placeholder'), 'undefined');
      assert.equal(view.$('.label-helper').text(), 'placeholder text');
    });
  });
});
