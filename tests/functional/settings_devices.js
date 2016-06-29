/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern/chai!assert',
  'intern!object',
  'intern/node_modules/dojo/node!xmlhttprequest',
  'app/bower_components/fxa-js-client/fxa-client',
  'tests/lib/helpers',
  'tests/functional/lib/helpers'
], function (intern, assert, registerSuite, nodeXMLHttpRequest,
      FxaClient, TestHelpers, FunctionalHelpers) {

  var config = intern.config;
  var AUTH_SERVER_ROOT = config.fxaAuthRoot;
  var SIGNIN_URL = config.fxaContentRoot + 'signin';
  var SIGNIN_URL_DEVICE_LIST = SIGNIN_URL + '?forceDeviceList=1';

  var FIRST_PASSWORD = 'password';
  var BROWSER_DEVICE_NAME = 'Browser Session Device';
  var BROWSER_DEVICE_TYPE = 'desktop';
  var TEST_DEVICE_NAME = 'Test Runner Session Device';
  var TEST_DEVICE_NAME_UPDATED = 'Test Runner Session Device Updated';
  var TEST_DEVICE_TYPE = 'mobile';
  var email;
  var client;
  var accountData;

  registerSuite({
    name: 'settings devices',

    beforeEach: function () {
      email = TestHelpers.createEmail();
      client = new FxaClient(AUTH_SERVER_ROOT, {
        xhr: nodeXMLHttpRequest.XMLHttpRequest
      });
      var self = this;
      return client.signUp(email, FIRST_PASSWORD, {preVerified: true})
        .then(function (result) {
          accountData = result;
          return FunctionalHelpers.clearBrowserState(self);
        });
    },

    afterEach: function () {
      return FunctionalHelpers.clearBrowserState(this);
    },

    'device panel is not visible without query param': function () {
      var self = this;
      return FunctionalHelpers.openPage(this, SIGNIN_URL, '#fxa-signin-header')
        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, FIRST_PASSWORD);
        })

        .findByCssSelector('#fxa-settings-header')
        .end()

        .then(FunctionalHelpers.noSuchElement(this, '#devices'));
    },

    'device panel works with query param, same device': function () {
      var self = this;
      self.timeout = 90 * 1000;
      var testDeviceId;

      return FunctionalHelpers.openPage(this, SIGNIN_URL_DEVICE_LIST, '#fxa-signin-header')
        .then(function () {
          return FunctionalHelpers.fillOutSignIn(self, email, FIRST_PASSWORD);
        })

        .findByCssSelector('#fxa-settings-header')
        .end()

        .findByCssSelector('#devices .settings-unit-stub button')
          .click()
        .end()

        .findByCssSelector('.devices-refresh')
          .click()
        .end()

        // add a device from the test runner
        .then(function () {
          return client.deviceRegister(
            accountData.sessionToken,
            TEST_DEVICE_NAME,
            TEST_DEVICE_TYPE
          );
        })

        .then(function (device) {
          testDeviceId = device.id;
        })

        .findByCssSelector('.devices-refresh')
          .click()
        .end()

        .findByCssSelector('.device-name')
        .getVisibleText()
        .then(function (val) {
          assert.equal(val, TEST_DEVICE_NAME, 'device name is correct');
        })
        .end()

        // add a device using a session token from the browser
        .execute(function (uid) {
          var accounts = JSON.parse(localStorage.getItem('__fxa_storage.accounts'));

          return accounts[uid];
        }, [ accountData.uid ])
        .then(function (browserAccount) {
          return client.deviceRegister(
            browserAccount.sessionToken,
            BROWSER_DEVICE_NAME,
            BROWSER_DEVICE_TYPE
          );
        })

        .findByCssSelector('.devices-refresh')
          .click()
        .end()

        // wait for 2 devices
        .findByCssSelector('.device:nth-child(2)')
        .end()

        // browser device should be sorted first
        .then(FunctionalHelpers.testElementTextEquals(
          '.device:nth-child(1) .device-name',
          BROWSER_DEVICE_NAME
          )
        )

        // update external device from the test runner
        .then(function () {
          return client.deviceUpdate(
            accountData.sessionToken,
            testDeviceId,
            TEST_DEVICE_NAME_UPDATED
          );
        })

        // current device has the text `current device`
        .then(FunctionalHelpers.testElementTextEquals(
          '.device:nth-child(1) .device-name + .device-current',
          'current device'
          )
        )

        // external update should show in the device list
        .findByCssSelector('.devices-refresh')
          .click()
        .end()

        // external text change is hard to track, use pollUntil
        .then(FunctionalHelpers.pollUntil(function (newName) {
          var deviceName = document.querySelectorAll('.device:nth-child(2) .device-name')[0].textContent.trim();

          return deviceName === newName ? true : null;
        }, [ TEST_DEVICE_NAME_UPDATED ], 10000))

        .findByCssSelector('.device:nth-child(2) .device-name')
          .getVisibleText()
          .then(function (val) {
            assert.equal(val, TEST_DEVICE_NAME_UPDATED, 'device name is correct');
          })
        .end()

        .findByCssSelector('.device:nth-child(2) .last-connected')
          .getVisibleText()
          .then(function (val) {
            assert.isTrue(val.indexOf('ago') >= 0, 'last connected is formatted');
          })
        .end()

        // clicking disconnect on the second device should update the list
        .findByCssSelector('.device:nth-child(2) .device-disconnect')
          .click()
        .end()

        // disconnect waits until successful AJAX device delete
        .then(FunctionalHelpers.pollUntil(function (newName) {
          var numberOfDevices = document.querySelectorAll('.device-list .device').length;

          return numberOfDevices === 1 ? true : null;
        }, [ TEST_DEVICE_NAME_UPDATED ], 10000))

        .findByCssSelector('.devices-refresh')
          .click()
        .end()

        // should still have 1 device after refresh
        .then(FunctionalHelpers.pollUntil(function (newName) {
          var numberOfDevices = document.querySelectorAll('.device-list .device').length;

          return numberOfDevices === 1 ? true : null;
        }, [ TEST_DEVICE_NAME_UPDATED ], 10000))

        // clicking disconnect on the current device should sign you out
        .findByCssSelector('.device:nth-child(1) .device-disconnect')
          .click()
        .end()

        .findByCssSelector('#fxa-signin-header')
        .end();
    }
  });
});
