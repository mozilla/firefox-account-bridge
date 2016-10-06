/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var _ = require('underscore');
  var AuthErrors = require('lib/auth-errors');
  var chai = require('chai');
  var Constants = require('lib/constants');
  var Relier = require('models/reliers/relier');
  var ResumeToken = require('models/resume-token');
  var TestHelpers = require('../../../lib/helpers');
  var WindowMock = require('../../../mocks/window');

  var assert = chai.assert;

  describe('models/reliers/relier', function () {
    var relier;
    var windowMock;

    var EMAIL = 'email@moz.org';
    var ENTRYPOINT = 'preferences';
    var PREVERIFY_TOKEN = 'a=.big==.token==';
    var SERVICE = 'sync';
    var SETTING = 'avatar';
    var UID = TestHelpers.createRandomHexString(Constants.UID_LENGTH);
    var UTM_CAMPAIGN = 'utm_campaign';
    var UTM_CONTENT = 'utm_content';
    var UTM_MEDIUM = 'utm_medium';
    var UTM_SOURCE = 'utm_source';
    var UTM_TERM = 'utm_term';

    beforeEach(function () {
      windowMock = new WindowMock();

      relier = new Relier({}, {
        window: windowMock
      });
    });

    it('fetch with missing `resume` token is not a problem', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        utm_campaign: UTM_CAMPAIGN //eslint-disable-line camelcase
      });

      return relier.fetch()
        .then(function () {
          assert.equal(relier.get('utmCampaign'), UTM_CAMPAIGN);
        });
    });

    it('fetch populates expected fields from the search parameters, unexpected search parameters are ignored', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        allowCachedCredentials: false,
        email: EMAIL,
        entrypoint: ENTRYPOINT,
        ignored: 'ignored',
        preVerifyToken: PREVERIFY_TOKEN,
        service: SERVICE,
        setting: SETTING,
        uid: UID,
        utm_campaign: UTM_CAMPAIGN, //eslint-disable-line camelcase
        utm_content: UTM_CONTENT, //eslint-disable-line camelcase
        utm_medium: UTM_MEDIUM, //eslint-disable-line camelcase
        utm_source: UTM_SOURCE, //eslint-disable-line camelcase
        utm_term: UTM_TERM //eslint-disable-line camelcase
      });

      return relier.fetch()
        .then(function () {
          // Next two are not imported from the search parameters, but is set manually.
          assert.isTrue(relier.get('allowCachedCredentials'));
          assert.equal(relier.get('context'), Constants.CONTENT_SERVER_CONTEXT);

          // The rest are imported from search parameters
          assert.equal(relier.get('preVerifyToken'), PREVERIFY_TOKEN);
          assert.equal(relier.get('service'), SERVICE);
          assert.equal(relier.get('email'), EMAIL);

          assert.equal(relier.get('setting'), SETTING);
          assert.equal(relier.get('uid'), UID);
          assert.equal(relier.get('entrypoint'), ENTRYPOINT);

          assert.equal(relier.get('utmCampaign'), UTM_CAMPAIGN);
          assert.equal(relier.get('utmContent'), UTM_CONTENT);
          assert.equal(relier.get('utmMedium'), UTM_MEDIUM);
          assert.equal(relier.get('utmSource'), UTM_SOURCE);
          assert.equal(relier.get('utmTerm'), UTM_TERM);

          assert.isFalse(relier.has('ignored'));
        });
    });

    it('entryPoint is correctly translated to `entrypoint` if `entrypoint` is not specified', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        entryPoint: ENTRYPOINT
      });

      return relier.fetch()
        .then(function () {
          assert.equal(relier.get('entrypoint'), ENTRYPOINT);
        });
    });

    it('entryPoint is ignored if `entrypoint` is already specified', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        entryPoint: 'ignored entrypoint',
        entrypoint: ENTRYPOINT
      });

      return relier.fetch()
        .then(function () {
          assert.equal(relier.get('entrypoint'), ENTRYPOINT);
        });
    });

    ['', ' ', 'invalid token'].forEach(function (value) {
      testInvalidQueryParam('preVerifyToken', value);
    });

    [undefined, PREVERIFY_TOKEN].forEach(function (value) {
      testValidQueryParam('preVerifyToken', value, 'preVerifyToken', value);
    });

    ['', ' ', 'invalid migration'].forEach(function (token) {
      testInvalidQueryParam('migration', token);
    });

    [undefined, Constants.AMO_MIGRATION, Constants.SYNC11_MIGRATION].forEach(function (value) {
      testValidQueryParam('migration', value, 'migration', value);
    });

    describe('email non-verification flow', function () {
      beforeEach(function () {
        relier.set('isVerification', false);
      });

      ['', ' ', 'invalid email'].forEach(function (email) {
        testInvalidQueryParam('email', email);
      });

      ['testuser@testuser.com', 'testuser@testuser.co.uk'].forEach(function (value) {
        testValidQueryParam('email', value, 'email', value);
      });
    });

    describe('email verification flow', function () {
      beforeEach(function () {
        relier = new Relier({}, {
          isVerification: true,
          window: windowMock
        });
      });

      [
        // the non-email strings will cause a validation error in
        // the consuming views.
        '',
        ' ',
        'invalid email',
        'testuser@testuser.com',
        'testuser@testuser.co.uk'
      ].forEach(function (value) {
        testValidQueryParam('email', value, 'email', value.trim());
      });
    });

    testValidQueryParam('email', Constants.DISALLOW_CACHED_CREDENTIALS, 'allowCachedCredentials', false);

    describe('uid non-verification flow', function () {
      beforeEach(function () {
        relier.set('isVerification', false);
      });

      ['', ' ', 'invalid uid'].forEach(function (uid) {
        testInvalidQueryParam('uid', uid);
      });

      [ UID ].forEach(function (value) {
        testValidQueryParam('uid', value, 'uid', value);
      });
    });

    describe('uid verification flow', function () {
      beforeEach(function () {
        relier = new Relier({}, {
          isVerification: true,
          window: windowMock
        });
      });

      [
        // the non-uid strings will cause a validation error in
        // the consuming views.
        '',
        ' ',
        'invalid uid',
        UID
      ].forEach(function (value) {
        testValidQueryParam('uid', value, 'uid', value.trim());
      });
    });

    testValidQueryParam('email', Constants.DISALLOW_CACHED_CREDENTIALS, 'allowCachedCredentials', false);

    it('isOAuth returns `false`', function () {
      assert.isFalse(relier.isOAuth());
    });

    it('isSync returns `false` by default', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        service: SERVICE
      });

      return relier.fetch()
        .then(function () {
          assert.isFalse(relier.isSync());
        });
    });

    it('allowCachedCredentials returns `true` if `email` not set', function () {
      return relier.fetch()
        .then(function () {
          assert.isTrue(relier.allowCachedCredentials());
        });
    });

    it('allowCachedCredentials returns `true` if `email` is set to an email address', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        email: 'testuser@testuser.com'
      });

      return relier.fetch()
        .then(function () {
          assert.isTrue(relier.allowCachedCredentials());
        });
    });

    it('allowCachedCredentials returns `false` if `email` is set to `blank`', function () {
      windowMock.location.search = TestHelpers.toSearchString({
        email: Constants.DISALLOW_CACHED_CREDENTIALS
      });

      return relier.fetch()
        .then(function () {
          assert.isFalse(relier.allowCachedCredentials());

          // the email should not be set on the relier model
          // if the specified email === blank
          assert.isFalse(relier.has('email'));
        });
    });

    it('pickResumeTokenInfo returns an object with info to be passed along with email verification links', function () {
      var UTM_CAMPAIGN = 'campaign id';
      var ITEM = 'item';
      var ENTRYPOINT = 'entry point';

      relier.set({
        entrypoint: ENTRYPOINT,
        notPassed: 'this should not be picked',
        resetPasswordConfirm: true,
        utmCampaign: UTM_CAMPAIGN,
        utmContent: ITEM,
        utmMedium: ITEM,
        utmSource: ITEM,
        utmTerm: ITEM
      });

      assert.deepEqual(relier.pickResumeTokenInfo(), {
        entrypoint: ENTRYPOINT,
        resetPasswordConfirm: true,
        utmCampaign: UTM_CAMPAIGN,
        utmContent: ITEM,
        utmMedium: ITEM,
        utmSource: ITEM,
        utmTerm: ITEM
      });
    });

    it('re-population from resume token parses the resume param into an object', function () {
      var UTM_CAMPAIGN = 'campaign id';
      var ENTRYPOINT = 'entry point';
      var resumeData = {
        entrypoint: ENTRYPOINT,
        notImported: 'this should not be picked',
        resetPasswordConfirm: false,
        utmCampaign: UTM_CAMPAIGN
      };
      var resumeToken = ResumeToken.stringify(resumeData);

      windowMock.location.search = TestHelpers.toSearchString({
        resume: resumeToken
      });

      return relier.fetch()
        .then(function () {
          assert.equal(relier.get('utmCampaign'), UTM_CAMPAIGN);
          assert.equal(relier.get('entrypoint'), ENTRYPOINT);
          assert.isUndefined(relier.get('notImported'), 'only allow specific resume token values');
          assert.isFalse(relier.get('resetPasswordConfirm'));
        });
    });

    function testInvalidQueryParam(paramName, value) {
      it('invalid query param fails (' + paramName + ':\'' + value + '\')', function () {
        var params = {};
        params[paramName] = value;
        windowMock.location.search = TestHelpers.toSearchString(params);

        return relier.fetch()
          .then(assert.fail, function (err) {
            assert.isTrue(AuthErrors.is(err, 'INVALID_PARAMETER'));
            assert.equal(err.param, paramName);
          });
      });
    }

    function testValidQueryParam(paramName, paramValue, modelName, expectedValue) {
      it('valid query param succeeds (' + paramName + ':' + paramValue + ')', function () {
        var params = {};

        if (! _.isUndefined(paramValue)) {
          params[paramName] = paramValue;
        } else {
          delete params[paramName];
        }

        windowMock.location.search = TestHelpers.toSearchString(params);

        return relier.fetch()
          .then(function () {
            if (_.isUndefined(expectedValue)) {
              assert.isFalse(relier.has(modelName));
            } else {
              assert.equal(relier.get(modelName), expectedValue);
            }
          });
      });
    }
  });
});

