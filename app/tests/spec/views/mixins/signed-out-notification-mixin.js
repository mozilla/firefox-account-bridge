/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const BaseView = require('views/base');
  const chai = require('chai');
  const Cocktail = require('cocktail');
  const Notifier = require('lib/channels/notifier');
  const SignedOutNotificationMixin = require('views/mixins/signed-out-notification-mixin');
  const sinon = require('sinon');

  var assert = chai.assert;

  var View = BaseView.extend({});
  Cocktail.mixin(View, SignedOutNotificationMixin);

  describe('views/mixins/signed-out-notification-mixin', function () {
    it('exports correct interface', function () {
      assert.lengthOf(Object.keys(SignedOutNotificationMixin), 3);
      assert.isObject(SignedOutNotificationMixin.notifications);
      assert.isFunction(SignedOutNotificationMixin.clearSessionAndNavigateToSignIn);
    });

    describe('new View', function () {
      var notifier;
      var view;

      beforeEach(function () {
        notifier = new Notifier();
        notifier.on = sinon.spy();
        view = new View({
          notifier: notifier
        });
        view.relier = {
          unset: sinon.spy()
        };
        view.user = {
          clearSignedInAccountUid: sinon.spy()
        };
        view._formPrefill = {
          clear: sinon.spy()
        };
        view.navigate = sinon.spy();
        notifier.triggerAll = sinon.spy();
      });

      afterEach(function () {
        view.destroy();
      });

      it('calls notifier.on correctly', function () {
        assert.equal(notifier.on.callCount, 1);
        var args = notifier.on.args[0];
        assert.lengthOf(args, 2);
        assert.equal(args[0], Notifier.SIGNED_OUT);
        assert.isFunction(args[1]);
      });

      describe('clearSessionAndNavigateToSignIn', function () {
        beforeEach(function () {
          notifier.on.args[0][1]();
        });

        it('calls relier.unset correctly', function () {
          assert.equal(view.relier.unset.callCount, 3);

          assert.lengthOf(view.relier.unset.args[0], 1);
          assert.equal(view.relier.unset.args[0][0], 'uid');

          assert.lengthOf(view.relier.unset.args[1], 1);
          assert.equal(view.relier.unset.args[1][0], 'email');

          assert.lengthOf(view.relier.unset.args[2], 1);
          assert.equal(view.relier.unset.args[2][0], 'preVerifyToken');
        });

        it('calls user.clearSignedInAccountUid correctly', function () {
          assert.equal(view.user.clearSignedInAccountUid.callCount, 1);
          assert.lengthOf(view.user.clearSignedInAccountUid.args[0], 0);
        });

        it('calls _formPrefill.clear correctly', function () {
          assert.equal(view._formPrefill.clear.callCount, 1);
          assert.lengthOf(view._formPrefill.clear.args[0], 0);
        });

        it('calls navigate correctly', function () {
          assert.equal(view.navigate.callCount, 1);
          assert.isTrue(view.navigate.calledAfter(view.user.clearSignedInAccountUid));
          assert.isTrue(view.navigate.calledAfter(view._formPrefill.clear));
          var args = view.navigate.args[0];
          assert.lengthOf(args, 3);
          assert.equal(args[0], 'signin');
          assert.isObject(args[1]);
          assert.lengthOf(Object.keys(args[1]), 1);
          assert.equal(args[1].success, 'Signed out successfully');
          assert.lengthOf(Object.keys(args[2]), 1);
          assert.isTrue(args[2].clearQueryParams);
        });

        it('does not call notifier.triggerAll', function () {
          assert.equal(notifier.triggerAll.callCount, 0);
        });
      });

      describe('delete _formPrefill', function () {
        beforeEach(function () {
          view._formPrefill = null;
        });

        it('clearSessionAndNavigateToSignIn does not throw', function () {
          assert.doesNotThrow(function () {
            notifier.on.args[0][1]();
          });
        });
      });
    });
  });
});

