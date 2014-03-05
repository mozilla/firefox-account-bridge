/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'lib/session'
],
function (chai, Session) {
  /*global describe, beforeEach, afterEach, it*/
  var assert = chai.assert;

  describe('lib/session', function () {
    beforeEach(function () {
      Session.clear();
    });

    afterEach(function () {
      Session.clear();
      // Since Session is a singleton and channel is not cleared, attaching
      // the mock Session.channel can interfere with other tests, depending
      // on the ordering of the tests.
      delete Session.channel;
    });

    describe('set', function () {
      it('can take a key value pair', function () {
        Session.set('key', 'value');
        assert.equal(Session.key, 'value');
      });

      it('can take an object', function () {
        Session.set({
          key2: 'value2',
          key3: 'value3'
        });

        assert.equal(Session.key2, 'value2');
        assert.equal(Session.key3, 'value3');
      });

      it('will not overwrite items in Session.prototype', function () {
        Session.set('set', 1);
        assert.notEqual(Session.set, 1);
      });
    });

    describe('clear', function () {
      it('with a key clears item', function () {
        Session.set({
          key4: 'value4'
        });
        Session.clear('key4');

        assert.isUndefined(Session.key4);
      });

      it('with no key clears all items', function () {
        Session.set({
          key5: 'value5',
          key6: 'value6'
        });
        Session.clear();

        assert.isUndefined(Session.key5);
        assert.isUndefined(Session.key6);
      });

      it('will not clear items in Session.prototype', function () {
        Session.clear('set');
        assert.isFunction(Session.set);
      });

      it('will not clear items in DO_NOT_CLEAR', function () {
        var channel = {};
        Session.set('channel', channel);
        Session.clear('channel');
        assert.strictEqual(Session.channel, channel);
      });
    });

    describe('load', function () {
      it('loads data from localStorage', function () {
        Session.set({
          key7: 'value7',
          key8: 'value8'
        });

        Session.testRemove('key7');
        Session.testRemove('key8');

        assert.isUndefined(Session.key7);
        assert.isUndefined(Session.key8);

        Session.load();
        assert.equal(Session.key7, 'value7');
        assert.equal(Session.key8, 'value8');
      });

      it('does not load up items in DO_NOT_PERSIST', function () {
        var channel = {};
        Session.set('channel', channel);
        Session.persist();
        Session.clear();
        Session.load();
        assert.strictEqual(Session.channel, channel);
      });
    });

    describe('Session without localStorage support', function () {
      var session;

      beforeEach(function () {
        localStorage.clear();
        session = new Session.constructor({ useStorage: false });
      });

      describe('load', function () {
        it('does not load anything from localStorage', function () {
          session.testSetLocalStorage('item', 'value');

          // `useStorage: false` prevents load from reading localStorage
          session.load();

          var value = session.get('item');
          assert.isUndefined(value);
        });
      });

      describe('set', function () {
        it('does not update localStorage', function () {
          session.set('item', 'value');

          // `useStorage: false` prevents set from saving to localStorage
          assert.isNull(session.testGetLocalStorage());

          // Session information is still saved locally.
          assert.equal(session.get('item'), 'value');
        });
      });

      describe('persist', function () {
        it('does not persist to localStorage', function () {
          session.set('item', 'value');

          // `useStorage: false` prevents persist from saving to localStorage
          session.persist();

          assert.isNull(session.testGetLocalStorage());
          assert.equal(session.get('item'), 'value');
        });
      });
    });
  });
});


