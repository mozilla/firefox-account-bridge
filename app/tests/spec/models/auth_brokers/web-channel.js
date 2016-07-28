/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  var BaseView = require('views/base');
  var chai = require('chai');
  var Constants = require('lib/constants');
  var NullChannel = require('lib/channels/null');
  var p = require('lib/promise');
  var Relier = require('models/reliers/relier');
  var Session = require('lib/session');
  var sinon = require('sinon');
  var User = require('models/user');
  var WebChannelAuthenticationBroker = require('models/auth_brokers/web-channel');
  var WindowMock = require('../../../mocks/window');

  var assert = chai.assert;

  describe('models/auth_brokers/web-channel', function () {
    var account;
    var broker;
    var channelMock;
    var relierMock;
    var user;
    var view;
    var windowMock;

    beforeEach(function () {
      channelMock = new NullChannel();
      relierMock = new Relier();
      user = new User();
      windowMock = new WindowMock();

      account = user.initAccount({
        sessionToken: 'abc123',
        uid: 'uid'
      });

      sinon.spy(channelMock, 'send');

      broker = new WebChannelAuthenticationBroker({
        channel: channelMock,
        relier: relierMock,
        session: Session,
        window: windowMock
      });
    });

    function setupCompletesOAuthTest() {
      view = new BaseView({
        window: windowMock
      });

      sinon.stub(broker, 'getOAuthResult', function () {
        return p({});
      });

      sinon.stub(broker, 'sendOAuthResultToRelier', function () {
        return p();
      });

      sinon.spy(view, 'displayError');
    }

    function setupGeneratesOAuthCode() {
      broker._assertionLibrary = {
        generate: function mockGenerate() {
          return p('mock_assertion');
        }
      };

      broker._oAuthClient = {
        getCode: function mockGetCode() {
          var code = '00000000000000000000000000000000' +
                     '00000000000000000000000000000000';
          return p({
            redirect: 'mock?state=STATE&code=' + code
          });
        }
      };
    }

    it('has the `signup` capability by default', function () {
      assert.isTrue(broker.hasCapability('signup'));
    });

    it('does not have the `handleSignedInNotification` capability by default', function () {
      assert.isFalse(broker.hasCapability('handleSignedInNotification'));
    });

    it('has the `emailVerificationMarketingSnippet` capability by default', function () {
      assert.isTrue(broker.hasCapability('emailVerificationMarketingSnippet'));
    });

    it('does not have the `syncPreferencesNotification` capability by default', function () {
      assert.isFalse(broker.hasCapability('syncPreferencesNotification'));
    });

    describe('fetch', function () {
      describe('for the signin/signup flow', function () {
        it('fetches the webChannelId from the query parameters', function () {
          windowMock.location.search = '?webChannelId=test';

          return broker.fetch()
            .then(function () {
              assert.equal(broker.get('webChannelId'), 'test');
            });
        });
      });

      describe('for the verification flow', function () {
        it('fetches the webChannelId from Session.oauth if it exists', function () {
          windowMock.location.search = '?code=code';
          Session.set('oauth', {
            webChannelId: 'test'
          });

          return broker.fetch()
            .then(function () {
              assert.equal(broker.get('webChannelId'), 'test');
            });
        });

        it('does not set webChannelId if Session.oauth does not exist', function () {
          windowMock.location.search = '?code=code';

          return broker.fetch()
            .then(function () {
              assert.isFalse(broker.has('webChannelId'));
            });
        });
      });
    });

    describe('sendOAuthResultToRelier', function () {
      it('sets `closeWindow` to `false` if not already set to `true`', function () {
        return broker.sendOAuthResultToRelier({})
          .then(function () {
            assert.isFalse(channelMock.send.calledWith('oauth_complete', {
              closeWindow: true
            }));
          });
      });

      it('passes along `closeWindow: true`', function () {
        return broker.sendOAuthResultToRelier({ closeWindow: true })
          .then(function () {
            assert.isTrue(channelMock.send.calledWith('oauth_complete', {
              closeWindow: true
            }));
          });
      });
    });

    describe('getChannel', function () {
      it('creates a WebChannel with the id set in the broker', function () {
        var broker = new WebChannelAuthenticationBroker({
          relier: relierMock,
          windowMock: windowMock
        });

        broker.set('webChannelId', 'test');

        var channel = broker.getChannel();
        assert.equal(channel._id, 'test');
      });
    });

    describe('afterSignIn', function () {
      it('calls sendOAuthResultToRelier, tells window to close', function () {
        setupCompletesOAuthTest();

        return broker.afterSignIn(account)
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNIN,
              closeWindow: true
            }));
            assert.isFalse(view.displayError.called);
          });
      });
    });

    describe('afterSignInConfirmationPoll', () => {
      it('calls sendOAuthResultToRelier, tells window to close', () => {
        setupCompletesOAuthTest();

        return broker.afterSignInConfirmationPoll(account)
          .then(() => {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNIN,
              closeWindow: true
            }));
            assert.isFalse(view.displayError.called);
          });
      });
    });

    describe('afterForceAuth', function () {
      it('calls sendOAuthResultToRelier, tells window to close', function () {
        setupCompletesOAuthTest();

        return broker.afterForceAuth(account)
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNIN,
              closeWindow: true
            }));
            assert.isFalse(view.displayError.called);
          });
      });
    });

    describe('beforeSignUpConfirmationPoll', function () {
      it('does not persist key-fetch material by default', function () {
        setupCompletesOAuthTest();
        assert.isFalse(broker.relier.wantsKeys());
        account.set('keyFetchToken', 'keyFetchToken');
        account.set('unwrapBKey', 'unwrapBKey');

        return broker.persistVerificationData(account)
          .then(function () {
            return broker.beforeSignUpConfirmationPoll(account);
          })
          .then(function () {
            assert.isUndefined(broker.session.oauth.keyFetchToken);
            assert.isUndefined(broker.session.oauth.unwrapBKey);
          });
      });

      it('persists key-fetch material if the relier wants keys', function () {
        setupCompletesOAuthTest();
        sinon.stub(broker.relier, 'wantsKeys', function () {
          return true;
        });

        return broker.persistVerificationData(account)
          .then(function () {
            account.set('keyFetchToken', 'keyFetchToken');
            account.set('unwrapBKey', 'unwrapBKey');
            return broker.beforeSignUpConfirmationPoll(account);
          })
          .then(function () {
            assert.equal(broker.session.oauth.keyFetchToken, 'keyFetchToken');
            assert.equal(broker.session.oauth.unwrapBKey, 'unwrapBKey');
          });
      });
    });

    describe('afterCompleteSignUp', function () {
      it('calls sendOAuthResultToRelier if there is session data present', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            return broker.afterCompleteSignUp(account);
          })
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNUP
            }));
            assert.isFalse(view.displayError.called);
          });
      });

      it('doesn\'t call sendOAuthResultToRelier if there is no session data', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            broker.session.clear('oauth');
            return broker.afterCompleteSignUp(account);
          })
          .then(function () {
            assert.isFalse(broker.sendOAuthResultToRelier.called);
          });
      });

      it('retrieves key-fetch material from session if the relier wants keys', function () {
        setupCompletesOAuthTest();
        sinon.stub(broker.relier, 'wantsKeys', function () {
          return true;
        });

        return broker.persistVerificationData(account)
          .then(function () {
            account.set('keyFetchToken', 'keyFetchToken');
            account.set('unwrapBKey', 'unwrapBKey');
            return broker.beforeSignUpConfirmationPoll(account);
          })
          .then(function () {
            account.set('keyFetchToken', null);
            account.set('unwrapBKey', null);
            return broker.afterCompleteSignUp(account);
          })
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.called);
            assert.equal(account.get('keyFetchToken'), 'keyFetchToken');
            assert.equal(account.get('unwrapBKey'), 'unwrapBKey');
          });
      });
    });

    describe('afterSignUpConfirmationPoll', function () {
      it('calls sendOAuthResultToRelier if there is session data present', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            return broker.afterSignUpConfirmationPoll(account);
          })
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNUP
            }));
            assert.isFalse(view.displayError.called);
          });
      });

      it('doesn\'t call sendOAuthResultToRelier if there is no session data', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            broker.session.clear('oauth');
            return broker.afterSignUpConfirmationPoll(account);
          })
          .then(function () {
            assert.isFalse(broker.sendOAuthResultToRelier.called);
          });
      });
    });

    describe('afterCompleteResetPassword', function () {
      it('calls sendOAuthResultToRelier if there is session data present', function () {
        setupCompletesOAuthTest();

        return broker.persistVerificationData(account)
          .then(function () {
            return broker.afterCompleteResetPassword(account);
          })
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNIN
            }));
            assert.isFalse(view.displayError.called);
          });
      });

      it('doesn\'t call sendOAuthResultToRelier if there is no session data', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            broker.session.clear('oauth');
            return broker.afterCompleteResetPassword(account);
          })
          .then(function () {
            assert.isFalse(broker.sendOAuthResultToRelier.called);
          });
      });
    });

    describe('afterResetPasswordConfirmationPoll', function () {
      it('calls sendOAuthResultToRelier if there is session data present', function () {
        setupCompletesOAuthTest();

        return broker.persistVerificationData(account)
          .then(function () {
            return broker.afterResetPasswordConfirmationPoll(account);
          })
          .then(function () {
            assert.isTrue(broker.sendOAuthResultToRelier.calledWith({
              action: Constants.OAUTH_ACTION_SIGNIN
            }));
            assert.isFalse(view.displayError.called);
          });
      });

      it('doesn\'t call sendOAuthResultToRelier if there is no session data', function () {
        setupCompletesOAuthTest();
        return broker.persistVerificationData(account)
          .then(function () {
            broker.session.clear('oauth');
            return broker.afterResetPasswordConfirmationPoll(account);
          })
          .then(function () {
            assert.isFalse(broker.sendOAuthResultToRelier.called);
          });
      });
    });

    describe('getOAuthResult', function () {
      it('does not derive keys by default', function () {
        setupGeneratesOAuthCode();

        return broker.getOAuthResult(account)
          .then(function (result) {
            assert.isFalse('keys' in result);
          });
      });

      it('delegates to the account to generate relier keys if keys are asked for', function () {
        setupGeneratesOAuthCode();
        sinon.stub(broker.relier, 'wantsKeys', function () {
          return true;
        });

        sinon.stub(account, 'relierKeys', function () {
          return p('RELIER KEYS');
        });

        return broker.getOAuthResult(account)
          .then(function (result) {
            assert.isTrue(account.relierKeys.calledWith(broker.relier));
            assert.equal(result.keys, 'RELIER KEYS');
          });
      });
    });

    describe('old style channels', function () {
      describe('send', function () {
        it('sends a message', function () {
          return broker.send('message')
            .then(function () {
              assert.isTrue(channelMock.send.calledWith('message'));
            });
        });
      });

      describe('request', function () {
        it('sends a message and waits for a response', function () {
          return broker.request('request_message')
            .then(function () {
              assert.isTrue(channelMock.send.calledWith('request_message'));
            });
        });
      });
    });

    describe('new style channels', function () {
      beforeEach(function () {
        channelMock.send = sinon.spy(function () {
          return p();
        });

        channelMock.request = sinon.spy(function () {
          return p();
        });
      });

      describe('send', function () {
        it('sends a message', function () {
          return broker.send('message')
            .then(function () {
              assert.isTrue(channelMock.send.calledWith('message'));
            });
        });
      });

      describe('request', function () {
        it('sends a message and waits for a response', function () {
          return broker.request('request_message')
            .then(function () {
              assert.isTrue(channelMock.request.calledWith('request_message'));
            });
        });
      });
    });
  });
});


