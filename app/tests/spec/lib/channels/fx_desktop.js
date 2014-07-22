/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  '/tests/mocks/window.js',
  '/tests/mocks/router.js',
  'lib/session',
  'lib/channels/fx_desktop',
  '/tests/lib/helpers.js'
],
function (chai, WindowMock, RouterMock, Session, FxDesktopChannel, TestHelpers) {
  /*global describe, beforeEach, afterEach, it*/
  var assert = chai.assert;
  var channel;
  var wrapAssertion = TestHelpers.wrapAssertion;

  describe('lib/channel/fx_desktop', function () {
    var windowMock;
    var routerMock;

    function dispatchEvent(status, data) {
      windowMock.dispatchEvent({
        detail: {
          command: 'message',
          data: {
            status: status,
            data: data
          }
        }
      });
    }

    beforeEach(function () {
      routerMock = new RouterMock();
      windowMock = new WindowMock();

      channel = new FxDesktopChannel();
      channel.init({
        router: routerMock,
        window: windowMock,
        sendTimeoutLength: 10
      });
    });

    afterEach(function () {
      if (channel) {
        channel.teardown();
      }
    });

    describe('init', function () {
      it('sends the user to the settings page if signed in', function (done) {
        channel.on('session_status', function () {
          wrapAssertion(function () {
            assert.equal(routerMock.page, 'settings');
          }, done);
        });

        dispatchEvent('session_status', {
          email: 'testuser@testuser.com'
        });
      });

      it('sends the user to the signup page if not signed in', function (done) {
        channel.on('session_status', function () {
          wrapAssertion(function () {
            assert.equal(routerMock.page, 'signup');
          }, done);
        });

        // no data from session_status signifies no user is signed in.
        dispatchEvent('session_status');
      });

      it('does not redirect the user if a route is present in the path', function (done) {
        channel.window.location.pathname = '/signin';

        channel.on('session_status', function () {
          wrapAssertion(function () {
            assert.notEqual(routerMock.page, 'signup');
          }, done);
        });

        // no data from session_status signifies no user is signed in.
        dispatchEvent('session_status');
      });
    });

    describe('send', function () {
      it('sends a message to the browser', function () {
        channel.send('test-command', { key: 'value' });
        assert.isTrue(windowMock.dispatchedEvents['test-command']);
      });


      it('times out if browser does not respond', function (done) {
        channel.send('wait-for-response', { key: 'value' }, function (err) {
          wrapAssertion(function () {
            assert.equal(String(err), 'Error: Unexpected error');
          }, done);
        });
      });

      it('does not except on timeout if callback is not given', function (done) {
        // if there is an exception, done is never called.
        setTimeout(done, 500);
        channel.send('wait-for-response', { key: 'value' });
      });
    });

    describe('on', function () {
      it('registers a callback to be called when the browser sends ' +
            'the registered message', function (done) {

        channel.on('call-the-callback', function () {
          done();
        });

        dispatchEvent('call-the-callback');
      });
    });
  });
});


