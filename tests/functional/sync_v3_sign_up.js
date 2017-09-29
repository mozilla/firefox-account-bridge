/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define([
  'intern',
  'intern!object',
  'tests/lib/helpers',
  'tests/functional/lib/helpers',
  'tests/functional/lib/selectors',
  'tests/functional/lib/ua-strings'
], function (intern, registerSuite, TestHelpers, FunctionalHelpers, selectors, uaStrings) {
  'use strict';

  const config = intern.config;
  const SIGNUP_FX_55_PAGE_URL = `${config.fxaContentRoot}signup?context=fx_desktop_v3&service=sync&forceAboutAccounts=true&` +
                                `forceUA=${uaStrings.desktop_firefox_55}&automatedBrowser=true`;
  const SIGNUP_FX_56_PAGE_URL = `${config.fxaContentRoot}signup?context=fx_desktop_v3&service=sync&forceAboutAccounts=true&` +
                                `forceUA=${uaStrings.desktop_firefox_56}&automatedBrowser=true`;
  const SIGNUP_FX_57_PAGE_URL = `${config.fxaContentRoot}signup?context=fx_desktop_v3&service=sync&forceAboutAccounts=true&` +
                                `forceUA=${uaStrings.desktop_firefox_57}&automatedBrowser=true`;

  let email;
  const PASSWORD = '12345678';

  const clearBrowserState = FunctionalHelpers.clearBrowserState;
  const click = FunctionalHelpers.click;
  const closeCurrentWindow = FunctionalHelpers.closeCurrentWindow;
  const fillOutSignUp = FunctionalHelpers.fillOutSignUp;
  const getVerificationLink = FunctionalHelpers.getVerificationLink;
  const getWebChannelMessageData = FunctionalHelpers.getWebChannelMessageData;
  const storeWebChannelMessageData = FunctionalHelpers.storeWebChannelMessageData;
  const noPageTransition = FunctionalHelpers.noPageTransition;
  const noSuchElement = FunctionalHelpers.noSuchElement;
  const noSuchBrowserNotification = FunctionalHelpers.noSuchBrowserNotification;
  const openPage = FunctionalHelpers.openPage;
  const openVerificationLinkInDifferentBrowser = FunctionalHelpers.openVerificationLinkInDifferentBrowser;
  const openVerificationLinkInNewTab = FunctionalHelpers.openVerificationLinkInNewTab;
  const testElementExists = FunctionalHelpers.testElementExists;
  const testEmailExpected = FunctionalHelpers.testEmailExpected;
  const testIsBrowserNotified = FunctionalHelpers.testIsBrowserNotified;
  const visibleByQSA = FunctionalHelpers.visibleByQSA;

  registerSuite({
    name: 'Firefox Desktop Sync v3 signup',

    beforeEach: function () {
      email = TestHelpers.createEmail();
      return this.remote.then(clearBrowserState());
    },

    afterEach: function () {
      return this.remote.then(clearBrowserState());
    },

    'Fx <= 56, verify at CWTS': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_55_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': { ok: true },
            'fxaccounts:fxa_status': { signedInUser: null },
          }
        }))
        .then(visibleByQSA(selectors.SIGNUP.SUB_HEADER))

        .then(fillOutSignUp(email, PASSWORD))

        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(testIsBrowserNotified('fxaccounts:can_link_account'))
        .then(openVerificationLinkInDifferentBrowser(email, 0))

        // about:accounts takes over, so no screen transition
        .then(noPageTransition(selectors.CHOOSE_WHAT_TO_SYNC.HEADER, 5000))
        // but the login message is sent automatically.
        .then(testIsBrowserNotified('fxaccounts:login'));
    },

    'Fx >= 57, verify at CWTS': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_57_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': { ok: true },
            'fxaccounts:fxa_status': { capabilities: null, signedInUser: null },
          }
        }))
        .then(visibleByQSA(selectors.SIGNUP.SUB_HEADER))

        .then(fillOutSignUp(email, PASSWORD))

        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(testIsBrowserNotified('fxaccounts:can_link_account'))
        .then(openVerificationLinkInDifferentBrowser(email, 0))

        // In Fx >= 57, about:accounts does not take over.
        // Expect a screen transition.
        .then(testElementExists(selectors.CONNECT_ANOTHER_DEVICE.HEADER))
        // but the login message is sent automatically.
        .then(testIsBrowserNotified('fxaccounts:login'));
    },

    'Fx <= 55, verify same browser': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_55_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': {
              ok: true
            },
            'fxaccounts:fxa_status': {
              signedInUser: null
            }
          }
        }))
        .then(noSuchElement(selectors.SIGNUP.LINK_SUGGEST_SYNC))
        .then(fillOutSignUp(email, PASSWORD))

        // user should be transitioned to /choose_what_to_sync
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_ADDRESSES))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_CREDIT_CARDS))

        .then(testIsBrowserNotified('fxaccounts:can_link_account'))
        .then(noSuchBrowserNotification('fxaccounts:login'))

        .then(click(selectors.CHOOSE_WHAT_TO_SYNC.SUBMIT))

        // user should be transitioned to the "go confirm your address" page
        .then(testElementExists(selectors.CONFIRM_SIGNUP.HEADER))

        // the login message is only sent after the sync preferences screen
        // has been cleared.
        .then(testIsBrowserNotified('fxaccounts:login'))
        // verify the user
        .then(openVerificationLinkInNewTab(email, 0))
        .switchToWindow('newwindow')

        .then(testElementExists(selectors.CONNECT_ANOTHER_DEVICE.HEADER))

        .then(closeCurrentWindow())

        // We do not expect the verification poll to occur. The poll
        // will take a few seconds to complete if it erroneously occurs.
        // Add an affordance just in case the poll happens unexpectedly.
        .then(noPageTransition(selectors.CONFIRM_SIGNUP.HEADER, 5000))

        // A post-verification email should be sent, this is Sync.
        .then(testEmailExpected(email, 1));
    },

    'Fx >= 55, verify same browser, force SMS': function () {
      let accountInfo;
      return this.remote
        .then(openPage(SIGNUP_FX_55_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': {
              ok: true
            },
            'fxaccounts:fxa_status': {
              signedInUser: null
            }
          }
        }))
        .then(storeWebChannelMessageData('fxaccounts:login'))
        .then(noSuchElement(selectors.SIGNUP.LINK_SUGGEST_SYNC))
        .then(fillOutSignUp(email, PASSWORD))

        // user should be transitioned to /choose_what_to_sync
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))

        .then(testIsBrowserNotified('fxaccounts:can_link_account'))
        .then(noSuchBrowserNotification('fxaccounts:login'))

        .then(click(selectors.CHOOSE_WHAT_TO_SYNC.SUBMIT))

        // user should be transitioned to the "go confirm your address" page
        .then(testElementExists(selectors.CONFIRM_SIGNUP.HEADER))

        // the login message is only sent after the sync preferences screen
        // has been cleared.
        .then(testIsBrowserNotified('fxaccounts:login'))
        // verify the user
        .then(getWebChannelMessageData('fxaccounts:login'))
        .then(function (message) {
          accountInfo = message.data;
        })
        .then(getVerificationLink(email, 0))
        .then(function (verificationLink) {
          return this.parent
            .then(openPage(verificationLink, selectors.SMS_SEND.HEADER, {
              query: {
                automatedBrowser: true,
                country: 'US',
                forceExperiment: 'sendSms',
                forceExperimentGroup: 'treatment',
                forceUA: uaStrings.desktop_firefox_55
              },
              webChannelResponses: {
                'fxaccounts:can_link_account': {
                  ok: true
                },
                'fxaccounts:fxa_status': {
                  signedInUser: {
                    email: accountInfo.email,
                    sessionToken: accountInfo.sessionToken,
                    uid: accountInfo.uid,
                    verified: accountInfo.verified
                  }
                }
              }
            }));
        });
    },

    'Fx >= 56, engines not supported': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_56_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': {
              ok: true
            },
            'fxaccounts:fxa_status': {
              signedInUser: null
            }
          }
        }))
        .then(fillOutSignUp(email, PASSWORD))

        // user should be transitioned to /choose_what_to_sync
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_ADDRESSES))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_CREDIT_CARDS));
    },

    'Fx >= 56, neither `creditcards` nor `addresses` supported': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_56_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': {
              ok: true
            },
            'fxaccounts:fxa_status': {
              capabilities: {
                engines: []
              },
              signedInUser: null
            }
          }
        }))
        .then(fillOutSignUp(email, PASSWORD))

        // user should be transitioned to /choose_what_to_sync
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_ADDRESSES))
        .then(noSuchElement(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_CREDIT_CARDS));
    },

    'Fx >= 56, `creditcards` and `addresses` supported': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_56_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': {
              ok: true
            },
            'fxaccounts:fxa_status': {
              capabilities: {
                engines: ['creditcards', 'addresses']
              },
              signedInUser: null
            },
          }
        }))
        .then(fillOutSignUp(email, PASSWORD))

        // user should be transitioned to /choose_what_to_sync
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_ADDRESSES))
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.ENGINE_CREDIT_CARDS));
    },

    'Fx <= 56, verify from original tab\'s P.O.V.': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_56_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': { ok: true },
            'fxaccounts:fxa_status': { capabilities: null, signedInUser: null }
          }
        }))
        .then(fillOutSignUp(email, PASSWORD))
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(click(selectors.CHOOSE_WHAT_TO_SYNC.SUBMIT))

        .then(testElementExists(selectors.CONFIRM_SIGNUP.HEADER))
        .then(testIsBrowserNotified('fxaccounts:login'))

        .then(openVerificationLinkInDifferentBrowser(email))

        // about:accounts takes over, no screen transition
        .then(noPageTransition(selectors.CONFIRM_SIGNUP.HEADER, 5000));
    },

    'Fx >= 57, verify from original tab\'s P.O.V.': function () {
      return this.remote
        .then(openPage(SIGNUP_FX_57_PAGE_URL, selectors.SIGNUP.HEADER, {
          webChannelResponses: {
            'fxaccounts:can_link_account': { ok: true },
            'fxaccounts:fxa_status': { capabilities: null, signedInUser: null }
          }
        }))
        .then(fillOutSignUp(email, PASSWORD))
        .then(testElementExists(selectors.CHOOSE_WHAT_TO_SYNC.HEADER))
        .then(click(selectors.CHOOSE_WHAT_TO_SYNC.SUBMIT))
        .then(testIsBrowserNotified('fxaccounts:login'))

        .then(testElementExists(selectors.CONFIRM_SIGNUP.HEADER))

        .then(openVerificationLinkInDifferentBrowser(email))

        // about:accounts does not take over, expect a screen transition.
        .then(testElementExists(selectors.CONNECT_ANOTHER_DEVICE.HEADER));
    },
  });
});
