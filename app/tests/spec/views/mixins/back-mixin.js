/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const { assert } = require('chai');
  const BackMixin = require('views/mixins/back-mixin');
  const BaseView = require('views/base');
  const Cocktail = require('cocktail');
  const KeyCodes = require('lib/key-codes');
  const Notifier = require('lib/channels/notifier');
  const sinon = require('sinon');
  const TestTemplate = require('stache!templates/test_template');

  const View = BaseView.extend({
    template: TestTemplate
  });

  Cocktail.mixin(
    View,
    BackMixin
  );

  describe('views/mixins/back-mixin', function () {
    var notifier;
    var view;

    beforeEach(function () {
      notifier = new Notifier();

      view = new View({
        canGoBack: true,
        notifier: notifier,
        screenName: 'back-screen'
      });

      return view.render();
    });

    describe('back', function () {
      it('triggers `navigate-back` message on the notifier once', function () {
        sinon.spy(notifier, 'trigger');

        view.back({ nextViewField: 'value' });
        // The second invocation should be ignored.
        view.back();

        assert.isTrue(notifier.trigger.calledOnce);
        assert.isTrue(
          notifier.trigger.calledWith('navigate-back', {
            nextViewData: {
              nextViewField: 'value'
            }
          }));
      });

      it('logs a `back` event on the view', () => {
        sinon.spy(view, 'logViewEvent');

        assert.isFalse(view.logViewEvent.called);

        view.back();

        assert.isTrue(view.logViewEvent.calledOnce);
        assert.isTrue(view.logViewEvent.calledWith('back'));
      });
    });

    describe('backOnEnter', function () {
      it('calls back if user presses ENTER key', function () {
        sinon.spy(view, 'back');

        view.backOnEnter({ which: KeyCodes.ENTER });
        assert.isTrue(view.back.called);
      });

      it('does not call back if user presses any key besides ENTER', function () {
        sinon.stub(view, 'canGoBack', function () {
          return true;
        });
        sinon.spy(view, 'back');

        view.backOnEnter({ which: KeyCodes.ENTER + 1});
        assert.isFalse(view.back.called);
      });
    });

    describe('canGoBack', function () {
      it('returns `true` if view created with `canGoBack: true` option', function () {
        view = new View({ canGoBack: true });
        assert.isTrue(view.canGoBack());
      });

      it('returns `false` if view created with `canGoBack: false` option', function () {
        view = new View({ canGoBack: false });
        assert.isFalse(view.canGoBack());
      });
    });
  });
});
