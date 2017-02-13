/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
const flowMetrics = require('../flow-metrics');

module.exports = function (config) {
  const ALLOWED_PARENT_ORIGINS = config.get('allowed_parent_origins');
  const AUTH_SERVER_URL = config.get('fxaccount_url');
  const CLIENT_ID = config.get('oauth_client_id');
  const ENV = config.get('env');
  const FLOW_ID_KEY = config.get('flow_id_key');
  const MARKETING_EMAIL_API_URL = config.get('marketing_email.api_url');
  const MARKETING_EMAIL_PREFERENCES_URL = config.get('marketing_email.preferences_url');
  const OAUTH_SERVER_URL = config.get('oauth_url');
  const PROFILE_SERVER_URL = config.get('profile_url');
  const STATIC_RESOURCE_URL = config.get('static_resource_url');
  // add version from package.json to config
  const RELEASE = require('../../../package.json').version;

  const serializedConfig = encodeURIComponent(JSON.stringify({
    allowedParentOrigins: ALLOWED_PARENT_ORIGINS,
    authServerUrl: AUTH_SERVER_URL,
    env: ENV,
    marketingEmailPreferencesUrl: MARKETING_EMAIL_PREFERENCES_URL,
    marketingEmailServerUrl: MARKETING_EMAIL_API_URL,
    oAuthClientId: CLIENT_ID,
    oAuthUrl: OAUTH_SERVER_URL,
    profileUrl: PROFILE_SERVER_URL,
    release: RELEASE
  }));

  const route = {};
  route.method = 'get';
  route.path = '/';

  route.process = function (req, res) {
    const flowEventData = flowMetrics.create(FLOW_ID_KEY, req.headers['user-agent']);

    res.render('index', {
      config: serializedConfig,
      flowBeginTime: flowEventData.flowBeginTime,
      flowId: flowEventData.flowId,
      // Note that staticResourceUrl is added to templates as a build step
      staticResourceUrl: STATIC_RESOURCE_URL
    });
  };

  return route;
};
