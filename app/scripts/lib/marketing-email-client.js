/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A client to talk to the basket marketing email server
 */

define(function (require, exports, module) {
  'use strict';

  const Constants = require('lib/constants');
  const MarketingEmailErrors = require('lib/marketing-email-errors');
  const xhr = require('lib/xhr');

  function MarketingEmailClient(options) {
    options = options || {};

    this._xhrTimeout = options.timeout || Constants.DEFAULT_XHR_TIMEOUT_MS;
    this._xhr = options.xhr || xhr;
    this._baseUrl = options.baseUrl;
    this._preferencesUrl = options.preferencesUrl;
  }

  MarketingEmailClient.prototype = {
    _request (method, endpoint, accessToken, data) {
      var url = this._baseUrl + endpoint;
      return this._xhr.oauthAjax({
        accessToken: accessToken,
        data: data,
        timeout: this._xhrTimeout,
        type: method,
        url: url
      })
      .fail(function (xhr) {
        throw MarketingEmailErrors.normalizeXHRError(xhr);
      });
    },

    fetch (accessToken) {
      return this._request('get', '/lookup-user', accessToken)
        .then((response) => {
          // TODO
          // I would prefer to place this into the MarketingEmailPrefs model
          // but doing so required passing around the preferencesUrl to lots of
          // irrelevant classes.
          if (response.token) {
            response.preferencesUrl = this._preferencesUrl + response.token;
          }

          return response;
        });
    },

    optIn (accessToken, newsletterId) {
      return this._request('post', '/subscribe', accessToken, {
        newsletters: newsletterId
      });
    },

    optOut (accessToken, newsletterId) {
      return this._request('post', '/unsubscribe', accessToken, {
        newsletters: newsletterId
      });
    }
  };

  module.exports = MarketingEmailClient;
});

