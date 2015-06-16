/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'sinon',
  'lib/sentry',
  'raven',
  '../../mocks/window'
], function (chai, sinon, SentryMetrics, Raven, WindowMock) {
  var assert = chai.assert;
  var windowMock;
  var sentry;
  var host;

  describe('lib/sentry', function () {

    beforeEach(function () {
      windowMock = new WindowMock();
      host = windowMock.location.host;
    });

    afterEach(function () {
      try {
        // restores error contexts and removes raven.js
        sentry.remove();
      } catch (e) {
      }
    });

    describe('init', function () {
      it('properly inits', function () {
        try {
          void new SentryMetrics();
        } catch (e) {
          assert.isNull(e);
        }
        SentryMetrics._endpoint = 'test';
      });

      it('properly inits with host', function () {
        var sentry;
        try {
          sentry = new SentryMetrics(host);
        } catch (e) {
          assert.isNull(e);
        }

        assert.equal(sentry._endpoint, '//__API_KEY__@' + host + '/metrics-errors');
      });

      it('catches init errors', function () {
        sinon.stub(Raven, 'config', function () {
          throw new Error('Config error');
        });

        try {
          void new SentryMetrics(host);
        } catch (e) {
          assert.isNull(e);
        }

        assert.isTrue(Raven.config.called);

        Raven.config.restore();
      });

    });

    describe('remove', function () {
      it('properly removes itself', function () {
        var sentry = new SentryMetrics(host);
        try {
          sentry.remove();
        } catch (e) {
          assert.isNull(e);
        }
      });
    });

    describe('captureException', function () {
      it('does not throw errors', function () {
        // captureException will not throw before init;
        try {
          Raven.captureException(new Error('tests'));
        } catch (e) {
          assert.isNull(e);
        }

        void new SentryMetrics(host);

        // does not throw after init
        try {
          Raven.captureException(new Error('tests'));
        } catch (e) {
          assert.isNull(e);
        }

      });
    });

    describe('beforeSend', function () {
      it('works without request url', function () {
        var data = {
          key: 'value'
        };
        var sentry = new SentryMetrics(host);
        var resultData = sentry.__beforeSend(data);

        assert.equal(data, resultData);
      });

      it('properly erases sensitive information from url', function () {
        var url = 'https://accounts.firefox.com/complete_reset_password';
        var badQuery = '?token=foo&code=bar&email=some%40restmail.net&service=sync';
        var goodQuery = '?token=VALUE&code=VALUE&email=VALUE&service=sync';
        var badData = {
          request: {
            url: url + badQuery
          }
        };

        var goodData = {
          request: {
            url: url + goodQuery
          }
        };

        var sentry = new SentryMetrics(host);
        var resultData = sentry.__beforeSend(badData);

        assert.equal(resultData.key, goodData.key);
        assert.equal(resultData.url, goodData.url);
      });
    });

    describe('cleanUpQueryParam', function () {
      it('properly erases sensitive information', function () {
        var fixtureUrl1 = 'https://accounts.firefox.com/complete_reset_password?token=foo&code=bar&email=some%40restmail.net';
        var expectedUrl1 = 'https://accounts.firefox.com/complete_reset_password?token=VALUE&code=VALUE&email=VALUE';
        var sentry = new SentryMetrics(host);
        var resultUrl1 = sentry.__cleanUpQueryParam(fixtureUrl1);

        assert.equal(resultUrl1, expectedUrl1);
      });

      it('properly erases sensitive information, keeps allowed fields', function () {
        var fixtureUrl2 = 'https://accounts.firefox.com/signup?client_id=foo&preVerifyToken=bar&service=sync';
        var expectedUrl2 = 'https://accounts.firefox.com/signup?client_id=foo&preVerifyToken=VALUE&service=sync';
        var sentry = new SentryMetrics(host);
        var resultUrl2 = sentry.__cleanUpQueryParam(fixtureUrl2);

        assert.equal(resultUrl2, expectedUrl2);
      });
    });
  });

});

