/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function(require, exports, module) {
  'use strict';

  var AvatarMixin = require('views/mixins/avatar-mixin');
  var Cocktail = require('cocktail');
  var FormView = require('views/form');
  var SettingsMixin = require('views/mixins/settings-mixin');
  var Template = require('stache!templates/settings/avatar');

  var View = FormView.extend({
    template: Template,
    className: 'avatar',

    afterVisible: function () {
      FormView.prototype.afterVisible.call(this);
      return this.displayAccountProfileImage(this.getSignedInAccount());
    }

  });

  Cocktail.mixin(View, AvatarMixin, SettingsMixin);

  return View;
});
