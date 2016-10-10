/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const Able = require('lib/able');
  const chai = require('chai');
  const sinon = require('sinon');

  var assert = chai.assert;

  describe('lib/able', function () {
    var able;
    var realAble;

    beforeEach(function () {
      realAble = window.able;

      able = new Able();
    });

    afterEach(function () {
      window.able = realAble;
    });

    describe('choose', function () {
      it('returns undefined if window.able is not available', function () {
        assert.isUndefined(able.choose('variable-name'));
      });

      it('defers to window.able.choose if available', function () {
        window.able = {
          choose: function () {
            return 'value';
          }
        };

        sinon.spy(window.able, 'choose');

        assert.equal(able.choose('variable-name', { 'email': 'testuser@testuser.com' }), 'value');

        // make sure the expected variables are passed along.
        assert.equal(window.able.choose.args[0][0], 'variable-name');
        assert.equal(window.able.choose.args[0][1].email, 'testuser@testuser.com');
      });
    });
  });
});

