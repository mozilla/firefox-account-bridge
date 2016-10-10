/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const BaseView = require('views/base');
  const Cocktail = require('cocktail');
  const Constants = require('lib/constants');
  const FormView = require('views/form');
  const MarketingEmailErrors = require('lib/marketing-email-errors');
  const Metrics = require('lib/metrics');
  const SettingsPanelMixin = require('views/mixins/settings-panel-mixin');
  const Template = require('stache!templates/settings/communication_preferences');
  const Xss = require('lib/xss');

  var NEWSLETTER_ID = Constants.MARKETING_EMAIL_NEWSLETTER_ID;
  var t = BaseView.t;

  var View = FormView.extend({
    template: Template,
    className: 'communication-preferences',
    viewName: 'settings.communication-preferences',

    enableSubmitIfValid: function () {
      // overwrite this to prevent the default FormView method from hiding errors
      // after render
      this.enableForm();
    },

    getMarketingEmailPrefs: function () {
      var self = this;
      if (! self._marketingEmailPrefs) {
        self._marketingEmailPrefs =
            self.getSignedInAccount().getMarketingEmailPrefs();
      }

      return self._marketingEmailPrefs;
    },

    // The view is rendered twice to avoid delaying the settings page load.
    // The first render is done without querying Basket for the user's email
    // opt-in status. The second is after Basket is queried. Selenium tests
    // should do their business after the second render. _isBasketReady is
    // used to add a class to the #communication-preferences element that
    // Selenium can proceed. See #3357 and #3061
    _isBasketReady: false,

    afterVisible: function () {
      var self = this;
      var emailPrefs = self.getMarketingEmailPrefs();

      // the email prefs fetch is done in afterVisible instead of a render
      // function so that the settings page render is not blocked while waiting
      // for Basket to respond.  See #3061
      return emailPrefs.fetch()
        .fail(function (err) {
          if (MarketingEmailErrors.is(err, 'UNKNOWN_EMAIL')) {
            // user has not yet opted in to Basket yet. Ignore
            return;
          }
          if (MarketingEmailErrors.is(err, 'UNKNOWN_ERROR')) {
            self._error = self.translateError(MarketingEmailErrors.toError('SERVICE_UNAVAILABLE'));
          } else {
            self._error = self.translateError(err);
          }
          err = self._normalizeError(err);
          var errorString = Metrics.prototype.errorToId(err);
          err.code = err.code || 'unknown';
          // Add status code to metrics data, to differentiate between
          // 400 and 500
          errorString = errorString + '.' + err.code;
          self.logEvent(errorString);
        })
        .then(function () {
          self._isBasketReady = true;
          return self.render();
        });
    },

    context: function () {
      var self = this;
      var emailPrefs = this.getMarketingEmailPrefs();
      var isOptedIn = emailPrefs.isOptedIn(NEWSLETTER_ID);
      self.logViewEvent('newsletter.optin.' + String(isOptedIn));

      return {
        error: self._error,
        isBasketReady: !! self._isBasketReady,
        isOptedIn: isOptedIn,
        isPanelOpen: self.isPanelOpen(),
        // preferencesURL is only available if the user is already
        // registered with basket.
        preferencesUrl: Xss.href(emailPrefs.get('preferencesUrl'))
      };
    },

    submit: function () {
      var self = this;
      var emailPrefs = self.getMarketingEmailPrefs();
      return self.setOptInStatus(NEWSLETTER_ID, ! emailPrefs.isOptedIn(NEWSLETTER_ID));
    },

    setOptInStatus: function (newsletterId, isOptedIn) {
      var self = this;

      var method = isOptedIn ? 'optIn' : 'optOut';
      self.logViewEvent(method);

      return self.getMarketingEmailPrefs()[method](newsletterId)
        .then(function () {
          self.logViewEvent(method + '.success');

          var successMessage = isOptedIn ?
                                  t('Subscribed successfully') :
                                  t('Unsubscribed successfully');

          self.displaySuccess(successMessage);
          self.navigate('settings');
          return self.render();
        }, function (err) {
          self.displayError(err);
        });
    }
  });

  Cocktail.mixin(
    View,
    SettingsPanelMixin
  );

  module.exports = View;
});

