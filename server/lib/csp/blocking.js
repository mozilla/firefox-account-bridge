/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Middleware to take care of CSP. CSP headers are not sent unless config
// option 'csp.enabled' is set (default true in development), with a special
// exception for the /tests/index.html path, which are the frontend unit
// tests.

const url = require('url');

function getOrigin(link) {
  const parsed = url.parse(link);
  return parsed.protocol + '//' + parsed.host;
}

/**
 * blockingCspMiddleware is where to declare rules that will cause a resource
 * to be blocked if it runs afowl of a rule.
 */
module.exports = function (config) {
  const AUTH_SERVER = getOrigin(config.get('fxaccount_url'));
  const BLOB = 'blob:';
  const CDN_URL = config.get('static_resource_url');
  const DATA = 'data:';
  // The sha of the embedded <style> tag in default-profile.svg.
  const EMBEDDED_STYLE_SHA = "'sha256-9n6ek6ecEYlqel7uDyKLy6fdGNo3vw/uScXSq9ooQlk='";
  const GRAVATAR = 'https://secure.gravatar.com';
  const MARKETING_EMAIL_SERVER = getOrigin(config.get('marketing_email.api_url'));
  const NONE = 'none';
  const OAUTH_SERVER = getOrigin(config.get('oauth_url'));
  const PROFILE_SERVER = getOrigin(config.get('profile_url'));
  const PROFILE_IMAGES_SERVER = getOrigin(config.get('profile_images_url'));
  const PUBLIC_URL = config.get('public_url');
  const SELF = "'self'";
  const UNSAFE_EVAL = "'unsafe-eval'";


  function addCdnRuleIfRequired(target) {
    if (CDN_URL !== PUBLIC_URL) {
      target.push(CDN_URL);
    }

    return target;
  }

  const rules = {
    directives: {
      connectSrc: [
        SELF,
        AUTH_SERVER,
        OAUTH_SERVER,
        PROFILE_SERVER,
        MARKETING_EMAIL_SERVER
      ],
      defaultSrc: [
        SELF
      ],
      fontSrc: addCdnRuleIfRequired([
        SELF
      ]),
      imgSrc: addCdnRuleIfRequired([
        SELF,
        DATA,
        GRAVATAR,
        PROFILE_IMAGES_SERVER,
      ]),
      mediaSrc: [BLOB],
      objectSrc: [NONE],
      reportUri: config.get('csp.reportUri'),
      scriptSrc: addCdnRuleIfRequired([
        SELF,
        // allow unsafe-eval for functional tests. A report-only middleware
        // is also added that does not allow 'unsafe-eval' so that we can see
        // if other scripts are being added.
        UNSAFE_EVAL
      ]),
      styleSrc: addCdnRuleIfRequired([
        SELF,
        EMBEDDED_STYLE_SHA
      ])
    },
    reportOnly: false,
    // Sources are exported for unit tests
    Sources: { //eslint-disable-line sorting/sort-object-props
      AUTH_SERVER,
      BLOB,
      CDN_URL,
      DATA,
      EMBEDDED_STYLE_SHA,
      GRAVATAR,
      MARKETING_EMAIL_SERVER,
      NONE,
      OAUTH_SERVER,
      PROFILE_IMAGES_SERVER,
      PROFILE_SERVER,
      PUBLIC_URL,
      SELF,
      UNSAFE_EVAL
    }
  };

  return rules;
};
