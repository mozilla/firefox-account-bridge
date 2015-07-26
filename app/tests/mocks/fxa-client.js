/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// stub out the fxa-client object for testing.

define(function(require, exports, module) {
  'use strict';

  var FxaClientWrapper = require('lib/fxa-client');
  var p = require('lib/promise');

  function FxaClientWrapperMock() {
  }

  Object.keys(FxaClientWrapper.prototype).forEach(function (method) {
    FxaClientWrapperMock.prototype[method] = function () {
      return p.reject(new Error('method "' + method + '" should be stubbed'));
    };
  });

  return FxaClientWrapperMock;
});
