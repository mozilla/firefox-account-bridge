/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'cocktail',
  'views/form',
  'stache!templates/settings/avatar',
  'views/mixins/avatar-mixin',
  'views/mixins/settings-mixin',
  'views/mixins/settings-panel-mixin'
],
function (Cocktail, FormView, Template, AvatarMixin, SettingsMixin,
    SettingsPanelMixin) {
  'use strict';

  var View = FormView.extend({
    template: Template,
    className: 'avatar',

    events: {
      'click button': '_goToAvatarChange'
    },

    _goToAvatarChange: function () {
      this.navigate('/settings/avatar/change');
    },

    afterVisible: function () {
      FormView.prototype.afterVisible.call(this);
      return this.displayAccountProfileImage(this.getSignedInAccount());
    }

  });

  Cocktail.mixin(View, AvatarMixin, SettingsMixin, SettingsPanelMixin);

  return View;
});
