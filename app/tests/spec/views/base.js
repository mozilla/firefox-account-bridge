/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'mocha',
  'chai',
  'jquery',
  'views/base',
  'lib/translator',
  'stache!templates/test_template',
  '../../mocks/dom-event'
],
function (mocha, chai, jQuery, BaseView, Translator, Template, DOMEventMock) {
  /*global describe, beforeEach, afterEach, it*/
  var assert = chai.assert;

  describe('views/base', function () {
    var view;
    beforeEach(function () {
      translator = new Translator();
      translator.set({
        'the error message': 'a translated error message'
      });

      var View = BaseView.extend({
        template: Template,
        translator: translator
      });

      view = new View();
      view.render();
      jQuery('body').append(view.el);
    });

    afterEach(function () {
      if (view) {
        view.destroy();
        jQuery(view.el).remove();
        view = null;
      }
    });

    describe('render', function () {
      it('renders the template without attaching it to the body', function () {
        // render is called in beforeEach
        assert.ok(jQuery('#focusMe').length);
      });
    });

    describe('afterVisible', function () {
      afterEach(function () {
        jQuery('html').removeClass('no-touch');
      });

      it('focuses descendent element containing `autofocus` if html has `no-touch` class', function () {
        jQuery('html').addClass('no-touch');

        var handlerCalled = false;
        jQuery('#focusMe').on('focus', function () {
          handlerCalled = true;
        });
        view.afterVisible();

        assert.isTrue(handlerCalled);
      });

      it('does not focus descendent element containing `autofocus` if html does not have `no-touch` class', function () {
        var handlerCalled = false;
        jQuery('#focusMe').on('focus', function () {
          handlerCalled = true;
        });
        view.afterVisible();

        assert.isFalse(handlerCalled);
      });
    });

    describe('displayError', function () {
      it('translates and display an error in the .error element', function () {
        view.displayError('the error message');
        assert.equal($('.error').html(), 'a translated error message');
      });
    });

    describe('BaseView.preventDefaultThen', function() {
      var event;

      it('can take the name of a function as the name of the event handler', function(done) {
        view.eventHandler = function(event) {
          assert.isTrue(event.isDefaultPrevented());
          done();
        };

        var backboneHandler = BaseView.preventDefaultThen('eventHandler');
        backboneHandler.call(view, new DOMEventMock());
      });

      it('can take a function as the event handler', function(done) {
        function eventHandler(event) {
          assert.isTrue(event.isDefaultPrevented());
          done();
        };

        var backboneHandler = BaseView.preventDefaultThen(eventHandler);
        backboneHandler.call(view, new DOMEventMock());
      });

      it('can take no arguments at all', function() {
        var backboneHandler = BaseView.preventDefaultThen();

        var eventMock = new DOMEventMock();
        backboneHandler.call(view, eventMock);

        assert.isTrue(eventMock.isDefaultPrevented());
      });
    });
  });
});

