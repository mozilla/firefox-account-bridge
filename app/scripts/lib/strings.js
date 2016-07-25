/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';


  var t = function (msg) {
    return msg;
  };

  // temporary strings that can be extracted for the
  // l10n team to start translations.

  // Was needed by #2346, but later deemed unnecessary. We'll keep it around since
  // it's already being translated and may be used in the future.
  t('By proceeding, you agree to the <a id="service-tos" href="%(termsUri)s">Terms of Service</a> and' +
    '<a id="service-pp" href="%(privacyUri)s">Privacy Notice</a> of %(serviceName)s (%(serviceUri)s).');

  // Allow translators to include "help" links in additional contexts.
  // Including the string here means translators are free to use it
  // without triggering errors from our l10n linting procedure.
  // See e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=1131472
  // for why this could be necessary.
  t('<a href="https://support.mozilla.org/kb/im-having-problems-with-my-firefox-account">Help</a>');

  // We're temporarily changing the string for marketing optin, see #3792.
  // This keeps the old string around for if/when we need to change it back.
  t('Get the latest news about Mozilla and Firefox.');

  // We are adding this in the auth-mailer for displaying location data
  t('%(city)s, %(country)s (estimated)');
  t('%(country)s (estimated)');
  t('IP address: %(ip)s');
  t('For added security, please confirm this sign-in to begin syncing with this device:');

  /**
   * Replace instances of %s and %(name)s with their corresponding values in
   * the context
   * @method interpolate
   */
  function interpolate(string, context) {
    if (! context) {
      context = [];
    }

    var interpolated = string.replace(/\%s/g, function (match) {
      // boot out non arrays and arrays with not enough items.
      if (! (context.shift && context.length > 0)) {
        return match;
      }
      return context.shift();
    });

    interpolated = interpolated.replace(/\%\(([a-zA-Z]+)\)s/g, function (match, name) {
      return name in context ? context[name] : match;
    });

    return interpolated;
  }

  module.exports = {
    interpolate: interpolate
  };

});

