/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const $ = require('jquery');
  const Account = require('models/account');
  const { assert } = require('chai');
  const Backbone = require('backbone');
  const Broker = require('models/auth_brokers/base');
  const FormPrefill = require('models/form-prefill');
  const Notifier = require('lib/channels/notifier');
  const p = require('lib/promise');
  const Relier = require('models/reliers/relier');
  const sinon = require('sinon');
  const View = require('views/sign_in_password');

  const EMAIL = 'testuser@testuser.com';

  describe('views/sign_in_password', () => {
    let account;
    let broker;
    let formPrefill;
    let model;
    let notifier;
    let relier;
    let view;

    beforeEach(() => {
      account = new Account({ email: EMAIL });
      broker = new Broker();
      formPrefill = new FormPrefill();
      model = new Backbone.Model({ account });
      notifier = new Notifier();
      relier = new Relier({
        service: 'sync',
        serviceName: 'Firefox Sync'
      });

      view = new View({
        broker,
        formPrefill,
        model,
        notifier,
        relier,
        viewName: 'signin/password'
      });

      return view.render();
    });

    afterEach(() => {
      view.remove();
      view.destroy();

      view = null;
    });

    describe('beforeRender', () => {
      beforeEach(() => {
        sinon.spy(view, 'navigate');
      });

      it('redirects to `/` if no account', () => {
        sinon.stub(view, 'getAccount').callsFake(() => null);

        view.beforeRender();

        assert.isTrue(view.navigate.calledOnce);
        assert.isTrue(view.navigate.calledWith('/'));
      });

      it('does nothing if an account passed in', () => {
        sinon.stub(view, 'getAccount').callsFake(() => account);

        view.beforeRender();

        assert.isFalse(view.navigate.called);
      });
    });

    describe('render', () => {
      it('renders as expected', () => {
        assert.include(view.$('.service').text(), 'Firefox Sync');
        assert.lengthOf(view.$('input[type=email]'), 1);
        assert.equal(view.$('input[type=email]').val(), EMAIL);
        assert.lengthOf(view.$('input[type=password]'), 1);
      });
    });

    describe('validateAndSubmit', () => {
      beforeEach(() => {
        sinon.stub(view, 'signIn').callsFake(() => p());
      });

      describe('password valid', () => {
        it('signs up the user', () => {
          view.$('#password').val('password');

          return p().then()
            .then(() => view.enableSubmitIfValid())
            .then(() => view.validateAndSubmit())
            .then(() => {
              assert.isTrue(view.signIn.calledOnce);
              assert.isTrue(view.signIn.calledWith(account, 'password'));
            });
        });
      });
    });

    describe('click on the email field', () => {
      it('navigates back', () => {
        $('#container').html(view.el);

        sinon.spy(view, 'back');
        view.$('input[type=email]').click();
        assert.isTrue(view.back.calledOnce);
      });
    });
  });
});
