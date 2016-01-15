/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var Account = require('models/account');
  var AuthErrors = require('lib/auth-errors');
  var AvatarMixin = require('views/mixins/avatar-mixin');
  var BaseView = require('views/base');
  var Chai = require('chai');
  var Cocktail = require('cocktail');
  var Metrics = require('lib/metrics');
  var Notifier = require('lib/channels/notifier');
  var NullChannel = require('lib/channels/null');
  var p = require('lib/promise');
  var ProfileErrors = require('lib/profile-errors');
  var ProfileImage = require('models/profile-image');
  var Relier = require('models/reliers/relier');
  var sinon = require('sinon');

  var TestHelpers = require('../../../lib/helpers');
  var User = require('models/user');

  var assert = Chai.assert;

  var SettingsView = BaseView.extend({});

  Cocktail.mixin(SettingsView, AvatarMixin);

  describe('views/mixins/avatar-mixin', function () {
    var UID = '123';
    var account;
    var metrics;
    var notifier;
    var relier;
    var tabChannelMock;
    var user;
    var view;

    beforeEach(function () {
      account = new Account();
      metrics = new Metrics();
      relier = new Relier();
      tabChannelMock = new NullChannel();
      user = new User();

      notifier = new Notifier({
        tabChannel: tabChannelMock
      });

      account.set('uid', UID);

      view = new SettingsView({
        metrics: metrics,
        notifier: notifier,
        relier: relier,
        user: user
      });
      sinon.stub(view, 'getSignedInAccount', function () {
        return account;
      });
      sinon.spy(user, 'setAccount');

      sinon.spy(notifier, 'trigger');
    });

    afterEach(function () {
      metrics.destroy();

      view.remove();
      view.destroy();

      view = metrics = null;
    });

    describe('displayAccountProfileImage', function () {
      it('does not log an error for a non-authenticated account', function () {
        sinon.stub(account, 'fetchCurrentProfileImage', function () {
          return p.reject(ProfileErrors.toError('UNAUTHORIZED'));
        });
        return view.displayAccountProfileImage(account)
          .then(function () {
            var err = view._normalizeError(ProfileErrors.toError('UNAUTHORIZED'));
            assert.isFalse(TestHelpers.isErrorLogged(metrics, err));
          });
      });

      it('does not log an error for an unverified account', function () {
        sinon.stub(account, 'fetchCurrentProfileImage', function () {
          return p.reject(AuthErrors.toError('UNVERIFIED_ACCOUNT'));
        });
        return view.displayAccountProfileImage(account)
          .then(function () {
            var err = view._normalizeError(AuthErrors.toError('UNVERIFIED_ACCOUNT'));
            assert.isFalse(TestHelpers.isErrorLogged(metrics, err));
          });
      });

      it('logs other kind of errors', function () {
        sinon.stub(account, 'fetchCurrentProfileImage', function () {
          return p.reject(ProfileErrors.toError('SERVICE_UNAVAILABLE'));
        });
        return view.displayAccountProfileImage(account)
          .then(function () {
            var err = view._normalizeError(ProfileErrors.toError('SERVICE_UNAVAILABLE'));
            assert.isTrue(TestHelpers.isErrorLogged(metrics, err));
          });
      });
    });

    describe('displayAccountProfileImage with spinner', function () {
      var spinnerView;
      var SpinnerView = SettingsView.extend({
        template: function () {
          return '<div class="avatar-wrapper"></div>';
        }
      });

      beforeEach(function () {
        spinnerView = new SpinnerView({
          notifier: notifier,
          user: user
        });
        sinon.stub(account, 'fetchCurrentProfileImage', function () {
          return p(new ProfileImage({ id: 'foo', img: new Image(), url: 'url' }));
        });
        sinon.stub(spinnerView, '_shouldShowDefaultProfileImage', function () {
          return false;
        });
        return spinnerView.render();
      });

      it('shows the spinner while fetching the profile image', function () {
        spinnerView.displayAccountProfileImage(account, { spinner: true, wrapperClass: '.avatar-wrapper' });
        assert.equal(spinnerView.$('.avatar-spinner').length, 1,
          'missing .avatar-spinner element');
        assert.equal(spinnerView.$('.avatar-wrapper.with-spinner').length, 1,
          'expected .avatar-wrapper to also have the .with-spinner class');
      });

      it('resolves and removes the spinner after the completion transition has ended', function () {
        // Expect this to complete within a time shorter than the spinner timeout
        this.timeout(300);

        var displayPromise = spinnerView.displayAccountProfileImage(account, {
          spinner: true,
          wrapperClass: '.avatar-wrapper'
        });
        var spinnerEl = spinnerView.$('.avatar-spinner');
        assert.equal(spinnerEl.parents('.avatar-wrapper').length, 1);

        // Trigger transitionend events, which would usually be fired via CSS
        setTimeout(function () {
          // Fire one transitionend event for spinner element
          spinnerEl.trigger('transitionend');
          // And another for the spinner's pseudo element, using jQuery.Event
          // this time, so we can set originalEvent
          spinnerEl.trigger(jQuery.Event('transitionend', {
            originalEvent: {
              pseudoElement: '::after'
            }
          }));
        }, 1);

        return displayPromise.then(function () {
          assert.equal(spinnerEl.parents('.avatar-wrapper').length, 0);
        });
      });

      it('resolves and removes the spinner after a timeout, if the transition somehow never ends', function () {
        this.timeout(300); // If this times out, it will do so within 300ms
        sinon.stub(spinnerView, 'setTimeout', function (callback) {
          callback();
        });

        var displayPromise = spinnerView.displayAccountProfileImage(account, {
          spinner: true,
          wrapperClass: '.avatar-wrapper'
        });
        var spinnerEl = spinnerView.$('.avatar-spinner');
        assert.equal(spinnerEl.parents('.avatar-wrapper').length, 1, 'expected to find a spinner');

        return displayPromise.then(function () {
          assert.equal(spinnerEl.parents('.avatar-wrapper').length, 0);
        });
      });
    });

    it('displayAccountProfileImage updates the cached account data', function () {
      var image = new ProfileImage({ id: 'foo', img: new Image(), url: 'url' });

      sinon.spy(account, 'setProfileImage');
      sinon.stub(account, 'fetchCurrentProfileImage', function () {
        return p(image);
      });

      return view.displayAccountProfileImage(account)
        .then(function () {
          assert.isTrue(account.fetchCurrentProfileImage.called);
          assert.isTrue(user.setAccount.calledWith(account));
          assert.isTrue(account.setProfileImage.calledWith(image));
          assert.isTrue(view.hasDisplayedAccountProfileImage());
        });
    });

    describe('updateProfileImage', function () {
      it('stores the url', function () {
        return view.updateProfileImage(new ProfileImage({ url: 'url' }), account)
          .then(function () {
            assert.equal(account.get('profileImageUrl'), 'url');
            assert.isTrue(user.setAccount.calledWith(account));
            assert.isTrue(notifier.trigger.calledWith(Notifier.PROFILE_CHANGE, { uid: UID }));
          });
      });

      it('deletes the url if null', function () {
        sinon.stub(account, 'fetchCurrentProfileImage', function () {
          return p(new ProfileImage({ id: 'foo', url: 'url' }));
        });
        sinon.stub(account, 'deleteAvatar', function () {
          return p();
        });

        return view.displayAccountProfileImage(account)
          .then(function () {
            assert.isTrue(account.fetchCurrentProfileImage.called);
            return view.deleteDisplayedAccountProfileImage(account);
          })
          .then(function () {
            assert.isTrue(account.deleteAvatar.calledWith('foo'));
            assert.isFalse(account.has('profileImageUrl'));
            assert.isTrue(user.setAccount.calledWith(account));
            assert.isTrue(notifier.trigger.calledWith(Notifier.PROFILE_CHANGE, { uid: UID }));
          });
      });
    });

    describe('updateDisplayName', function () {
      it('stores the name', function () {
        return view.updateDisplayName('joe')
          .then(function () {
            assert.equal(account.get('displayName'), 'joe');
            assert.isTrue(view.getSignedInAccount.called);
            assert.isTrue(user.setAccount.calledWith(account));
            assert.isTrue(notifier.trigger.calledWith(Notifier.PROFILE_CHANGE, { uid: UID }));
          });
      });
    });

    describe('on profile update', function () {
      var spy;
      beforeEach(function () {
        spy = sinon.spy(SettingsView.prototype, 'onProfileUpdate');
        view = new SettingsView({
          metrics: metrics,
          notifier: notifier,
          relier: relier,
          user: user
        });
      });

      afterEach(function () {
        SettingsView.prototype.onProfileUpdate.restore();
      });

      it('call onProfileUpdate after notification', function () {
        notifier.trigger(notifier.EVENTS.PROFILE_CHANGE, {});
        assert.isTrue(spy.called);
      });
    });
  });
});
