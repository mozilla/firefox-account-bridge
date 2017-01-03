/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const $ = require('jquery');
  const AuthBroker = require('models/auth_brokers/base');
  const AuthErrors = require('lib/auth-errors');
  const Backbone = require('backbone');
  const chai = require('chai');
  const Metrics = require('lib/metrics');
  const Notifier = require('lib/channels/notifier');
  const p = require('lib/promise');
  const ProfileClient = require('lib/profile-client');
  const ProfileMock = require('../../../mocks/profile');
  const Relier = require('models/reliers/relier');
  const sinon = require('sinon');
  const TestHelpers = require('../../../lib/helpers');
  const User = require('models/user');
  const View = require('views/settings/avatar_gravatar');

  var assert = chai.assert;
  var GRAVATAR_URL = 'https://secure.gravatar.com/avatar/';
  var EMAIL_HASH = '0bc83cb571cd1c50ba6f3e8a78ef1346';
  var email = 'MyEmailAddress@example.com  ';

  describe('views/settings/avatar/gravatar', function () {
    var account;
    var broker;
    var metrics;
    var model;
    var notifier;
    var profileClientMock;
    var relier;
    var user;
    var view;

    beforeEach(function () {
      metrics = new Metrics();
      model = new Backbone.Model();
      notifier = new Notifier();
      relier = new Relier();
      user = new User();

      broker = new AuthBroker({
        relier: relier
      });

      view = new View({
        broker: broker,
        metrics: metrics,
        model: model,
        notifier: notifier,
        relier: relier,
        user: user
      });

      account = user.initAccount({
        accessToken: 'abc123',
        email: email,
        verified: true
      });
    });

    afterEach(function () {
      $(view.el).remove();
      view.destroy();
      view = null;
      profileClientMock = null;
    });

    describe('with session', function () {
      beforeEach(function () {
        sinon.stub(view, 'getSignedInAccount', function () {
          return account;
        });
        sinon.stub(view, 'checkAuthorization',  function () {
          return p(true);
        });
      });

      it('hashed email', function () {
        assert.equal(view.hashedEmail(), '0bc83cb571cd1c50ba6f3e8a78ef1346');
      });

      it('not found', function () {
        sinon.spy(view, 'navigate');
        return view.render()
          .then(function () {
            return view._showGravatar()
              .then(function () {
                assert.isTrue(view.navigate.calledWith('settings/avatar/change'));
                assert.isTrue(
                  AuthErrors.is(view.navigate.args[0][1].error, 'NO_GRAVATAR_FOUND'));
              });
          });
      });

      it('found', function () {
        sinon.stub(broker, 'isAutomatedBrowser', function () {
          return true;
        });

        return view.render()
          .then(function () {
            sinon.spy(view, 'render');
            return view._showGravatar();
          })
          .then(function () {
            assert.isTrue(view.render.called);
          });
      });

      describe('submitting', function () {
        beforeEach(function () {
          profileClientMock = new ProfileMock();
          sinon.stub(account, 'profileClient', function () {
            return p(profileClientMock);
          });
        });

        it('submits', function () {
          sinon.stub(profileClientMock, 'postAvatar', function (token, url) {
            assert.include(url, GRAVATAR_URL + EMAIL_HASH);
            return p({
              id: 'foo'
            });
          });

          sinon.stub(view, 'updateProfileImage', function (result) {
            assert.ok(result);
            return p();
          });

          sinon.spy(view, 'navigate');

          return view.render()
            .then(function () {
              return view.submit();
            })
            .then(function (result) {
              assert.isTrue(TestHelpers.isEventLogged(metrics, 'settings.avatar.gravatar.submit.new'));
              assert.isFalse(TestHelpers.isEventLogged(metrics, 'settings.avatar.gravatar.submit.change'));
              assert.equal(view.updateProfileImage.args[0][0].get('id'), 'foo');
              assert.equal(view.updateProfileImage.args[0][1], account);
              assert.equal(result.id, 'foo');
              assert.isTrue(view.navigate.calledWith('settings'));
              assert.equal(view.navigate.args[0][1].unsafeSuccess, 'Courtesy of <a href="https://www.gravatar.com">Gravatar</a>');
            });
        });

        it('submits and errors', function () {
          sinon.stub(profileClientMock, 'postAvatar', function (token, url) {
            assert.include(url, GRAVATAR_URL + EMAIL_HASH);
            return p.reject(ProfileClient.Errors.toError('UNSUPPORTED_PROVIDER'));
          });

          return view.render()
            .then(function () {
              return view.validateAndSubmit();
            })
            .then(function () {
              assert.fail('unexpected success');
            }, function (err) {
              assert.isTrue(ProfileClient.Errors.is(err, 'UNSUPPORTED_PROVIDER'));
              assert.isTrue(view.isErrorVisible());
              assert.isTrue(profileClientMock.postAvatar.called);
            });
        });

        it('properly tracks avatar change events', function () {
          // set the account to have an existing profile image id
          account.set('hadProfileImageSetBefore', true);
          sinon.stub(profileClientMock, 'postAvatar', function () {
            return p({
              id: 'foo'
            });
          });

          sinon.stub(view, 'updateProfileImage', function () {
            return p();
          });

          return view.render()
            .then(function () {
              return view.submit();
            })
            .then(function () {
              assert.isTrue(TestHelpers.isEventLogged(metrics, 'settings.avatar.gravatar.submit.change'));
            });

        });
      });

    });
  });
});

