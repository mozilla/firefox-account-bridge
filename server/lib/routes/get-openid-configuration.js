/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
const config = require('../configuration');

const authorizationEndpoint = config.get('oauth_url') + '/v1/authorization';
const issuer = config.get('public_url');
const jwksEndpoint = config.get('oauth_url') + '/v1/jwks';
const tokenEndpoint = config.get('oauth_url') + '/v1/token';
const userInfoEndpoint = config.get('profile_url') + '/v1/profile';

const openidConfig = {
  /*eslint-disable camelcase */
  authorization_endpoint: authorizationEndpoint,
  issuer: issuer,
  jwks_uri: jwksEndpoint,
  token_endpoint: tokenEndpoint,
  userinfo_endpoint: userInfoEndpoint,
};

const c = config.get('openid_configuration');
for (const key in c) {
  openidConfig[key] = c[key];
}

module.exports = function (config) {
  const route = {};
  route.method = 'get';
  route.path = '/.well-known/openid-configuration';

  route.process = function (req, res) {

    // taken from https://accounts.google.com/.well-known/openid-configuration
    res.header('Cache-Control', 'public, max-age=3600');

    // charset must be set on json responses.
    res.charset = 'utf-8';

    res.json(openidConfig);
  };

  return route;
};
