/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// This is a mixin used by views that are childViews of Settings
// Modal childViews of Settings use modal-settings-panel-mixin instead.

define(function (require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var BaseView = require('views/base');
  var self;

  var SettingsPanelMixin = {
    initialize: function (options) {
      this.parentView = options.parentView;
    },
    events: {
      'click .cancel': BaseView.preventDefaultThen('_closePanelReturnToSettings'),
      'click .settings-unit-toggle': BaseView.preventDefaultThen('_triggerPanel')
    },

    _triggerPanel: function (event) {
      var href = event && $(event.currentTarget).data('href');
      if (href) {
        this.navigate(href);
      }
    },

    openPanel: function () {
      this.$('.settings-unit').addClass('open');
    },

    isPanelOpen: function () {
      return this.$('.settings-unit').hasClass('open');
    },

    _closePanelReturnToSettings: function () {
      this.navigate('settings');
      this.closePanel();
    },

    closePanel: function () {
      this.$('.settings-unit').removeClass('open');
    },

    displaySuccess: function (msg) {
      var self = this;
      if (! self.parentView) {
        return;
      }
      self.parentView.displaySuccess(msg);
      self.closePanel();
    }
  };

  if (window.history && window.history.pushState) {

    $(window).on('popstate', function() {
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];

      if (hashName !== '') {
        var hash = window.location.hash;
        if (hash === '') {
          var openElements = $(".settings-child-view").find('.open');
          if(openElements !== '' || openElements !== undefined){
            for(var i = 0 ; i < openElements.length; i++){
              $(openElements[i]).removeClass('open');
            }
          }
        }
      }
    });
  }

    module.exports = SettingsPanelMixin;
});
