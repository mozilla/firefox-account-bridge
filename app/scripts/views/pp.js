/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var AuthErrors = require('lib/auth-errors');
  var LegalCopyView = require('views/legal_copy');
  var Template = require('stache!templates/pp');

  var View = LegalCopyView.extend({
    template: Template,
    className: 'pp',
    copyUrl: '/legal/privacy',
    fetchError: AuthErrors.toError('COULD_NOT_GET_PP'),

    events: {
      'click #fxa-pp-back': 'back',
      'keyup #fxa-pp-back': 'backOnEnter'
    }
  });

  return View;
});

