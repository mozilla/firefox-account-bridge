/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const { registerSuite } = intern.getInterface('object');
const assert = intern.getPlugin('chai').assert;
const fs = require('fs');
const path = require('path');
const proxyquire = require('proxyquire');
var suite = {
  tests: {}
};
var SIGNUP_FLOW = 'Firefox Accounts Sign-up Flow';

suite.tests['it works with GA'] = function () {
  var data = JSON.parse(fs.readFileSync('tests/server/fixtures/ga_body_1.json'));

  function analyticsMock() {
    return {
      event: function (data) {
        assert.equal(data.anonymizeIp, 1);
        assert.equal(data.campaignMedium, 'none');
        assert.equal(data.campaignName, 'none');
        assert.equal(data.campaignSource, 'none');
        assert.equal(data.cid, 'c614d7fb-43e4-485c-bf11-40afbb202656');
        assert.equal(data.dataSource, 'web');
        assert.equal(data.ea, 'registered');
        assert.equal(data.ec, SIGNUP_FLOW);
        assert.equal(data.el, 'regular');
        assert.equal(data.ev, 1);
        assert.equal(data.hitType, 'event');
        assert.equal(data.uid, 'c614d7fb-43e4-485c-bf11-40afbb202656');
        assert.equal(data.sr, '1680x1050');
        assert.equal(data.vp, '819x955');
        assert.isTrue(data.qt > 0);
        assert.isDefined(data.documentHostName);
        assert.isDefined(data.ua);
        assert.equal(data.ul, 'en');

        return this;
      },
      send: function () {}
    };
  }

  var mocks = {
    'universal-analytics': analyticsMock
  };
  var GACollector = proxyquire(path.join(process.cwd(), 'server', 'lib', 'ga-collector'), mocks);
  var collect = new GACollector({
    analyticsId: 'mockId'
  });
  collect.write(data);
};

suite.tests['it works with GA path page events'] = function () {
  var data = JSON.parse(fs.readFileSync('tests/server/fixtures/ga_body_screen.json'));

  function analyticsMock() {
    return {
      pageview: function (data) {
        assert.equal(data.dp, '/oauth/signup');
        assert.equal(data.hitType, 'screenview');
        assert.equal(data.cid, 'c614d7fb-43e4-485c-bf11-40afbb202656');

        return this;
      },
      send: function () {}
    };
  }

  var mocks = {
    'universal-analytics': analyticsMock
  };
  var GACollector = proxyquire(path.join(process.cwd(), 'server', 'lib', 'ga-collector'), mocks);
  var collect = new GACollector({
    analyticsId: 'mockId'
  });
  collect.write(data);
};

suite.tests['describes _calculateQueueTime'] = function () {
  var GACollector = proxyquire(path.join(process.cwd(), 'server', 'lib', 'ga-collector'), {});
  var collect = new GACollector({
    analyticsId: 'mockId'
  });

  assert.equal(collect._calculateQueueTime(), 0);
  assert.equal(collect._calculateQueueTime(1000), 0);
  assert.equal(collect._calculateQueueTime(1000, 2000, 500), 500);
  const now = Date.now();
  assert.equal(collect._calculateQueueTime(now, now + 5000, 1000), 4000);
  assert.equal(collect._calculateQueueTime(now, now - 5000, 1000), 0);
};

function testMalformedEventData (fixturePath) {
  var data = JSON.parse(fs.readFileSync(fixturePath));

  function analyticsMock() {
    return {
      event: function (data) {
        assert.fail('unexpected event write, invalid event');

        return this;
      }
    };
  }

  var mocks = {
    'universal-analytics': analyticsMock
  };
  var GACollector = proxyquire(path.join(process.cwd(), 'server', 'lib', 'ga-collector'), mocks);
  var collect = new GACollector({
    analyticsId: 'mockId'
  });
  try {
    collect.write(data);
  } catch (err) {
    assert.fail('unexpected failure: ' + String(err));
  }
}

suite.tests['malformed event data'] = function () {
  /**
   * event.type checks in malformed_event_data.json:
   * - missing `type`
   * - numeric `type`
   * - null `type`
   * - object `type`
   * - array `type`
   * - empty string `type`
   */
  testMalformedEventData('tests/server/fixtures/malformed_event_data.json');
};

registerSuite('ga metrics', suite);
