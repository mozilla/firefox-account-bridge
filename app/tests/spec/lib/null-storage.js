/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';


define([
  'chai',
  'lib/null-storage'
],
function (chai, NullStorage) {
  var assert = chai.assert;

  describe('lib/null-storage', function () {
    var storage;

    beforeEach(function () {
      storage = new NullStorage();
    });
    describe('get/set', function () {
      it('can take a key value pair', function () {
        storage.setItem('key', 'value');
        assert.equal(storage.getItem('key'), 'value');
      });

      it('can take object values', function () {
        storage.setItem('key', { foo: 'bar' });
        assert.equal(storage.getItem('key').foo, 'bar');
      });
    });

    describe('remove', function () {
      it('with a key clears item', function () {
        storage.setItem('key', 'value');
        storage.removeItem('key');

        assert.isUndefined(storage.getItem('key'));
      });
    });

    describe('clear', function () {
      it('clears all items', function () {
        storage.setItem('key', 'value');
        storage.clear();

        assert.isUndefined(storage.getItem('key'));
      });
    });
  });
});


