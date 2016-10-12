/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const BaseView = require('views/base');
  const Chai = require('chai');
  const Cocktail = require('cocktail');
  const TestHelpers = require('../../../lib/helpers');
  const TimerMixin = require('views/mixins/timer-mixin');

  var assert = Chai.assert;

  var TimerView = BaseView.extend({});

  Cocktail.mixin(
    TimerView,
    TimerMixin
  );

  describe('views/mixins/timer-mixin', function () {
    var view;

    beforeEach(function () {
      view = new TimerView();
    });

    describe('setTimeout', function () {
      it('returns a handle that can be used to call clearTimeout', function (done) {
        var timeout = view.setTimeout(done, 1);
        assert.ok(timeout);
      });

      it('calls a function after time has elapsed', function (done) {
        view.setTimeout(done, 1);
      });

      it('calls a function in the context of the view', function (done) {
        view.setTimeout(function () {
          TestHelpers.wrapAssertion(() => {
            assert.strictEqual(this, view);
          }, done);
        }, 1);
      });
    });

    describe('clearTimeout', function () {
      it('clears an outstanding timeout', function (done) {
        var isTimeoutCalled = false;
        var timeout = view.setTimeout(function () {
          isTimeoutCalled = true;
        }, 10);

        setTimeout(function () {
          TestHelpers.wrapAssertion(function () {
            assert.isFalse(isTimeoutCalled);
          }, done);
        }, 20);

        view.clearTimeout(timeout);
      });
    });

    describe('destroying the view', function () {
      it('removes any outstanding timeouts', function (done) {
        var isTimeoutCalled = false;
        view.setTimeout(function () {
          isTimeoutCalled = true;
        }, 10);

        setTimeout(function () {
          TestHelpers.wrapAssertion(function () {
            assert.isFalse(isTimeoutCalled);
          }, done);
        }, 20);

        view.destroy();
      });
    });
  });
});

