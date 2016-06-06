/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var Able = require('lib/able');
  var chai = require('chai');
  var Experiment = require('lib/experiments/show-password');
  var Metrics = require('lib/metrics');
  var Notifier = require('lib/channels/notifier');
  var sinon = require('sinon');
  var Storage = require('lib/storage');
  var TestHelpers = require('../../../lib/helpers');
  var User = require('models/user');
  var WindowMock = require('../../../mocks/window');

  var able;
  var assert = chai.assert;
  var experiment;
  var notifier;
  var metrics;
  var storage;
  var user;
  var UUID = 'a mock uuid';
  var windowMock;

  describe('lib/experiments/show-password', function () {
    beforeEach(function () {
      able = new Able();
      sinon.stub(able, 'choose', function () {
        return 'treatment';
      });

      metrics = new Metrics();
      notifier = new Notifier();
      storage = new Storage();
      user = new User({
        uniqueUserId: UUID
      });
      windowMock = new WindowMock();

      experiment = new Experiment();
      experiment.initialize('showPassword', {
        able: able,
        metrics: metrics,
        notifier: notifier,
        storage: storage,
        user: user,
        window: windowMock,
      });

    });

    describe('initialize', function () {
      it('initializes', function () {
        assert.isTrue(experiment._initialized);
      });
    });

    describe('notifier', function () {
      it('properly logs events', function () {
        sinon.spy(experiment, 'saveState');
        sinon.spy(experiment.metrics, 'logEvent');

        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.enrolled'), 'enrolled');
        assert.equal(metrics.getFilteredData().events.length, 1, 'should log the events that happened');
        assert.isFalse(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.clicked'), 'not clicked');
        assert.isFalse(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.triggered'), 'not triggered');
        notifier.trigger('showPassword.triggered');
        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.triggered'), 'triggered');

        notifier.trigger('showPassword.clicked');
        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.clicked'), 'clicked');

        notifier.trigger('verification.success');
        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.verified'), 'verified');
        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.triggered.verified'), 'triggered.verified');
        assert.isTrue(TestHelpers.isEventLogged(metrics, 'experiment.treatment.showPassword.clicked.verified'), 'clicked.verified');

        assert.equal(metrics.getFilteredData().events.length, 6, 'should log the events that happened');
        notifier.trigger('verification.success');
        assert.equal(metrics.getFilteredData().events.length, 6, 'should not log events that already happened');
      });
    });

  });
});
