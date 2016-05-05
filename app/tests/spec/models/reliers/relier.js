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
  var getValueLabel = TestHelpers.getValueLabel;

  describe('models/reliers/relier', function () {
    var relier;
    var windowMock;

    var CAMPAIGN = 'fennec';
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

      relier = new Relier({
        window: windowMock
      });
    });

    describe('fetch', function () {
      it('a missing `resume` token is not a problem', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          campaign: CAMPAIGN
        });

        return relier.fetch()
          .then(function () {
            assert.equal(relier.get('campaign'), CAMPAIGN);
          });
      });

      it('populates expected fields from the search parameters, unexpected search parameters are ignored', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          allowCachedCredentials: false,
          campaign: CAMPAIGN,
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
              // not imported from the search parameters, but is set manually.
              assert.isTrue(relier.get('allowCachedCredentials'));

              assert.equal(relier.get('preVerifyToken'), PREVERIFY_TOKEN);
              assert.equal(relier.get('service'), SERVICE);
              assert.equal(relier.get('email'), EMAIL);

              assert.equal(relier.get('setting'), SETTING);
              assert.equal(relier.get('uid'), UID);
              assert.equal(relier.get('entrypoint'), ENTRYPOINT);
              assert.equal(relier.get('campaign'), CAMPAIGN);

              assert.equal(relier.get('utmCampaign'), UTM_CAMPAIGN);
              assert.equal(relier.get('utmContent'), UTM_CONTENT);
              assert.equal(relier.get('utmMedium'), UTM_MEDIUM);
              assert.equal(relier.get('utmSource'), UTM_SOURCE);
              assert.equal(relier.get('utmTerm'), UTM_TERM);

              assert.isFalse(relier.has('ignored'));
            });
      });
    });

    describe('entryPoint', function () {
      it('is correctly translated to `entrypoint` if `entrypoint` is not specified', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          entryPoint: ENTRYPOINT
        });

        return relier.fetch()
          .then(function () {
            assert.equal(relier.get('entrypoint'), ENTRYPOINT);
          });
      });

      it('is ignored if `entrypoint` is already specified', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          entryPoint: 'ignored entrypoint',
          entrypoint: ENTRYPOINT
        });

        return relier.fetch()
          .then(function () {
            assert.equal(relier.get('entrypoint'), ENTRYPOINT);
          });
      });
    });

    describe('preVerifyToken', function () {
      describe('invalid', function () {
        var invalidTokens = ['', ' ', 'invalid token'];
        invalidTokens.forEach(function (value) {
          describe(getValueLabel(value), function () {
            testInvalidQueryParam('preVerifyToken', value);
          });
        });
      });

      describe('valid', function () {
        var validTokens = [undefined, PREVERIFY_TOKEN];
        validTokens.forEach(function (value) {
          describe(getValueLabel(value), function () {
            testValidQueryParam('preVerifyToken', value, 'preVerifyToken', value);
          });
        });
      });
    });

    describe('migration', function () {
      describe('invalid', function () {
        var invalidMigrations = ['', ' ', 'invalid migration'];
        invalidMigrations.forEach(function (token) {
          describe(getValueLabel(token), function () {
            testInvalidQueryParam('migration', token);
          });
        });
      });

      describe('valid', function () {
        var validMigrations = [undefined, Constants.AMO_MIGRATION, Constants.SYNC11_MIGRATION];
        validMigrations.forEach(function (value) {
          describe(getValueLabel(value), function () {
            testValidQueryParam('migration', value, 'migration', value);
          });
        });
      });
    });

    describe('email', function () {
      describe('non-verification flow', function () {
        beforeEach(function () {
          relier.set('isVerification', false);
        });

        describe('invalid', function () {
          var invalidEmails = ['', ' ', 'invalid email'];
          invalidEmails.forEach(function (email) {
            describe(getValueLabel(email), function () {
              testInvalidQueryParam('email', email);
            });
          });
        });

        describe('valid', function () {
          var validEmails = [
            'testuser@testuser.com',
            'testuser@testuser.co.uk'
          ];

          validEmails.forEach(function (value) {
            describe(getValueLabel(value), function () {
              testValidQueryParam('email', value, 'email', value);
            });
          });
        });
      });

      describe('verification flow', function () {
        beforeEach(function () {
          relier = new Relier({
            isVerification: true,
            window: windowMock
          });
        });

        describe('valid', function () {
          var validEmails = [
            // the non-email strings will cause a validation error in
            // the consuming views.
            '',
            ' ',
            'invalid email',
            'testuser@testuser.com',
            'testuser@testuser.co.uk'
          ];

          validEmails.forEach(function (value) {
            describe(getValueLabel(value), function () {
              testValidQueryParam('email', value, 'email', value.trim());
            });
          });
        });
      });

      describe('email=blank', function () {
        it('sets allowCachedCredentials to false', function () {
          testValidQueryParam('email', Constants.DISALLOW_CACHED_CREDENTIALS, 'allowCachedCredentials', false);
        });
      });
    });

    describe('uid', function () {
      describe('non-verification flow', function () {
        beforeEach(function () {
          relier.set('isVerification', false);
        });

        describe('invalid', function () {
          var invalidUid = ['', ' ', 'invalid uid'];
          invalidUid.forEach(function (uid) {
            describe(getValueLabel(uid), function () {
              testInvalidQueryParam('uid', uid);
            });
          });
        });

        describe('valid', function () {
          var validUid = [ UID ];

          validUid.forEach(function (value) {
            describe(getValueLabel(value), function () {
              testValidQueryParam('uid', value, 'uid', value);
            });
          });
        });
      });

      describe('verification flow', function () {
        beforeEach(function () {
          relier = new Relier({
            isVerification: true,
            window: windowMock
          });
        });

        describe('valid', function () {
          var validUid = [
            // the non-uid strings will cause a validation error in
            // the consuming views.
            '',
            ' ',
            'invalid uid',
            UID
          ];

          validUid.forEach(function (value) {
            describe(getValueLabel(value), function () {
              testValidQueryParam('uid', value, 'uid', value.trim());
            });
          });
        });
      });

      describe('email=blank', function () {
        it('sets allowCachedCredentials to false', function () {
          testValidQueryParam('email', Constants.DISALLOW_CACHED_CREDENTIALS, 'allowCachedCredentials', false);
        });
      });
    });

    describe('isOAuth', function () {
      it('returns `false`', function () {
        assert.isFalse(relier.isOAuth());
      });
    });

    describe('isSync', function () {
      it('returns `false` by default', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          service: SERVICE
        });

        return relier.fetch()
          .then(function () {
            assert.isFalse(relier.isSync());
          });
      });
    });

    describe('allowCachedCredentials', function () {
      it('returns `true` if `email` not set', function () {
        return relier.fetch()
          .then(function () {
            assert.isTrue(relier.allowCachedCredentials());
          });
      });

      it('returns `true` if `email` is set to an email address', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          email: 'testuser@testuser.com'
        });

        return relier.fetch()
          .then(function () {
            assert.isTrue(relier.allowCachedCredentials());
          });
      });

      it('returns `false` if `email` is set to `blank`', function () {
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
    });

    describe('pickResumeTokenInfo', function () {
      it('returns an object with info to be passed along with email verification links', function () {
        var CAMPAIGN = 'campaign id';
        var ITEM = 'item';
        var ENTRYPOINT = 'entry point';

        relier.set({
          campaign: CAMPAIGN,
          entrypoint: ENTRYPOINT,
          notPassed: 'this should not be picked',
          resetPasswordConfirm: true,
          utmCampaign: CAMPAIGN,
          utmContent: ITEM,
          utmMedium: ITEM,
          utmSource: ITEM,
          utmTerm: ITEM
        });

        assert.deepEqual(relier.pickResumeTokenInfo(), {
          campaign: CAMPAIGN,
          entrypoint: ENTRYPOINT,
          resetPasswordConfirm: true,
          utmCampaign: CAMPAIGN,
          utmContent: ITEM,
          utmMedium: ITEM,
          utmSource: ITEM,
          utmTerm: ITEM
        });
      });
    });

    describe('re-population from resume token', function () {
      it('parses the resume param into an object', function () {
        var CAMPAIGN = 'campaign id';
        var ENTRYPOINT = 'entry point';
        var resumeData = {
          campaign: CAMPAIGN,
          entrypoint: ENTRYPOINT,
          notImported: 'this should not be picked',
          resetPasswordConfirm: false
        };
        var resumeToken = ResumeToken.stringify(resumeData);

        windowMock.location.search = TestHelpers.toSearchString({
          resume: resumeToken
        });

        return relier.fetch()
          .then(function () {
            assert.equal(relier.get('campaign'), CAMPAIGN);
            assert.equal(relier.get('entrypoint'), ENTRYPOINT);
            assert.isUndefined(relier.get('notImported'), 'only allow specific resume token values');
            assert.isFalse(relier.get('resetPasswordConfirm'));
          });
      });
    });

    function testInvalidQueryParam(paramName, value) {
      var err;

      beforeEach(function () {
        var params = {};

        if (! _.isUndefined(value)) {
          params[paramName] = value;
        } else {
          delete params[paramName];
        }

        windowMock.location.search = TestHelpers.toSearchString(params);

        return relier.fetch()
          .then(assert.fail, function (_err) {
            err = _err;
          });
      });

      it('errors correctly', function () {
        assert.isTrue(AuthErrors.is(err, 'INVALID_PARAMETER'));
        assert.equal(err.param, paramName);
      });
    }

    function testValidQueryParam(paramName, paramValue, modelName, expectedValue) {
      beforeEach(function () {
        var params = {};

        if (! _.isUndefined(paramValue)) {
          params[paramName] = paramValue;
        } else {
          delete params[paramName];
        }

        windowMock.location.search = TestHelpers.toSearchString(params);

        return relier.fetch();
      });

      it('is successful', function () {
        if (_.isUndefined(expectedValue)) {
          assert.isFalse(relier.has(modelName));
        } else {
          assert.equal(relier.get(modelName), expectedValue);
        }
      });
    }
  });
});

