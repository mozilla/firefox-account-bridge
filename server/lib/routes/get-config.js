/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var config = require('../configuration');
var clientId = config.get('oauth_client_id');

var authServerUrl = config.get('fxaccount_url');
var oauthServerUrl = config.get('oauth_url');
var profileServerUrl = config.get('profile_url');
var metricsSampleRate = config.get('metrics.sample_rate');
var sentrySampleRate = config.get('sentry.sample_rate');
var allowedParentOrigins = config.get('allowed_parent_origins');
var marketingEmailApiServerUrl = config.get('marketing_email.api_url');
var marketingEmailPreferencesUrl = config.get('marketing_email.preferences_url');

module.exports = function () {
  var route = {};

  route.method = 'get';
  route.path = '/config';

  route.process = function (req, res) {
    // `language` and `cookiesEnabled` are dynamic so don't cache.
    res.header('Cache-Control', 'no-cache, max-age=0');

    // Let any intermediaries know that /config can vary based
    // on the accept-language. This will also be useful if client.json
    // gains long lived cache-control headers.
    res.set('Vary', 'accept-language');

    // charset must be set on json responses.
    res.charset = 'utf-8';

    res.json({
      // The `__cookies_check` cookie is set in client code
      // to see if cookies are enabled. If cookies are disabled,
      // the `__cookie_check` cookie will not arrive.
      allowedParentOrigins: allowedParentOrigins,
      authServerUrl: authServerUrl,
      cookiesEnabled: !!req.cookies['__cookie_check'],
      marketingEmailServerUrl: marketingEmailApiServerUrl,
      marketingEmailPreferencesUrl: marketingEmailPreferencesUrl,
      oAuthClientId: clientId,
      oAuthUrl: oauthServerUrl,
      // req.lang is set by abide in a previous middleware.
      language: req.lang,
      metricsSampleRate: metricsSampleRate,
      sentrySampleRate: sentrySampleRate,
      profileUrl: profileServerUrl
    });
  };

  return route;
};

