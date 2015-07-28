/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A model to hold reset password verification data
 */

define(function(require, exports, module) {
  'use strict';

  var Validate = require('lib/validate');
  var VerificationInfo = require('./base');

  return VerificationInfo.extend({
    defaults: {
      token: null,
      code: null,
      email: null
    },

    validation: {
      token: Validate.isTokenValid,
      code: Validate.isCodeValid,
      email: Validate.isEmailValid
    }
  });
});

