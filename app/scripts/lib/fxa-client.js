/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// a very light wrapper around the real FxaClient to reduce boilerplate code
// and to allow us to develop to features that are not yet present in the real
// client.

'use strict';

define([
  'underscore',
  'fxaClient',
  'jquery',
  'lib/xhr',
  'lib/promise',
  'lib/session',
  'lib/auth-errors',
  'lib/constants'
],
function (_, FxaClient, $, xhr, p, Session, AuthErrors, Constants) {
  function trim(str) {
    return $.trim(str);
  }

  function FxaClientWrapper(options) {
    options = options || {};

    this._client = options.client;
    this._signUpResendCount = 0;
    this._passwordResetResendCount = 0;
    this._interTabChannel = options.interTabChannel;
  }

  FxaClientWrapper.prototype = {
    _getClientAsync: function () {
      var defer = p.defer();

      if (this._client) {
        defer.resolve(this._client);
      } else {
        var self = this;
        this._getFxAccountUrl()
          .then(function (fxaccountUrl) {
            self._client = new FxaClient(fxaccountUrl);
            defer.resolve(self._client);
          });
      }

      // Protip: add `.delay(msToDelay)` to do a dirty
      // synthication of server lag for manual testing.
      return defer.promise;
    },

    _getFxAccountUrl: function () {
      if (Session.config && Session.config.fxaccountUrl) {
        return p(Session.config.fxaccountUrl);
      }

      return xhr.getJSON('/config')
          .then(function (data) {
            return data.fxaccountUrl;
          });
    },

    /**
     * Fetch some entropy from the server
     */
    getRandomBytes: function () {
      return this._getClientAsync()
        .then(function (client) {
          return client.getRandomBytes();
        });
    },

    /**
     * Check the user's current password without affecting session state.
     */
    checkPassword: function (email, password) {
      return this._getClientAsync()
          .then(function (client) {
            return client.signIn(email, password);
          });
    },

    signIn: function (originalEmail, password, relier, options) {
      var email = trim(originalEmail);
      var self = this;
      options = options || {};

      return self._getClientAsync()
        .then(function (client) {
          return client.signIn(email, password, { keys: true });
        })
        .then(function (accountData) {
          var cachedCredentials = Session.cachedCredentials;
          // get rid of any old data.
          Session.clear();

          // sessionTokenContext is passed in on password change to
          // keep the same context.
          var sessionTokenContext = options.sessionTokenContext ||
                                    relier.get('context');

          var updatedSessionData = {
            email: email,
            uid: accountData.uid,
            sessionToken: accountData.sessionToken,
            sessionTokenContext: sessionTokenContext
          };

          // isSync is added in case the user verifies in a second tab
          // on the first browser, the context will not be available. We
          // need to ship the keyFetchToken and unwrapBKey to the first tab,
          // so generate these any time we are using sync as well.
          if (relier.isFxDesktop() || relier.isSync()) {
            updatedSessionData.unwrapBKey = accountData.unwrapBKey;
            updatedSessionData.keyFetchToken = accountData.keyFetchToken;
            updatedSessionData.customizeSync = options.customizeSync;
            updatedSessionData.cachedCredentials = {
              email: email,
              uid: accountData.uid,
              sessionToken: accountData.sessionToken,
              sessionTokenContext: relier.get('context')
            };
          } else {
            // Carry over the old cached credentials
            updatedSessionData.cachedCredentials = cachedCredentials;
          }

          Session.set(updatedSessionData);

          if (self._interTabChannel) {
            self._interTabChannel.emit('login', updatedSessionData);
          }

          return accountData;
        });
    },

    signUp: function (originalEmail, password, relier, options) {
      var email = trim(originalEmail);
      var self = this;
      options = options || {};

      // ensure resend works again
      this._signUpResendCount = 0;

      return self._getClientAsync()
        .then(function (client) {
          var signUpOptions = {
            keys: true
          };

          if (relier.has('service')) {
            signUpOptions.service = relier.get('service');
          }

          if (relier.has('redirectTo')) {
            signUpOptions.redirectTo = relier.get('redirectTo');
          }

          if (relier.has('preVerifyToken')) {
            signUpOptions.preVerifyToken = relier.get('preVerifyToken');
          }

          if (options.preVerified) {
            signUpOptions.preVerified = true;
          }

          signUpOptions.resume = self._createResumeToken(relier);

          return client.signUp(email, password, signUpOptions)
            .then(null, function (err) {
              if (relier.has('preVerifyToken') &&
                  AuthErrors.is(err, 'INVALID_VERIFICATION_CODE')) {
                // The token was invalid and the auth server could
                // not pre-verify the user. Now, just create a new
                // user and force them to verify their email.
                relier.unset('preVerifyToken');

                return self.signUp(email, password, relier, options);
              }

              throw err;
            });
        });
    },

    signUpResend: function (relier) {
      var self = this;
      return this._getClientAsync()
        .then(function (client) {
          if (self._signUpResendCount >= Constants.SIGNUP_RESEND_MAX_TRIES) {
            var defer = p.defer();
            defer.resolve(true);
            return defer.promise;
          } else {
            self._signUpResendCount++;
          }

          var clientOptions = {
            service: relier.get('service'),
            redirectTo: relier.get('redirectTo'),
            resume: self._createResumeToken(relier)
          };

          return client.recoveryEmailResendCode(
                    Session.sessionToken, clientOptions);
        });
    },

    signOut: function () {
      return this._getClientAsync()
              .then(function (client) {
                return client.sessionDestroy(Session.sessionToken);
              })
              .then(function () {
                // user's session is gone
                Session.clear();
              }, function () {
                // Clear the session, even on failure. Everything is A-OK.
                // See issue #616
                // - https://github.com/mozilla/fxa-content-server/issues/616
                Session.clear();
              });
    },

    verifyCode: function (uid, code) {
      return this._getClientAsync()
              .then(function (client) {
                return client.verifyCode(uid, code);
              });
    },

    passwordReset: function (originalEmail, relier) {
      var self = this;
      var email = trim(originalEmail);

      // ensure resend works again
      this._passwordResetResendCount = 0;

      return this._getClientAsync()
              .then(function (client) {
                var clientOptions = {
                  service: relier.get('service'),
                  redirectTo: relier.get('redirectTo'),
                  resume: self._createResumeToken(relier)
                };

                return client.passwordForgotSendCode(email, clientOptions);
              })
              .then(function (result) {
                Session.clear();

                // The user may resend the password reset email, in which case
                // we have to keep around some state so the email can be
                // resent.
                Session.set('email', email);
                Session.set('passwordForgotToken', result.passwordForgotToken);
              });
    },

    passwordResetResend: function (relier) {
      var self = this;
      return this._getClientAsync()
        .then(function (client) {
          if (self._passwordResetResendCount >= Constants.PASSWORD_RESET_RESEND_MAX_TRIES) {
            var defer = p.defer();
            defer.resolve(true);
            return defer.promise;
          } else {
            self._passwordResetResendCount++;
          }
          // the linters complain if this is defined in the call to
          // passwordForgotResendCode
          var clientOptions = {
            service: relier.get('service'),
            redirectTo: relier.get('redirectTo'),
            resume: self._createResumeToken(relier)
          };

          return client.passwordForgotResendCode(
                   Session.email,
                   Session.passwordForgotToken,
                   clientOptions
                 );
        });
    },

    completePasswordReset: function (originalEmail, newPassword, token, code) {
      var email = trim(originalEmail);
      var client;

      return this._getClientAsync()
              .then(function (_client) {
                client = _client;
                return client.passwordForgotVerifyCode(code, token);
              })
              .then(function (result) {
                return client.accountReset(email,
                           newPassword,
                           result.accountResetToken);
              });
    },

    isPasswordResetComplete: function (token) {
      return this._getClientAsync()
        .then(function (client) {
          return client.passwordForgotStatus(token);
        })
        .then(function () {
          // if the request succeeds, the password reset hasn't completed
          return false;
        }, function (err) {
          if (AuthErrors.is(err, 'INVALID_TOKEN')) {
            return true;
          }
          throw err;
        });
    },

    changePassword: function (originalEmail, oldPassword, newPassword) {
      var email = trim(originalEmail);
      return this._getClientAsync()
        .then(function (client) {
          return client.passwordChange(email, oldPassword, newPassword);
        });
    },

    deleteAccount: function (originalEmail, password) {
      var email = trim(originalEmail);
      return this._getClientAsync()
              .then(function (client) {
                return client.accountDestroy(email, password);
              })
              .then(function () {
                Session.clear();
              });
    },

    certificateSign: function (pubkey, duration) {
      return this._getClientAsync()
              .then(function (client) {
                return client.certificateSign(
                  Session.sessionToken,
                  pubkey,
                  duration);
              });
    },

    sessionStatus: function (sessionToken) {
      return this._getClientAsync()
              .then(function (client) {
                return client.sessionStatus(sessionToken);
              });
    },

    isSignedIn: function (sessionToken) {
      // Check if the user is signed in.
      if (! sessionToken) {
        return p(false);
      }

        // Validate session token
      return this.sessionStatus(sessionToken)
        .then(function () {
          return true;
        }, function (err) {
          // the only error that we expect is INVALID_TOKEN,
          // rethrow all others.
          if (AuthErrors.is(err, 'INVALID_TOKEN')) {
            return false;
          }

          throw err;
        });
    },

    recoveryEmailStatus: function (sessionToken) {
      return this._getClientAsync()
        .then(function (client) {
          return client.recoveryEmailStatus(sessionToken);
        });
    },

    // The resume token is eventually for post-verification if the
    // user verifies in a second client, with the goal of allowing
    // users to continueback to the original RP.
    _createResumeToken: function (relier) {
      return relier.getResumeToken();
    }
  };

  return FxaClientWrapper;
});

