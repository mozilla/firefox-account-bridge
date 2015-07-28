/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A relier is a model that holds information about the RP.
 *
 * A subclass should override `resumeTokenFields` to add/modify which
 * fields are saved to and populated from a resume token in the resume
 * query parameter.
 */

define(function(require, exports, module) {
  'use strict';

  var BaseRelier = require('models/reliers/base');
  var Cocktail = require('cocktail');
  var Constants = require('lib/constants');
  var p = require('lib/promise');
  var ResumeTokenMixin = require('models/mixins/resume-token');
  var SearchParamMixin = require('models/mixins/search-param');

  var RELIER_FIELDS_IN_RESUME_TOKEN = ['campaign', 'entrypoint'];

  var Relier = BaseRelier.extend({
    defaults: {
      service: null,
      preVerifyToken: null,
      email: null,
      allowCachedCredentials: true,
      entrypoint: null,
      campaign: null,
      utmCampaign: null,
      utmContent: null,
      utmMedium: null,
      utmSource: null,
      utmTerm: null
    },

    initialize: function (options) {
      options = options || {};

      this.window = options.window || window;
    },

    /**
     * Hydrate the model. Returns a promise to allow
     * for an asynchronous load. Sub-classes that override
     * fetch should still call Relier's version before completing.
     *
     * e.g.
     *
     * fetch: function () {
     *   return Relier.prototype.fetch.call(this)
     *       .then(function () {
     *         // do overriding behavior here.
     *       });
     * }
     *
     * @method fetch
     */
    fetch: function () {
      var self = this;
      return p()
        .then(function () {
          // parse the resume token before importing any other data.
          // query parameters and server provided data override
          // resume provided data.
          self.populateFromStringifiedResumeToken(self.getSearchParam('resume'));

          self.importSearchParam('service');
          self.importSearchParam('preVerifyToken');
          self.importSearchParam('uid');
          self.importSearchParam('setting');
          self.importSearchParam('entrypoint');
          self.importSearchParam('campaign');

          self.importSearchParam('utm_campaign', 'utmCampaign');
          self.importSearchParam('utm_content', 'utmContent');
          self.importSearchParam('utm_medium', 'utmMedium');
          self.importSearchParam('utm_source', 'utmSource');
          self.importSearchParam('utm_term', 'utmTerm');

          // A relier can indicate they do not want to allow
          // cached credentials if they set email === 'blank'
          if (self.getSearchParam('email') ===
              Constants.DISALLOW_CACHED_CREDENTIALS) {
            self.set('allowCachedCredentials', false);
          } else {
            self.importSearchParam('email');
          }
        });
    },

    /**
     * Check if the relier is Sync for Firefox Desktop
     */
    isSync: function () {
      return this.get('service') === Constants.FX_DESKTOP_SYNC;
    },

    /**
     * We should always fetch keys for sync.  If the user verifies in a
     * second tab on the same browser, the context will not be available,
     * but we will need to ship the keyFetchToken and unwrapBKey over to
     * the first tab.
     */
    wantsKeys: function () {
      return this.isSync();
    },

    /**
     * Check if the relier allows cached credentials. A relier
     * can set email=blank to indicate they do not.
     */
    allowCachedCredentials: function () {
      return this.get('allowCachedCredentials');
    },

    resumeTokenFields: RELIER_FIELDS_IN_RESUME_TOKEN
  });

  Cocktail.mixin(
    Relier,
    ResumeTokenMixin,
    SearchParamMixin
  );

  return Relier;
});
