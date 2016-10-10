/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const Able = require('lib/able');
  const BaseView = require('views/base');
  const Chai = require('chai');
  const Cocktail = require('cocktail');
  const Metrics = require('lib/metrics');
  const Mixin = require('views/mixins/experiment-mixin');
  const Notifier = require('lib/channels/notifier');
  const TestTemplate = require('stache!templates/test_template');
  const User = require('models/user');
  const WindowMock = require('../../../mocks/window');

  var assert = Chai.assert;
  var View = BaseView.extend({
    template: TestTemplate
  });
  Cocktail.mixin(View, Mixin);

  var mockExperiment = {
    isInGroup: function () {
      return true;
    }
  };

  describe('views/mixins/experiment-mixin', function () {
    var UUID = 'a mock uuid';

    var able;
    var metrics;
    var notifier;
    var user;
    var view;
    var windowMock;

    beforeEach(function () {
      able = new Able();
      metrics = new Metrics();
      notifier = new Notifier();
      user = new User({
        uniqueUserId: UUID
      });
      windowMock = new WindowMock();
      windowMock.navigator.userAgent = 'mocha';

      view = new View({
        able: able,
        metrics: metrics,
        notifier: notifier,
        user: user,
        window: windowMock
      });

      return view.render();
    });

    afterEach(function () {
      return view.destroy();
    });

    describe('initialize', function () {
      it('initializes', function () {
        assert.isTrue(view.experiments.initialized);
      });
    });

    describe('isInExperiment', function () {
      it('returns if user is in experiment', function () {
        view.experiments._activeExperiments = {
          'realExperiment': mockExperiment
        };

        assert.isTrue(view.isInExperiment('realExperiment'));
      });

      it('returns if user is not in experiment', function () {
        view.experiments._activeExperiments = {
          'realExperiment': mockExperiment
        };

        assert.isFalse(view.isInExperiment('fakeExperiment'));
      });
    });

    describe('isInExperimentGroup', function () {
      it('returns if user is in experiment group', function () {
        view.experiments._activeExperiments = {
          'realExperiment': mockExperiment
        };

        assert.isTrue(view.isInExperimentGroup('realExperiment', 'treatment'));
        assert.isTrue(view.isInExperimentGroup('realExperiment', 'control'));
      });

      it('returns if user is not in experiment group', function () {
        view.experiments._activeExperiments = {
          'realExperiment': mockExperiment
        };

        assert.isFalse(view.isInExperimentGroup('fakeExperiment', 'treatment'));
        assert.isFalse(view.isInExperimentGroup('fakeExperiment', 'control'));
      });
    });
  });
});
