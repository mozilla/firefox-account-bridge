/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var BaseView = require('views/base');
  var chai = require('chai');
  var Cocktail = require('cocktail');
  var KeyCodes = require('lib/key-codes');
  var Metrics = require('lib/metrics');
  var SettingsPanelMixin = require('views/mixins/settings-panel-mixin');
  var sinon = require('sinon');
  var TestTemplate = require('stache!templates/test_template');

  var assert = chai.assert;

  var SettingsPanelView = BaseView.extend({
    template: TestTemplate
  });

  Cocktail.mixin(SettingsPanelView, SettingsPanelMixin);

  describe('views/mixins/settings-panel-mixin', function () {
    var view;
    var metrics;

    beforeEach(function () {
      metrics = new Metrics();

      view = new SettingsPanelView({
        metrics: metrics,
        parentView: {
          displaySuccess: sinon.spy()
        }
      });

      return view.render()
        .then(function () {
          $('#container').html(view.el);
        });
    });

    afterEach(function () {
      metrics.destroy();

      view.remove();
      view.destroy();

      view = metrics = null;
    });

    describe('autofocus elements', () => {
      it('are converted to [autofocus-on-panel-open] to prevent attempts at autofocusing hidden elements', () => {
        assert.lengthOf(view.$('[autofocus]'), 0);
        assert.lengthOf(view.$('[autofocus-on-panel-open]'), 1);
      });
    });

    describe('events', function () {
      it('toggles button', function () {
        sinon.stub(view, 'navigate', function () {});
        $('.settings-unit-toggle').click();
        assert.isTrue(view.navigate.calledWith('settings/display_name'));
      });

      it('toggles open and closed', function () {
        sinon.stub(view, 'closePanel', function () {});
        sinon.stub(view, 'clearInput', function () {});
        sinon.stub(view, 'navigate', function () {});
        $('button.cancel').click();
        assert.isTrue(view.closePanel.called);
        assert.isTrue(view.clearInput.called);
        assert.isTrue(view.navigate.calledWith('settings'));
      });

      it('calls _hidePanelOnEscape when esc key is pressed', function () {
        sinon.stub(view, '_hidePanelOnEscape', function () {});
        var event = $.Event('keyup');
        event.which = KeyCodes.ESCAPE;
        view.onKeyUp(event);
        assert.isTrue(view._hidePanelOnEscape.called, '_hidePanelonEscape called');
      });
    });

    describe('methods', function () {
      it('open and close', function () {
        view.openPanel();
        assert.isTrue($('.settings-unit').hasClass('open'));
        assert.isTrue(view.isPanelOpen());
        view.closePanel();
        assert.isFalse($('.settings-unit').hasClass('open'));
        assert.isFalse(view.isPanelOpen());
      });

      it('openPanel focuses the first autofocus element if present', function () {
        // create and append an input field
        var $dummyInput = $('<input type="text" name="dummyholder" autofocus-on-panel-open>');
        view.$('.settings-unit').append($dummyInput);
        // make sure that it is a non-touch device
        $('html').addClass('no-touch');
        view.openPanel();

        // input field should be present, we just appended it
        var $autofocusEl = view.$('.open [autofocus-on-panel-open]');
        assert.lengthOf($autofocusEl, 1);
        // autofocusEl should have been focused
        assert.equal($autofocusEl[0], document.activeElement, 'autofocus element has focus');
      });

      it('_hidePanelOnEscape calls hidePanel when escape key is pressed', function () {
        sinon.stub(view, 'hidePanel', function () {});
        var event = $.Event('keyup');
        event.which = KeyCodes.ESCAPE;
        view._hidePanelOnEscape(event);
        assert.isTrue(view.hidePanel.called, 'hidePanel called');
      });

      it('_hidePanelOnEscape does not call hidePanel when other keys are pressed', function () {
        sinon.stub(view, 'hidePanel', function () {});
        var event = $.Event('keyup');
        event.which = KeyCodes.ENTER;
        view._hidePanelOnEscape(event);
        assert.isFalse(view.hidePanel.called, 'hidePanel not called');
      });

      it('hidePanel hides the open panel', function () {
        sinon.stub(view, 'closePanel', function () {});
        sinon.stub(view, 'navigate', function () { });
        view.openPanel();
        view.hidePanel();
        assert.isTrue(view.closePanel.called);
        assert.isTrue(view.navigate.calledWith('settings'));
      });

      it('displaySuccess', function () {
        sinon.stub(view, 'closePanel', function () {});
        view.displaySuccess('hi');
        assert.isTrue(view.parentView.displaySuccess.calledWith('hi'));
        assert.isTrue(view.closePanel.called);
      });

      it('clears panels', function () {
        var displayNamePanel = '.display-name';
        var labelHelper = view.$(displayNamePanel).prev('.label-helper');

        view.$(displayNamePanel).val('spc');
        labelHelper.text('placeholder text');

        view.clearInput('.settings-button.cancel');
        assert.isTrue(view.$(displayNamePanel).val() === '');
        assert.isTrue(view.$(displayNamePanel).attr('placeholder') === 'placeholder text');
        assert.isTrue(labelHelper.text() === '');
        assert.isTrue(labelHelper.css('top') === '0px');
      });

      it('disables buttons', function () {
        var cancelButton = '.settings-button.cancel';
        view.disableButtons(cancelButton);
        assert.isTrue(view.$(cancelButton).closest('form').find('[type=submit]').hasClass('disabled'));
      });
    });

  });
});

