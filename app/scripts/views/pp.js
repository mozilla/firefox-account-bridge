/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'jquery',
  'views/base',
  'stache!templates/pp',
  'lib/session',
  'lib/strings'
],
function ($, BaseView, Template, Session, Strings) {
  var t = BaseView.t;

  var View = BaseView.extend({
    template: Template,
    className: 'pp',

    context: function () {
      return {
        canGoBack: Session.canGoBack
      };
    },

    afterRender: function () {
      var self = this;
      $.ajax({
        url: Strings.interpolate('/%s/legal/privacy', [Session.language]),
        accepts: {
          text: 'text/partial'
        },
        dataType: 'text'
      })
      .done(function(template) {
        self.$('#legal-copy').html(template);
        self.$('.hidden').removeClass('hidden');
      })
      .fail(function() {
        self.displayError(t('Could not get Privacy Notice'));
        self.$('.hidden').removeClass('hidden');
      })
      .always(function() {
        self.trigger('ready');
      });
    },

    events: {
      'click #fxa-pp-back': 'back',
      'keyup #fxa-pp-back': 'backOnEnter'
    }
  });

  return View;
});

