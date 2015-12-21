/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// this module starts it all.

/**
 * the flow:
 * 1) Initialize session information from URL search parameters.
 * 2) Fetch /config from the backend, the returned info includes a flag that
 *    indicates whether cookies are enabled.
 * 3) Fetch translations from the backend.
 * 4) Create the web/desktop communication channel.
 * 5) If cookies are disabled, go to the /cookies_disabled page.
 * 6) Start the app if cookies are enabled.
 */

define(function (require, exports, module) {
  'use strict';

  var _ = require('underscore');
  var Able = require('lib/able');
  var AppView = require('views/app');
  var Assertion = require('lib/assertion');
  var AuthErrors = require('lib/auth-errors');
  var Backbone = require('backbone');
  var BaseAuthenticationBroker = require('models/auth_brokers/base');
  var CloseButtonView = require('views/close_button');
  var ConfigLoader = require('lib/config-loader');
  var Constants = require('lib/constants');
  var Environment = require('lib/environment');
  var FirstRunAuthenticationBroker = require('models/auth_brokers/first-run');
  var FormPrefill = require('models/form-prefill');
  var FxaClient = require('lib/fxa-client');
  var FxDesktopV1AuthenticationBroker = require('models/auth_brokers/fx-desktop-v1');
  var FxDesktopV2AuthenticationBroker = require('models/auth_brokers/fx-desktop-v2');
  var FxFennecV1AuthenticationBroker = require('models/auth_brokers/fx-fennec-v1');
  var FxiOSV1AuthenticationBroker = require('models/auth_brokers/fx-ios-v1');
  var FxiOSV2AuthenticationBroker = require('models/auth_brokers/fx-ios-v2');
  var HeightObserver = require('lib/height-observer');
  var IframeAuthenticationBroker = require('models/auth_brokers/iframe');
  var IframeChannel = require('lib/channels/iframe');
  var InterTabChannel = require('lib/channels/inter-tab');
  var MarketingEmailClient = require('lib/marketing-email-client');
  var Metrics = require('lib/metrics');
  var Notifier = require('lib/channels/notifier');
  var NullChannel = require('lib/channels/null');
  var OAuthClient = require('lib/oauth-client');
  var OAuthErrors = require('lib/oauth-errors');
  var OAuthRelier = require('models/reliers/oauth');
  var OriginCheck = require('lib/origin-check');
  var p = require('lib/promise');
  var ProfileClient = require('lib/profile-client');
  var RedirectAuthenticationBroker = require('models/auth_brokers/redirect');
  var RefreshObserver = require('models/refresh-observer');
  var Relier = require('models/reliers/relier');
  var Router = require('lib/router');
  var SameBrowserVerificationModel = require('models/verification/same-browser');
  var ScreenInfo = require('lib/screen-info');
  var SentryMetrics = require('lib/sentry');
  var Session = require('lib/session');
  var Storage = require('lib/storage');
  var StorageMetrics = require('lib/storage-metrics');
  var SyncRelier = require('models/reliers/sync');
  var Translator = require('lib/translator');
  var UniqueUserId = require('models/unique-user-id');
  var Url = require('lib/url');
  var User = require('models/user');
  var WebChannel = require('lib/channels/web');
  var WebChannelAuthenticationBroker = require('models/auth_brokers/web-channel');

  function Start(options) {
    options = options || {};

    this._authenticationBroker = options.broker;
    this._configLoader = new ConfigLoader();
    this._history = options.history || Backbone.history;
    this._notifier = options.notifier;
    this._refreshObserver = options.refreshObserver;
    this._relier = options.relier;
    this._router = options.router;
    this._storage = options.storage || Storage;
    this._user = options.user;
    this._window = options.window || window;
  }

  Start.prototype = {
    // delay before redirecting to the error page to
    // ensure metrics are reported to the backend.
    ERROR_REDIRECT_TIMEOUT_MS: 1000,
    startApp: function () {
      var self = this;

      // fetch both config and translations in parallel to speed up load.
      return p.all([
        this.initializeConfig(),
        this.initializeL10n(),
        this.initializeInterTabChannel()
      ])
      .then(_.bind(this.allResourcesReady, this))
      .fail(function (err) {
        if (console && console.error) {
          console.error('Critical error:');
          console.error(String(err));
        }

        // if there is no error metrics set that means there was probably an error with app start
        // therefore force error reporting to get error information
        if (! self._sentryMetrics) {
          self.enableSentryMetrics();
        }

        self._sentryMetrics.captureException(err);

        if (self._metrics) {
          self._metrics.logError(err);
        }

        // give a bit of time to flush the Sentry error logs,
        // otherwise Safari Mobile redirects too quickly.
        return p().delay(self.ERROR_REDIRECT_TIMEOUT_MS)
          .then(function () {
            if (self._metrics) {
              return self._metrics.flush();
            }
          })
          .then(function () {
            //Something terrible happened. Let's bail.
            var redirectTo = self._getErrorPage(err);
            self._window.location.href = redirectTo;
          });
      });
    },

    initializeInterTabChannel: function () {
      this._interTabChannel = new InterTabChannel();
    },

    initializeAble: function () {
      this._able = new Able();
    },

    initializeConfig: function () {
      return this._configLoader.fetch()
                    .then(_.bind(this.useConfig, this))
                    .then(_.bind(this.initializeAble, this))
                    .then(_.bind(this.initializeErrorMetrics, this))
                    .then(_.bind(this.initializeOAuthClient, this))
                    // both the metrics and router depend on the language
                    // fetched from config.
                    .then(_.bind(this.initializeRelier, this))
                    // metrics depends on the relier.
                    .then(_.bind(this.initializeMetrics, this))
                    // iframe channel depends on the relier and metrics
                    .then(_.bind(this.initializeIframeChannel, this))
                    // fxaClient depends on the relier and
                    // inter tab communication.
                    .then(_.bind(this.initializeFxaClient, this))
                    // depends on iframeChannel and interTabChannel
                    .then(_.bind(this.initializeNotifier, this))
                    // assertionLibrary depends on fxaClient
                    .then(_.bind(this.initializeAssertionLibrary, this))
                    // profileClient depends on fxaClient and assertionLibrary
                    .then(_.bind(this.initializeProfileClient, this))
                    // marketingEmailClient depends on config
                    .then(_.bind(this.initializeMarketingEmailClient, this))
                    // user depends on the profileClient, oAuthClient,
                    // assertionLibrary and notifier.
                    .then(_.bind(this.initializeUser, this))
                    // broker relies on the user, relier, fxaClient,
                    // assertionLibrary, and metrics
                    .then(_.bind(this.initializeAuthenticationBroker, this))
                    // depends on the authentication broker
                    .then(_.bind(this.initializeHeightObserver, this))
                    // the close button depends on the broker
                    .then(_.bind(this.initializeCloseButton, this))
                    // storage format upgrades depend on user
                    .then(_.bind(this.upgradeStorageFormats, this))

                    // depends on nothing
                    .then(_.bind(this.initializeFormPrefill, this))
                    // depends on notifier, metrics
                    .then(_.bind(this.initializeRefreshObserver, this))
                    // router depends on all of the above
                    .then(_.bind(this.initializeRouter, this))
                    // appView depends on the router
                    .then(_.bind(this.initializeAppView, this));
    },

    useConfig: function (config) {
      this._config = config;
      this._configLoader.useConfig(config);
    },

    initializeErrorMetrics: function () {
      if (this._config && this._config.env && this._able) {
        var abData = {
          env: this._config.env,
          uniqueUserId: this._getUniqueUserId()
        };
        var abChoose = this._able.choose('sentryEnabled', abData);

        if (abChoose) {
          this.enableSentryMetrics();
        }
      }
    },

    enableSentryMetrics: function () {
      this._sentryMetrics = new SentryMetrics(this._window.location.host);
    },

    initializeL10n: function () {
      this._translator = this._window.translator = new Translator();
      return this._translator.fetch();
    },

    initializeMetrics: function () {
      var isSampledUser = this._able.choose('isSampledUser', {
        env: this._config.env,
        uniqueUserId: this._getUniqueUserId()
      });

      var relier = this._relier;
      var screenInfo = new ScreenInfo(this._window);
      this._metrics = this._createMetrics({
        able: this._able,
        campaign: relier.get('campaign'),
        clientHeight: screenInfo.clientHeight,
        clientWidth: screenInfo.clientWidth,
        context: relier.get('context'),
        devicePixelRatio: screenInfo.devicePixelRatio,
        entrypoint: relier.get('entrypoint'),
        isSampledUser: isSampledUser,
        lang: this._config.language,
        migration: relier.get('migration'),
        screenHeight: screenInfo.screenHeight,
        screenWidth: screenInfo.screenWidth,
        service: relier.get('service'),
        uniqueUserId: this._getUniqueUserId(),
        utmCampaign: relier.get('utmCampaign'),
        utmContent: relier.get('utmContent'),
        utmMedium: relier.get('utmMedium'),
        utmSource: relier.get('utmSource'),
        utmTerm: relier.get('utmTerm')
      });
      this._metrics.init();
    },

    _getAllowedParentOrigins: function () {
      if (! this._isInAnIframe()) {
        return [];
      } else if (this._isServiceSync()) {
        // If in an iframe for sync, the origin is checked against
        // a pre-defined set of origins sent from the server.
        return this._config.allowedParentOrigins;
      } else if (this._isOAuth()) {
        // If in oauth, the relier has the allowed parent origin.
        return [this._relier.get('origin')];
      }

      return [];
    },

    _checkParentOrigin: function (originCheck) {
      var self = this;
      originCheck = originCheck || new OriginCheck({
        window: self._window
      });
      var allowedOrigins = self._getAllowedParentOrigins();

      return originCheck.getOrigin(self._window.parent, allowedOrigins);
    },

    initializeIframeChannel: function () {
      var self = this;
      if (! self._isInAnIframe()) {
        // Create a NullChannel in case any dependencies require it, such
        // as when the FirstRunAuthenticationBroker is used in functional
        // tests. The firstrun tests don't actually use an iframe, so the
        // real IframeChannel is not created.
        self._iframeChannel = new NullChannel();
        return p();
      }

      return self._checkParentOrigin()
        .then(function (parentOrigin) {
          if (! parentOrigin) {
            // No allowed origins were found. Illegal iframe.
            throw AuthErrors.toError('ILLEGAL_IFRAME_PARENT');
          }

          var iframeChannel = new IframeChannel();
          iframeChannel.initialize({
            metrics: self._metrics,
            origin: parentOrigin,
            window: self._window
          });

          self._iframeChannel = iframeChannel;
        });
    },

    initializeFormPrefill: function () {
      this._formPrefill = new FormPrefill();
    },

    initializeOAuthClient: function () {
      this._oAuthClient = new OAuthClient({
        oAuthUrl: this._config.oAuthUrl
      });
    },

    initializeProfileClient: function () {
      this._profileClient = new ProfileClient({
        profileUrl: this._config.profileUrl
      });
    },

    initializeMarketingEmailClient: function () {
      this._marketingEmailClient = new MarketingEmailClient({
        baseUrl: this._config.marketingEmailServerUrl,
        preferencesUrl: this._config.marketingEmailPreferencesUrl
      });
    },

    initializeRelier: function () {
      if (! this._relier) {
        var relier;

        if (this._isServiceSync()) {
          // Use the SyncRelier for sync verification so that
          // the service name is translated correctly.
          relier = new SyncRelier({
            translator: this._translator,
            window: this._window
          });
        } else if (this._isOAuth()) {
          relier = new OAuthRelier({
            oAuthClient: this._oAuthClient,
            session: Session,
            window: this._window
          });
        } else {
          relier = new Relier({
            window: this._window
          });
        }

        this._relier = relier;
        return relier.fetch();
      }
    },

    initializeAssertionLibrary: function () {
      this._assertionLibrary = new Assertion({
        audience: this._config.oAuthUrl,
        fxaClient: this._fxaClient
      });
    },

    initializeAuthenticationBroker: function () {
      if (! this._authenticationBroker) {
        if (this._isFirstRun()) {
          this._authenticationBroker = new FirstRunAuthenticationBroker({
            iframeChannel: this._iframeChannel,
            relier: this._relier,
            window: this._window
          });
        } else if (this._isFxFennecV1()) {
          this._authenticationBroker = new FxFennecV1AuthenticationBroker({
            relier: this._relier,
            window: this._window
          });
        } else if (this._isFxDesktopV2()) {
          this._authenticationBroker = new FxDesktopV2AuthenticationBroker({
            relier: this._relier,
            window: this._window
          });
        } else if (this._isFxDesktopV1()) {
          this._authenticationBroker = new FxDesktopV1AuthenticationBroker({
            relier: this._relier,
            window: this._window
          });
        } else if (this._isFxiOSV1()) {
          this._authenticationBroker = new FxiOSV1AuthenticationBroker({
            relier: this._relier,
            window: this._window
          });
        } else if (this._isFxiOSV2()) {
          this._authenticationBroker = new FxiOSV2AuthenticationBroker({
            relier: this._relier,
            window: this._window
          });
        } else if (this._isWebChannel()) {
          this._authenticationBroker = new WebChannelAuthenticationBroker({
            assertionLibrary: this._assertionLibrary,
            fxaClient: this._fxaClient,
            oAuthClient: this._oAuthClient,
            relier: this._relier,
            session: Session,
            window: this._window
          });
        } else if (this._isIframe()) {
          this._authenticationBroker = new IframeAuthenticationBroker({
            assertionLibrary: this._assertionLibrary,
            channel: this._iframeChannel,
            metrics: this._metrics,
            oAuthClient: this._oAuthClient,
            relier: this._relier,
            session: Session,
            window: this._window
          });
        } else if (this._isOAuth()) {
          this._authenticationBroker = new RedirectAuthenticationBroker({
            assertionLibrary: this._assertionLibrary,
            metrics: this._metrics,
            oAuthClient: this._oAuthClient,
            relier: this._relier,
            session: Session,
            window: this._window
          });
        } else {
          this._authenticationBroker = new BaseAuthenticationBroker({
            relier: this._relier
          });
        }

        var metrics = this._metrics;
        var win = this._window;

        this._authenticationBroker.on('error', function (err) {
          win.console.error('broker error', String(err));
          metrics.logError(err);
        });

        metrics.setBrokerType(this._authenticationBroker.type);

        return this._authenticationBroker.fetch();
      }
    },

    initializeHeightObserver: function () {
      var self = this;
      if (self._isInAnIframe()) {
        var heightObserver = new HeightObserver({
          target: self._window.document.body,
          window: self._window
        });

        heightObserver.on('change', function (height) {
          self._iframeChannel.send('resize', { height: height });
        });

        heightObserver.start();
      }
    },

    initializeCloseButton: function () {
      if (this._authenticationBroker.canCancel()) {
        this._closeButton = new CloseButtonView({
          broker: this._authenticationBroker
        });
        this._closeButton.render();
      }
    },

    initializeFxaClient: function () {
      if (! this._fxaClient) {
        this._fxaClient = new FxaClient({
          authServerUrl: this._config.authServerUrl,
          interTabChannel: this._interTabChannel
        });
      }
    },

    initializeUser: function () {
      if (! this._user) {
        this._user = new User({
          assertion: this._assertionLibrary,
          fxaClient: this._fxaClient,
          marketingEmailClient: this._marketingEmailClient,
          notifier: this._notifier,
          oAuthClient: this._oAuthClient,
          oAuthClientId: this._config.oAuthClientId,
          profileClient: this._profileClient,
          storage: this._getStorageInstance(),
          uniqueUserId: this._getUniqueUserId()
        });
      }
    },

    initializeNotifier: function () {
      if (! this._notifier) {
        var notificationWebChannel =
              new WebChannel(Constants.ACCOUNT_UPDATES_WEBCHANNEL_ID);
        notificationWebChannel.initialize();

        this._notifier = new Notifier({
          iframeChannel: this._iframeChannel,
          tabChannel: this._interTabChannel,
          webChannel: notificationWebChannel
        });
      }
    },

    initializeRefreshObserver: function () {
      if (! this._refreshObserver) {
        this._refreshObserver = new RefreshObserver({
          metrics: this._metrics,
          notifier: this._notifier,
          window: this._window
        });
      }
    },

    _uniqueUserId: null,
    _getUniqueUserId: function () {
      if (! this._uniqueUserId) {
        /**
         * Sets a UUID value that is unrelated to any account information.
         * This value is useful to determine if the logged out user qualifies
         * for A/B testing or metrics.
         */
        this._uniqueUserId = new UniqueUserId({
          window: this._window
        }).get('uniqueUserId');
      }

      return this._uniqueUserId;
    },

    upgradeStorageFormats: function () {
      return this._user.upgradeFromSession(Session, this._fxaClient);
    },

    createView: function (Constructor, options) {
      var self = this;
      var viewOptions = _.extend({
        able: self._able,
        broker: self._authenticationBroker,
        createView: self.createView.bind(self),
        formPrefill: self._formPrefill,
        fxaClient: self._fxaClient,
        interTabChannel: self._interTabChannel,
        language: self._config.language,
        metrics: self._metrics,
        notifier: self._notifier,
        relier: self._relier,
        sentryMetrics: self._sentryMetrics,
        user: self._user,
        window: self._window
      }, self._router.getViewOptions(options || {}));

      return new Constructor(viewOptions);
    },

    initializeRouter: function () {
      if (! this._router) {
        this._router = new Router({
          broker: this._authenticationBroker,
          createView: this.createView.bind(this),
          metrics: this._metrics,
          notifier: this._notifier,
          user: this._user,
          window: this._window
        });
      }
      this._window.router = this._router;
    },

    initializeAppView: function () {
      if (! this._appView) {
        this._appView = new AppView({
          createView: this.createView.bind(this),
          el: 'body',
          environment: new Environment(this._window),
          notifier: this._notifier,
          router: this._router,
          window: this._window
        });
      }
    },

    allResourcesReady: function () {
      // The IFrame cannot use pushState or else a page transition
      // would cause the parent frame to redirect.
      var usePushState = ! this._isInAnIframe();

      if (! usePushState) {
        // If pushState cannot be used, Backbone falls back to using
        // the hashchange. Put the initial pathname onto the hash
        // so the correct page loads.
        this._window.location.hash = this._window.location.pathname;
      }

      // If a new start page is specified, do not attempt to render
      // the route displayed in the URL because the user is
      // immediately redirected
      var startPage = this._selectStartPage();
      var isSilent = !! startPage;

      if (usePushState) {
        // There was a change in Firefox where the initial page in
        // about:accounts does not create a history entry and the
        // previous history entry is `about:blank`. If the user signs up,
        // goes to choose what to sync and then clicks "back",
        // the screen does not transition.
        //
        // This replaces the `about:blank` entry with the current page when
        // embedded in about:accounts, and if the user just loads
        // accounts.firefox.com, it should effectively be a noOp.
        //
        // See #3329
        try {
          This._window.history.replaceState(
              {}, document.title, this._window.location.href);
        } catch (e) {
          // This happens if the user refreshes
          // about:accounts?action=signup. History is now botched. Should
          // we present a message to the user "No way Jose"
          // See #3335
        }
      }

      this._history.start({ pushState: usePushState, silent: isSilent });
      if (startPage) {
        this._router.navigate(startPage);
      }
    },

    _getErrorPage: function (err) {
      if (OAuthErrors.is(err, 'MISSING_PARAMETER') ||
          OAuthErrors.is(err, 'UNKNOWN_CLIENT')) {
        var queryString = Url.objToSearchString({
          client_id: err.client_id, //eslint-disable-line camelcase
          context: err.context,
          errno: err.errno,
          message: OAuthErrors.toInterpolatedMessage(err, this._translator),
          namespace: err.namespace,
          param: err.param
        });

        return Constants.BAD_REQUEST_PAGE + queryString;
      }

      return Constants.INTERNAL_ERROR_PAGE;
    },

    _getStorageInstance: function () {
      return Storage.factory('localStorage', this._window);
    },

    _isServiceSync: function () {
      return this._isService(Constants.SYNC_SERVICE);
    },

    _isServiceOAuth: function () {
      var service = this._searchParam('service');
      // any service that is not the sync service is automatically
      // considered an OAuth service
      return service && ! this._isServiceSync();
    },

    _isService: function (compareToService) {
      var service = this._searchParam('service');
      return !! (service && compareToService && service === compareToService);
    },

    _isFxFennecV1: function () {
      return this._isContext(Constants.FX_FENNEC_V1_CONTEXT);
    },

    _isFxDesktopV1: function () {
      return this._isContext(Constants.FX_DESKTOP_V1_CONTEXT);
    },

    _isFxDesktopV2: function () {
      // A user is signing into sync from within an iframe on a trusted
      // web page. Automatically speak version 2 using WebChannels.
      //
      // A check for context=fx_desktop_v2 can be added when about:accounts
      // is converted to use WebChannels.
      return (this._isServiceSync() && this._isIframeContext()) ||
             (this._isContext(Constants.FX_DESKTOP_V2_CONTEXT));
    },

    _isFxiOSV1: function () {
      return this._isContext(Constants.FX_IOS_V1_CONTEXT);
    },

    _isFxiOSV2: function () {
      return this._isContext(Constants.FX_IOS_V2_CONTEXT);
    },

    _isContext: function (contextName) {
      return this._getContext() === contextName;
    },

    _getContext: function () {
      if (this._isVerification()) {
        this._context = this._getVerificationContext();
      } else {
        this._context = this._searchParam('context') || Constants.DIRECT_CONTEXT;
      }

      return this._context;
    },

    _getVerificationContext: function () {
      // Users that verify in the same browser use the same context that
      // was used to sign up to allow the verification tab to have
      // the same capabilities as the signup tab.
      // If verifying in a separate browser, fall back to the default context.
      var verificationInfo = this._getSameBrowserVerificationModel('context');
      return verificationInfo.get('context') || Constants.DIRECT_CONTEXT;
    },

    _getSameBrowserVerificationModel: function (namespace) {
      var urlVerificationInfo = Url.searchParams(this._window.location.search);

      var verificationInfo = new SameBrowserVerificationModel({}, {
        email: urlVerificationInfo.email,
        namespace: namespace,
        uid: urlVerificationInfo.uid
      });
      verificationInfo.load();

      return verificationInfo;
    },

    _isSignUpOrAccountUnlockVerification: function () {
      return this._searchParam('code') &&
             this._searchParam('uid');
    },

    _isPasswordResetVerification: function () {
      return this._searchParam('code') &&
             this._searchParam('token');
    },

    _isVerification: function () {
      return this._isSignUpOrAccountUnlockVerification() ||
             this._isPasswordResetVerification();
    },

    _isFirstRun: function () {
      return this._isFxDesktopV2() && this._isIframeContext();
    },

    _isWebChannel: function () {
      return !! (this._searchParam('webChannelId') || // signup/signin
                (this._isOAuthVerificationSameBrowser() &&
                  Session.oauth && Session.oauth.webChannelId));
    },

    _isInAnIframe: function () {
      return new Environment(this._window).isFramed();
    },

    _isIframeContext: function () {
      return this._isContext(Constants.IFRAME_CONTEXT);
    },

    _isIframe: function () {
      return this._isInAnIframe() && this._isIframeContext();
    },

    _isOAuth: function () {
      // signin/signup/force_auth
      return !! (this._searchParam('client_id') ||
                 // verification
                 this._isOAuthVerificationSameBrowser()) ||
                 this._isOAuthVerificationDifferentBrowser() ||
                 // any URL with oauth in it
                 /oauth/.test(this._window.location.href);
    },

    _getSavedClientId: function () {
      return Session.oauth && Session.oauth.client_id;
    },

    _isOAuthVerificationSameBrowser: function () {
      return this._isVerification() &&
             this._isService(this._getSavedClientId());
    },

    _isOAuthVerificationDifferentBrowser: function () {
      return this._isVerification() && this._isServiceOAuth();
    },

    _searchParam: function (name) {
      return Url.searchParam(name, this._window.location.search);
    },

    _selectStartPage: function () {
      if (this._window.location.pathname !== '/cookies_disabled' &&
        ! this._storage.isLocalStorageEnabled(this._window)) {
        return 'cookies_disabled';
      }
    },

    _createMetrics: function (options) {
      if (this._isAutomatedBrowser()) {
        return new StorageMetrics(options);
      }

      return new Metrics(options);
    },

    _isAutomatedBrowser: function () {
      return this._searchParam('automatedBrowser') === 'true';
    }
  };

  module.exports = Start;
});
