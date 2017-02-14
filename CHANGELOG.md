<a name="0.80.0"></a>
# 0.80.0 (2017-02-07)

### Bug Fixes

* **account:** throw an error when generating assertions with invalid session token (#4666) r=s ([7b867b0](https://github.com/mozilla/fxa-content-server/commit/7b867b0)), closes [#4586](https://github.com/mozilla/fxa-content-server/issues/4586)
* **client:** generate fresh flow id and begin time on sign-out ([3ea1a9a](https://github.com/mozilla/fxa-content-server/commit/3ea1a9a))
* **clients:** add a "Got it" button to the client disconnected view (#4687) r=vbudhram ([a73a53b](https://github.com/mozilla/fxa-content-server/commit/a73a53b)), closes [#4633](https://github.com/mozilla/fxa-content-server/issues/4633)
* **clients:** retry with a fresh token on OAuth requests (#4688) ([1cd050a](https://github.com/mozilla/fxa-content-server/commit/1cd050a)), closes [#4659](https://github.com/mozilla/fxa-content-server/issues/4659)
* **hsts:** fix HSTS header config value (#4668) r=vbudhram ([dfabff9](https://github.com/mozilla/fxa-content-server/commit/dfabff9)), closes [(#4668](https://github.com/(/issues/4668) [#4657](https://github.com/mozilla/fxa-content-server/issues/4657)
* **iOS:** Send the `login` message within the `visibilitychange` (#4682) ([5bca42f](https://github.com/mozilla/fxa-content-server/commit/5bca42f))
* **tests:** add a direct unit test of signOutAccount ([6937fcb](https://github.com/mozilla/fxa-content-server/commit/6937fcb))
* **tests:** Bail out after the first test failure on Circle to speed test runs. (#4678) ([94acc26](https://github.com/mozilla/fxa-content-server/commit/94acc26))
* **tests:** fix 2 typos in test title ([6fa4336](https://github.com/mozilla/fxa-content-server/commit/6fa4336))
* **tests:** make sure OAuth title tests check the value ([a368849](https://github.com/mozilla/fxa-content-server/commit/a368849))

### chore

* **docs:** `User`=>`user` for consistency. (#4699) ([da001bc](https://github.com/mozilla/fxa-content-server/commit/da001bc))

### Features

* **CAD:** `install_from.fx_desktop` A/B metric, use consistent names. (#4696) r=vladikoff ([f41a418](https://github.com/mozilla/fxa-content-server/commit/f41a418)), closes [#4692](https://github.com/mozilla/fxa-content-server/issues/4692)
* **design:** switch to new mozilla logo (#4674) r=ryanfeeley ([ce8bf92](https://github.com/mozilla/fxa-content-server/commit/ce8bf92)), closes [#4656](https://github.com/mozilla/fxa-content-server/issues/4656)

### Refactor

* **client:** scope added ([6e4b4e2](https://github.com/mozilla/fxa-content-server/commit/6e4b4e2))
* **test:** Thenify all the helpers. (#4697) r=vladikoff ([30f9b19](https://github.com/mozilla/fxa-content-server/commit/30f9b19))

<a name="0.79.4"></a>
## 0.79.4 (2017-02-13)

### Bug Fixes

* **tests:** adjust to new SUMO urls (#4713) (#4720) ([b50aa81](https://github.com/mozilla/fxa-content-server/commit/b50aa81)), closes [#4712](https://github.com/mozilla/fxa-content-server/issues/4712)

### Features

* **firstrun:** Add fx_firstrun_v2 events to support new firstrun flow. (#4717) ([f1373ed](https://github.com/mozilla/fxa-content-server/commit/f1373ed))


<a name="0.79.3"></a>
## 0.79.3 (2017-01-26)


### Bug Fixes

* **client:** Use a 5 sec timeout to send `login` in Fx for iOS. (#4671) r=@rfk ([e0686ec](https://github.com/mozilla/fxa-content-server/commit/e0686ec))
* **connect-another-device:** Disable CAD for signin. (#4672) r=vladikoff ([014557e](https://github.com/mozilla/fxa-content-server/commit/014557e)), closes [#4665](https://github.com/mozilla/fxa-content-server/issues/4665)

### chore

* **experiments:** Update content-experiments to train-79 (#4677) ([4edfe87](https://github.com/mozilla/fxa-content-server/commit/4edfe87))

### Features

* **experiments:** Push all knowledge of mutually exclusive tests to able. (#4673) r=@philbooth, vl ([b8cff6e](https://github.com/mozilla/fxa-content-server/commit/b8cff6e))



<a name="0.79.2"></a>
## 0.79.2 (2017-01-24)


### Bug Fixes

* **build:** Add Dockerfile-build which is needed by Circle. (#4662) r=@shane-tomlinson ([f38f15d](https://github.com/mozilla/fxa-content-server/commit/f38f15d))
* **docker:** add bower instructions and l10n fix (#4663) ([fe1b464](https://github.com/mozilla/fxa-content-server/commit/fe1b464)), closes [(#4663](https://github.com/(/issues/4663)
* **docker:** add build production script (#4664) ([da729b7](https://github.com/mozilla/fxa-content-server/commit/da729b7))

### Refactor

* **test:** Modernize the fx_firstrun_v1_sign_up tests. (#4661) r=@philbooth ([7e1b034](https://github.com/mozilla/fxa-content-server/commit/7e1b034))



<a name="0.79.1"></a>
## 0.79.1 (2017-01-24)


### Bug Fixes

* **docker:** Start docker service ([c6cd981](https://github.com/mozilla/fxa-content-server/commit/c6cd981))



<a name="0.79.0"></a>
# 0.79.0 (2017-01-23)


### Bug Fixes

* **client:** Fix status message on /connect_another_device (#4640) r=@philbooth ([651a56b](https://github.com/mozilla/fxa-content-server/commit/651a56b)), closes [(#4640](https://github.com/(/issues/4640) [#4634](https://github.com/mozilla/fxa-content-server/issues/4634)
* **cwts:** ux changes to make choose-what-to-sync less confusing (#4619), r=@vbudhram ([c279f90](https://github.com/mozilla/fxa-content-server/commit/c279f90)), closes [#4515](https://github.com/mozilla/fxa-content-server/issues/4515)
* **docker:** Only build docker image on master or tag (#4644) r=vladikoff ([ffddf10](https://github.com/mozilla/fxa-content-server/commit/ffddf10))
* **metrics:** Only send navigationTiming data on the first flush. (#4603) r=vladikoff ([153292b](https://github.com/mozilla/fxa-content-server/commit/153292b)), closes [#4601](https://github.com/mozilla/fxa-content-server/issues/4601)
* **metrics:** POST metrics if *any* field has changed since the last send. (#4602) r=vladikoff ([7c468e7](https://github.com/mozilla/fxa-content-server/commit/7c468e7)), closes [#4479](https://github.com/mozilla/fxa-content-server/issues/4479)
* **require:** extend load time out of requireOnDemand to 40 seconds (#4647) r=@shane-tomlinson ([af6cdd7](https://github.com/mozilla/fxa-content-server/commit/af6cdd7))
* **signin:** add oauth query strings to sign in and sign up views (#4584) r=@shane-tomlinson ([6bf3da9](https://github.com/mozilla/fxa-content-server/commit/6bf3da9)), closes [#4547](https://github.com/mozilla/fxa-content-server/issues/4547)
* **strings:** adjust confirm reset password resend string (#4607) ([c8b2468](https://github.com/mozilla/fxa-content-server/commit/c8b2468))
* **styles:** fix sasslint and add border-radius for webkit / blink browsers ([5baf61d](https://github.com/mozilla/fxa-content-server/commit/5baf61d))
* **test:** Avoid rate limiting in a `confirm` functional test. (#4613) r=vladikoff ([d78733e](https://github.com/mozilla/fxa-content-server/commit/d78733e)), closes [#4537](https://github.com/mozilla/fxa-content-server/issues/4537)
* **test:** Change `after` to `afterEach`. (#4642) r=vladikoff ([605293a](https://github.com/mozilla/fxa-content-server/commit/605293a))
* **test:** Fix `sign in to OAuth with Sync creds` test timeout. (#4650) r=vladikoff ([11c2b5e](https://github.com/mozilla/fxa-content-server/commit/11c2b5e)), closes [(#4650](https://github.com/(/issues/4650) [#4649](https://github.com/mozilla/fxa-content-server/issues/4649)
* **test:** Fix the broken `refreshes_metrics` functional test. (#4629) r=@vbudhram ([a731bef](https://github.com/mozilla/fxa-content-server/commit/a731bef)), closes [(#4629](https://github.com/(/issues/4629)
* **test:** Fix the failing OAuth functional tests. (#4630) r=@vbudhram ([a6336a5](https://github.com/mozilla/fxa-content-server/commit/a6336a5)), closes [(#4630](https://github.com/(/issues/4630)

### chore

* **deps:** Update to grunt-sass@2.0.0 for Alpine Linux compatibility (#4621) r=vladikoff ([b4a1c8c](https://github.com/mozilla/fxa-content-server/commit/b4a1c8c))
* **tests:** make sure unit tests pass with different locales (#4535) r=shane-tomlinson ([878b80c](https://github.com/mozilla/fxa-content-server/commit/878b80c)), closes [#4437](https://github.com/mozilla/fxa-content-server/issues/4437)

### Features

* **connect-another-device:** Add a close button to "why connect another device" (#4626) r=@vbudhram ([6ed0196](https://github.com/mozilla/fxa-content-server/commit/6ed0196)), closes [(#4626](https://github.com/(/issues/4626) [#4604](https://github.com/mozilla/fxa-content-server/issues/4604)
* **docker:** Add CloudOps Dockerfile & CircleCI build instructions (#4620) r=vladikoff ([dc46ea0](https://github.com/mozilla/fxa-content-server/commit/dc46ea0))
* **metrics:** Log the number of stored accounts on the /signin page. (#4493) ([f44dcb5](https://github.com/mozilla/fxa-content-server/commit/f44dcb5))

### Refactor

* **client:** Extract all routes into their own modules. (#4615) r=vladikoff ([4d0a211](https://github.com/mozilla/fxa-content-server/commit/4d0a211))
* **metrics:** Add explicit signin/signup metrics (#4606), r=@shane-tomlinson ([b5aa2d2](https://github.com/mozilla/fxa-content-server/commit/b5aa2d2))
* **relier:** remove service-name abstraction (#4645) r=@shane-tomlinson ([c9ff9ab](https://github.com/mozilla/fxa-content-server/commit/c9ff9ab)), closes [#4436](https://github.com/mozilla/fxa-content-server/issues/4436)
* **style:** test page created and radio-button added ([495ba9a](https://github.com/mozilla/fxa-content-server/commit/495ba9a))
* **test:** `thenify` not needed for `getVerificationLink` (#4623) r=@philbooth ([bf11add](https://github.com/mozilla/fxa-content-server/commit/bf11add))
* **test:** No `context` for some FxDesktop helpers. (#4611) ([1117934](https://github.com/mozilla/fxa-content-server/commit/1117934))
* **test:** No more `thenify` for `openVerificationLinkDifferentBrowser` ([772e16a](https://github.com/mozilla/fxa-content-server/commit/772e16a))
* **test:** Remove `context` from `noSuchBrowserNotification` and `testIsBrowserNotified` (# ([e7f417e](https://github.com/mozilla/fxa-content-server/commit/e7f417e))
* **test:** remove `context` from `openPasswordResetLinkDifferentBrowser` (#4636) r=@philboo ([ad5a53a](https://github.com/mozilla/fxa-content-server/commit/ad5a53a))
* **test:** Remove `context` from `openSignInInNewTab` ([31fe201](https://github.com/mozilla/fxa-content-server/commit/31fe201))
* **test:** remove `context` from `openSignUpInNewTab` (#4617) r=@philbooth ([4447161](https://github.com/mozilla/fxa-content-server/commit/4447161))
* **test:** Remove `context` from `respondToWebChannelMessage` ([6a36587](https://github.com/mozilla/fxa-content-server/commit/6a36587))
* **test:** Remove `context` from `testAreEventsLogged`, `fetchAllMetrics` ([d979483](https://github.com/mozilla/fxa-content-server/commit/d979483))

### Reverts

* **docker:** Add CloudOps Dockerfile & CircleCI build instructions" (#4643) ([cbc75cf](https://github.com/mozilla/fxa-content-server/commit/cbc75cf))



<a name="0.78.0"></a>
# 0.78.0 (2017-01-09)


### Bug Fixes

* **account:** capture uncaught sessionStatus errors ([9a429ae](https://github.com/mozilla/fxa-content-server/commit/9a429ae))
* **client:** Stop using able to get the account blocked SUMO link. (#4597) r=vladikoff ([59cba43](https://github.com/mozilla/fxa-content-server/commit/59cba43)), closes [#4588](https://github.com/mozilla/fxa-content-server/issues/4588)
* **clients:** change Get-App button to Download (#4571) r=philbooth ([37fd2c3](https://github.com/mozilla/fxa-content-server/commit/37fd2c3)), closes [#4413](https://github.com/mozilla/fxa-content-server/issues/4413)
* **deps:** update to latest p-promise and fxa-js-client (#4580) ([5c85df4](https://github.com/mozilla/fxa-content-server/commit/5c85df4)), closes [#2160](https://github.com/mozilla/fxa-content-server/issues/2160)
* **docs:** Bring back the accidentally deleted client-metrics.md content. (#4593) r=vladiko ([1114db8](https://github.com/mozilla/fxa-content-server/commit/1114db8))
* **email:** adjust text of email resend link (#4599) r=vbudhram ([2472054](https://github.com/mozilla/fxa-content-server/commit/2472054))
* **links:** open external links on about:accounts in new tabs ([f40d5d7](https://github.com/mozilla/fxa-content-server/commit/f40d5d7))
* **progress_indicator:** disable element while the progress indicator is active (#4582) r=@shane-tomlinso ([1f5499c](https://github.com/mozilla/fxa-content-server/commit/1f5499c)), closes [#4167](https://github.com/mozilla/fxa-content-server/issues/4167)
* **reset:** add relier name into reset ([bffc19c](https://github.com/mozilla/fxa-content-server/commit/bffc19c))
* **reset:** change button and header on the reset page (#4564) ([f15e2d7](https://github.com/mozilla/fxa-content-server/commit/f15e2d7)), closes [#4538](https://github.com/mozilla/fxa-content-server/issues/4538)
* **rtl:** fix rtl in the devices & apps view ([ade305a](https://github.com/mozilla/fxa-content-server/commit/ade305a))
* **server:** advertise OAuth scopes in OIDC (#4587); r=rfk ([5099f51](https://github.com/mozilla/fxa-content-server/commit/5099f51)), closes [#3433](https://github.com/mozilla/fxa-content-server/issues/3433)
* **tests:** marionette fixes: remove selenium check; export X DISPLAY (#4596) r=vladikoff ([ed11ab7](https://github.com/mozilla/fxa-content-server/commit/ed11ab7))
* **tests:** update to support latest Firefox driver (#4442) ([ea575bb](https://github.com/mozilla/fxa-content-server/commit/ea575bb)), closes [#3995](https://github.com/mozilla/fxa-content-server/issues/3995)

### Features

* **client:** Stringify WebChannel payloads in Fx Desktop >= 50. (#4579) r=@mhammond, @rfk ([4888e28](https://github.com/mozilla/fxa-content-server/commit/4888e28)), closes [#4577](https://github.com/mozilla/fxa-content-server/issues/4577)
* **server:** Remove `unsafe-eval` and reportOnly CSP rules! (#4595) r=vladikoff,jrgm ([76b2014](https://github.com/mozilla/fxa-content-server/commit/76b2014)), closes [#4594](https://github.com/mozilla/fxa-content-server/issues/4594)
* **signup:** allow users to dismiss suggest-sync ([240c30a](https://github.com/mozilla/fxa-content-server/commit/240c30a))

### Refactor

* **client:** reduce duplicated auth broker initialisation logic (#4568) r=@shane-tomlinson ([4505f2e](https://github.com/mozilla/fxa-content-server/commit/4505f2e))
* **test:** Remove `context` from `openFxaFromRp`, `openFxaFromUntrustedRp` (#4576) r=@philb ([232e2f5](https://github.com/mozilla/fxa-content-server/commit/232e2f5))
* **test:** Remove `context` from `reOpenWithAdditionalQueryParams` ([d4f4ca3](https://github.com/mozilla/fxa-content-server/commit/d4f4ca3))
* **test:** Remove `context` from `test*WasShown` ([8b27f6e](https://github.com/mozilla/fxa-content-server/commit/8b27f6e))
* **test:** Remove tests/functional/lib/test.js (#4592) r=@philbooth ([0578596](https://github.com/mozilla/fxa-content-server/commit/0578596))



<a name="0.77.0"></a>
# 0.77.0 (2016-12-28)


### Bug Fixes

* **client:** Add `show pw` if pw autofilled from pw manager (#4526) r=@vbudhram ([43b4672](https://github.com/mozilla/fxa-content-server/commit/43b4672))
* **client:** cookies_disabled.js's constructor is a function. (#4528) r=vladikoff ([7331d17](https://github.com/mozilla/fxa-content-server/commit/7331d17))
* **clients:** fix translation issues with ‘none connected’ and ‘last active’ (#4533) r=@shane- ([d7d0fe3](https://github.com/mozilla/fxa-content-server/commit/d7d0fe3)), closes [(#4533](https://github.com/(/issues/4533)
* **fonts:** clean up font request rules (#4462) r=shane-tomlinson  ([863793e](https://github.com/mozilla/fxa-content-server/commit/863793e)), closes [#4116](https://github.com/mozilla/fxa-content-server/issues/4116)
* **l10n:** do not delete translation files during extraction (#4560) ([b815bf3](https://github.com/mozilla/fxa-content-server/commit/b815bf3))
* **l10n:** fix string extraction with latest jsxgettext (#4534) r=shane-tomlinson ([75f4f0d](https://github.com/mozilla/fxa-content-server/commit/75f4f0d)), closes [(#4534](https://github.com/(/issues/4534) [#4406](https://github.com/mozilla/fxa-content-server/issues/4406)
* **l10n:** make 'why sync' string extractable (#4559) ([0e16324](https://github.com/mozilla/fxa-content-server/commit/0e16324))
* **l10n:** move l10n install into postinstall (#4498) r=vbudhram ([4c4e8da](https://github.com/mozilla/fxa-content-server/commit/4c4e8da))
* **reset:** update text on the password reset page (#4540), r=@vbudhram ([57a8a68](https://github.com/mozilla/fxa-content-server/commit/57a8a68)), closes [#4255](https://github.com/mozilla/fxa-content-server/issues/4255)
* **settings:** keep Change button disabled until content is different (#4500) ([6c62417](https://github.com/mozilla/fxa-content-server/commit/6c62417)), closes [#4201](https://github.com/mozilla/fxa-content-server/issues/4201)
* **style:** Fix the modal vertical position on mobile devices. (#4509) r=vladikoff,vbudhram ([dcc4346](https://github.com/mozilla/fxa-content-server/commit/dcc4346)), closes [(#4509](https://github.com/(/issues/4509) [#4491](https://github.com/mozilla/fxa-content-server/issues/4491)
* **styles:** adjust icon height for current device (#4501) r=vbudhram ([d681f5e](https://github.com/mozilla/fxa-content-server/commit/d681f5e)), closes [#4488](https://github.com/mozilla/fxa-content-server/issues/4488)
* **test:** Ensure elements are visible and not animating before click. (#4546) r=vladikoff ([9469acc](https://github.com/mozilla/fxa-content-server/commit/9469acc))
* **test:** Fix `suggests emails via a tooltip` tests. (#4525) r=vladikoff ([67edb5c](https://github.com/mozilla/fxa-content-server/commit/67edb5c)), closes [(#4525](https://github.com/(/issues/4525)
* **test:** Fix the reset password functional tests. (#4543) r=@vbudhram ([d4984df](https://github.com/mozilla/fxa-content-server/commit/d4984df)), closes [(#4543](https://github.com/(/issues/4543) [#4540](https://github.com/mozilla/fxa-content-server/issues/4540)
* **test:** Remove `before` in the OAuth functional tests. (#4555) r=vladikoff ([44c6b09](https://github.com/mozilla/fxa-content-server/commit/44c6b09))
* **test:** Remove functional tests dealing with preVerifyToken. (#4552) r=@shane-tomlinson ([17f3348](https://github.com/mozilla/fxa-content-server/commit/17f3348))
* **tests:** Fix verification_redirect=always functional test. (#4554) r=vladikoff ([5918a80](https://github.com/mozilla/fxa-content-server/commit/5918a80)), closes [(#4554](https://github.com/(/issues/4554) [#4000](https://github.com/mozilla/fxa-content-server/issues/4000)
* **typo:** fix ‘redundantly’ typo in validate.js (#4516) ([43a0690](https://github.com/mozilla/fxa-content-server/commit/43a0690)), closes [(#4516](https://github.com/(/issues/4516)
* **typo:** fixes url.js setAttribute typo (#4514) ([3dc1603](https://github.com/mozilla/fxa-content-server/commit/3dc1603)), closes [(#4514](https://github.com/(/issues/4514)

### chore

* **ci:** add retry command to Circle (#4517) ([b4e2ec1](https://github.com/mozilla/fxa-content-server/commit/b4e2ec1))
* **ci:** disable Firefox A/B experiments in CI browser (#4536) ([a24f9b5](https://github.com/mozilla/fxa-content-server/commit/a24f9b5))
* **ci:** reorder CI scripts  ([e04dec4](https://github.com/mozilla/fxa-content-server/commit/e04dec4))
* **ci:** try to disable signed extensions in Firefox 46 on Circle Ci (#4511) ([4a8a7ef](https://github.com/mozilla/fxa-content-server/commit/4a8a7ef))
* **docs:** Remove openGmail and syncCheckbox experiment docs. (#4530) ([e63b256](https://github.com/mozilla/fxa-content-server/commit/e63b256))
* **tests:** force disable e10s while we are on Firefox 46 (#4505) r=shane-tomlinson ([6fa0ea2](https://github.com/mozilla/fxa-content-server/commit/6fa0ea2))
* **travis:** disable Node 6 builds until fixed (#4508) ([bf70aed](https://github.com/mozilla/fxa-content-server/commit/bf70aed)), closes [(#4508](https://github.com/(/issues/4508)

### Features

* **client:** Add AMO specific help text on signin/signup. (#4550) r=vladikoff ([9c595b9](https://github.com/mozilla/fxa-content-server/commit/9c595b9)), closes [#4302](https://github.com/mozilla/fxa-content-server/issues/4302)
* **client:** complete on fennec (#4370) r=vladikoff ([c80d1aa](https://github.com/mozilla/fxa-content-server/commit/c80d1aa))
* **experiments:** update to train-77 experiments (#4556) ([c21711e](https://github.com/mozilla/fxa-content-server/commit/c21711e))

### Refactor

* **avatar:** this._displayedProfileImage removed (#4502) r=shane-tomlinson,vladikoff ([3f4ec6f](https://github.com/mozilla/fxa-content-server/commit/3f4ec6f)), closes [#4386](https://github.com/mozilla/fxa-content-server/issues/4386)
* **client:** Clean up complete_sign_up a bit. (#4518) r=vladikoff ([2d3123b](https://github.com/mozilla/fxa-content-server/commit/2d3123b))
* **client:** Configurable marketing-snippet and marketing-mixin. (#4519) r=@vladikoff ([8abf49d](https://github.com/mozilla/fxa-content-server/commit/8abf49d))
* **client:** Extract a modal-panel-mixin from modal-settings-panel-mixin. (#4506) r=vladikoff ([a54eac0](https://github.com/mozilla/fxa-content-server/commit/a54eac0))
* **client:** Remove `preVerifyToken` support. (#4539); r=vladikoff,rfk ([9cbf5d9](https://github.com/mozilla/fxa-content-server/commit/9cbf5d9)), closes [#4152](https://github.com/mozilla/fxa-content-server/issues/4152)
* **test:** Modernize the oauth_sign_up_verification_redirect tests. (#4557) ([f7755e7](https://github.com/mozilla/fxa-content-server/commit/f7755e7))
* **test:** Remove `context` from `fillOutChangePassword` ([04298c6](https://github.com/mozilla/fxa-content-server/commit/04298c6))
* **test:** Remove `context` from `fillOutCompleteResetPassword` (#4522) r=@vladikoff ([a0a357e](https://github.com/mozilla/fxa-content-server/commit/a0a357e))
* **test:** Remove `context` from `fillOutDeleteAccount` ([9c7a1a7](https://github.com/mozilla/fxa-content-server/commit/9c7a1a7))
* **test:** Remove `context` from `noSuchElement` (#4523) r=vladikoff ([b95fd7b](https://github.com/mozilla/fxa-content-server/commit/b95fd7b))
* **test:** Remove `context` from `openExternalSite` (#4545), r=@vbudhram ([736a063](https://github.com/mozilla/fxa-content-server/commit/736a063))
* **test:** remove `context` from `openSettingsInNewTab` ([28d746a](https://github.com/mozilla/fxa-content-server/commit/28d746a))
* **test:** Remove `context` from `openVerificationLinkInNewTab` ([face514](https://github.com/mozilla/fxa-content-server/commit/face514))



<a name="0.76.0"></a>
# 0.76.0 (2016-12-13)


### Bug Fixes

* **deps:** update to latest prod dependencies (#4484) ([e8beb84](https://github.com/mozilla/fxa-content-server/commit/e8beb84))
* **metrics:** make metrics.flush safely re-entrant (#4478) ([c06bd31](https://github.com/mozilla/fxa-content-server/commit/c06bd31))
* **metrics:** propagate metrics context data to /account/reset (#4489), r=@vbudhram ([00a30f8](https://github.com/mozilla/fxa-content-server/commit/00a30f8))
* **test:** Hard code location of Firefox for circle tests. (#4495) r=vladikoff ([5c8b11e](https://github.com/mozilla/fxa-content-server/commit/5c8b11e))

### Features

* **deps:** update to fxa-js-client 0.1.50 ([0bd4a68](https://github.com/mozilla/fxa-content-server/commit/0bd4a68))
* **verify:** Allow iOS Private Browsing to verify emails (#4476) r=shane-tomlinson ([1af3c2a](https://github.com/mozilla/fxa-content-server/commit/1af3c2a)), closes [#4481](https://github.com/mozilla/fxa-content-server/issues/4481)

### Refactor

* **tests:** Remove `context` from several functional test helpers. (#4490) ([ef06852](https://github.com/mozilla/fxa-content-server/commit/ef06852))



<a name="0.75.1"></a>
## 0.75.1 (2016-11-29)


### Bug Fixes

* **client:** Canonicalize emails when going to /settings (#4473) r=vladikoff ([5901b2a](https://github.com/mozilla/fxa-content-server/commit/5901b2a)), closes [#4463](https://github.com/mozilla/fxa-content-server/issues/4463)
* **client:** Use the server returned email when signing in. (#4472) r=vladikoff ([668be9e](https://github.com/mozilla/fxa-content-server/commit/668be9e)), closes [#4467](https://github.com/mozilla/fxa-content-server/issues/4467)



<a name="0.75.0"></a>
# 0.75.0 (2016-11-28)


### Bug Fixes

* **client:** `is*Visible` fixes for template written messages. ([b58cfb4](https://github.com/mozilla/fxa-content-server/commit/b58cfb4))
* **client:** Babel is only available during development. (#4433) r=vladikoff ([6da1956](https://github.com/mozilla/fxa-content-server/commit/6da1956))
* **client:** delete the redundant flow-event-metadata model (#4456) ([01e06a5](https://github.com/mozilla/fxa-content-server/commit/01e06a5))
* **client:** Fix the startup l10n/everything-else race condition. (#4438) ([24e9932](https://github.com/mozilla/fxa-content-server/commit/24e9932)), closes [(#4438](https://github.com/(/issues/4438)
* **client:** Flush metrics before redirecting to an external link. ([5bcf94f](https://github.com/mozilla/fxa-content-server/commit/5bcf94f)), closes [#4458](https://github.com/mozilla/fxa-content-server/issues/4458)
* **client:** pass correct OAuth client id to certificateSign ([0c89b9a](https://github.com/mozilla/fxa-content-server/commit/0c89b9a))
* **client:** Visible success/error messages stay visible on view render ([7fa9c00](https://github.com/mozilla/fxa-content-server/commit/7fa9c00))
* **clients:** add refresh progress state (#4382) r=vbudhram,shane-tomlinson ([b42102e](https://github.com/mozilla/fxa-content-server/commit/b42102e)), closes [#4165](https://github.com/mozilla/fxa-content-server/issues/4165)
* **clients:** add tablet support to app placeholders (#4414) r=vbudhram ([3f97df4](https://github.com/mozilla/fxa-content-server/commit/3f97df4)), closes [#4412](https://github.com/mozilla/fxa-content-server/issues/4412)
* **clients:** Always sort the current device first. (#4430) r=vladikoff ([7ce2bf9](https://github.com/mozilla/fxa-content-server/commit/7ce2bf9))
* **csp:** update helmet to version 3 (#4444) r=vbudhram ([517a287](https://github.com/mozilla/fxa-content-server/commit/517a287))
* **l10n:** fix string extraction in server syntax (#4443) ([819f098](https://github.com/mozilla/fxa-content-server/commit/819f098)), closes [(#4443](https://github.com/(/issues/4443) [#4406](https://github.com/mozilla/fxa-content-server/issues/4406)
* **metrics:** drop invalid utm_ params from flow data ([3a3a7b1](https://github.com/mozilla/fxa-content-server/commit/3a3a7b1))
* **metrics:** log some metrics about the number of clients (#4454) r=vbudhram ([c5075a8](https://github.com/mozilla/fxa-content-server/commit/c5075a8)), closes [#4229](https://github.com/mozilla/fxa-content-server/issues/4229)
* **metrics:** round flow time down before emitting ([f1f87cc](https://github.com/mozilla/fxa-content-server/commit/f1f87cc))
* **metrics:** separate the begin and view flow events ([33b2f00](https://github.com/mozilla/fxa-content-server/commit/33b2f00))
* **test:** Fix failing oauth-reset-password functional test (#4465) ([9428b8e](https://github.com/mozilla/fxa-content-server/commit/9428b8e)), closes [(#4465](https://github.com/(/issues/4465)
* **tests:** add SRI testing to functional tests (#4432) r=vbudhram,shane-tomlinson ([d99d598](https://github.com/mozilla/fxa-content-server/commit/d99d598)), closes [#4364](https://github.com/mozilla/fxa-content-server/issues/4364)
* **webchannel:** handle errors from Firefox WebChannels (#4457) r=shane-tomlinson ([8fa56e6](https://github.com/mozilla/fxa-content-server/commit/8fa56e6)), closes [#3668](https://github.com/mozilla/fxa-content-server/issues/3668)

### chore

* **docs:** Add a comment about why `view.logView` is done in app.js ([44304c2](https://github.com/mozilla/fxa-content-server/commit/44304c2))
* **git:** Update .gitignore to support nested .eslintrc files (#4409) r=vladikoff ([10ecdfb](https://github.com/mozilla/fxa-content-server/commit/10ecdfb))
* **nsp:** remove exceptions (#4416) r=pdehaan ([a4728ca](https://github.com/mozilla/fxa-content-server/commit/a4728ca)), closes [#4410](https://github.com/mozilla/fxa-content-server/issues/4410)
* **shrinkwrap:** add npm script for shrinkwrap (#4445) ([fce4016](https://github.com/mozilla/fxa-content-server/commit/fce4016)), closes [#4439](https://github.com/mozilla/fxa-content-server/issues/4439)
* **typo:** fix 'suppress' type in base.js ([6c1a3e5](https://github.com/mozilla/fxa-content-server/commit/6c1a3e5))

### Features

* **client:** Enable "show" password button for everyone! (#4435) r=vladikoff ([830f666](https://github.com/mozilla/fxa-content-server/commit/830f666))
* **client:** Pass the email address in the resume token. ([898b7cf](https://github.com/mozilla/fxa-content-server/commit/898b7cf))
* **devices:** add duplicate reason for disconnecting ([69bd338](https://github.com/mozilla/fxa-content-server/commit/69bd338))
* **l10n:** Include translations in JS bundle. (#4348) r=vladikoff ([eb79afc](https://github.com/mozilla/fxa-content-server/commit/eb79afc))
* **server:** Babel can be disabled via config. (#4418) r=vladikoff ([e08231d](https://github.com/mozilla/fxa-content-server/commit/e08231d))

### Refactor

* **client:** Cleanup marketing-mixin & marketing_snippet responsibilities r=vladikoff ([ffcbbfe](https://github.com/mozilla/fxa-content-server/commit/ffcbbfe))
* **client:** skip rendering if `navigate` is called in beforeRender ([f58b1a5](https://github.com/mozilla/fxa-content-server/commit/f58b1a5))
* **email:** Remove sendEmailIfVerified logic r=vladikoff ([886f394](https://github.com/mozilla/fxa-content-server/commit/886f394))
* **metrics:** extract flow event logic from POST /metrics handler ([3e69724](https://github.com/mozilla/fxa-content-server/commit/3e69724))
* **test:** bounced email takes care of its own prerequisites. (#4466) r=vladikoff ([1f27ff5](https://github.com/mozilla/fxa-content-server/commit/1f27ff5))
* **test:** fillOutResetPassword no longer takes a context. (#4405)  r=seanmonstar,vladikoff ([d082a40](https://github.com/mozilla/fxa-content-server/commit/d082a40))
* **test:** fillOutSignIn no longer takes a context ([395b958](https://github.com/mozilla/fxa-content-server/commit/395b958))
* **test:** fillOutSignUp no longer takes a context. (#4404) r=seanmonstar,vladikoff ([20ea0fe](https://github.com/mozilla/fxa-content-server/commit/20ea0fe))
* **test:** openPage no longer takes a context. (#4434) ([2de72cd](https://github.com/mozilla/fxa-content-server/commit/2de72cd))



<a name="0.74.0"></a>
# 0.74.0 (2016-11-14)


### Bug Fixes

* **client:** Do not show marketing material on Fx for iOS. (#4368), r=@vbudhram ([7909cc5](https://github.com/mozilla/fxa-content-server/commit/7909cc5)), closes [#4366](https://github.com/mozilla/fxa-content-server/issues/4366)
* **client:** Fix unlocalized app store buttons. (#4394) ([edb9404](https://github.com/mozilla/fxa-content-server/commit/edb9404)), closes [(#4394](https://github.com/(/issues/4394)
* **client:** Make the constructor a normal function in FlowEventMetadata ([a078e6f](https://github.com/mozilla/fxa-content-server/commit/a078e6f))
* **client:** Merge marketing_snippet_ios and marketing_snippet (#4384) ([cb34b95](https://github.com/mozilla/fxa-content-server/commit/cb34b95))
* **client:** Open email preferences in new tab (#2500) (#4387) r=shane-tomlinson,vladikoff ([452cce0](https://github.com/mozilla/fxa-content-server/commit/452cce0)), closes [#2500](https://github.com/mozilla/fxa-content-server/issues/2500)
* **config:** Strip any trailing '/v1' from `auth_server_base_url`. (#4357); r=shane-tomlinson ([ba0c0c0](https://github.com/mozilla/fxa-content-server/commit/ba0c0c0))
* **logging:** validate flow id before emitting events ([ccfc033](https://github.com/mozilla/fxa-content-server/commit/ccfc033))
* **metrics:** overhaul flow events for more accurate funnel analysis ([7507f2a](https://github.com/mozilla/fxa-content-server/commit/7507f2a))
* **password:** hide show password label until theres text in the pass… (#4099) r=vladikoff,ryan ([01e6fcb](https://github.com/mozilla/fxa-content-server/commit/01e6fcb)), closes [#4095](https://github.com/mozilla/fxa-content-server/issues/4095)
* **routes:** Redirect *_complete to *_verified r=vladikoff ([295cfc5](https://github.com/mozilla/fxa-content-server/commit/295cfc5))
* **signup:** Changes style of badges (#4340) r=vladikoff ([c44a1b4](https://github.com/mozilla/fxa-content-server/commit/c44a1b4)), closes [#3697](https://github.com/mozilla/fxa-content-server/issues/3697)
* **test:** Always send a locale when creating an account. (#4363) ([2268a64](https://github.com/mozilla/fxa-content-server/commit/2268a64))
* **test:** Fix the "device and apps panel works" functional test. ([6b7eb2c](https://github.com/mozilla/fxa-content-server/commit/6b7eb2c)), closes [#4397](https://github.com/mozilla/fxa-content-server/issues/4397)
* **test:** Fix the "device and apps panel works" functional test. (#4403) r=vladikoff ([105b14c](https://github.com/mozilla/fxa-content-server/commit/105b14c)), closes [(#4403](https://github.com/(/issues/4403) [#4397](https://github.com/mozilla/fxa-content-server/issues/4397)
* **test:** Sync reset password, verify different browser. ([05d21a5](https://github.com/mozilla/fxa-content-server/commit/05d21a5)), closes [#4399](https://github.com/mozilla/fxa-content-server/issues/4399)
* **test:** Sync reset password, verify different browser. (#4402) ([96ad29c](https://github.com/mozilla/fxa-content-server/commit/96ad29c))
* **test:** Try to figure out `Firstrun v1 sign_in - unverified` (#4365) r=vladikoff ([40f78e1](https://github.com/mozilla/fxa-content-server/commit/40f78e1))
* **typo:** fix typos ([ea84f99](https://github.com/mozilla/fxa-content-server/commit/ea84f99))

### chore

* **lint:** fix sasslint in marketing ios ([94b17b6](https://github.com/mozilla/fxa-content-server/commit/94b17b6))

### Features

* **apps:** add new service icons, enable apps feature (#4381) r=vbudhram ([72b06a5](https://github.com/mozilla/fxa-content-server/commit/72b06a5)), closes [#4213](https://github.com/mozilla/fxa-content-server/issues/4213)
* **client:** Add iOS App banner to pages (#4371) r=vladikoff ([58e57e5](https://github.com/mozilla/fxa-content-server/commit/58e57e5))
* **client:** Send `source_url` to Basket's `/subscribe` endpoint (#4342); r=rfk ([4bdbfa1](https://github.com/mozilla/fxa-content-server/commit/4bdbfa1)), closes [#4315](https://github.com/mozilla/fxa-content-server/issues/4315)

### Refactor

* **avatar:** remove getAvatars, prepare to remove 'selected' param ([ad89416](https://github.com/mozilla/fxa-content-server/commit/ad89416))
* **avatar:** remove getAvatars, prepare to remove 'selected' param (#4393) r=shane-tomlinson ([76ccf02](https://github.com/mozilla/fxa-content-server/commit/76ccf02))
* **cancel:** auth_brokers/base.js->canCancel moved to capabilities (#4374) r=vladikoff,shane- ([80b9999](https://github.com/mozilla/fxa-content-server/commit/80b9999)), closes [#3235](https://github.com/mozilla/fxa-content-server/issues/3235)



<a name="0.73.1"></a>
## 0.73.1 (2016-11-02)


### Bug Fixes

* **tests:** raven is a test dependency for server tests ([d6f0900](https://github.com/mozilla/fxa-content-server/commit/d6f0900))

### chore

* **deps:** update got, shrinkwrap (#4360) ([0970140](https://github.com/mozilla/fxa-content-server/commit/0970140))



<a name="0.73.0"></a>
# 0.73.0 (2016-11-01)


### Bug Fixes

* **build:** Bring back SRI. (#4353) r=vladikoff ([6b1a510](https://github.com/mozilla/fxa-content-server/commit/6b1a510)), closes [#4347](https://github.com/mozilla/fxa-content-server/issues/4347)
* **client:** All template writes are by default HTML escaped. (#4296) ([4329101](https://github.com/mozilla/fxa-content-server/commit/4329101))
* **client:** Fix the `Open Gmail` button on confirm_reset_password (#4328) r=philbooth,vladik ([9838d93](https://github.com/mozilla/fxa-content-server/commit/9838d93)), closes [(#4328](https://github.com/(/issues/4328) [#4327](https://github.com/mozilla/fxa-content-server/issues/4327)
* **client:** Use open in webmail button on reset sent page (#4313) r=vladikoff ([4004ec4](https://github.com/mozilla/fxa-content-server/commit/4004ec4))
* **devices:** handle blank device names (#4323) r=shane-tomlinson,vbudhram ([1be81aa](https://github.com/mozilla/fxa-content-server/commit/1be81aa)), closes [#4205](https://github.com/mozilla/fxa-content-server/issues/4205)
* **links:** fix privacy links for Fennec Android (#4320) ([c0c7de5](https://github.com/mozilla/fxa-content-server/commit/c0c7de5)), closes [(#4320](https://github.com/(/issues/4320)
* **metrics:** ignore flow events if begin time is missing (#4351) r=vladikoff ([1186e29](https://github.com/mozilla/fxa-content-server/commit/1186e29))
* **metrics:** Stop double counting the `*_complete` screen views. ([c4ab494](https://github.com/mozilla/fxa-content-server/commit/c4ab494))
* **package.json:** Remove the left over reference to fxaIframeOauthApp (#4310) r=vladikoff ([6bd869e](https://github.com/mozilla/fxa-content-server/commit/6bd869e))
* **sentry:** clean up abs_path in reports (#4331) ([3ac9ac7](https://github.com/mozilla/fxa-content-server/commit/3ac9ac7))
* **styles:** adjust device and apps button size (#4332) r=vbudhram  ([e25595e](https://github.com/mozilla/fxa-content-server/commit/e25595e)), closes [#4266](https://github.com/mozilla/fxa-content-server/issues/4266)
* **styles:** adjust modal h2 styles (#4321) ([c7a0de0](https://github.com/mozilla/fxa-content-server/commit/c7a0de0))
* **test:** Fix `oauth sign_in - verified, blocked, incorrect password` (#4341) r=vladikoff ([9aec0eb](https://github.com/mozilla/fxa-content-server/commit/9aec0eb)), closes [(#4341](https://github.com/(/issues/4341)
* **test:** Fix flaky sign-in-cached functional test. (#4352) ([1e0122f](https://github.com/mozilla/fxa-content-server/commit/1e0122f)), closes [(#4352](https://github.com/(/issues/4352)
* **tests:** add restmail to open webmail providers to fix test rate limits (#4346); r=vbudhr ([f039edd](https://github.com/mozilla/fxa-content-server/commit/f039edd)), closes [(#4346](https://github.com/(/issues/4346) [#4318](https://github.com/mozilla/fxa-content-server/issues/4318)
* **tests:** Allow the unit tests to be run against any auth server (#4299) ([d39313b](https://github.com/mozilla/fxa-content-server/commit/d39313b))
* **tests:** Fix "FxiOS v1 sign_in - verified, verify same browser" Cirlce (#4334) r=vladikof ([a26ed29](https://github.com/mozilla/fxa-content-server/commit/a26ed29)), closes [(#4334](https://github.com/(/issues/4334)
* **tests:** Fix the `sign in, open settings in a second tab` test. (#4338) r=vladikoff ([42e2398](https://github.com/mozilla/fxa-content-server/commit/42e2398)), closes [(#4338](https://github.com/(/issues/4338) [#4337](https://github.com/mozilla/fxa-content-server/issues/4337)
* **tests:** load Intern modules from new browser_modules ([33f1bdd](https://github.com/mozilla/fxa-content-server/commit/33f1bdd))
* **tests:** set to Firefox 46 ([19a7489](https://github.com/mozilla/fxa-content-server/commit/19a7489))
* **tests:** switch from request to got in teamcity test runner (#4354) r=vladikoff,rfk ([e3a8720](https://github.com/mozilla/fxa-content-server/commit/e3a8720))
* **travis:** test on node 4 and 6 ([b13494d](https://github.com/mozilla/fxa-content-server/commit/b13494d))
* **typo:** fix the whitepsace ([fa8e444](https://github.com/mozilla/fxa-content-server/commit/fa8e444))

### chore

* **client:** Remove OAuth WebChannel Keys support. (#4295) ([c07664f](https://github.com/mozilla/fxa-content-server/commit/c07664f))
* **docs:** add circle ci badge ([c83c994](https://github.com/mozilla/fxa-content-server/commit/c83c994))
* **repo:** Merge train-72 fixes back to master (#4312) ([806e164](https://github.com/mozilla/fxa-content-server/commit/806e164)), closes [(#4312](https://github.com/(/issues/4312)

### Features

* **devices:** add mobile get app placeholders (#4261) r=vbudhram,shane-tomlinson ([861af52](https://github.com/mozilla/fxa-content-server/commit/861af52)), closes [#4261](https://github.com/mozilla/fxa-content-server/issues/4261)
* **icons:** Use optimized svg icons in device view (#4294) r=vladikoff ([703e372](https://github.com/mozilla/fxa-content-server/commit/703e372))
* **metrics:** Add reset password flow metrics ([cc02b52](https://github.com/mozilla/fxa-content-server/commit/cc02b52))
* **sentry:** Add sentry middleware for express (#4345) r=vbudhram ([4bd04bf](https://github.com/mozilla/fxa-content-server/commit/4bd04bf)), closes [#4208](https://github.com/mozilla/fxa-content-server/issues/4208)
* **tests:** Allow CircleCI test parallelization. (#4298) ([42b80c9](https://github.com/mozilla/fxa-content-server/commit/42b80c9))

### Refactor

* **client:** Reduce repetition when initializing the auth-brokers. ([66cfb66](https://github.com/mozilla/fxa-content-server/commit/66cfb66))
* **client:** remove crosstab. (#4192) r=vladikoff ([07b5902](https://github.com/mozilla/fxa-content-server/commit/07b5902)), closes [#3415](https://github.com/mozilla/fxa-content-server/issues/3415)
* **deps:** switch from request to got module (#4344) r=rfk ([f1d7cf9](https://github.com/mozilla/fxa-content-server/commit/f1d7cf9))
* **disconnect:** OAuth services Disconnect button does not need … (#4314) r=vladikoff ([bb87fc3](https://github.com/mozilla/fxa-content-server/commit/bb87fc3))
* **settings:** remove sync preference button (#4326) ([9f43ddf](https://github.com/mozilla/fxa-content-server/commit/9f43ddf))
* **tests:** Remove `context` from `clearBrowserState` (#4343) r=vladikoff ([421d376](https://github.com/mozilla/fxa-content-server/commit/421d376))



<a name="0.72.1"></a>
## 0.72.1 (2016-10-20)


### Bug Fixes

* **csp:** single-quote 'none' keyword (#4311) ([22557a9](https://github.com/mozilla/fxa-content-server/commit/22557a9))



<a name="0.72.0"></a>
# 0.72.0 (2016-10-19)


### Bug Fixes

* **styles:** adjust stacking for Firefox 49 (#4259) ([bd02425](https://github.com/mozilla/fxa-content-server/commit/bd02425))
* **teamcity:** add configuration for latest6.dev.lcip.org ([9887e9a](https://github.com/mozilla/fxa-content-server/commit/9887e9a))
* **teamcity:** path location should be really relative to the script ([ba0bcd5](https://github.com/mozilla/fxa-content-server/commit/ba0bcd5))
* **teamcity:** path location should be relative to the script ([e8f397e](https://github.com/mozilla/fxa-content-server/commit/e8f397e))
* **teamcity:** update module versions to match package.json (#4254) r=vladikoff ([f181a2e](https://github.com/mozilla/fxa-content-server/commit/f181a2e))
* **test:** Fix the "focus" test (#4275) ([fd5c7b7](https://github.com/mozilla/fxa-content-server/commit/fd5c7b7)), closes [(#4275](https://github.com/(/issues/4275)
* **test:** Fix the requireOnDemand unit tests in Fx 52. (#4276) ([caa82d8](https://github.com/mozilla/fxa-content-server/commit/caa82d8)), closes [(#4276](https://github.com/(/issues/4276)
* **tests:** Fix the `oauth query parameter validation` functional tests. (#4286) ([a70cc82](https://github.com/mozilla/fxa-content-server/commit/a70cc82)), closes [(#4286](https://github.com/(/issues/4286)
* **text:** Change `Damaged link` to `Link damaged` to consolidate strings (#4287) ([c3c8c79](https://github.com/mozilla/fxa-content-server/commit/c3c8c79))

### Features

* signin unblock (#4154) ([18850e1](https://github.com/mozilla/fxa-content-server/commit/18850e1))
* **hpkp:** Add HPKP headers (#4097) ([660f604](https://github.com/mozilla/fxa-content-server/commit/660f604))
* **metrics:** Always send a metricsContext.context from the content server. (#4251) ([1fefb77](https://github.com/mozilla/fxa-content-server/commit/1fefb77))
* **server:** Ban all `object`s using CSP. (#4285) ([b6e9a25](https://github.com/mozilla/fxa-content-server/commit/b6e9a25))
* **test:** Point circle at fxa-ci.dev.lcip.org (#4282) ([3cec607](https://github.com/mozilla/fxa-content-server/commit/3cec607))
* **test:** Use package.json for version info for teamcity dep install ([8de7ef0](https://github.com/mozilla/fxa-content-server/commit/8de7ef0))
* **tests:** Update Fx and Selenium versions on Travis. (#4271) ([5831294](https://github.com/mozilla/fxa-content-server/commit/5831294))

### Refactor

* **client:** `var`=>`const` for all requires (#4263) ([5490a0b](https://github.com/mozilla/fxa-content-server/commit/5490a0b))
* **client:** Ditch `var self=this` (#4264) ([808ad8d](https://github.com/mozilla/fxa-content-server/commit/808ad8d))
* **client:** Remove colon from device timestamps (#4222) r=shane-tomlinson,vladikoff ([253da2e](https://github.com/mozilla/fxa-content-server/commit/253da2e))
* **client:** Use object shorthand for functions. (#4265) ([f44c262](https://github.com/mozilla/fxa-content-server/commit/f44c262))
* **incorrect-password:** Changed Text in case of wrong password (#4258) r=vladikoff ([9279e69](https://github.com/mozilla/fxa-content-server/commit/9279e69))
* **signup:** Messaging Size Matched (#4249) r=vladikoff ([05db4d2](https://github.com/mozilla/fxa-content-server/commit/05db4d2))
* **test:** Update the confirm functional test to use helpers. (#4273) ([35b9330](https://github.com/mozilla/fxa-content-server/commit/35b9330))
* **tests:** Update the email-optin tests to use helpers. (#4279) ([2f273cd](https://github.com/mozilla/fxa-content-server/commit/2f273cd))



<a name="0.71.0"></a>
# 0.71.0 (2016-10-06)


### Bug Fixes

* **build:** backslash-escape "/" in character class to satisfy minimizers (#4206) r=vladikof ([c3a65ce](https://github.com/mozilla/fxa-content-server/commit/c3a65ce))
* **build:** Ensure revs/filenames are correctly created. (#4210) r=vladikoff,jbuck ([6338a82](https://github.com/mozilla/fxa-content-server/commit/6338a82))
* **build:** switch to grunt-file-rev from grunt-rev (#4199) r=jbuck ([e4f750d](https://github.com/mozilla/fxa-content-server/commit/e4f750d))
* **client:** Add 'rel=noopener noreferrer' to all external links ([c19c7ed](https://github.com/mozilla/fxa-content-server/commit/c19c7ed)), closes [#4091](https://github.com/mozilla/fxa-content-server/issues/4091)
* **client:** Fix signup confirmation poll. ([307bb67](https://github.com/mozilla/fxa-content-server/commit/307bb67)), closes [#4237](https://github.com/mozilla/fxa-content-server/issues/4237)
* **client:** normalizeXHRError handling 503 and 429 error ([2a7009c](https://github.com/mozilla/fxa-content-server/commit/2a7009c))
* **devices:** use uid for devices panel ([9213f29](https://github.com/mozilla/fxa-content-server/commit/9213f29))
* **docs:** Standardize jsdoc param/returns to use {Capital} for types. (#4226) ([b58f427](https://github.com/mozilla/fxa-content-server/commit/b58f427))
* **logging:** ensure flow begin events get correct flow_time (#4236) ([bed3feb](https://github.com/mozilla/fxa-content-server/commit/bed3feb))
* **logging:** identify the view in flow.begin event (#4224) r=vladikoff ([b8952f0](https://github.com/mozilla/fxa-content-server/commit/b8952f0))
* **password:** remove need inspiration link from password prompts (#4172) ([c392f96](https://github.com/mozilla/fxa-content-server/commit/c392f96))
* **server:** Only one bodyParser.json is needed. (#4200) r=vladikoff ([ee82c3c](https://github.com/mozilla/fxa-content-server/commit/ee82c3c))
* **signin:** displaying new message for already verified sign-in tokens (#4176), r=@vbudhram ([7eb856e](https://github.com/mozilla/fxa-content-server/commit/7eb856e))
* **test:** Fix the `sign in to OAuth with Sync creds` on latest. (#4245) r=vladikoff ([dc60cea](https://github.com/mozilla/fxa-content-server/commit/dc60cea)), closes [(#4245](https://github.com/(/issues/4245)
* **tests:** add oauth app functional tests (#4209) r=shane-tomlinson ([9af4895](https://github.com/mozilla/fxa-content-server/commit/9af4895)), closes [#4109](https://github.com/mozilla/fxa-content-server/issues/4109)
* **tests:** Ensure the complete_sign_in functional tests pass. (#4183) ([60c8159](https://github.com/mozilla/fxa-content-server/commit/60c8159))
* **tests:** fix broken data-flow-begin functional tests (#4223) ([bdf72a6](https://github.com/mozilla/fxa-content-server/commit/bdf72a6)), closes [(#4223](https://github.com/(/issues/4223)

### chore

* **circle:** add circle.yml with testing config (#4197) ([2df2b48](https://github.com/mozilla/fxa-content-server/commit/2df2b48))
* **client:** Rename `webmailLink` to `unsafeWebmailLink` (#4174) r=vladikoff ([3511ccd](https://github.com/mozilla/fxa-content-server/commit/3511ccd))

### Features

* **client:** /config now returns a 410 HTTP status. (#4153) r=vladikoff ([e6ff90e](https://github.com/mozilla/fxa-content-server/commit/e6ff90e))
* **metrics:** add flow event for have-account ([bcc0974](https://github.com/mozilla/fxa-content-server/commit/bcc0974)), closes [#4216](https://github.com/mozilla/fxa-content-server/issues/4216)
* **metrics:** adjust tests and logic for the event ([4272d51](https://github.com/mozilla/fxa-content-server/commit/4272d51))
* **sentry:** move sentry release version to front-end (#4220) r=vbudhram ([18ddbf6](https://github.com/mozilla/fxa-content-server/commit/18ddbf6)), closes [#3474](https://github.com/mozilla/fxa-content-server/issues/3474)
* **shared:** add new locales ([9a24702](https://github.com/mozilla/fxa-content-server/commit/9a24702))

### Refactor

* **client:** Add the external-links-mixin to the BaseView (#4184) ([9900587](https://github.com/mozilla/fxa-content-server/commit/9900587))
* **client:** Remove all direct fxaClient calls from the views. (#4194) ([64081c6](https://github.com/mozilla/fxa-content-server/commit/64081c6))
* **fennec:** force_auth_complete removed (#4211) r=vladikoff ([729720c](https://github.com/mozilla/fxa-content-server/commit/729720c))
* **jsdocs:** displaying new message for already verified sign-in tokens (#4178) r=vladikoff ([3824ab8](https://github.com/mozilla/fxa-content-server/commit/3824ab8))
* **settings:** ellipses added (#4202) r=vladikoff ([eb5418e](https://github.com/mozilla/fxa-content-server/commit/eb5418e))
* **tests:** convert 2 sign-in functional test suites to use helpers. (#4207) r=vladikoff ([d1a3247](https://github.com/mozilla/fxa-content-server/commit/d1a3247))



<a name="0.70.0"></a>
# 0.70.0 (2016-09-20)


### Bug Fixes

* **build:** remove date from js bundle (#4102), r=@vbudhram ([31ca1c1](https://github.com/mozilla/fxa-content-server/commit/31ca1c1)), closes [#4101](https://github.com/mozilla/fxa-content-server/issues/4101)
* **client:** Ensure the "Open Webmail" button is translated. (#4164) r=vladikoff ([9d12144](https://github.com/mozilla/fxa-content-server/commit/9d12144)), closes [#4158](https://github.com/mozilla/fxa-content-server/issues/4158)
* **client:** Fix /force_auth and /complete_sign_up error handling. (#4129) r=vladikoff ([58ddfe9](https://github.com/mozilla/fxa-content-server/commit/58ddfe9)), closes [(#4129](https://github.com/(/issues/4129)
* **client:** Fix broken XHR error response handling. (#4121) r=vladikoff ([1230cc6](https://github.com/mozilla/fxa-content-server/commit/1230cc6)), closes [(#4121](https://github.com/(/issues/4121) [#4120](https://github.com/mozilla/fxa-content-server/issues/4120)
* **client:** Improved calls to action on the confirm reset password screen. (#4100) ([2063d6c](https://github.com/mozilla/fxa-content-server/commit/2063d6c))
* **clients:** fix fetch for two simultaneous responses (#4111) r=vbudhram ([dd2727c](https://github.com/mozilla/fxa-content-server/commit/dd2727c)), closes [(#4111](https://github.com/(/issues/4111)
* **email:** Add ability for content server to delegate sending emails (#4155) r=shane-tomlin ([b7a0963](https://github.com/mozilla/fxa-content-server/commit/b7a0963))
* **oauth:** set TTL for the authorization request (#4075) r=shane-tomlinson ([3af4e9a](https://github.com/mozilla/fxa-content-server/commit/3af4e9a)), closes [#3982](https://github.com/mozilla/fxa-content-server/issues/3982)
* **sentry:** bring back cache busting file names in sentry (#4103) r=vbudhram ([0627b17](https://github.com/mozilla/fxa-content-server/commit/0627b17))
* **signin:** Add delay for login message on iOS broker (#4089), r=@shane-tomlinson ([c04980d](https://github.com/mozilla/fxa-content-server/commit/c04980d))
* **styles:** fix horizontal align for comm pref (#4098) r=vladikoff ([0f13938](https://github.com/mozilla/fxa-content-server/commit/0f13938)), closes [(#4098](https://github.com/(/issues/4098) [#3886](https://github.com/mozilla/fxa-content-server/issues/3886)
* **tests:** Fix 'try to re-use a link' funcitonal test. (#4126) ([ce072e6](https://github.com/mozilla/fxa-content-server/commit/ce072e6)), closes [(#4126](https://github.com/(/issues/4126)
* **tests:** Fix the settings/avatar functional tests. (#4146) r=vladikoff ([55d896b](https://github.com/mozilla/fxa-content-server/commit/55d896b)), closes [(#4146](https://github.com/(/issues/4146) [#4144](https://github.com/mozilla/fxa-content-server/issues/4144)
* **tests:** improve add event handler for tests (#4122) ([8ecdd35](https://github.com/mozilla/fxa-content-server/commit/8ecdd35))
* **tests:** send Origin headers with resource requests when appropriate (#4059) ([030874f](https://github.com/mozilla/fxa-content-server/commit/030874f))

### chore

* **client:** Changed "Tabs" to "Open tabs" (#4156) ([7b31dc2](https://github.com/mozilla/fxa-content-server/commit/7b31dc2))
* **client:** Update Google Play Store badges (#4140) r=vladikoff ([f8fcaf7](https://github.com/mozilla/fxa-content-server/commit/f8fcaf7))
* **docs:** Add missing client metrics docs (#4083) ([03b8d1b](https://github.com/mozilla/fxa-content-server/commit/03b8d1b))
* **docs:** add release v0.69.0 notes ([440e528](https://github.com/mozilla/fxa-content-server/commit/440e528))
* **docs:** Add screen images to client metrics docs (#4139) ([c3cc9d4](https://github.com/mozilla/fxa-content-server/commit/c3cc9d4))
* **docs:** Document known values for `entrypoint` metrics param. ([ddcf9c8](https://github.com/mozilla/fxa-content-server/commit/ddcf9c8))
* **server:** Remove custom FxOS CSP code. (#4118) r=vladikoff ([a1fef3d](https://github.com/mozilla/fxa-content-server/commit/a1fef3d)), closes [#3958](https://github.com/mozilla/fxa-content-server/issues/3958)
* **tests:** Remove listenForWebChannelMessage - it's no longer needed. (#4142) r=vladikoff ([6bd603f](https://github.com/mozilla/fxa-content-server/commit/6bd603f))
* **travis:** drop node 0.10 support in travis (#4149) ([ba77285](https://github.com/mozilla/fxa-content-server/commit/ba77285))

### Features

* **client:** Embed config values in the HTML. (#4147) r=vladikoff ([1e8f1d7](https://github.com/mozilla/fxa-content-server/commit/1e8f1d7))
* **deps:** Use jQuery 3.1.0 and sinon 1.17.5 (#4117) r=vladikoff ([4fe8dc0](https://github.com/mozilla/fxa-content-server/commit/4fe8dc0))
* **devices:** add devices modal and additional metrics (#4131) r=vbudhram,shane-tomlinson ([aed667e](https://github.com/mozilla/fxa-content-server/commit/aed667e))
* **devices:** add tablet icon (#4132) r=vbudhram ([d9c007e](https://github.com/mozilla/fxa-content-server/commit/d9c007e)), closes [#4030](https://github.com/mozilla/fxa-content-server/issues/4030)
* **errors:** support localized throttled message (#4145) ([374858e](https://github.com/mozilla/fxa-content-server/commit/374858e))
* **experiments:** update to latest experiment tag (#4171) ([8ffa42f](https://github.com/mozilla/fxa-content-server/commit/8ffa42f))
* **metrics:** add flow.attempt_signin, flow.engage, flow.attempt_signup (#4150) r=rfk,philboot ([e618104](https://github.com/mozilla/fxa-content-server/commit/e618104))
* **oauth:** add OAuth app management ui (#3935) r=shane-tomlinson,vbudhram ([e6b4333](https://github.com/mozilla/fxa-content-server/commit/e6b4333)), closes [#3921](https://github.com/mozilla/fxa-content-server/issues/3921)

### Refactor

* **client:** Extract all element type specific code from form.js (#4108) ([e33ecc4](https://github.com/mozilla/fxa-content-server/commit/e33ecc4))
* **client:** Reduce fxa-js-client fetch boilerplate (#4090) ([51a70fb](https://github.com/mozilla/fxa-content-server/commit/51a70fb))
* **client:** Unify all the resend email code into resend-mixin. (#4123) ([4231045](https://github.com/mozilla/fxa-content-server/commit/4231045))
* **signin:** make all beforeSignIn methods use the account object (#4082) ([58af33b](https://github.com/mozilla/fxa-content-server/commit/58af33b))



<a name="0.69.0"></a>
# 0.69.0 (2016-09-07)


### Bug Fixes

* **build:** remove date from js bundle (#4102), r=@vbudhram ([31ca1c1](https://github.com/mozilla/fxa-content-server/commit/31ca1c1)), closes [#4101](https://github.com/mozilla/fxa-content-server/issues/4101)
* **client:** Improved calls to action on the confirm reset password screen. (#4100) ([2063d6c](https://github.com/mozilla/fxa-content-server/commit/2063d6c))
* **clients:** fix fetch for two simultaneous responses (#4111) r=vbudhram ([dd2727c](https://github.com/mozilla/fxa-content-server/commit/dd2727c)), closes [(#4111](https://github.com/(/issues/4111)
* **oauth:** set TTL for the authorization request (#4075) r=shane-tomlinson ([3af4e9a](https://github.com/mozilla/fxa-content-server/commit/3af4e9a)), closes [#3982](https://github.com/mozilla/fxa-content-server/issues/3982)
* **sentry:** bring back cache busting file names in sentry (#4103) r=vbudhram ([0627b17](https://github.com/mozilla/fxa-content-server/commit/0627b17))
* **signin:** Add delay for login message on iOS broker (#4089), r=@shane-tomlinson ([c04980d](https://github.com/mozilla/fxa-content-server/commit/c04980d))
* **styles:** fix horizontal align for comm pref (#4098) r=vladikoff ([0f13938](https://github.com/mozilla/fxa-content-server/commit/0f13938)), closes [(#4098](https://github.com/(/issues/4098) [#3886](https://github.com/mozilla/fxa-content-server/issues/3886)
* **tests:** send Origin headers with resource requests when appropriate (#4059) ([030874f](https://github.com/mozilla/fxa-content-server/commit/030874f))

### chore

* **docs:** Add missing client metrics docs (#4083) ([03b8d1b](https://github.com/mozilla/fxa-content-server/commit/03b8d1b))

### Features

* **oauth:** add OAuth app management ui (#3935) r=shane-tomlinson,vbudhram ([e6b4333](https://github.com/mozilla/fxa-content-server/commit/e6b4333)), closes [#3921](https://github.com/mozilla/fxa-content-server/issues/3921)

### Refactor

* **client:** Reduce fxa-js-client fetch boilerplate (#4090) ([51a70fb](https://github.com/mozilla/fxa-content-server/commit/51a70fb))
* **signin:** make all beforeSignIn methods use the account object (#4082) ([58af33b](https://github.com/mozilla/fxa-content-server/commit/58af33b))



<a name="0.68.1"></a>
## 0.68.1 (2016-08-24)


### Bug Fixes

* **styles:** change color of label on permissions page (#4079) r=vladikoff ([f2cf887](https://github.com/mozilla/fxa-content-server/commit/f2cf887)), closes [#4052](https://github.com/mozilla/fxa-content-server/issues/4052)
* **styles:** remove transition on show password button (#4078) r=vladikoff ([10f6d44](https://github.com/mozilla/fxa-content-server/commit/10f6d44)), closes [#4076](https://github.com/mozilla/fxa-content-server/issues/4076)
* **tests:** adjust timeouts and window handles for TeamCity tests (#4081) ([be51e51](https://github.com/mozilla/fxa-content-server/commit/be51e51))
* **tokens:** Display expired token on sign-in verification error (#4047) ([296250f](https://github.com/mozilla/fxa-content-server/commit/296250f))

### Refactor

* **client:** Remove support for fx_ios_v2 (#4080) r=vladikoff ([f6ea1ef](https://github.com/mozilla/fxa-content-server/commit/f6ea1ef)), closes [#4073](https://github.com/mozilla/fxa-content-server/issues/4073)



<a name="0.68.0"></a>
# 0.68.0 (2016-08-23)


### Bug Fixes

* **client:** Fix autofocus being called repeatedly on hidden settings panels. (#4043) r=vladi ([a541eca](https://github.com/mozilla/fxa-content-server/commit/a541eca)), closes [(#4043](https://github.com/(/issues/4043)
* **css:** Remove right margin on settings (#4054) r=vladikoff ([5c4083c](https://github.com/mozilla/fxa-content-server/commit/5c4083c))
* **deps:** update prod dependencies (#4034) ([6682ae2](https://github.com/mozilla/fxa-content-server/commit/6682ae2))
* **l10n:** fix input type direction to match Gmail (#4070) r=vbudhram ([025ed91](https://github.com/mozilla/fxa-content-server/commit/025ed91)), closes [(#4070](https://github.com/(/issues/4070)
* **l10n:** fix translations for the password warning (#4068) r=vbudhram ([ce88b84](https://github.com/mozilla/fxa-content-server/commit/ce88b84)), closes [(#4068](https://github.com/(/issues/4068)
* **logging:** flow.begin is a flowEvent, not an activityEvent (#4051) r=vladikoff ([32fa116](https://github.com/mozilla/fxa-content-server/commit/32fa116))
* **sentry:** do not send the same error more than once (#4066) r=vladikoff ([82b4e30](https://github.com/mozilla/fxa-content-server/commit/82b4e30)), closes [#4023](https://github.com/mozilla/fxa-content-server/issues/4023)
* **sentry:** separate errors by errno, switch known errors to info level (#4074) ([d0b3828](https://github.com/mozilla/fxa-content-server/commit/d0b3828))
* **signup:** add an error code for unknown account verifications (#4061) r=vbudhram ([46595e1](https://github.com/mozilla/fxa-content-server/commit/46595e1)), closes [#3989](https://github.com/mozilla/fxa-content-server/issues/3989)
* **strings:** adjust support link for devices and apps (#4072) r=rfk ([4227c2d](https://github.com/mozilla/fxa-content-server/commit/4227c2d)), closes [#4067](https://github.com/mozilla/fxa-content-server/issues/4067)
* **styles:** adjust property sort order to remove lint warnings ([b1e0bc0](https://github.com/mozilla/fxa-content-server/commit/b1e0bc0))
* **styles:** bring back CWTS email field (#4063) ([a472bea](https://github.com/mozilla/fxa-content-server/commit/a472bea)), closes [#4062](https://github.com/mozilla/fxa-content-server/issues/4062)
* **teamcity:** tests now require fxa-shared installed ([381fb20](https://github.com/mozilla/fxa-content-server/commit/381fb20))
* **tests:** Add a helper function to close a window. (#4038) r=vladikoff ([7a7785e](https://github.com/mozilla/fxa-content-server/commit/7a7785e)), closes [(#4038](https://github.com/(/issues/4038)

### chore

* **tests:** disable auto update for test profiles ([27e2728](https://github.com/mozilla/fxa-content-server/commit/27e2728))
* **travis:** retry nsp check on travis due to flaky api ([0ca0c5d](https://github.com/mozilla/fxa-content-server/commit/0ca0c5d))

### Features

* **experiments:** update latest experiments for train-68 (#4071) ([dfa8f84](https://github.com/mozilla/fxa-content-server/commit/dfa8f84))
* **passwords:** add support article about password strength (#4014) r=vbudhram ([b6a3319](https://github.com/mozilla/fxa-content-server/commit/b6a3319)), closes [#3945](https://github.com/mozilla/fxa-content-server/issues/3945)
* **settings:** escape key hides the current panel (#3845) r=vladikoff ([82c7fba](https://github.com/mozilla/fxa-content-server/commit/82c7fba))

### Refactor

* **client:** browserify jwcrypto to prepare for requireOnDemand. (#4035) r=vladikoff ([3600b0a](https://github.com/mozilla/fxa-content-server/commit/3600b0a))
* **client:** jwcrypto is now loaded using requireOnDemand. (#4041) r=vladikoff ([84706d8](https://github.com/mozilla/fxa-content-server/commit/84706d8))
* **client:** Load fxa-js-client using requireOnDemand. (#4042) r=vladikoff ([ff706a4](https://github.com/mozilla/fxa-content-server/commit/ff706a4))
* **client:** Refactor the hide-on-escape key code. (#4046) r=vladikoff ([615e138](https://github.com/mozilla/fxa-content-server/commit/615e138))
* **client:** Use cache busting URLs with require on demand. (#4002) r=vladikoff ([053153e](https://github.com/mozilla/fxa-content-server/commit/053153e))
* **client/server:** Ditch the postMessage origin check for iframes (#4008) ([c1f5260](https://github.com/mozilla/fxa-content-server/commit/c1f5260))
* **devices:** remove timeago, use device last active from the fxa-auth-server (#4033) ([36bb232](https://github.com/mozilla/fxa-content-server/commit/36bb232))
* **devices:** rename devices view to clients (#4055) r=vbudhram,rfk ([d425e8f](https://github.com/mozilla/fxa-content-server/commit/d425e8f))
* **l10n:** use shared source for l10n list (#4050), r=@vbudhram ([a3a5294](https://github.com/mozilla/fxa-content-server/commit/a3a5294))



<a name="0.67.0"></a>
# 0.67.0 (2016-08-09)


### Bug Fixes

* **build:** Fix l10n extraction of template strings. (#4028) r=vladikoff ([38557d5](https://github.com/mozilla/fxa-content-server/commit/38557d5)), closes [(#4028](https://github.com/(/issues/4028) [#4027](https://github.com/mozilla/fxa-content-server/issues/4027)
* **client:** No screen transition post confirm signin for OAuth Webchannel keys (#3997) r=vla ([6d15ece](https://github.com/mozilla/fxa-content-server/commit/6d15ece)), closes [#3966](https://github.com/mozilla/fxa-content-server/issues/3966)
* **client:** OAuth flows that request keys must do signin confirmation. (#3991) ([a77c3c9](https://github.com/mozilla/fxa-content-server/commit/a77c3c9))
* **client:** Only show passwords while depressing the "show" button. (#3978) ([251f0e3](https://github.com/mozilla/fxa-content-server/commit/251f0e3))
* **client:** propagate flow data to confirm view (#3990) ([cbbd8a5](https://github.com/mozilla/fxa-content-server/commit/cbbd8a5))
* **client:** update to latest able version (#4018) ([4466d93](https://github.com/mozilla/fxa-content-server/commit/4466d93))
* **devices:** add 'last active' to formatted string (#4015) r=shane-tomlinson ([96eaafa](https://github.com/mozilla/fxa-content-server/commit/96eaafa)), closes [#3960](https://github.com/mozilla/fxa-content-server/issues/3960)
* **devices:** add title attribute to device names (#4016) r=vbudhram,ryanfeeley ([83f0da2](https://github.com/mozilla/fxa-content-server/commit/83f0da2)), closes [#3959](https://github.com/mozilla/fxa-content-server/issues/3959)
* **experiments:** update experiments to train 67 (#4025) ([3762ea2](https://github.com/mozilla/fxa-content-server/commit/3762ea2))
* **jsdoc:** add eslint jsdoc validation (#4010) ([fcf1ebf](https://github.com/mozilla/fxa-content-server/commit/fcf1ebf))
* **logging:** use legacy log format for activityEvents ([b87805e](https://github.com/mozilla/fxa-content-server/commit/b87805e))
* **signup:** add utm params to suggest-sync (#4029) r=vbudhram ([aabd4f6](https://github.com/mozilla/fxa-content-server/commit/aabd4f6)), closes [#4021](https://github.com/mozilla/fxa-content-server/issues/4021)
* **styles:** remove bold from current device (#4020) ([138c98c](https://github.com/mozilla/fxa-content-server/commit/138c98c)), closes [#4019](https://github.com/mozilla/fxa-content-server/issues/4019)
* **tests:** fix remote tests/server/routes/get-fxa-client-configuration ([69bfeee](https://github.com/mozilla/fxa-content-server/commit/69bfeee))

### chore

* **client:** Remove signin confirmation transition code from fxa-client.js ([d26aa75](https://github.com/mozilla/fxa-content-server/commit/d26aa75))
* **deps:** Bump fxa-js-client to 0.1.46 (#3987) r=vbudhram,vladikoff ([c1b42bc](https://github.com/mozilla/fxa-content-server/commit/c1b42bc))
* **deps:** Bump the fxa-js-client version to 0.1.45 (#3983) r=vladikoff ([401bd31](https://github.com/mozilla/fxa-content-server/commit/401bd31))
* **scripts:** update npm versions used to run in teamcity (#3999) r=vladikoff ([4d600e7](https://github.com/mozilla/fxa-content-server/commit/4d600e7))
* **teamcity:** a tool to help updating bash-embedded dependencies (#4001) r=vladikoff ([8bce55b](https://github.com/mozilla/fxa-content-server/commit/8bce55b))

### Features

* **metrics:** Add utms to statsd (#4026) r=vladikoff ([859591a](https://github.com/mozilla/fxa-content-server/commit/859591a))



<a name="0.66.0"></a>
# 0.66.0 (2016-07-26)


### Bug Fixes

* **avatar:** prevent buttons from flashing (#3850) ([6e7f360](https://github.com/mozilla/fxa-content-server/commit/6e7f360))
* **client:** always send a service param to /certificate/sign ([01a0ae5](https://github.com/mozilla/fxa-content-server/commit/01a0ae5))
* **client:** Check for expired sessions whenever the user focuses the settings page. (#3924) ([25cf276](https://github.com/mozilla/fxa-content-server/commit/25cf276))
* **client:** Help the password manager save the username on pw reset/change. (#3977) r=vladik ([362b2fb](https://github.com/mozilla/fxa-content-server/commit/362b2fb))
* **client:** Hide all visible passwords on form submit. (#3969) ([a6c848c](https://github.com/mozilla/fxa-content-server/commit/a6c848c))
* **client:** use context constants instead of literals (#3961) ([88ae365](https://github.com/mozilla/fxa-content-server/commit/88ae365))
* **confirm:** add known error code when polling fails (#3943) r=vbudhram ([c509963](https://github.com/mozilla/fxa-content-server/commit/c509963)), closes [#3925](https://github.com/mozilla/fxa-content-server/issues/3925)
* **devices:** adjust download links for browsers (#3926) r=vladikoff ([d178aee](https://github.com/mozilla/fxa-content-server/commit/d178aee)), closes [#3540](https://github.com/mozilla/fxa-content-server/issues/3540)
* **l10n:** Fix l10n extraction on ES2015. (#3963) r=vladikoff ([01334e7](https://github.com/mozilla/fxa-content-server/commit/01334e7)), closes [(#3963](https://github.com/(/issues/3963) [#3962](https://github.com/mozilla/fxa-content-server/issues/3962)
* **server:** Allow FxOS 1.x and Fennec < 25 to sign in/up (#3940) ([5b87852](https://github.com/mozilla/fxa-content-server/commit/5b87852))
* **server:** Ensure CSS for the TOS/PP agreements is served from the CDN. (#3981) r=vladikoff ([b4867ed](https://github.com/mozilla/fxa-content-server/commit/b4867ed)), closes [#3976](https://github.com/mozilla/fxa-content-server/issues/3976)
* **server:** Re-add the /.well-known/openid-configuration route ([7781973](https://github.com/mozilla/fxa-content-server/commit/7781973))
* **styles:** fix settings email header when display name set (#3930) ([65aef25](https://github.com/mozilla/fxa-content-server/commit/65aef25)), closes [(#3930](https://github.com/(/issues/3930)
* **teamcity:** fail fast if all servers are not up (#3936) r=vladikoff ([a2c9656](https://github.com/mozilla/fxa-content-server/commit/a2c9656))
* **teamcity:** server tests don't need selenium running (#3975) r=vladikoff ([86deba7](https://github.com/mozilla/fxa-content-server/commit/86deba7))

### chore

* **deps:** Bump request and universal-analytics dependencies (#3967) ([b271bce](https://github.com/mozilla/fxa-content-server/commit/b271bce))
* **dev:** add remote development script and docs (#3971) r=pdehaan,vbudhram ([d82f0a1](https://github.com/mozilla/fxa-content-server/commit/d82f0a1)), closes [#3951](https://github.com/mozilla/fxa-content-server/issues/3951)
* **openid:** Remove support for OpenID. ([8532c17](https://github.com/mozilla/fxa-content-server/commit/8532c17))
* **strings:** add location strings to strings.js (#3972) ([1e27f74](https://github.com/mozilla/fxa-content-server/commit/1e27f74))

### Features

* **build:** ES6 with babel (#3841) ([72f9051](https://github.com/mozilla/fxa-content-server/commit/72f9051))
* **client:** Always notify browser on password change. (#3913) ([56417ac](https://github.com/mozilla/fxa-content-server/commit/56417ac))
* **client:** Remove Account Lockout. (#3956) r=vladikoff ([4b8b867](https://github.com/mozilla/fxa-content-server/commit/4b8b867)), closes [#3949](https://github.com/mozilla/fxa-content-server/issues/3949)
* **client-config:** Add a /.well-known/fxa-client-configuration endpoint (#3919) ([cbd341a](https://github.com/mozilla/fxa-content-server/commit/cbd341a))
* **metrics:** Add a `<view_name>.back` event when the user clicks a back link ([9bd0c6c](https://github.com/mozilla/fxa-content-server/commit/9bd0c6c))
* **password:** make hints progressively useful (#3791) r=vladikoff ([e327d39](https://github.com/mozilla/fxa-content-server/commit/e327d39)), closes [#3731](https://github.com/mozilla/fxa-content-server/issues/3731)
* **server:** Update helmet to the newest version. (#3941) r=vladikoff ([3e3fdc8](https://github.com/mozilla/fxa-content-server/commit/3e3fdc8))
* **tests:** Add more functional tests for sign in unverified flow. (#3947) r=vladikoff,vbudh ([e7b7f24](https://github.com/mozilla/fxa-content-server/commit/e7b7f24))
* **tests:** Add signin confirmation tests for iOS, Fennec, WebChannel (#3937) ([0f8293f](https://github.com/mozilla/fxa-content-server/commit/0f8293f))

### Refactor

* **client:** remove campaign param support, switch to utm_campaign (#3915) ([e6d20a9](https://github.com/mozilla/fxa-content-server/commit/e6d20a9))
* **client:** remove state from the resume token (#3923) r=shane-tomlinson ([615c7aa](https://github.com/mozilla/fxa-content-server/commit/615c7aa))
* **jscs:** port jscs to eslint (#3946) r=vladikoff ([7606356](https://github.com/mozilla/fxa-content-server/commit/7606356)), closes [#3669](https://github.com/mozilla/fxa-content-server/issues/3669)
* **oauth:** remove support for privacy and terms uris (#3942) ([430716d](https://github.com/mozilla/fxa-content-server/commit/430716d))



<a name="0.65.0"></a>
# 0.65.0 (2016-07-12)


### Bug Fixes

* **client:**  remove sync suggestion from signin view (#3922) r=vladikoff ([311935c](https://github.com/mozilla/fxa-content-server/commit/311935c)), closes [#3903](https://github.com/mozilla/fxa-content-server/issues/3903)
* **client:** adjust fade in animation for the confirm view (#3909) r=vladikoff ([48a5d41](https://github.com/mozilla/fxa-content-server/commit/48a5d41)), closes [#3887](https://github.com/mozilla/fxa-content-server/issues/3887)
* **client:** Fix sign in from the firstrun flow. (#3889) ([82138ed](https://github.com/mozilla/fxa-content-server/commit/82138ed)), closes [(#3889](https://github.com/(/issues/3889)
* **client:** Fix the device view sort order. (#3906) r=vladikoff ([d993adb](https://github.com/mozilla/fxa-content-server/commit/d993adb)), closes [(#3906](https://github.com/(/issues/3906) [#3899](https://github.com/mozilla/fxa-content-server/issues/3899)
* **server:** Add `confirm_signin` to the list of front end routes. ([922e1d5](https://github.com/mozilla/fxa-content-server/commit/922e1d5))
* **settings:** cancel button resets values (#3837) r=vladikoff ([0ff2e35](https://github.com/mozilla/fxa-content-server/commit/0ff2e35)), closes [#3544](https://github.com/mozilla/fxa-content-server/issues/3544)
* **styles:** fix coppa page margins (#3847) r=ryanfeeley ([e0148b6](https://github.com/mozilla/fxa-content-server/commit/e0148b6)), closes [(#3847](https://github.com/(/issues/3847) [#3199](https://github.com/mozilla/fxa-content-server/issues/3199)
* **styles:** new spinner for disabled inputs (#3900) r=ryanfeeley ([6862641](https://github.com/mozilla/fxa-content-server/commit/6862641)), closes [#3882](https://github.com/mozilla/fxa-content-server/issues/3882)
* **tests:** Fix the Sync v3 settings WebChannel message checks. (#3912) ([b6a973c](https://github.com/mozilla/fxa-content-server/commit/b6a973c)), closes [(#3912](https://github.com/(/issues/3912)
* **tests:** fix WebDriver add-on compat check ([71dba91](https://github.com/mozilla/fxa-content-server/commit/71dba91))
* **tests:** no more post-verify email if service is blank ([f505295](https://github.com/mozilla/fxa-content-server/commit/f505295)), closes [#3879](https://github.com/mozilla/fxa-content-server/issues/3879)

### chore

* **deps:** Update fxa-js-client to 0.1.43 (#3885) r=vbudhram ([3a39024](https://github.com/mozilla/fxa-content-server/commit/3a39024))
* **nsp:** add issue 121 to pending fix ([32d57b4](https://github.com/mozilla/fxa-content-server/commit/32d57b4))
* **readme:** update readme with grunt sass watch (#3877) r=vladikoff ([3f52b0e](https://github.com/mozilla/fxa-content-server/commit/3f52b0e)), closes [#3876](https://github.com/mozilla/fxa-content-server/issues/3876)
* **sasslint:** fix sasslint warnings (#3874) r=vladikoff ([7d81e53](https://github.com/mozilla/fxa-content-server/commit/7d81e53)), closes [(#3874](https://github.com/(/issues/3874) [#3854](https://github.com/mozilla/fxa-content-server/issues/3854)

### Features

* **client:** Add a button to Open in Yahoo/HotMail/Outlook (#3872) r=vladikoff ([46cdc3b](https://github.com/mozilla/fxa-content-server/commit/46cdc3b)), closes [#3640](https://github.com/mozilla/fxa-content-server/issues/3640)
* **client:** Add fade in to 'Back' link on confirm view (#3894) r=vladikoff ([b6ddc02](https://github.com/mozilla/fxa-content-server/commit/b6ddc02))
* **client:** Reword and slowly fade in the resend account verification email link ([17b2cfe](https://github.com/mozilla/fxa-content-server/commit/17b2cfe)), closes [#2654](https://github.com/mozilla/fxa-content-server/issues/2654)
* **client:** users from login and registration to about:accounts (#3870) r=vladikoff ([6a59d8c](https://github.com/mozilla/fxa-content-server/commit/6a59d8c)), closes [#3421](https://github.com/mozilla/fxa-content-server/issues/3421)
* **metrics:** send reminder param to account verification (#3871) r=vbudhram ([c3c04f8](https://github.com/mozilla/fxa-content-server/commit/c3c04f8)), closes [#3864](https://github.com/mozilla/fxa-content-server/issues/3864)

### Refactor

* **errors:**  catch interpolation error (#3917) r=vladikoff ([5703853](https://github.com/mozilla/fxa-content-server/commit/5703853)), closes [#3846](https://github.com/mozilla/fxa-content-server/issues/3846)
* **settings:** Code migration from settings-mixin to settings.js (#3873) r=vladikoff ([cba214b](https://github.com/mozilla/fxa-content-server/commit/cba214b)), closes [#3091](https://github.com/mozilla/fxa-content-server/issues/3091)
* **signup:** remove exclude_signup support (#3883) ([a2ff648](https://github.com/mozilla/fxa-content-server/commit/a2ff648))
* **tests:** Refactor the change password tests to use helpers. (#3910) ([aa14f05](https://github.com/mozilla/fxa-content-server/commit/aa14f05))

### style

* **devices:** improve current device design (#3828) r=vladikoff,shane-tomlinson ([a88c1c8](https://github.com/mozilla/fxa-content-server/commit/a88c1c8))



<a name="0.64.0"></a>
# 0.64.0 (2016-06-22)


### Bug Fixes

* **client:** Filter unwanted fields in call to /recovery_email/status (#3839) ([317c9cf](https://github.com/mozilla/fxa-content-server/commit/317c9cf))
* **client:** force numeric input for age field on signup page (#3803) r=shane-tomlinson,vbudh ([0e96539](https://github.com/mozilla/fxa-content-server/commit/0e96539))
* **client:** Show a sensible error message if basket is unavailable. (#3867) r=vladikoff,jbuc ([9ca06dd](https://github.com/mozilla/fxa-content-server/commit/9ca06dd)), closes [#3866](https://github.com/mozilla/fxa-content-server/issues/3866)
* **confirm:** change resend email limit to first 4 attempts (#3816) r=vbudhram ([f02bf19](https://github.com/mozilla/fxa-content-server/commit/f02bf19)), closes [#3777](https://github.com/mozilla/fxa-content-server/issues/3777)
* **eslint:** update eslint-config-fxa version (#3853) r=vladikoff ([eab5cc6](https://github.com/mozilla/fxa-content-server/commit/eab5cc6)), closes [#3852](https://github.com/mozilla/fxa-content-server/issues/3852)
* **links:** adjust mobile app links (#3815) r=vbudhram ([58a837c](https://github.com/mozilla/fxa-content-server/commit/58a837c)), closes [#3692](https://github.com/mozilla/fxa-content-server/issues/3692)
* **metrics:** Remove the caching sha from urls in the sentry stacktrace (#3861) r=vladikoff ([242f24e](https://github.com/mozilla/fxa-content-server/commit/242f24e)), closes [#3829](https://github.com/mozilla/fxa-content-server/issues/3829)
* **mozlog:** update to 2.0.4 (#3826) r=vladikoff ([5b7d707](https://github.com/mozilla/fxa-content-server/commit/5b7d707))
* **nsp:** add advisory 117 to list of known issues ([3f1de6e](https://github.com/mozilla/fxa-content-server/commit/3f1de6e))
* **nsp:** add to ignore list ([49f42c6](https://github.com/mozilla/fxa-content-server/commit/49f42c6)), closes [#3857](https://github.com/mozilla/fxa-content-server/issues/3857)
* **nsp:** update packages to fix nsp warnings (#3849) r=vladikoff ([b4051af](https://github.com/mozilla/fxa-content-server/commit/b4051af)), closes [(#3849](https://github.com/(/issues/3849) [#3848](https://github.com/mozilla/fxa-content-server/issues/3848)
* **password:** Add missing unit tests (#3812) r=vladikoff,TDA ([23eebb7](https://github.com/mozilla/fxa-content-server/commit/23eebb7))
* **permissions:** remove line break on permissions page (#3834) r=vladikoff ([f78187a](https://github.com/mozilla/fxa-content-server/commit/f78187a)), closes [#3833](https://github.com/mozilla/fxa-content-server/issues/3833)
* **rtl:** rtl weird behavior with special characters (#3824) r=vladikoff ([21d2dfd](https://github.com/mozilla/fxa-content-server/commit/21d2dfd)), closes [#3811](https://github.com/mozilla/fxa-content-server/issues/3811)
* **spelling:** change stength to strength (#3819) r=vladikoff ([0abbdfd](https://github.com/mozilla/fxa-content-server/commit/0abbdfd)), closes [#3818](https://github.com/mozilla/fxa-content-server/issues/3818)
* **tests:** ensure no leftover firefox-bin are running (#3820) ([0f52dcb](https://github.com/mozilla/fxa-content-server/commit/0f52dcb))
* **tests:** ignore error from killall firefox-bin ([d14d7be](https://github.com/mozilla/fxa-content-server/commit/d14d7be))
* **tests:** show selenium version from /wd/hub/status at test start (#3804) ([cd02afd](https://github.com/mozilla/fxa-content-server/commit/cd02afd))

### chore

* **l10n:** Remove the placeholder strings for fxa-83 (#3856) r=vbudhram ([abe1496](https://github.com/mozilla/fxa-content-server/commit/abe1496))
* **marketing:** Use more specific text for the marketing opt-in. ([bb7a71f](https://github.com/mozilla/fxa-content-server/commit/bb7a71f))
* **tests:** Remove listenForWebChannelMessages calls from tests. (#3768) r=vladikoff ([c68e130](https://github.com/mozilla/fxa-content-server/commit/c68e130))
* **tests:** Update avatar.js to use functional helpers, remove listenForWebChannelMessages.  ([1385213](https://github.com/mozilla/fxa-content-server/commit/1385213))
* **tests:** useTeamCityReporter=true for intern_server tests (#3823) ([81f355e](https://github.com/mozilla/fxa-content-server/commit/81f355e))

### Features

* **client:** Signin confirmation (#3671) ([7c5aee4](https://github.com/mozilla/fxa-content-server/commit/7c5aee4))
* **experiment:** add show-password experiment (#3801) r=vbudhram ([03debc1](https://github.com/mozilla/fxa-content-server/commit/03debc1))
* **metrics:** add statsD/DataDog tag if user is part of experiment (#3836) ([bd7dec8](https://github.com/mozilla/fxa-content-server/commit/bd7dec8))
* **styles:** Add support for .woff2 (#3844) ([b204544](https://github.com/mozilla/fxa-content-server/commit/b204544))
* **tests:** Filter unwanted lines from the mocha stack trace. (#3813) r=vladikoff ([34fa5d7](https://github.com/mozilla/fxa-content-server/commit/34fa5d7))
* **verify:** Pass `service` param when verifying email address. (#3757) r=vbudhram ([2ea10df](https://github.com/mozilla/fxa-content-server/commit/2ea10df))

### Refactor

* **cocktail:** change _.extend to cocktail.mixin (#3830) ([25a1ad8](https://github.com/mozilla/fxa-content-server/commit/25a1ad8))
* **flowId:** optimize get-index route by adjusting flow-metrics ([263d859](https://github.com/mozilla/fxa-content-server/commit/263d859))
* **styles:** refactor sass variables (#3783) ([4c929a4](https://github.com/mozilla/fxa-content-server/commit/4c929a4))
* **tests:** Use a helper to get the `remote` reference. (#3808) ([f32761e](https://github.com/mozilla/fxa-content-server/commit/f32761e))

### style

* **colors:** restyle buttons, links and labels to conform to mozilla style guide (#3755) ([3925684](https://github.com/mozilla/fxa-content-server/commit/3925684))
* **devices:** make devices and buttons responsive (#3825) ([050cb73](https://github.com/mozilla/fxa-content-server/commit/050cb73))
* **gravatar:** left align label (#3842) ([8dfd207](https://github.com/mozilla/fxa-content-server/commit/8dfd207))
* **links:** stack side-by-side links (#3817) r=vladikoff ([8476364](https://github.com/mozilla/fxa-content-server/commit/8476364)), closes [#3798](https://github.com/mozilla/fxa-content-server/issues/3798)



<a name="0.63.0"></a>
# 0.63.0 (2016-06-01)


### Bug Fixes

* **checkbox:** make only text clickable (#3759) ([855bf39](https://github.com/mozilla/fxa-content-server/commit/855bf39))
* **checkbox:** update checkbox styles (#3793) ([bc040aa](https://github.com/mozilla/fxa-content-server/commit/bc040aa)), closes [#3691](https://github.com/mozilla/fxa-content-server/issues/3691)
* **client:** Interpolate error messages before sending to Sentry. (#3764) ([26266f6](https://github.com/mozilla/fxa-content-server/commit/26266f6))
* **client:** Password length warning (#3739) ([c049106](https://github.com/mozilla/fxa-content-server/commit/c049106))
* **force_auth:** make force_auth work in web context (#3725) ([13798e0](https://github.com/mozilla/fxa-content-server/commit/13798e0))
* **rtl:** adjust rtl css for email and password r=vladikoff,shane-tomlinson ([5aeac38](https://github.com/mozilla/fxa-content-server/commit/5aeac38))
* **styles:** Fix the click area of side by side links. (#3785) ([20b9a51](https://github.com/mozilla/fxa-content-server/commit/20b9a51)), closes [(#3785](https://github.com/(/issues/3785) [#3776](https://github.com/mozilla/fxa-content-server/issues/3776)
* **styles:** Fix the grunt sasslint errors (#3796) r=vladikoff ([7827dbc](https://github.com/mozilla/fxa-content-server/commit/7827dbc)), closes [(#3796](https://github.com/(/issues/3796)
* **tests:** fix firstrun webchannel tests ([f2ddcd7](https://github.com/mozilla/fxa-content-server/commit/f2ddcd7)), closes [#3790](https://github.com/mozilla/fxa-content-server/issues/3790)
* **tests:** fix sync_v3 tests for remote environments (#3780) ([6600006](https://github.com/mozilla/fxa-content-server/commit/6600006)), closes [(#3780](https://github.com/(/issues/3780) [#3772](https://github.com/mozilla/fxa-content-server/issues/3772)
* **tests:** Fix the functional tests that listen for WebChannel messages. (#3752) ([a946f2f](https://github.com/mozilla/fxa-content-server/commit/a946f2f)), closes [(#3752](https://github.com/(/issues/3752) [#3750](https://github.com/mozilla/fxa-content-server/issues/3750)
* **tests:** improve stability of firstrun tests (#3794) ([9d267ab](https://github.com/mozilla/fxa-content-server/commit/9d267ab))

### chore

* **deps:** Update fxa-js-client to 0.1.39 (#3787) r=vladikoff ([5ceea48](https://github.com/mozilla/fxa-content-server/commit/5ceea48))
* **markdown:** port marked to remarkable (#3746) r=pdehaan,vladikoff ([ba542f7](https://github.com/mozilla/fxa-content-server/commit/ba542f7)), closes [#3728](https://github.com/mozilla/fxa-content-server/issues/3728)
* **npm:** update shrinkwrap (#3771) ([f7dccbb](https://github.com/mozilla/fxa-content-server/commit/f7dccbb))
* **nsp:** Exclude moment CVE from nsp checks (#3756) ([02adab5](https://github.com/mozilla/fxa-content-server/commit/02adab5))

### Features

* **client:** Handle the upcoming /complete_signin route. ([bde60b4](https://github.com/mozilla/fxa-content-server/commit/bde60b4))
* **client:** Stop passing 400 page error messages via query parameters. (#3715) r=vladikoff ([2cad043](https://github.com/mozilla/fxa-content-server/commit/2cad043))
* **metrics:** Generate flowId on the server (#3736) ([48919e1](https://github.com/mozilla/fxa-content-server/commit/48919e1))
* **robots:** adjust robots config to use "noindex" everywhere. (#3604) ([f6ed899](https://github.com/mozilla/fxa-content-server/commit/f6ed899))
* **tests:** Add a functional test for re-verifying an account. (#3781) ([b2ef9c1](https://github.com/mozilla/fxa-content-server/commit/b2ef9c1))

### Refactor

* **client:** Prepare for pw change/reset endpoints to return session data. (#3747) ([8d4b359](https://github.com/mozilla/fxa-content-server/commit/8d4b359))
* **tests:** Refactor many functional tests to use helper methods. (#3751) ([09585b4](https://github.com/mozilla/fxa-content-server/commit/09585b4))



<a name="0.62.0"></a>
# 0.62.0 (2016-05-18)


### Bug Fixes

* **base64url:** Trim padding per RFC 7515. (#3713) r=vladikoff,rfk ([585520d](https://github.com/mozilla/fxa-content-server/commit/585520d))
* **client:** handle async invalid token on signin (#3681) r=shane-tomlinson ([e484bd4](https://github.com/mozilla/fxa-content-server/commit/e484bd4))
* **server:** add extra body check for report error (#3709) ([c65cbcd](https://github.com/mozilla/fxa-content-server/commit/c65cbcd)), closes [#3708](https://github.com/mozilla/fxa-content-server/issues/3708)
* **server:** add extra body check for report error (#3709) ([f10868d](https://github.com/mozilla/fxa-content-server/commit/f10868d)), closes [#3708](https://github.com/mozilla/fxa-content-server/issues/3708)
* **style:** Autofocus on submit button and added tabindex (#3703) ([322902c](https://github.com/mozilla/fxa-content-server/commit/322902c))
* **styles:** change focused fields color scheme (#3727) ([fdae81a](https://github.com/mozilla/fxa-content-server/commit/fdae81a))
* **styles:** increase bottom margin for old password field (#3724) ([eac3bee](https://github.com/mozilla/fxa-content-server/commit/eac3bee))
* **styles:** replace clear sans with fira sans (#3685) r=shane-tomlinson,ryanfeeley ([4798131](https://github.com/mozilla/fxa-content-server/commit/4798131))
* **teamcity:** use optional TeamCity reporter (#3749) r=vladikoff ([abc2e0b](https://github.com/mozilla/fxa-content-server/commit/abc2e0b))
* **tests:** add missing test runner dependency: helmet (#3723) r=vladikoff ([0e92554](https://github.com/mozilla/fxa-content-server/commit/0e92554))
* **tests:** adjust oauth 123done tests for logout (#3722) r=vbudhram ([e6bd768](https://github.com/mozilla/fxa-content-server/commit/e6bd768)), closes [#3721](https://github.com/mozilla/fxa-content-server/issues/3721)
* **tests:** Fix the failing functional test. (#3706) r=vladikoff ([2b6f3d7](https://github.com/mozilla/fxa-content-server/commit/2b6f3d7)), closes [(#3706](https://github.com/(/issues/3706)
* **tests:** Fix the failing functional test. (#3706) r=vladikoff ([8747e0d](https://github.com/mozilla/fxa-content-server/commit/8747e0d)), closes [(#3706](https://github.com/(/issues/3706)
* **tests:** some functional tests are not cross-dependent anymore (#3719) r=vladikoff,shane- ([f4fd9cf](https://github.com/mozilla/fxa-content-server/commit/f4fd9cf)), closes [#3716](https://github.com/mozilla/fxa-content-server/issues/3716)
* **tests:** speed up the relier unit tests (#3717) ([8bb3edf](https://github.com/mozilla/fxa-content-server/commit/8bb3edf))
* **tests:** use sessionstorage for testing webchannel messages (#3741) r=shane-tomlinson ([b750cd5](https://github.com/mozilla/fxa-content-server/commit/b750cd5))

### chore

* **cleanup:** cleanup gitignore (#3734) ([297e00a](https://github.com/mozilla/fxa-content-server/commit/297e00a)), closes [#3733](https://github.com/mozilla/fxa-content-server/issues/3733)
* **docs:** update npm version in README ([5c62196](https://github.com/mozilla/fxa-content-server/commit/5c62196))
* **sass-lint:** add sass linting (#3732) r=vladikoff,pdehaan ([c4d2def](https://github.com/mozilla/fxa-content-server/commit/c4d2def))

### Features

* **client:** Fully validate `email` and `uid` in the relier. (#3711) ([298be44](https://github.com/mozilla/fxa-content-server/commit/298be44))
* **client:** pass metrics context metadata to the back end (#3702) r=vladikoff ([2ebc49a](https://github.com/mozilla/fxa-content-server/commit/2ebc49a))
* **errors:** Add messaging for new "request blocked" errno 125. (#3735) ([aae3c5c](https://github.com/mozilla/fxa-content-server/commit/aae3c5c))
* **locale:** add Arabic locale support (#3726) r=vbudhram ([4450796](https://github.com/mozilla/fxa-content-server/commit/4450796))
* **locale:** enable Finnish locale (#3738) r=vbudhram ([0ef9621](https://github.com/mozilla/fxa-content-server/commit/0ef9621)), closes [#3737](https://github.com/mozilla/fxa-content-server/issues/3737)



<a name="0.61.1"></a>
## 0.61.1 (2016-05-09)


### Bug Fixes

* **server:** add extra body check for report error (#3709) ([f10868d](https://github.com/mozilla/fxa-content-server/commit/f10868d)), closes [#3708](https://github.com/mozilla/fxa-content-server/issues/3708)
* **tests:** Fix the failing functional test. (#3706) r=vladikoff ([2b6f3d7](https://github.com/mozilla/fxa-content-server/commit/2b6f3d7)), closes [(#3706](https://github.com/(/issues/3706)



<a name="0.61.0"></a>
# 0.61.0 (2016-05-03)


### Bug Fixes

* **channels:** fix iframe message parsing ([a7c7ca2](https://github.com/mozilla/fxa-content-server/commit/a7c7ca2)), closes [#3602](https://github.com/mozilla/fxa-content-server/issues/3602)
* **client:** update to fxa-js-client 0.1.37 (#3690) ([d9ab90c](https://github.com/mozilla/fxa-content-server/commit/d9ab90c))
* **metrics:** Scrub PII from CSP reports ([1549c87](https://github.com/mozilla/fxa-content-server/commit/1549c87)), closes [#3689](https://github.com/mozilla/fxa-content-server/issues/3689)
* **signup:** Update button text on signup and CWTS pages. ([203f905](https://github.com/mozilla/fxa-content-server/commit/203f905)), closes [#3623](https://github.com/mozilla/fxa-content-server/issues/3623)
* **views:** do not show session expired warnings in views (#3700) r=vbudhram ([6103a64](https://github.com/mozilla/fxa-content-server/commit/6103a64)), closes [#3222](https://github.com/mozilla/fxa-content-server/issues/3222)

### chore

* **docs:** update comment ([49a4477](https://github.com/mozilla/fxa-content-server/commit/49a4477))
* **docs:** update README with new Selenium versions (#3701) ([cf9de81](https://github.com/mozilla/fxa-content-server/commit/cf9de81))
* **nsp:** Add .nsprc config file to ignore NSP warnings ([db49863](https://github.com/mozilla/fxa-content-server/commit/db49863))
* **tests:** Sort the front end unit tests alphabetically. ([2d7ffc9](https://github.com/mozilla/fxa-content-server/commit/2d7ffc9))
* **travis:** drop node 0.12 support ([6af6274](https://github.com/mozilla/fxa-content-server/commit/6af6274))

### Features

* **client:** implement resume token validation (#3682) ([148f42a](https://github.com/mozilla/fxa-content-server/commit/148f42a))
* **client:** Remove synchronization of unmasking on change password fields ([cd782c3](https://github.com/mozilla/fxa-content-server/commit/cd782c3))
* **metrics:** emit flow.begin event from metrics endpoint (#3683) ([8942991](https://github.com/mozilla/fxa-content-server/commit/8942991))
* **metrics:** update to support Sentry 8 and new raven.js (#3695) r=shane-tomlinson ([e302894](https://github.com/mozilla/fxa-content-server/commit/e302894)), closes [#3599](https://github.com/mozilla/fxa-content-server/issues/3599)
* **server:** Enable CSP! (#3627) ([bc714b0](https://github.com/mozilla/fxa-content-server/commit/bc714b0))

### Refactor

* **client:** move fxaClient access out of view (#3696) ([dc579de](https://github.com/mozilla/fxa-content-server/commit/dc579de))
* **csp-reports:** Updates based on @vladikoff's feedback ([864deb5](https://github.com/mozilla/fxa-content-server/commit/864deb5))



<a name="0.60.0"></a>
# 0.60.0 (2016-04-19)


### Bug Fixes

* **client:** Clear `resetPasswordConfirm` flag after successful reset. ([b72c27c](https://github.com/mozilla/fxa-content-server/commit/b72c27c))
* **client:** Do not skip "reset password" screen in force_auth. ([b22eeb4](https://github.com/mozilla/fxa-content-server/commit/b22eeb4)), closes [#3477](https://github.com/mozilla/fxa-content-server/issues/3477)
* **client:** Reduce the number of `parseMessage` errors. ([37e8f04](https://github.com/mozilla/fxa-content-server/commit/37e8f04)), closes [#3594](https://github.com/mozilla/fxa-content-server/issues/3594)
* **client:** Remove support for Iframed OAuth flows. ([5d19757](https://github.com/mozilla/fxa-content-server/commit/5d19757)), closes [#3628](https://github.com/mozilla/fxa-content-server/issues/3628)
* **client:** Sign out messages disappear when user starts typing ([198070e](https://github.com/mozilla/fxa-content-server/commit/198070e))
* **client:** isPasswordAutocompleteDisabled removed ([7fb7dae](https://github.com/mozilla/fxa-content-server/commit/7fb7dae))
* **deps:** update most prod deps ([a5ae334](https://github.com/mozilla/fxa-content-server/commit/a5ae334))
* **deps:** update node-uap version ([b43ecdd](https://github.com/mozilla/fxa-content-server/commit/b43ecdd))
* **deps:** update to bluebird 3 promises ([b5f5f17](https://github.com/mozilla/fxa-content-server/commit/b5f5f17))
* **strings:** fix device string ([c4a85c8](https://github.com/mozilla/fxa-content-server/commit/c4a85c8))
* **tests:** Fix the failure on addEventListener. ([371f091](https://github.com/mozilla/fxa-content-server/commit/371f091)), closes [#3408](https://github.com/mozilla/fxa-content-server/issues/3408)
* **tests:** adjust checkbox test to click on labels properly ([fd3c658](https://github.com/mozilla/fxa-content-server/commit/fd3c658)), closes [#3618](https://github.com/mozilla/fxa-content-server/issues/3618)
* **tests:** update device tests to wait for device delete request ([84a34df](https://github.com/mozilla/fxa-content-server/commit/84a34df)), closes [#3405](https://github.com/mozilla/fxa-content-server/issues/3405)

### Features

* **client:** Show a startup spinner on startup ([e8f3252](https://github.com/mozilla/fxa-content-server/commit/e8f3252)), closes [#2980](https://github.com/mozilla/fxa-content-server/issues/2980)
* **client:** Smooth out the "reset_password_confirm=false" flow. ([17e27c1](https://github.com/mozilla/fxa-content-server/commit/17e27c1))
* **client:** Strict validation of email and uid on force_auth ([f666c8b](https://github.com/mozilla/fxa-content-server/commit/f666c8b)), closes [#3040](https://github.com/mozilla/fxa-content-server/issues/3040)
* **reset:** add reset_password_confirm parameter to allow auto submit ([59bfb5f](https://github.com/mozilla/fxa-content-server/commit/59bfb5f))
* **signin:** handle new account must reset error (126) ([b2908af](https://github.com/mozilla/fxa-content-server/commit/b2908af))

### Refactor

* **client:** Convert durations into duration-js ([8795b14](https://github.com/mozilla/fxa-content-server/commit/8795b14)), closes [#1657](https://github.com/mozilla/fxa-content-server/issues/1657)
* **client:** Extract account reset logic into a mixin to be shared. ([7bc28f6](https://github.com/mozilla/fxa-content-server/commit/7bc28f6))
* **client:** Extract open-gmail logic into a mixin to be shared. ([007d470](https://github.com/mozilla/fxa-content-server/commit/007d470))
* **client:** In siginin, rename `.prefill` to `.prefillEmail`. ([489a80f](https://github.com/mozilla/fxa-content-server/commit/489a80f))
* **client:** Move error reporting from app-start a shared module. ([ea12cc5](https://github.com/mozilla/fxa-content-server/commit/ea12cc5))
* **logging:** Add error module ([13858f3](https://github.com/mozilla/fxa-content-server/commit/13858f3))

### chore

* **ci:** add circleci scripts into tests ([235e20d](https://github.com/mozilla/fxa-content-server/commit/235e20d))
* **client:** Add the strings needed for the email reconfirmation feature. ([efb639f](https://github.com/mozilla/fxa-content-server/commit/efb639f))
* **client:** Alphabetize a couple of out of order dependencies. ([39dd282](https://github.com/mozilla/fxa-content-server/commit/39dd282))
* **deps:** update devDeps ([b7a2862](https://github.com/mozilla/fxa-content-server/commit/b7a2862))
* **deps:** update to Intern 3.1.1 ([aa14ce6](https://github.com/mozilla/fxa-content-server/commit/aa14ce6))



<a name="0.59.0"></a>
# 0.59.0 (2016-03-21)


### Bug Fixes

* **confirm:** do not show errors during confirmation polling ([944fc5e](https://github.com/mozilla/fxa-content-server/commit/944fc5e)), closes [#2638](https://github.com/mozilla/fxa-content-server/issues/2638)
* **metrics:** limit Sentry stack frames ([293ab07](https://github.com/mozilla/fxa-content-server/commit/293ab07)), closes [#3167](https://github.com/mozilla/fxa-content-server/issues/3167)
* **tests:** server tests now require bluebird and lodash ([39461dd](https://github.com/mozilla/fxa-content-server/commit/39461dd))

### chore

* **docs:** add a link to prod content server ([659bd3c](https://github.com/mozilla/fxa-content-server/commit/659bd3c))
* **docs:** Document helper functions added in #3595 ([2255991](https://github.com/mozilla/fxa-content-server/commit/2255991))
* **tests:** Add a missing unit test for views/confirm.js ([5ac2347](https://github.com/mozilla/fxa-content-server/commit/5ac2347))
* **travis:** unlock node.js versions ([0cf6289](https://github.com/mozilla/fxa-content-server/commit/0cf6289)), closes [#3586](https://github.com/mozilla/fxa-content-server/issues/3586)

### Features

* **client:** Better handling of deleted accounts on /force_auth ([485433f](https://github.com/mozilla/fxa-content-server/commit/485433f)), closes [#3057](https://github.com/mozilla/fxa-content-server/issues/3057) [#3283](https://github.com/mozilla/fxa-content-server/issues/3283)
* **client:** joi like validation of query parameters ([d9e18ea](https://github.com/mozilla/fxa-content-server/commit/d9e18ea))
* **referer:** Only send origin in referer header, not whole URL. ([f12b67b](https://github.com/mozilla/fxa-content-server/commit/f12b67b))
* **server:** emit the new flow.begin activity event ([5b74706](https://github.com/mozilla/fxa-content-server/commit/5b74706))

### Refactor

* **tests:** Overhaul the force_auth tests. ([89de5cd](https://github.com/mozilla/fxa-content-server/commit/89de5cd))

### Reverts

* **server:** remove server-generated flowId and flow.begin event ([83f0503](https://github.com/mozilla/fxa-content-server/commit/83f0503))



<a name="0.58.1"></a>
## 0.58.1 (2016-03-09)


### Bug Fixes

* **build:** Fix `grunt build` exception if server template open in vim ([d6c9661](https://github.com/mozilla/fxa-content-server/commit/d6c9661)), closes [#3581](https://github.com/mozilla/fxa-content-server/issues/3581)
* **client:** Only normalize scopes for trusted reliers when prompting for consent. ([8aa23fe](https://github.com/mozilla/fxa-content-server/commit/8aa23fe))
* **server:** Ensure the 400 page prints error messages in production. ([1279cff](https://github.com/mozilla/fxa-content-server/commit/1279cff)), closes [#2070](https://github.com/mozilla/fxa-content-server/issues/2070) [#3572](https://github.com/mozilla/fxa-content-server/issues/3572)
* **tests:** add htmlparser2 dependency to teamcity/run-server.sh ([26d33af](https://github.com/mozilla/fxa-content-server/commit/26d33af))

### chore

* **tests:** Functional test for trusted relier that prompts for consent ([c89ceb1](https://github.com/mozilla/fxa-content-server/commit/c89ceb1))

### Refactor

* **client:** Simplify url.js->searchParams ([ed3c190](https://github.com/mozilla/fxa-content-server/commit/ed3c190))



<a name="0.58.0"></a>
# 0.58.0 (2016-03-08)


### Bug Fixes

* **build:** copy error pages into dist, not app ([118e2c8](https://github.com/mozilla/fxa-content-server/commit/118e2c8))
* **client:** forbid single-part domains in email addresses ([4c42f47](https://github.com/mozilla/fxa-content-server/commit/4c42f47))
* **client:** Handle old accounts that contain `accountData` ([479b7dd](https://github.com/mozilla/fxa-content-server/commit/479b7dd)), closes [#3466](https://github.com/mozilla/fxa-content-server/issues/3466)
* **client:** Only send login notices to Fx if all data is available. ([53fe05f](https://github.com/mozilla/fxa-content-server/commit/53fe05f)), closes [#3514](https://github.com/mozilla/fxa-content-server/issues/3514)
* **server:** Allow the /signin, /signup, /reset_pasword to be framed ([f513fb2](https://github.com/mozilla/fxa-content-server/commit/f513fb2)), closes [#3518](https://github.com/mozilla/fxa-content-server/issues/3518)
* **test:** Ensure `addEventListener` exists before invoking. ([918cf7b](https://github.com/mozilla/fxa-content-server/commit/918cf7b)), closes [#3408](https://github.com/mozilla/fxa-content-server/issues/3408)
* **tests:** allow setting fxaDevBox with teamcity run-server.sh ([62b8b58](https://github.com/mozilla/fxa-content-server/commit/62b8b58))
* **tests:** don't quote commit value (might have leading spaces) ([d25225b](https://github.com/mozilla/fxa-content-server/commit/d25225b))
* **tests:** Fix test timeout with selenium 51 ([9021c28](https://github.com/mozilla/fxa-content-server/commit/9021c28))
* **tests:** handle OUT: garbage from jsawk ([6b268ea](https://github.com/mozilla/fxa-content-server/commit/6b268ea))
* **tests:** update modules to match package.json, and jsawk fix ([d36f285](https://github.com/mozilla/fxa-content-server/commit/d36f285))
* **tests:** update teamcity server test driver ([902195c](https://github.com/mozilla/fxa-content-server/commit/902195c))
* **validation:** Add validation to optional params in models and reliers ([46cc1ad](https://github.com/mozilla/fxa-content-server/commit/46cc1ad)), closes [#2025](https://github.com/mozilla/fxa-content-server/issues/2025) [#3490](https://github.com/mozilla/fxa-content-server/issues/3490) [#3452](https://github.com/mozilla/fxa-content-server/issues/3452)

### chore

* **client:** Update fxa-js-client to 0.1.34 ([fdd9f4e](https://github.com/mozilla/fxa-content-server/commit/fdd9f4e))
* **git:** Remove built app based error pages from .gitignore ([ebf464c](https://github.com/mozilla/fxa-content-server/commit/ebf464c))
* **strings:** Add strings needed for update password reset flow ([fb5087c](https://github.com/mozilla/fxa-content-server/commit/fb5087c))
* **tests:** latest4 is also an fxa-dev box ([8b57f1e](https://github.com/mozilla/fxa-content-server/commit/8b57f1e))
* **tests:** Pre-merge cleanup of tests and HTML. ([5844134](https://github.com/mozilla/fxa-content-server/commit/5844134))
* **tests:** Remove hard coded client_id from `oauth choose redirect` tests. ([5064b69](https://github.com/mozilla/fxa-content-server/commit/5064b69))

### Features

* **amo:** Signin/Signup based on email query param with existing account ([d30d508](https://github.com/mozilla/fxa-content-server/commit/d30d508))
* **build:** Prepare to serve static content from a CDN. ([93209b2](https://github.com/mozilla/fxa-content-server/commit/93209b2)), closes [#3447](https://github.com/mozilla/fxa-content-server/issues/3447) [#3462](https://github.com/mozilla/fxa-content-server/issues/3462) [#3463](https://github.com/mozilla/fxa-content-server/issues/3463)
* **client:** Add a mixin to handle updating external URLs on Fx for iOS ([f2f7fc1](https://github.com/mozilla/fxa-content-server/commit/f2f7fc1))
* **server:** add hard crash maintenance mode template ([b168cf2](https://github.com/mozilla/fxa-content-server/commit/b168cf2)), closes [#3103](https://github.com/mozilla/fxa-content-server/issues/3103)
* **styles:** Updated password reset flow ([822ab77](https://github.com/mozilla/fxa-content-server/commit/822ab77))



<a name="0.57.0"></a>
# 0.57.0 (2016-02-23)


### Bug Fixes

* **client:** Do not show the easter egg if in an iframe. ([b59e4fe](https://github.com/mozilla/fxa-content-server/commit/b59e4fe)), closes [#3483](https://github.com/mozilla/fxa-content-server/issues/3483)
* **client:** Fix error message behavior post-screen transition. ([7da39a8](https://github.com/mozilla/fxa-content-server/commit/7da39a8)), closes [#3503](https://github.com/mozilla/fxa-content-server/issues/3503)
* **client:** Fix password reset in e10s. ([2211306](https://github.com/mozilla/fxa-content-server/commit/2211306))
* **client:** Fix show/hide password toggle on force_auth ([6033838](https://github.com/mozilla/fxa-content-server/commit/6033838)), closes [#3532](https://github.com/mozilla/fxa-content-server/issues/3532)
* **client:** Fix uploading an avatar from file ([0d87a98](https://github.com/mozilla/fxa-content-server/commit/0d87a98)), closes [#3519](https://github.com/mozilla/fxa-content-server/issues/3519)
* **client:** Focus the display name field when opening the panel. ([21634ba](https://github.com/mozilla/fxa-content-server/commit/21634ba)), closes [#3517](https://github.com/mozilla/fxa-content-server/issues/3517)
* **cwts:** show all sync engine options to all clients ([98d1059](https://github.com/mozilla/fxa-content-server/commit/98d1059)), closes [#3494](https://github.com/mozilla/fxa-content-server/issues/3494)
* **devices:** remove plural strings from connected date ([02d493b](https://github.com/mozilla/fxa-content-server/commit/02d493b)), closes [#3510](https://github.com/mozilla/fxa-content-server/issues/3510)
* **metrics:** Report Windows 10 metrics reporting. ([045ad50](https://github.com/mozilla/fxa-content-server/commit/045ad50)), closes [#3445](https://github.com/mozilla/fxa-content-server/issues/3445)
* **style:** Cleanup sync options styling ([6d8cd85](https://github.com/mozilla/fxa-content-server/commit/6d8cd85))
* **teamcity:** record content,oauth,profile,auth __version__ (latest4) ([3190cb0](https://github.com/mozilla/fxa-content-server/commit/3190cb0))
* **tests:** adjust case sensitive tests for sync v2 ([82946a2](https://github.com/mozilla/fxa-content-server/commit/82946a2))

### chore

* **client:** Add the strings for PR #3426 ([bc80f3a](https://github.com/mozilla/fxa-content-server/commit/bc80f3a))
* **client:** signin from signup final touches ([7ef7ae9](https://github.com/mozilla/fxa-content-server/commit/7ef7ae9))
* **install:** Sort the dependencies in package.json ([3c0d651](https://github.com/mozilla/fxa-content-server/commit/3c0d651))

### Features

* **build:** Add SRI `integrity` attributes to static resources. ([4b23a90](https://github.com/mozilla/fxa-content-server/commit/4b23a90)), closes [#3449](https://github.com/mozilla/fxa-content-server/issues/3449)
* **client:** Add support for `prompt=consent` for OAuth reliers. ([041b9fa](https://github.com/mozilla/fxa-content-server/commit/041b9fa)), closes [#3505](https://github.com/mozilla/fxa-content-server/issues/3505)
* **client:** allow users to sign in from sign-up view ([b513701](https://github.com/mozilla/fxa-content-server/commit/b513701))
* **client:** Expand the permissions screen. ([851446a](https://github.com/mozilla/fxa-content-server/commit/851446a)), closes [#2477](https://github.com/mozilla/fxa-content-server/issues/2477)
* **cwts:** enable choose what to sync in fx-firstrun-v2 and refactor other cwts auth_broker ([c5d28cc](https://github.com/mozilla/fxa-content-server/commit/c5d28cc)), closes [#3365](https://github.com/mozilla/fxa-content-server/issues/3365)
* **sass:** add hover and active states for avatar upload dialog buttons ([fca16ac](https://github.com/mozilla/fxa-content-server/commit/fca16ac))

### Refactor

* **test:** Image uploader functional tests upload images. ([859b7c0](https://github.com/mozilla/fxa-content-server/commit/859b7c0))



<a name="0.56.0"></a>
# 0.56.0 (2016-02-10)


### Bug Fixes

* **client:** Do not sign out of Sync when visiting /force_auth ([f96672c](https://github.com/mozilla/fxa-content-server/commit/f96672c)), closes [#3431](https://github.com/mozilla/fxa-content-server/issues/3431)
* **client:** Ensure status messages are shown on the signup page. ([dfeb53b](https://github.com/mozilla/fxa-content-server/commit/dfeb53b))
* **client:** Ignore postMessages from `chrome://browser` ([7010bbd](https://github.com/mozilla/fxa-content-server/commit/7010bbd))
* **client:** No more redirect to `signin_complete` w/ fx_desktop_v2 ([723da2b](https://github.com/mozilla/fxa-content-server/commit/723da2b)), closes [#3330](https://github.com/mozilla/fxa-content-server/issues/3330) [#3353](https://github.com/mozilla/fxa-content-server/issues/3353)
* **client:** Update the `_redirectTo` stragglers, add tests. ([da5fbfe](https://github.com/mozilla/fxa-content-server/commit/da5fbfe))
* **confirm:** fix openGmail button visibility ([aa122cb](https://github.com/mozilla/fxa-content-server/commit/aa122cb)), closes [#3487](https://github.com/mozilla/fxa-content-server/issues/3487)
* **experiments:** update to train-55 experiments ([01459b6](https://github.com/mozilla/fxa-content-server/commit/01459b6))
* **metrics:** Filter obviously invalid StatsD timings ([cdeac93](https://github.com/mozilla/fxa-content-server/commit/cdeac93))
* **metrics:** Send an error's context as a Sentry report tag. ([8bdfd57](https://github.com/mozilla/fxa-content-server/commit/8bdfd57)), closes [#3470](https://github.com/mozilla/fxa-content-server/issues/3470)
* **spelling:** fix a few typos ([8394a57](https://github.com/mozilla/fxa-content-server/commit/8394a57))
* **teamcity:** record content,oauth,profile,auth __version__ ([f2672a0](https://github.com/mozilla/fxa-content-server/commit/f2672a0))
* **test:** Fix the `attempt to use webcam for avatar` functional test. ([18b0c6d](https://github.com/mozilla/fxa-content-server/commit/18b0c6d)), closes [#3455](https://github.com/mozilla/fxa-content-server/issues/3455)
* **travis:** lock node versions until new versions are supported ([ad92350](https://github.com/mozilla/fxa-content-server/commit/ad92350))

### chore

* **client:** Add a unit test for sign_up.js->onAmoSignIn ([d1364e2](https://github.com/mozilla/fxa-content-server/commit/d1364e2))
* **client:** Add the AMO migration string to strings.js ([2f8c721](https://github.com/mozilla/fxa-content-server/commit/2f8c721))
* **client:** Remove `submit` from ForceAuthView. ([d221aed](https://github.com/mozilla/fxa-content-server/commit/d221aed)), closes [#3438](https://github.com/mozilla/fxa-content-server/issues/3438)
* **client:** Remove the extra mixins from the ForceAuthView. ([6316053](https://github.com/mozilla/fxa-content-server/commit/6316053)), closes [#3437](https://github.com/mozilla/fxa-content-server/issues/3437)
* **docs:** Add `migration` possible values documentation. ([8d0e17a](https://github.com/mozilla/fxa-content-server/commit/8d0e17a))

### Features

* **client:** Enable "Sync Preferences" from the firstrun flow. ([539ed50](https://github.com/mozilla/fxa-content-server/commit/539ed50)), closes [#3417](https://github.com/mozilla/fxa-content-server/issues/3417)
* **confirm:** promote "open gmail" to a feature ([833358d](https://github.com/mozilla/fxa-content-server/commit/833358d)), closes [#3368](https://github.com/mozilla/fxa-content-server/issues/3368)
* **migration:** Updated to support AMO migration through the migration query param ([949f717](https://github.com/mozilla/fxa-content-server/commit/949f717))
* **sass:** use custom SVGs for avatar upload buttons ([21c2821](https://github.com/mozilla/fxa-content-server/commit/21c2821))

### Refactor

* **client:** Extract `accountKeys`, `relierKeys` to the Account model. ([3fdef3f](https://github.com/mozilla/fxa-content-server/commit/3fdef3f))
* **relier:** remove isFxDesktop(), it is not used ([888dd3f](https://github.com/mozilla/fxa-content-server/commit/888dd3f))



<a name="0.55.0"></a>
# 0.55.0 (2016-01-26)


### Bug Fixes

* **client:** enforce validation of notifier event data ([7002c76](https://github.com/mozilla/fxa-content-server/commit/7002c76))
* **client:** Fix the browser back button in the firstrun flow. ([6c306e0](https://github.com/mozilla/fxa-content-server/commit/6c306e0)), closes [#3296](https://github.com/mozilla/fxa-content-server/issues/3296)
* **client:** tolerate missing _formPrefill in signed-out-notification-mixin ([cf2c6c7](https://github.com/mozilla/fxa-content-server/commit/cf2c6c7))
* **config:** switch to readable config values ([d9326cc](https://github.com/mozilla/fxa-content-server/commit/d9326cc)), closes [#2874](https://github.com/mozilla/fxa-content-server/issues/2874)
* **devices:** format connected date ([20eb09a](https://github.com/mozilla/fxa-content-server/commit/20eb09a)), closes [#3377](https://github.com/mozilla/fxa-content-server/issues/3377)
* **metrics:** Reduce the number of localStorage errors in Sentry. ([aedb762](https://github.com/mozilla/fxa-content-server/commit/aedb762))
* **sentry:** adjust cache busting files for Sentry ([2a85d0a](https://github.com/mozilla/fxa-content-server/commit/2a85d0a)), closes [#3420](https://github.com/mozilla/fxa-content-server/issues/3420) [#3363](https://github.com/mozilla/fxa-content-server/issues/3363)
* **template:** update cookies required message to include local storage ([59672c5](https://github.com/mozilla/fxa-content-server/commit/59672c5)), closes [#3129](https://github.com/mozilla/fxa-content-server/issues/3129)
* **test:** Fix the 'sign in with a second sign-in tab open' test. ([8fd9ef5](https://github.com/mozilla/fxa-content-server/commit/8fd9ef5)), closes [#3380](https://github.com/mozilla/fxa-content-server/issues/3380)

### chore

* **client:** Remove the unused ConfigLoader dep from cookies disabled. ([5c33eb8](https://github.com/mozilla/fxa-content-server/commit/5c33eb8))
* **deps:** update to latest fxa changelog ([675a95e](https://github.com/mozilla/fxa-content-server/commit/675a95e))
* **docs:** update node version ([5a500c5](https://github.com/mozilla/fxa-content-server/commit/5a500c5))
* **docs:** update servers and selenium version ([bf92684](https://github.com/mozilla/fxa-content-server/commit/bf92684))

### docs

* **contributing:** Mention git commit guidelines ([7f3cfcd](https://github.com/mozilla/fxa-content-server/commit/7f3cfcd))

### Features

* **client:** Log localStorage errors on startup. ([49aedc8](https://github.com/mozilla/fxa-content-server/commit/49aedc8))
* **client:** Report email opt-in status to firstrun page. ([cd7fa8b](https://github.com/mozilla/fxa-content-server/commit/cd7fa8b)), closes [#3411](https://github.com/mozilla/fxa-content-server/issues/3411)
* **client:** Support the newest navigator.mediaDevices API for fetching avatars ([3913f55](https://github.com/mozilla/fxa-content-server/commit/3913f55))
* **docker:** Additional Dockerfile for self-hosting ([2db851c](https://github.com/mozilla/fxa-content-server/commit/2db851c))
* **metric:** Add metric to track when user successfully changes their password ([14c3344](https://github.com/mozilla/fxa-content-server/commit/14c3344))
* **sass:** Show a spinner while loading a ProfileImage. ([f360c9c](https://github.com/mozilla/fxa-content-server/commit/f360c9c))

### Refactor

* **client:** Better Account field sandboxing ([d432199](https://github.com/mozilla/fxa-content-server/commit/d432199))
* **client:** Further data sandboxing ([afe52ee](https://github.com/mozilla/fxa-content-server/commit/afe52ee))
* **client:** Simplify the _isEmailFirefoxDomain function. ([ea29e57](https://github.com/mozilla/fxa-content-server/commit/ea29e57))



<a name="0.54.0"></a>
# 0.54.0 (2016-01-12)


### Bug Fixes

* **client:** fx-desktop-v2 broker halts before signup confirmation poll. ([34c9728](https://github.com/mozilla/fxa-content-server/commit/34c9728)), closes [#3330](https://github.com/mozilla/fxa-content-server/issues/3330)
* **client:** Only send `internal:*` messages across the InterTabChannel. ([1e169b8](https://github.com/mozilla/fxa-content-server/commit/1e169b8))
* **csp:** make CSP reports more detailed, remove sample rate ([41d919c](https://github.com/mozilla/fxa-content-server/commit/41d919c)), closes [#3297](https://github.com/mozilla/fxa-content-server/issues/3297)
* **docs:** remove outdated Docker docs ([4487573](https://github.com/mozilla/fxa-content-server/commit/4487573))
* **metrics:** optimize StatsD tags for performance ([207556a](https://github.com/mozilla/fxa-content-server/commit/207556a)), closes [#3349](https://github.com/mozilla/fxa-content-server/issues/3349)
* **signup:** disallow @firefox email field during sign up ([56465b2](https://github.com/mozilla/fxa-content-server/commit/56465b2)), closes [#3332](https://github.com/mozilla/fxa-content-server/issues/3332)
* **sourcemap:** add head.js sourcemap ([fdb822c](https://github.com/mozilla/fxa-content-server/commit/fdb822c)), closes [#3355](https://github.com/mozilla/fxa-content-server/issues/3355)
* **styles:** fixes avatar styling to be consistent with fx desktop, fixes #3276 ([e3bd998](https://github.com/mozilla/fxa-content-server/commit/e3bd998)), closes [#3276](https://github.com/mozilla/fxa-content-server/issues/3276)
* **styles:** update age styles to work properly in latest Firefox ([c6da26c](https://github.com/mozilla/fxa-content-server/commit/c6da26c))
* **teamcity:** allow GIT_COMMIT to be set via environment ([d2147c7](https://github.com/mozilla/fxa-content-server/commit/d2147c7))
* **tests:** allow unset value of GIT_COMMIT ([1dd0fd7](https://github.com/mozilla/fxa-content-server/commit/1dd0fd7))
* **tests:** Fix the communication preferences tests. ([ae1104f](https://github.com/mozilla/fxa-content-server/commit/ae1104f)), closes [#3357](https://github.com/mozilla/fxa-content-server/issues/3357)
* **tests:** improve iframe functional tests ([969b0b9](https://github.com/mozilla/fxa-content-server/commit/969b0b9)), closes [#3361](https://github.com/mozilla/fxa-content-server/issues/3361)

### Features

* **client:** Add a "Sync Preferences" button for fx-desktop-v3 broker. ([7fd2855](https://github.com/mozilla/fxa-content-server/commit/7fd2855)), closes [#3079](https://github.com/mozilla/fxa-content-server/issues/3079)

### Refactor

* **client:** Add retrySignUp and verifySignUp to the Account model ([cf6700a](https://github.com/mozilla/fxa-content-server/commit/cf6700a))
* **metrics:** remove unused metrics tags ([d086fa0](https://github.com/mozilla/fxa-content-server/commit/d086fa0)), closes [#3346](https://github.com/mozilla/fxa-content-server/issues/3346)



<a name="0.53.0"></a>
# 0.53.0 (2015-12-30)


### Bug Fixes

* **client:** focus first input in choose_what_to_sync ([1196b27](https://github.com/mozilla/fxa-content-server/commit/1196b27d58ea6fb2afd55461a6d359e0bef77226))
* **ux:** fix checkbox styling in the choose what to sync screen ([1653f9](https://github.com/mozilla/fxa-content-server/commit/1653f965ca2b0c864d21f9d63dc89a141485c20c))
* **ux:** minor tweak to the button spinner in mobile view ([c5b40e1c](https://github.com/mozilla/fxa-content-server/commit/c5b40e1c7fa4ae5483d7cb67c437207aaf5d1aba))
* **tests:** add config to run latest with node 4.x ([30fc761](https://github.com/mozilla/fxa-content-server/commit/30fc76184eb9651fa54caa8e691747dda4f05147))
* **tests:** fix functional tests for oauth and password reset ([ca18a0c](https://github.com/mozilla/fxa-content-server/commit/ca18a0cd53c9afeee3e841388f73efb778057805))
* **deps:** update to Intern 3.0.6 ([990a8d0](https://github.com/mozilla/fxa-content-server/commit/990a8d09a9197783eac40d27bb98d627d1853404))
* **deps:** update prod dependencies ([7fd2b82](https://github.com/mozilla/fxa-content-server/commit/7fd2b823c58dbf52785307f8962cfbcfbe56bf0a))
* **snippet:** remove extra Firefox for iOS string ([9f4a359](https://github.com/mozilla/fxa-content-server/commit/9f4a359a4894d35b9a92a57b3b318da46485b37c))

### Refactor

* **client:** Move some view based reset password logic to mixins/models ([9561faf](https://github.com/mozilla/fxa-content-server/commit/9561faf8ff61b60edebcc207d682977ca4b9af15))



<a name="0.52.0"></a>
# 0.52.0 (2015-12-15)


### Bug Fixes

* **devices:** rename lastConnected to lastAccessTime ([9ec1ff6](https://github.com/mozilla/fxa-content-server/commit/9ec1ff6))
* **openid:** add lint and tests to openid routes ([d63f8ed](https://github.com/mozilla/fxa-content-server/commit/d63f8ed))
* **server:** fix server test for post-csp ([315340e](https://github.com/mozilla/fxa-content-server/commit/315340e)), closes [#3300](https://github.com/mozilla/fxa-content-server/issues/3300)
* **tests:** add openid .well-known endpoint test ([dd68356](https://github.com/mozilla/fxa-content-server/commit/dd68356))
* **tests:** fix functional test iframe failure ([fad077c](https://github.com/mozilla/fxa-content-server/commit/fad077c)), closes [#3306](https://github.com/mozilla/fxa-content-server/issues/3306)
* **tests:** remove special rules for copied locales ([28a8396](https://github.com/mozilla/fxa-content-server/commit/28a8396))
* **travis:** build and test on 0.10, 0.12 and 4.x ([ba4d829](https://github.com/mozilla/fxa-content-server/commit/ba4d829))

### Features

* **openid:** add /.well-known/openid-configuration route ([8cf2ec5](https://github.com/mozilla/fxa-content-server/commit/8cf2ec5)), closes [#3299](https://github.com/mozilla/fxa-content-server/issues/3299)

### Refactor

* **client:** Move deleteAccount logic from view to user.js/account.js ([dbc531c](https://github.com/mozilla/fxa-content-server/commit/dbc531c))
* **client:** Use the Account's isSignedIn method in base.js ([f6bf420](https://github.com/mozilla/fxa-content-server/commit/f6bf420))



<a name="0.51.0"></a>
# 0.51.0 (2015-12-02)


### Bug Fixes

* **devices:** improve testing coverage and clean up ([4163505](https://github.com/mozilla/fxa-content-server/commit/4163505))
* **docs:** add browser support section ([cd3a975](https://github.com/mozilla/fxa-content-server/commit/cd3a975))
* **experiments:** bump experiments to train-51 ([0de6c33](https://github.com/mozilla/fxa-content-server/commit/0de6c33))
* **tests:** use bower@1.6.5 in teamcity tests ([b9ab071](https://github.com/mozilla/fxa-content-server/commit/b9ab071))

### Features

* **deps:** update fxa-js-client to v0.1.33 ([b77145b](https://github.com/mozilla/fxa-content-server/commit/b77145b))
* **devices:** basic device UI for the settings panel ([20c305d](https://github.com/mozilla/fxa-content-server/commit/20c305d))
* **l10n:** Add translatable string for a "Help" link. ([bdbf4b5](https://github.com/mozilla/fxa-content-server/commit/bdbf4b5))

### Refactor

* **client:** Move View creation logic out of router.js ([74556db](https://github.com/mozilla/fxa-content-server/commit/74556db))



<a name="0.50.0"></a>
# 0.50.0 (2015-11-17)


### Bug Fixes

* **avatars:** updated the avatar to the latest haired one ([327d67d](https://github.com/mozilla/fxa-content-server/commit/327d67d))
* **client:** fix name clash with web-channel events ([7148184](https://github.com/mozilla/fxa-content-server/commit/7148184))
* **client:** update Firefox for iOS marketing snippet ([1373e4c](https://github.com/mozilla/fxa-content-server/commit/1373e4c)), closes [#3280](https://github.com/mozilla/fxa-content-server/issues/3280)
* **csp:** Fix the default-profile.svg CSP error. Code cleanup. ([4200976](https://github.com/mozilla/fxa-content-server/commit/4200976))
* **experiments:** bump experiments to train 50 ([a4fdd11](https://github.com/mozilla/fxa-content-server/commit/a4fdd11))
* **l10n:** remove locale copying ([e0387cf](https://github.com/mozilla/fxa-content-server/commit/e0387cf))
* **l10n:** remove redundant l10n files ([b36f782](https://github.com/mozilla/fxa-content-server/commit/b36f782)), closes [#3258](https://github.com/mozilla/fxa-content-server/issues/3258)
* **tests:** add a way to disable client metrics stderr ([64e79a5](https://github.com/mozilla/fxa-content-server/commit/64e79a5)), closes [#3158](https://github.com/mozilla/fxa-content-server/issues/3158)

### Features

* **csp:** enable report only CSP in production ([2fbe096](https://github.com/mozilla/fxa-content-server/commit/2fbe096)), closes [#1426](https://github.com/mozilla/fxa-content-server/issues/1426)

### Refactor

* **client:** Convert `app` to the Simplified CommonJS wrapper. ([6a4c81a](https://github.com/mozilla/fxa-content-server/commit/6a4c81a))
* **client:** Replace interTabMixin with notifierMixin. ([2b4a3d7](https://github.com/mozilla/fxa-content-server/commit/2b4a3d7)), closes [#3244](https://github.com/mozilla/fxa-content-server/issues/3244)



<a name="0.49.3"></a>
## 0.49.3 (2015-11-06)


### Bug Fixes

* **client:** fix name clash with web-channel events ([8e23d6d](https://github.com/mozilla/fxa-content-server/commit/8e23d6d))



<a name="0.49.2"></a>
## 0.49.2 (2015-11-04)


### Bug Fixes

* **build:** adjust shrinkwrap due to a failing SHA ([56e346f](https://github.com/mozilla/fxa-content-server/commit/56e346f))
* **config:** switch default config to use consistent server values ([0a6fa42](https://github.com/mozilla/fxa-content-server/commit/0a6fa42)), closes [#1543](https://github.com/mozilla/fxa-content-server/issues/1543)

### Features

* **docs:** Document WebChannel communication with the browser. ([bd91b48](https://github.com/mozilla/fxa-content-server/commit/bd91b48)), closes [#1262](https://github.com/mozilla/fxa-content-server/issues/1262)



<a name="0.49.1"></a>
## 0.49.1 (2015-11-03)


### Bug Fixes

* **client:** rename broadcast to triggerAll ([98b383d](https://github.com/mozilla/fxa-content-server/commit/98b383d))
* **experiments:** update experiments to latest branch ([93111f6](https://github.com/mozilla/fxa-content-server/commit/93111f6))
* **tests:** fix server test for the pt locale ([95ea6b6](https://github.com/mozilla/fxa-content-server/commit/95ea6b6)), closes [#3254](https://github.com/mozilla/fxa-content-server/issues/3254)



<a name="0.49.0"></a>
# 0.49.0 (2015-11-02)


### Bug Fixes

* **client:** Do not use the OAuth Redirect broker to verify Sync sign ups. ([f419efd](https://github.com/mozilla/fxa-content-server/commit/f419efd)), closes [#3215](https://github.com/mozilla/fxa-content-server/issues/3215)
* **client:** Remove /force_auth query params upon successful signin. ([bb3da5e](https://github.com/mozilla/fxa-content-server/commit/bb3da5e)), closes [#2071](https://github.com/mozilla/fxa-content-server/issues/2071)
* **client:** clear query params on sign-out ([0f73d4c](https://github.com/mozilla/fxa-content-server/commit/0f73d4c))
* **client:** clear relier uid on sign-out ([aff6073](https://github.com/mozilla/fxa-content-server/commit/aff6073))
* **client:** remove debug logging from crosstab ([568518b](https://github.com/mozilla/fxa-content-server/commit/568518b))
* **cwts:** update "choose what to sync" design. ([d05147c](https://github.com/mozilla/fxa-content-server/commit/d05147c)), closes [#3183](https://github.com/mozilla/fxa-content-server/issues/3183)
* **cwts:** update column design to properly align the data types ([ae578e4](https://github.com/mozilla/fxa-content-server/commit/ae578e4)), closes [#3246](https://github.com/mozilla/fxa-content-server/issues/3246)
* **design:** update "Choose what to sync" image r=vladikoff ([32797fd](https://github.com/mozilla/fxa-content-server/commit/32797fd))
* **l10n:** copy pt_PT to pt in l10n ([ef70dac](https://github.com/mozilla/fxa-content-server/commit/ef70dac))
* **tests:** Disable `grunt validate-shrinkwrap` for now. ([3c86c84](https://github.com/mozilla/fxa-content-server/commit/3c86c84)), closes [#3237](https://github.com/mozilla/fxa-content-server/issues/3237)
* **tests:** close unclosed window in functional test ([fdebd27](https://github.com/mozilla/fxa-content-server/commit/fdebd27))

### Features

* **build:** Add the git sha used in the build to the production JS. ([998dfac](https://github.com/mozilla/fxa-content-server/commit/998dfac)), closes [#2625](https://github.com/mozilla/fxa-content-server/issues/2625)
* **client:** Show the  button on verification tab in Fennec ([5accebb](https://github.com/mozilla/fxa-content-server/commit/5accebb)), closes [#3140](https://github.com/mozilla/fxa-content-server/issues/3140)
* **client:** Use the `BroadcastChannel` instead of `crosstab` if available. ([774ce7c](https://github.com/mozilla/fxa-content-server/commit/774ce7c))
* **client:** Use the newest crosstab, which presents a more sane API. ([3f2199f](https://github.com/mozilla/fxa-content-server/commit/3f2199f))
* **client:** synchronise signed-in state across tabs ([ecebd94](https://github.com/mozilla/fxa-content-server/commit/ecebd94))
* **cwts:** add Choose what to sync to fx_desktop_v2 ([e9b05ec](https://github.com/mozilla/fxa-content-server/commit/e9b05ec)), closes [#3213](https://github.com/mozilla/fxa-content-server/issues/3213)
* **docs:** Document all base authentication broker method parameters. ([0143f04](https://github.com/mozilla/fxa-content-server/commit/0143f04))
* **ios:** add choose what to sync for Firefox for iOS 2 ([8d797c6](https://github.com/mozilla/fxa-content-server/commit/8d797c6)), closes [#3139](https://github.com/mozilla/fxa-content-server/issues/3139)

### Refactor

* **client:** Unify callback data in InterTabChannel and Backbone.Events ([9136ab5](https://github.com/mozilla/fxa-content-server/commit/9136ab5)), closes [#3229](https://github.com/mozilla/fxa-content-server/issues/3229)
* **client:** extract hard coded key codes ([b5a584b](https://github.com/mozilla/fxa-content-server/commit/b5a584b)), closes [#3163](https://github.com/mozilla/fxa-content-server/issues/3163)



<a name="0.48.0"></a>
# 0.48.0 (2015-10-20)


### Bug Fixes

* **build:** Fix the eslint indendation errors. ([8f2bd3c](https://github.com/mozilla/fxa-content-server/commit/8f2bd3c)), closes [#3189](https://github.com/mozilla/fxa-content-server/issues/3189)
* **build:** extend r.js timeout for building production ([346fa46](https://github.com/mozilla/fxa-content-server/commit/346fa46)), closes [#3166](https://github.com/mozilla/fxa-content-server/issues/3166)
* **client:** Ensure `/signin` is visible when users sign out after verification ([dc67988](https://github.com/mozilla/fxa-content-server/commit/dc67988)), closes [#3187](https://github.com/mozilla/fxa-content-server/issues/3187)
* **client:** Log the correct screen name for the settings panels. ([ee07505](https://github.com/mozilla/fxa-content-server/commit/ee07505)), closes [#3029](https://github.com/mozilla/fxa-content-server/issues/3029)
* **client:** Only allow one profile request per account per tab session. ([c7067cd](https://github.com/mozilla/fxa-content-server/commit/c7067cd))
* **client:** Suppress spurious `login` messages to the browser. ([23fbe8b](https://github.com/mozilla/fxa-content-server/commit/23fbe8b)), closes [#3078](https://github.com/mozilla/fxa-content-server/issues/3078)
* **coppa:** move to age input coppa ([2341e83](https://github.com/mozilla/fxa-content-server/commit/2341e83)), closes [#3137](https://github.com/mozilla/fxa-content-server/issues/3137)
* **experiments:** bump to train 48 experiments ([97b30f2](https://github.com/mozilla/fxa-content-server/commit/97b30f2))
* **links:** align secondary links ([10309fb](https://github.com/mozilla/fxa-content-server/commit/10309fb))
* **messages:** misaligned success and error messages ([00ccec5](https://github.com/mozilla/fxa-content-server/commit/00ccec5))
* **metrics:** Fix the refresh metrics when refreshing a settings subpanel. ([d4a5307](https://github.com/mozilla/fxa-content-server/commit/d4a5307)), closes [#3172](https://github.com/mozilla/fxa-content-server/issues/3172)
* **settings:** add floating labels to delete account and display name ([6f3e650](https://github.com/mozilla/fxa-content-server/commit/6f3e650)), closes [#2848](https://github.com/mozilla/fxa-content-server/issues/2848)
* **settings:** make header bottom margin uniform ([ed6981c](https://github.com/mozilla/fxa-content-server/commit/ed6981c))
* **settings:** remove underline on links ([ee7235e](https://github.com/mozilla/fxa-content-server/commit/ee7235e))
* **signup:** tooltips no longer removed when pressing an arrow key ([80ae84b](https://github.com/mozilla/fxa-content-server/commit/80ae84b)), closes [#1858](https://github.com/mozilla/fxa-content-server/issues/1858)
* **tests:** Fix functional tests when run against a remote server. ([21b19b7](https://github.com/mozilla/fxa-content-server/commit/21b19b7)), closes [#3174](https://github.com/mozilla/fxa-content-server/issues/3174) [#3182](https://github.com/mozilla/fxa-content-server/issues/3182)
* **tests:** Fix the communication preferences tests. ([9b6762c](https://github.com/mozilla/fxa-content-server/commit/9b6762c)), closes [#3176](https://github.com/mozilla/fxa-content-server/issues/3176)
* **tests:** Force installation of fxa-jwtool for the oauth server ([9a99eea](https://github.com/mozilla/fxa-content-server/commit/9a99eea))

### Features

* **coppa:** better support for COPPA warning on FxiOS ([abbb302](https://github.com/mozilla/fxa-content-server/commit/abbb302)), closes [#3164](https://github.com/mozilla/fxa-content-server/issues/3164)
* **ios:** hide "Choose what to sync" for fx_ios_v1 ([5c6bf2a](https://github.com/mozilla/fxa-content-server/commit/5c6bf2a)), closes [#3141](https://github.com/mozilla/fxa-content-server/issues/3141)

### Refactor

* **basket:** extricate basket proxy server into its own repo. ([0882f5f](https://github.com/mozilla/fxa-content-server/commit/0882f5f))
* **client:** Extract router.onAnchorWatch into a new view, AppView. ([292d725](https://github.com/mozilla/fxa-content-server/commit/292d725))
* **client:** Simplify the floating placeholder mixin logic. ([d0f3aca](https://github.com/mozilla/fxa-content-server/commit/d0f3aca))
* **client:** move router.showView logic to the AppView. ([d00708d](https://github.com/mozilla/fxa-content-server/commit/d00708d))
* **test:** Allow `fillOutSignUp` to accept an optional age. ([2646dd4](https://github.com/mozilla/fxa-content-server/commit/2646dd4))
* **tests:** Reduce boilerplate in the settings functional tests. ([607f672](https://github.com/mozilla/fxa-content-server/commit/607f672))



<a name="0.47.1"></a>
## 0.47.1 (2015-10-07)


### Bug Fixes

* **lint:**  disable object-literal-order-checking in basket proxy server. ([a4ebfd5](https://github.com/mozilla/fxa-content-server/commit/a4ebfd5))
* **basket:** revert "refactor(basket): extricate basket proxy server into its own repo."


<a name="0.47.0"></a>
# 0.47.0 (2015-10-06)


### Bug Fixes

* **checkbox:** make custom checkbox label clickable  ([5a7dcc6](https://github.com/mozilla/fxa-content-server/commit/5a7dcc6)), closes [#3132](https://github.com/mozilla/fxa-content-server/issues/3132)
* **client:** Fix the confirm_reset_password screen polling logic & tests. ([6cd7dc1](https://github.com/mozilla/fxa-content-server/commit/6cd7dc1)), closes [#2483](https://github.com/mozilla/fxa-content-server/issues/2483)
* **client:** Show the `success` message for 5 seconds to help functional tests. ([10a882f](https://github.com/mozilla/fxa-content-server/commit/10a882f))
* **config:** copy 'local.json-dist' to 'local.json' if it don't exists ([0eefb94](https://github.com/mozilla/fxa-content-server/commit/0eefb94)), closes [#2619](https://github.com/mozilla/fxa-content-server/issues/2619)
* **deps:** bump dependencies ([6964d0c](https://github.com/mozilla/fxa-content-server/commit/6964d0c)), closes [#3064](https://github.com/mozilla/fxa-content-server/issues/3064)
* **l10n:** Do not show fuzzy strings to users. ([e1fe471](https://github.com/mozilla/fxa-content-server/commit/e1fe471)), closes [#3113](https://github.com/mozilla/fxa-content-server/issues/3113)
* **server:** Fix server crash if metrics event does not include `type` ([0703cc0](https://github.com/mozilla/fxa-content-server/commit/0703cc0)), closes [#1208397](https://github.com/mozilla/fxa-content-server/issues/1208397)
* **settings:** Unblock rendering of settings on communication prefs screen ([2118e53](https://github.com/mozilla/fxa-content-server/commit/2118e53)), closes [#3061](https://github.com/mozilla/fxa-content-server/issues/3061)
* **settings:** clean up compressed landscape layout ([aa585af](https://github.com/mozilla/fxa-content-server/commit/aa585af))
* **signup:** show red border only after tooltip rendered ([ef08d86](https://github.com/mozilla/fxa-content-server/commit/ef08d86)), closes [#1865](https://github.com/mozilla/fxa-content-server/issues/1865)
* **styles:** make setting header UI better ([b907fdc](https://github.com/mozilla/fxa-content-server/commit/b907fdc)), closes [#3055](https://github.com/mozilla/fxa-content-server/issues/3055)

### Features

* **build:** Object literals must be sorted alphabetically. ([8067c62](https://github.com/mozilla/fxa-content-server/commit/8067c62))
* **client:** Add View behavior functions instead of passing around objects. ([4af0916](https://github.com/mozilla/fxa-content-server/commit/4af0916))
* **client:** Add support for new fennec screens. ([8698f01](https://github.com/mozilla/fxa-content-server/commit/8698f01))
* **client:** Add the beginning states of capabilities. ([ec9ddab](https://github.com/mozilla/fxa-content-server/commit/ec9ddab))
* **client:** Choose what to sync on the web ([9beaaad](https://github.com/mozilla/fxa-content-server/commit/9beaaad))
* **client:** Follow on /settings updates. ([20faf0e](https://github.com/mozilla/fxa-content-server/commit/20faf0e))
* **client:** Start on view behaviors. ([ba0b7bc](https://github.com/mozilla/fxa-content-server/commit/ba0b7bc))
* **i18n:** Enable Romanian ([05abfd1](https://github.com/mozilla/fxa-content-server/commit/05abfd1)), closes [#3125](https://github.com/mozilla/fxa-content-server/issues/3125)
* **metrics:** Add a `loaded` event that is logged after first screen render. ([404bc9b](https://github.com/mozilla/fxa-content-server/commit/404bc9b)), closes [#3100](https://github.com/mozilla/fxa-content-server/issues/3100)
* **signup:** add new checkbox style ([5633045](https://github.com/mozilla/fxa-content-server/commit/5633045)), closes [#2302](https://github.com/mozilla/fxa-content-server/issues/2302)
* **test:** Add more /force_auth functional tests. ([3afdc32](https://github.com/mozilla/fxa-content-server/commit/3afdc32))

### Refactor

* **basket:** extricate basket proxy server into its own repo. ([2b53107](https://github.com/mozilla/fxa-content-server/commit/2b53107))
* **client:** Start email confirmation polling in afterVisible. ([a37eb6f](https://github.com/mozilla/fxa-content-server/commit/a37eb6f))



<a name="0.46.0"></a>
# 0.46.0 (2015-09-23)


### Bug Fixes

* **client:** Only one sessionStatus check call should be made from /settings ([51bc0c5](https://github.com/mozilla/fxa-content-server/commit/51bc0c5)), closes [#3007](https://github.com/mozilla/fxa-content-server/issues/3007)
* **client:** Reuse assertions for a given sessionToken for the duration of the browser tab. ([2bf08ab](https://github.com/mozilla/fxa-content-server/commit/2bf08ab)), closes [#3085](https://github.com/mozilla/fxa-content-server/issues/3085)
* **client:** Smooth out the `/settings` page load. ([207dfd6](https://github.com/mozilla/fxa-content-server/commit/207dfd6))
* **styles:** adjust line-height for settings ([0d4af0b](https://github.com/mozilla/fxa-content-server/commit/0d4af0b)), closes [#3052](https://github.com/mozilla/fxa-content-server/issues/3052)
* **tests:** Fx updates, improve progress output ([fbeba0f](https://github.com/mozilla/fxa-content-server/commit/fbeba0f))
* **tests:** on first time, run the update ([a7769bc](https://github.com/mozilla/fxa-content-server/commit/a7769bc))
* **tests:** only update lastupdate file on success ([b7b0921](https://github.com/mozilla/fxa-content-server/commit/b7b0921))

### Features

* **openid:** base OpenID login (as xhr) ([25bba0f](https://github.com/mozilla/fxa-content-server/commit/25bba0f))

### Refactor

* **client:** Alphabetize deps and hash keys in metrics.js ([4756620](https://github.com/mozilla/fxa-content-server/commit/4756620))
* **client:** Alphabetize deps, routes and object keys in router.js ([092f37b](https://github.com/mozilla/fxa-content-server/commit/092f37b))
* **client:** Rename the FxDesktopRelier to the SyncRelier ([2e11bf0](https://github.com/mozilla/fxa-content-server/commit/2e11bf0))
* **client:** Tease appart the FxSync and FxDesktopV1 auth brokers. ([cc963ab](https://github.com/mozilla/fxa-content-server/commit/cc963ab))
* **server:** Alphabetize the FRONTEND_ROUTES array. ([0474246](https://github.com/mozilla/fxa-content-server/commit/0474246))
* **test:** Alphabetize the routes to test in the pages functional test. ([719c67c](https://github.com/mozilla/fxa-content-server/commit/719c67c))



<a name="0.45.1"></a>
## 0.45.1 (2015-09-17)


### Bug Fixes

* **force_auth:** make sure force_auth supports the Firefox password manager ([01bcd8e](https://github.com/mozilla/fxa-content-server/commit/01bcd8e)), closes [#3049](https://github.com/mozilla/fxa-content-server/issues/3049)
* **style:** Fix the signin/signup width on mobile devices. ([39e2ada](https://github.com/mozilla/fxa-content-server/commit/39e2ada)), closes [#3060](https://github.com/mozilla/fxa-content-server/issues/3060)
* **tests:** Fix the cookies disabled functional tests. ([002b899](https://github.com/mozilla/fxa-content-server/commit/002b899)), closes [#3066](https://github.com/mozilla/fxa-content-server/issues/3066)



<a name="0.45.0"></a>
# 0.45.0 (2015-09-11)


### Bug Fixes

* **avatar:** correctly center camera preview ([ae9ee07](https://github.com/mozilla/fxa-content-server/commit/ae9ee07))
* **avatars:** render the camera preview properly in portrait and landscape mode ([d33e369](https://github.com/mozilla/fxa-content-server/commit/d33e369))
* **build:** adjust eslint settings ([ff1fd47](https://github.com/mozilla/fxa-content-server/commit/ff1fd47))
* **client:** Allow the firstrun flow to halt after signin. ([9686548](https://github.com/mozilla/fxa-content-server/commit/9686548)), closes [#2945](https://github.com/mozilla/fxa-content-server/issues/2945)
* **client:** Clear form prefill info after signin/signup/signout. ([91f0608](https://github.com/mozilla/fxa-content-server/commit/91f0608)), closes [#3034](https://github.com/mozilla/fxa-content-server/issues/3034)
* **experiments:** include confirm view verification ([d976d3c](https://github.com/mozilla/fxa-content-server/commit/d976d3c))
* **l10n:** remove const keyword that breaks acorn JS parser ([32afb92](https://github.com/mozilla/fxa-content-server/commit/32afb92)), closes [#3005](https://github.com/mozilla/fxa-content-server/issues/3005)
* **lint:** disallow const keyword ([0b88aca](https://github.com/mozilla/fxa-content-server/commit/0b88aca))
* **metrics:** prevent utm parameters from being dropped after verification ([edde78a](https://github.com/mozilla/fxa-content-server/commit/edde78a)), closes [#2937](https://github.com/mozilla/fxa-content-server/issues/2937)
* **styles:** adjust specific signup input help styles ([47ad129](https://github.com/mozilla/fxa-content-server/commit/47ad129))
* **tests:** add proper promise return to firstrun ([1882757](https://github.com/mozilla/fxa-content-server/commit/1882757))
* **tests:** adjust experiment return signup url ([354f88a](https://github.com/mozilla/fxa-content-server/commit/354f88a)), closes [#3047](https://github.com/mozilla/fxa-content-server/issues/3047)
* **tests:** update iOS signup tests to refelect new exclude_signup=1 behaviour ([79c2de4](https://github.com/mozilla/fxa-content-server/commit/79c2de4)), closes [#3030](https://github.com/mozilla/fxa-content-server/issues/3030)
* **tests:** update travis to firefox 40 ([0f0f955](https://github.com/mozilla/fxa-content-server/commit/0f0f955))
* **version:** use explicit path with git-config ([cec9e9f](https://github.com/mozilla/fxa-content-server/commit/cec9e9f))

### Features

* **delete_account:** notify observers of a logout event ([d74c972](https://github.com/mozilla/fxa-content-server/commit/d74c972)), closes [#2993](https://github.com/mozilla/fxa-content-server/issues/2993)
* **l10n:** add fa as a supported locale. ([7690dcd](https://github.com/mozilla/fxa-content-server/commit/7690dcd))
* **metrics:** Send navigationTiming stats to StatsD. ([0842fa4](https://github.com/mozilla/fxa-content-server/commit/0842fa4))
* **metrics:** add ga pageviews ([b7830c8](https://github.com/mozilla/fxa-content-server/commit/b7830c8)), closes [#2898](https://github.com/mozilla/fxa-content-server/issues/2898)
* **settings:** "forgot password" affordance to change password ([936c64b](https://github.com/mozilla/fxa-content-server/commit/936c64b)), closes [#994](https://github.com/mozilla/fxa-content-server/issues/994)
* **verification:** organize verification experiments ([07a6b6d](https://github.com/mozilla/fxa-content-server/commit/07a6b6d)), closes [#2673](https://github.com/mozilla/fxa-content-server/issues/2673)

### Refactor

* **client:** Add BaseExperiment.extend to simplify experiment extension. ([24cf4b8](https://github.com/mozilla/fxa-content-server/commit/24cf4b8))
* **client:** Cleanup and unification. ([b563c3e](https://github.com/mozilla/fxa-content-server/commit/b563c3e))
* **client:** Move back button related code from base.js to back-mixin.js ([230510d](https://github.com/mozilla/fxa-content-server/commit/230510d))
* **client:** Only allow exclude_signup=1 if the context=fx_ios_v1 ([9d9d560](https://github.com/mozilla/fxa-content-server/commit/9d9d560))
* **client:** Pass a NullStorage instance to experiments for unit tests. ([aacffd2](https://github.com/mozilla/fxa-content-server/commit/aacffd2))
* **experiments:** add docs, change to view.notify, fix up tests ([e0d1b2f](https://github.com/mozilla/fxa-content-server/commit/e0d1b2f))



<a name="0.44.1"></a>
## 0.44.1 (2015-08-25)


### Bug Fixes

* **account:** handle unverified attempts to request profile data ([ba49d4b](https://github.com/mozilla/fxa-content-server/commit/ba49d4b))
* **avatars:** allow users to change their avatar if they have/had one ([4efe6fd](https://github.com/mozilla/fxa-content-server/commit/4efe6fd))
* **avatars:** use an error object instead of string to ensure it is not logged twice ([487abc5](https://github.com/mozilla/fxa-content-server/commit/487abc5))
* **client:** Handle the `entryPoint` query parameter. ([67b54fc](https://github.com/mozilla/fxa-content-server/commit/67b54fc)), closes [#2885](https://github.com/mozilla/fxa-content-server/issues/2885)
* **client:** Only make profile requests if a valid accessToken exists. ([f73ccde](https://github.com/mozilla/fxa-content-server/commit/f73ccde))
* **deps:** update dev dependencies ([e6ee68f](https://github.com/mozilla/fxa-content-server/commit/e6ee68f))
* **deps:** update grunt-contrib-uglify to 0.9.2 ([7caf769](https://github.com/mozilla/fxa-content-server/commit/7caf769))
* **deps:** update to express-able 0.4.4 ([0a22e00](https://github.com/mozilla/fxa-content-server/commit/0a22e00))
* **easteregg:** update easter egg SHA ([9a9f7e3](https://github.com/mozilla/fxa-content-server/commit/9a9f7e3))
* **firstrun:** increase response timeout for iframing ([89d8d08](https://github.com/mozilla/fxa-content-server/commit/89d8d08))
* **forms:** disable spellcheck ([cc03c33](https://github.com/mozilla/fxa-content-server/commit/cc03c33)), closes [#2910](https://github.com/mozilla/fxa-content-server/issues/2910)
* **forms:** remove spellcheck from reset_password ([bfe7b0d](https://github.com/mozilla/fxa-content-server/commit/bfe7b0d))
* **input:** remove autocapitalize on iOS ([2ef1174](https://github.com/mozilla/fxa-content-server/commit/2ef1174))
* **metrics:** Provide more detailed logging for errors fetching /config ([e149da2](https://github.com/mozilla/fxa-content-server/commit/e149da2))
* **metrics:** measure how helpful mailcheck is ([ff13860](https://github.com/mozilla/fxa-content-server/commit/ff13860)), closes [#2819](https://github.com/mozilla/fxa-content-server/issues/2819)
* **metrics:** move screen metrics to ga from datadog ([8c2731f](https://github.com/mozilla/fxa-content-server/commit/8c2731f)), closes [#2614](https://github.com/mozilla/fxa-content-server/issues/2614)
* **profile:** avoid creating new instances of account ([981660c](https://github.com/mozilla/fxa-content-server/commit/981660c))
* **profile:** do not request an access token when saving an account ([59efae0](https://github.com/mozilla/fxa-content-server/commit/59efae0))
* **reset:** improve the reset password caveat copy ([0d32d07](https://github.com/mozilla/fxa-content-server/commit/0d32d07)), closes [#2762](https://github.com/mozilla/fxa-content-server/issues/2762)
* **sentry:** remove noise from referer header in sentry ([d6ad1cf](https://github.com/mozilla/fxa-content-server/commit/d6ad1cf))
* **server:** add server route for /unexpected_error ([c1342ef](https://github.com/mozilla/fxa-content-server/commit/c1342ef))
* **settings:** always show avatars and fix modal cancel buttons ([a1422a9](https://github.com/mozilla/fxa-content-server/commit/a1422a9))
* **settings:** clean up amd dependencies ([a885945](https://github.com/mozilla/fxa-content-server/commit/a885945))
* **settings:** escape display name ([0f21cdc](https://github.com/mozilla/fxa-content-server/commit/0f21cdc))
* **settings:** fix avatar modal ([c2a8c6b](https://github.com/mozilla/fxa-content-server/commit/c2a8c6b))
* **settings:** fix gravatar permission screen within modal ([a1ad7cb](https://github.com/mozilla/fxa-content-server/commit/a1ad7cb))
* **settings:** fix lint errors and mocha failures ([46d49a0](https://github.com/mozilla/fxa-content-server/commit/46d49a0))
* **settings:** fix page titles and other nits ([36b3302](https://github.com/mozilla/fxa-content-server/commit/36b3302))
* **settings:** fix short page styling ([cd19bb0](https://github.com/mozilla/fxa-content-server/commit/cd19bb0)), closes [#2862](https://github.com/mozilla/fxa-content-server/issues/2862)
* **settings:** move sub panel logic from settings to a separate subPanel component ([a5a56e8](https://github.com/mozilla/fxa-content-server/commit/a5a56e8))
* **settings:** prevent flicker when leaving settings page ([55f8936](https://github.com/mozilla/fxa-content-server/commit/55f8936))
* **settings:** refactor sub panel template so that it is not empty ([0d484e3](https://github.com/mozilla/fxa-content-server/commit/0d484e3))
* **src:** Fix a typo: `UNVERIFIED`=>`UNVERIFIED_ACCOUNT` ([b40b735](https://github.com/mozilla/fxa-content-server/commit/b40b735))
* **strings:** change "Already have an account?" to "Have an account?" ([2d28f3e](https://github.com/mozilla/fxa-content-server/commit/2d28f3e)), closes [#2753](https://github.com/mozilla/fxa-content-server/issues/2753)
* **tests:** Fix the failing avatar functional tests. ([fb59c19](https://github.com/mozilla/fxa-content-server/commit/fb59c19)), closes [#2987](https://github.com/mozilla/fxa-content-server/issues/2987)
* **tests:** Speed up the iframe origin tests. ([e908d70](https://github.com/mozilla/fxa-content-server/commit/e908d70)), closes [#2986](https://github.com/mozilla/fxa-content-server/issues/2986)
* **tests:** do not compare flushTime property in storage-metrics tests ([72cf1bc](https://github.com/mozilla/fxa-content-server/commit/72cf1bc)), closes [#2984](https://github.com/mozilla/fxa-content-server/issues/2984)
* **tests:** fix gravatar permission tests ([56d9e1c](https://github.com/mozilla/fxa-content-server/commit/56d9e1c))
* **tests:** fix typo in tests ([aa496ed](https://github.com/mozilla/fxa-content-server/commit/aa496ed))
* **tests:** fix up flaky test for desktop credentials ([c078458](https://github.com/mozilla/fxa-content-server/commit/c078458))
* **tests:** remove misguided time-based assertion ([2782f0a](https://github.com/mozilla/fxa-content-server/commit/2782f0a))
* **tests:** restore functional tests ([72d4969](https://github.com/mozilla/fxa-content-server/commit/72d4969))
* **tests:** switch from teardown and setup to improve stability ([6a33723](https://github.com/mozilla/fxa-content-server/commit/6a33723))
* **travis:** install auth, oauth and profile servers for travis ([26e768e](https://github.com/mozilla/fxa-content-server/commit/26e768e))
* **user:** cache the signed in account instance to reduce token fetching ([8737367](https://github.com/mozilla/fxa-content-server/commit/8737367))
* **view:** log errors in extended views initialize() ([b08b5ac](https://github.com/mozilla/fxa-content-server/commit/b08b5ac)), closes [#2964](https://github.com/mozilla/fxa-content-server/issues/2964)

### Features

* **client:** Cache busting on-demand load. ([88c8f32](https://github.com/mozilla/fxa-content-server/commit/88c8f32))
* **client:** Start on the FxFennecV1AuthenticationBroker ([3095f21](https://github.com/mozilla/fxa-content-server/commit/3095f21))
* **coppa:** input based COPPA ([64bfe86](https://github.com/mozilla/fxa-content-server/commit/64bfe86)), closes [#2108](https://github.com/mozilla/fxa-content-server/issues/2108)
* **deps:** update production dependencies ([ecbf309](https://github.com/mozilla/fxa-content-server/commit/ecbf309))
* **docs:** Document email validation errors for signin/signup. ([da90143](https://github.com/mozilla/fxa-content-server/commit/da90143)), closes [#2909](https://github.com/mozilla/fxa-content-server/issues/2909)
* **l10n:** add en-GB as a supported locale. ([bacd99e](https://github.com/mozilla/fxa-content-server/commit/bacd99e)), closes [#2942](https://github.com/mozilla/fxa-content-server/issues/2942)
* **metrics:** add queue time to analytics ([d62891d](https://github.com/mozilla/fxa-content-server/commit/d62891d)), closes [#2903](https://github.com/mozilla/fxa-content-server/issues/2903)
* **sentry:** include version in Sentry reports ([a53db95](https://github.com/mozilla/fxa-content-server/commit/a53db95)), closes [#2724](https://github.com/mozilla/fxa-content-server/issues/2724)
* **signup:** Password Strength Checker ([166b5e1](https://github.com/mozilla/fxa-content-server/commit/166b5e1))



<a name="0.44.0"></a>
# 0.44.0 (2015-08-24)


### Bug Fixes

* **account:** handle unverified attempts to request profile data ([ba49d4b](https://github.com/mozilla/fxa-content-server/commit/ba49d4b))
* **avatars:** use an error object instead of string to ensure it is not logged twice ([487abc5](https://github.com/mozilla/fxa-content-server/commit/487abc5))
* **client:** Handle the `entryPoint` query parameter. ([67b54fc](https://github.com/mozilla/fxa-content-server/commit/67b54fc)), closes [#2885](https://github.com/mozilla/fxa-content-server/issues/2885)
* **client:** Only make profile requests if a valid accessToken exists. ([f73ccde](https://github.com/mozilla/fxa-content-server/commit/f73ccde))
* **deps:** update dev dependencies ([e6ee68f](https://github.com/mozilla/fxa-content-server/commit/e6ee68f))
* **deps:** update grunt-contrib-uglify to 0.9.2 ([7caf769](https://github.com/mozilla/fxa-content-server/commit/7caf769))
* **deps:** update to express-able 0.4.4 ([0a22e00](https://github.com/mozilla/fxa-content-server/commit/0a22e00))
* **easteregg:** update easter egg SHA ([9a9f7e3](https://github.com/mozilla/fxa-content-server/commit/9a9f7e3))
* **firstrun:** increase response timeout for iframing ([89d8d08](https://github.com/mozilla/fxa-content-server/commit/89d8d08))
* **forms:** disable spellcheck ([cc03c33](https://github.com/mozilla/fxa-content-server/commit/cc03c33)), closes [#2910](https://github.com/mozilla/fxa-content-server/issues/2910)
* **forms:** remove spellcheck from reset_password ([bfe7b0d](https://github.com/mozilla/fxa-content-server/commit/bfe7b0d))
* **input:** remove autocapitalize on iOS ([2ef1174](https://github.com/mozilla/fxa-content-server/commit/2ef1174))
* **metrics:** Provide more detailed logging for errors fetching /config ([e149da2](https://github.com/mozilla/fxa-content-server/commit/e149da2))
* **metrics:** measure how helpful mailcheck is ([ff13860](https://github.com/mozilla/fxa-content-server/commit/ff13860)), closes [#2819](https://github.com/mozilla/fxa-content-server/issues/2819)
* **metrics:** move screen metrics to ga from datadog ([8c2731f](https://github.com/mozilla/fxa-content-server/commit/8c2731f)), closes [#2614](https://github.com/mozilla/fxa-content-server/issues/2614)
* **profile:** avoid creating new instances of account ([981660c](https://github.com/mozilla/fxa-content-server/commit/981660c))
* **profile:** do not request an access token when saving an account ([59efae0](https://github.com/mozilla/fxa-content-server/commit/59efae0))
* **reset:** improve the reset password caveat copy ([0d32d07](https://github.com/mozilla/fxa-content-server/commit/0d32d07)), closes [#2762](https://github.com/mozilla/fxa-content-server/issues/2762)
* **sentry:** remove noise from referer header in sentry ([d6ad1cf](https://github.com/mozilla/fxa-content-server/commit/d6ad1cf))
* **server:** add server route for /unexpected_error ([c1342ef](https://github.com/mozilla/fxa-content-server/commit/c1342ef))
* **src:** Fix a typo: `UNVERIFIED`=>`UNVERIFIED_ACCOUNT` ([b40b735](https://github.com/mozilla/fxa-content-server/commit/b40b735))
* **strings:** change "Already have an account?" to "Have an account?" ([2d28f3e](https://github.com/mozilla/fxa-content-server/commit/2d28f3e)), closes [#2753](https://github.com/mozilla/fxa-content-server/issues/2753)
* **tests:** Fix the failing avatar functional tests. ([fb59c19](https://github.com/mozilla/fxa-content-server/commit/fb59c19)), closes [#2987](https://github.com/mozilla/fxa-content-server/issues/2987)
* **tests:** Speed up the iframe origin tests. ([e908d70](https://github.com/mozilla/fxa-content-server/commit/e908d70)), closes [#2986](https://github.com/mozilla/fxa-content-server/issues/2986)
* **tests:** do not compare flushTime property in storage-metrics tests ([72cf1bc](https://github.com/mozilla/fxa-content-server/commit/72cf1bc)), closes [#2984](https://github.com/mozilla/fxa-content-server/issues/2984)
* **tests:** fix gravatar permission tests ([56d9e1c](https://github.com/mozilla/fxa-content-server/commit/56d9e1c))
* **tests:** fix typo in tests ([aa496ed](https://github.com/mozilla/fxa-content-server/commit/aa496ed))
* **tests:** fix up flaky test for desktop credentials ([c078458](https://github.com/mozilla/fxa-content-server/commit/c078458))
* **tests:** remove misguided time-based assertion ([2782f0a](https://github.com/mozilla/fxa-content-server/commit/2782f0a))
* **tests:** restore functional tests ([72d4969](https://github.com/mozilla/fxa-content-server/commit/72d4969))
* **tests:** switch from teardown and setup to improve stability ([6a33723](https://github.com/mozilla/fxa-content-server/commit/6a33723))
* **user:** cache the signed in account instance to reduce token fetching ([8737367](https://github.com/mozilla/fxa-content-server/commit/8737367))
* **view:** log errors in extended views initialize() ([b08b5ac](https://github.com/mozilla/fxa-content-server/commit/b08b5ac)), closes [#2964](https://github.com/mozilla/fxa-content-server/issues/2964)

### Features

* **client:** Cache busting on-demand load. ([88c8f32](https://github.com/mozilla/fxa-content-server/commit/88c8f32))
* **client:** Start on the FxFennecV1AuthenticationBroker ([3095f21](https://github.com/mozilla/fxa-content-server/commit/3095f21))
* **coppa:** input based COPPA ([64bfe86](https://github.com/mozilla/fxa-content-server/commit/64bfe86)), closes [#2108](https://github.com/mozilla/fxa-content-server/issues/2108)
* **deps:** update production dependencies ([ecbf309](https://github.com/mozilla/fxa-content-server/commit/ecbf309))
* **docs:** Document email validation errors for signin/signup. ([da90143](https://github.com/mozilla/fxa-content-server/commit/da90143)), closes [#2909](https://github.com/mozilla/fxa-content-server/issues/2909)
* **l10n:** add en-GB as a supported locale. ([bacd99e](https://github.com/mozilla/fxa-content-server/commit/bacd99e)), closes [#2942](https://github.com/mozilla/fxa-content-server/issues/2942)
* **metrics:** add queue time to analytics ([d62891d](https://github.com/mozilla/fxa-content-server/commit/d62891d)), closes [#2903](https://github.com/mozilla/fxa-content-server/issues/2903)
* **sentry:** include version in Sentry reports ([a53db95](https://github.com/mozilla/fxa-content-server/commit/a53db95)), closes [#2724](https://github.com/mozilla/fxa-content-server/issues/2724)
* **signup:** Password Strength Checker ([166b5e1](https://github.com/mozilla/fxa-content-server/commit/166b5e1))



<a name="0.43.0"></a>
# 0.43.0 (2015-08-04)


### chore

* chore(client): Add the Sync migration strings to strings.js
 ([ac20b86](https://github.com/mozilla/fxa-content-server/commit/ac20b86))
* chore(deps): Bump out of date deps.
 ([d0b8915](https://github.com/mozilla/fxa-content-server/commit/d0b8915)), closes [#2784](https://github.com/mozilla/fxa-content-server/issues/2784)
* chore(deps): update development dependencies
 ([bf9f563](https://github.com/mozilla/fxa-content-server/commit/bf9f563))
* chore(deps): update grunt-eslint to 16.0.0
 ([677a4c0](https://github.com/mozilla/fxa-content-server/commit/677a4c0))
* chore(dev): add 'npm run start-production' command to make it easier to run the server in prod mode
 ([679eeaf](https://github.com/mozilla/fxa-content-server/commit/679eeaf))
* chore(docs): Fix a typo in the firstrun docs.
 ([15f26ac](https://github.com/mozilla/fxa-content-server/commit/15f26ac))
* chore(docs): Update the commit body guidelines to include the issue number
 ([fcf4058](https://github.com/mozilla/fxa-content-server/commit/fcf4058))
* chore(l10n): update pot files
 ([164b9e7](https://github.com/mozilla/fxa-content-server/commit/164b9e7))
* chore(lint): Remove the eslint complexity checks
 ([3592d79](https://github.com/mozilla/fxa-content-server/commit/3592d79))
* chore(sass): update sass
 ([cf5dadf](https://github.com/mozilla/fxa-content-server/commit/cf5dadf))
* chore(strings): add choose what to sync strings
 ([73194ed](https://github.com/mozilla/fxa-content-server/commit/73194ed))
* chore(travis): remove libgmp-dev
 ([492fd94](https://github.com/mozilla/fxa-content-server/commit/492fd94))
* chore(travis): update Travis to use npm 2
 ([7d6ac7d](https://github.com/mozilla/fxa-content-server/commit/7d6ac7d))

### feat

* feat(client): Add the FxiOSV1 Authentication Broker.
 ([5cff1f4](https://github.com/mozilla/fxa-content-server/commit/5cff1f4)), closes [#2860](https://github.com/mozilla/fxa-content-server/issues/2860)
* feat(client): Provide `fx_ios_v1` context string for use by FxiOS
 ([2767a26](https://github.com/mozilla/fxa-content-server/commit/2767a26)), closes [#2861](https://github.com/mozilla/fxa-content-server/issues/2861)
* feat(client): redirect to the requested page after successful login
 ([ccfbef4](https://github.com/mozilla/fxa-content-server/commit/ccfbef4)), closes [#2821](https://github.com/mozilla/fxa-content-server/issues/2821)
* feat(client): sign in/up messaging for migrating users
 ([88a56ac](https://github.com/mozilla/fxa-content-server/commit/88a56ac))
* feat(content-server): Easter egg for Cloud Services
 ([70e1998](https://github.com/mozilla/fxa-content-server/commit/70e1998)), closes [#2470](https://github.com/mozilla/fxa-content-server/issues/2470)
* feat(deps): updating production dependencies
 ([26c26f1](https://github.com/mozilla/fxa-content-server/commit/26c26f1))
* feat(docs): Add info about the firstrun communication protocol.
 ([6e18531](https://github.com/mozilla/fxa-content-server/commit/6e18531))
* feat(l10n): Add support for Hindi (hi) and Hindi-India (hi-IN).
 ([c45edce](https://github.com/mozilla/fxa-content-server/commit/c45edce))
* feat(l10n): check if translated urls are valid
 ([5d378e1](https://github.com/mozilla/fxa-content-server/commit/5d378e1)), closes [#2763](https://github.com/mozilla/fxa-content-server/issues/2763)
* feat(test): Add signin functional tests for Fx on iOS.
 ([bf4fadf](https://github.com/mozilla/fxa-content-server/commit/bf4fadf))

* Merge pull request #2686 from mozilla/convert-iframe-channel
 ([9ec6b18](https://github.com/mozilla/fxa-content-server/commit/9ec6b18))
* Merge pull request #2737 from mozilla/phil/issue-2493
 ([6601361](https://github.com/mozilla/fxa-content-server/commit/6601361)), closes [#2493](https://github.com/mozilla/fxa-content-server/issues/2493)
* Merge pull request #2781 from TDA/issue-2470-easter-egg-redesigned
 ([131171c](https://github.com/mozilla/fxa-content-server/commit/131171c))
* Merge pull request #2803 from mozilla/document-firstrun-protocol
 ([456449e](https://github.com/mozilla/fxa-content-server/commit/456449e))
* Merge pull request #2804 from mozilla/firstrun-docs-typo
 ([bd43972](https://github.com/mozilla/fxa-content-server/commit/bd43972))
* Merge pull request #2805 from vladikoff/issue-2763-verify-translated-urls
 ([dff66fa](https://github.com/mozilla/fxa-content-server/commit/dff66fa))
* Merge pull request #2806 from mozilla/bump-eslint
 ([34c6e30](https://github.com/mozilla/fxa-content-server/commit/34c6e30))
* Merge pull request #2807 from vladikoff/update-deps-t43
 ([c7c4a18](https://github.com/mozilla/fxa-content-server/commit/c7c4a18))
* Merge pull request #2808 from vladikoff/prod-start
 ([d679f9a](https://github.com/mozilla/fxa-content-server/commit/d679f9a))
* Merge pull request #2809 from vladikoff/devdeps-t43
 ([94d56d7](https://github.com/mozilla/fxa-content-server/commit/94d56d7))
* Merge pull request #2812 from mozilla/ios-metrics-missing
 ([48dee30](https://github.com/mozilla/fxa-content-server/commit/48dee30))
* Merge pull request #2813 from mozilla/phil/issue-2493-postponed-navigation
 ([8de80bf](https://github.com/mozilla/fxa-content-server/commit/8de80bf))
* Merge pull request #2814 from mozilla/issue-2784-outdated-deps
 ([8eda711](https://github.com/mozilla/fxa-content-server/commit/8eda711))
* Merge pull request #2816 from mozilla/issues-2513-2623-normalize-auth-errors
 ([c144c51](https://github.com/mozilla/fxa-content-server/commit/c144c51))
* Merge pull request #2822 from eoger/issue-2821
 ([dcab648](https://github.com/mozilla/fxa-content-server/commit/dcab648))
* Merge pull request #2823 from mozilla/phil/issue-2786
 ([ee4443f](https://github.com/mozilla/fxa-content-server/commit/ee4443f))
* Merge pull request #2826 from mozilla/issue-2789-de-eslint-complexity
 ([b8db477](https://github.com/mozilla/fxa-content-server/commit/b8db477))
* Merge pull request #2833 from mozilla/issue-2830-correct-oauth-errors
 ([d60dd9d](https://github.com/mozilla/fxa-content-server/commit/d60dd9d))
* Merge pull request #2839 from mozilla/add-hindi-support
 ([0ccfb8d](https://github.com/mozilla/fxa-content-server/commit/0ccfb8d))
* Merge pull request #2840 from eoger/issue-2837
 ([b98e8f3](https://github.com/mozilla/fxa-content-server/commit/b98e8f3))
* Merge pull request #2841 from mozilla/update-sass
 ([e976839](https://github.com/mozilla/fxa-content-server/commit/e976839))
* Merge pull request #2845 from mozilla/issue-2844-merge-warning-firstrun
 ([0efbe4e](https://github.com/mozilla/fxa-content-server/commit/0efbe4e))
* Merge pull request #2846 from vladikoff/npm2
 ([4ed0589](https://github.com/mozilla/fxa-content-server/commit/4ed0589))
* Merge pull request #2847 from eoger/contributing-body-fixes
 ([640f6ac](https://github.com/mozilla/fxa-content-server/commit/640f6ac))
* Merge pull request #2851 from mozilla/issue-2850-invalid-client-id
 ([3bb62ae](https://github.com/mozilla/fxa-content-server/commit/3bb62ae))
* Merge pull request #2853 from mozilla/issue-2658-firstrun-signout
 ([4b6ab6a](https://github.com/mozilla/fxa-content-server/commit/4b6ab6a))
* Merge pull request #2854 from mozilla/remove-libgmp-dev
 ([93f3641](https://github.com/mozilla/fxa-content-server/commit/93f3641))
* Merge pull request #2857 from mozilla/issue-2856-metrics-screen-name-order
 ([73d8587](https://github.com/mozilla/fxa-content-server/commit/73d8587))
* Merge pull request #2859 from mozilla/issue-2858-one-mailcheckEnabled-choice
 ([74160d5](https://github.com/mozilla/fxa-content-server/commit/74160d5))
* Merge pull request #2863 from mozilla/issue-2786-strings
 ([d3eace6](https://github.com/mozilla/fxa-content-server/commit/d3eace6))
* Merge pull request #2865 from mozilla/rfk/fx-ios-v1-context
 ([c39d365](https://github.com/mozilla/fxa-content-server/commit/c39d365))
* Merge pull request #2866 from mozilla/constant-names
 ([5cf3012](https://github.com/mozilla/fxa-content-server/commit/5cf3012))
* Merge pull request #2868 from mozilla/issue-2860-no-signup-fx-ios
 ([719b2ae](https://github.com/mozilla/fxa-content-server/commit/719b2ae))
* Merge pull request #2869 from mozilla/choose-sync-strings
 ([40783dc](https://github.com/mozilla/fxa-content-server/commit/40783dc))
* Merge pull request #2871 from mozilla/rfk/basket-api-timeout
 ([42b73e2](https://github.com/mozilla/fxa-content-server/commit/42b73e2))
* Merge pull request #2875 from vladikoff/i2495
 ([b4dc552](https://github.com/mozilla/fxa-content-server/commit/b4dc552))
* Merge pull request #2876 from vladikoff/migrate-test-fix
 ([66dcd79](https://github.com/mozilla/fxa-content-server/commit/66dcd79))
* Merge pull request #2878 from vladikoff/exp43
 ([9b6beda](https://github.com/mozilla/fxa-content-server/commit/9b6beda))

### fix

* fix(avatar): cropper resize tests are more accurate
 ([8c7f362](https://github.com/mozilla/fxa-content-server/commit/8c7f362))
* fix(avatars): fixes blank avatars when session is expired
 ([3d0e7eb](https://github.com/mozilla/fxa-content-server/commit/3d0e7eb)), closes [#2495](https://github.com/mozilla/fxa-content-server/issues/2495)
* fix(basket): add explicit timeout when proxying to basket api.
 ([7fde0f5](https://github.com/mozilla/fxa-content-server/commit/7fde0f5))
* fix(client): Do not allow firstrun Sync based flows to sign out.
 ([a28fce6](https://github.com/mozilla/fxa-content-server/commit/a28fce6)), closes [#2658](https://github.com/mozilla/fxa-content-server/issues/2658)
* fix(client): Fix incorrect OAuth errors in error table.
 ([78ba49e](https://github.com/mozilla/fxa-content-server/commit/78ba49e)), closes [#2830](https://github.com/mozilla/fxa-content-server/issues/2830)
* fix(client): Fix merge warning handling in the firstrun flow.
 ([4914b73](https://github.com/mozilla/fxa-content-server/commit/4914b73)), closes [#2844](https://github.com/mozilla/fxa-content-server/issues/2844)
* fix(client): Invalid client id's show a 400 page, not 500.
 ([cd898f5](https://github.com/mozilla/fxa-content-server/commit/cd898f5)), closes [#2850](https://github.com/mozilla/fxa-content-server/issues/2850)
* fix(client): Normalize all errors from the Auth Server.
 ([3a45d1a](https://github.com/mozilla/fxa-content-server/commit/3a45d1a)), closes [#2513](https://github.com/mozilla/fxa-content-server/issues/2513) [#2623](https://github.com/mozilla/fxa-content-server/issues/2623)
* fix(experiments): add train-43 experiments
 ([9fa1fd4](https://github.com/mozilla/fxa-content-server/commit/9fa1fd4))
* fix(metrics): Ensure a screen's name is logged before any of it's events.
 ([25971d1](https://github.com/mozilla/fxa-content-server/commit/25971d1)), closes [#2856](https://github.com/mozilla/fxa-content-server/issues/2856)
* fix(metrics): Only check whether mailcheck is enabled once.
 ([6de03f1](https://github.com/mozilla/fxa-content-server/commit/6de03f1)), closes [#2858](https://github.com/mozilla/fxa-content-server/issues/2858)
* fix(metrics): minimize flush timeout and flush event metrics on blur event
 ([5b22cb3](https://github.com/mozilla/fxa-content-server/commit/5b22cb3)), closes [#2577](https://github.com/mozilla/fxa-content-server/issues/2577)
* fix(metrics): postpone OAuth navigation until metrics are flushed
 ([503e670](https://github.com/mozilla/fxa-content-server/commit/503e670))
* fix(metrics): use sendBeacon where available
 ([d45586e](https://github.com/mozilla/fxa-content-server/commit/d45586e))
* fix(tests): better migration message functional tests
 ([ecb28ea](https://github.com/mozilla/fxa-content-server/commit/ecb28ea))
* fix(tests): use "afterEach" instead of "teardown" for sync settings tests
 ([f49cafb](https://github.com/mozilla/fxa-content-server/commit/f49cafb))

### refactor

* refactor(client): Rename `FX_DESKTOP_CONTEXT` to `FX_DESKTOP_V1_CONTEXT`
 ([146dd54](https://github.com/mozilla/fxa-content-server/commit/146dd54))
* refactor(client): Rename `FX_DESKTOP_SYNC` to `SYNC_SERVICE`.
 ([5dc8b7a](https://github.com/mozilla/fxa-content-server/commit/5dc8b7a))
* refactor(client): Simplify the app-start error reporting/redirection.
 ([918ff9c](https://github.com/mozilla/fxa-content-server/commit/918ff9c))
* refactor(client): The IframeChannel is now DuplexChannel based.
 ([aa15de2](https://github.com/mozilla/fxa-content-server/commit/aa15de2))



<a name="0.42.0"></a>
### 0.42.0 (2015-07-21)


#### Bug Fixes

* **able:** update shrinkwrap ([d8fa3019](https://github.com/mozilla/fxa-content-server/commit/d8fa3019cccd1a60f3f3376b332c145aaa11a40e))
* **avatars:**
  * resize avatars before cropping them ([decc26c8](https://github.com/mozilla/fxa-content-server/commit/decc26c855c603a528ae2859eb84ea9e56260611))
  * error message does not overlap with the default avatar anymore ([5f5284f7](https://github.com/mozilla/fxa-content-server/commit/5f5284f7c304054b7229b5a5ea36f19713f38618))
  * ensure uploaded avatars dimensions are 100x100px at least ([43580105](https://github.com/mozilla/fxa-content-server/commit/4358010543d47ce129659e5cc48fdd2def4a3c63))
  * replace the word Home by Back ([c8b9bb10](https://github.com/mozilla/fxa-content-server/commit/c8b9bb101903c7bfb7b37648e0dcd44c412c7f96))
* **client:**
  * Hide the border around the marketing snippet for the firstrun flow. ([a84e2546](https://github.com/mozilla/fxa-content-server/commit/a84e254682851ef1de1c199e926ed3d558735722))
  * Ensure COPPA errors are logged. ([628b62c8](https://github.com/mozilla/fxa-content-server/commit/628b62c8ec30983909d58a946261ef6c6a76f106))
  * Handle 4xx and 5xx Basket errors. ([bc862acb](https://github.com/mozilla/fxa-content-server/commit/bc862acb9d51f21f72b86a17dc51b66b15fff00e))
  * Ensure the password manager has an email to work with. ([ff38e16a](https://github.com/mozilla/fxa-content-server/commit/ff38e16a81163ee4baa1a04d949bec7f8166646a))
  * Firstrun flow should not halt the screens after login. ([a178fa0b](https://github.com/mozilla/fxa-content-server/commit/a178fa0b75bfa47fc478065a8aa9aa4d37bc245d))
* **config:**
  * add production experiments config file ([8c87743d](https://github.com/mozilla/fxa-content-server/commit/8c87743d048e721451471071c232dc77710e9adb))
  * use dev branch of experiments ([0f3bdbc2](https://github.com/mozilla/fxa-content-server/commit/0f3bdbc225cbcaf2174469ffddc0fd1cee8421a2))
* **cookies:** redirect to /cookies_disabled if storage is disabled ([a24931f2](https://github.com/mozilla/fxa-content-server/commit/a24931f2d803dec2183d8f1292e434477b6df526), closes [#2480](https://github.com/mozilla/fxa-content-server/issues/2480))
* **forms:** fixes regression with the floating placeholder ([d9853f00](https://github.com/mozilla/fxa-content-server/commit/d9853f00cb4afc18b433d4ab6c1c145712930345), closes [#2739](https://github.com/mozilla/fxa-content-server/issues/2739))
* **log:** log errors with no message ([37af6e2a](https://github.com/mozilla/fxa-content-server/commit/37af6e2af4ff1821cb32eb6ed16187e25df7b4c9))
* **metrics:** include coppa errors in metrics ([3b5841a5](https://github.com/mozilla/fxa-content-server/commit/3b5841a5299d2716a7a77172312d57c065151440), closes [#2512](https://github.com/mozilla/fxa-content-server/issues/2512))
* **oauth:** handle short-lived access tokens for profile server requests ([b372c806](https://github.com/mozilla/fxa-content-server/commit/b372c8066cbb6ab27e8af8a2cd20c861d33f5543))
* **server:**
  * remove 'Fxa requires JavaScript' message in ie8/9 Add conditional comment to not ([158c041b](https://github.com/mozilla/fxa-content-server/commit/158c041b50d1c2d848662acb65be80c81a4146f1), closes [#2279](https://github.com/mozilla/fxa-content-server/issues/2279))
  * let server task fail if port is in use ([fb175809](https://github.com/mozilla/fxa-content-server/commit/fb175809f829b31833ca8ccea75fa1b122703763))
* **signin:** Hide the Unauthorized avatar error ([bc17e796](https://github.com/mozilla/fxa-content-server/commit/bc17e79644706f121ad0e928a7ac566bc43ee7d9))
* **styles:** Hide the service name in the firstrun flow. ([4d98dd1a](https://github.com/mozilla/fxa-content-server/commit/4d98dd1a0517b6da938ee59d32b7fd933d9f8d7e))
* **sync:** do not send sessionTokenContext to Firefox Sync ([5b29830b](https://github.com/mozilla/fxa-content-server/commit/5b29830b9f6e7c7f1065b7c4421c7baf04ae6eff), closes [#2766](https://github.com/mozilla/fxa-content-server/issues/2766))
* **tests:**
  * show the firefox --version in test logs ([f1c60a29](https://github.com/mozilla/fxa-content-server/commit/f1c60a29cc7435293d10b2ff169eafef8cbac281))
  * only log "waiting" if too many attempts ([427ef395](https://github.com/mozilla/fxa-content-server/commit/427ef3955eef8180ef02e447ebf89c3486e7e092))
  * set metrics.sample_rate based on FxaDevBox too ([8b7d469e](https://github.com/mozilla/fxa-content-server/commit/8b7d469eb693819dc42794d371c48a85508bee5a))
  * allow override of expected value from remote server ([3e734189](https://github.com/mozilla/fxa-content-server/commit/3e73418950f3d21f8eb22c9485ef8ca2816d52bd))
  * add fxaDevBox config param ([6688dd73](https://github.com/mozilla/fxa-content-server/commit/6688dd73553b18dbde7b2dea35ed4004617de747))
  * only update Fx binaries if they are stale ([989243e5](https://github.com/mozilla/fxa-content-server/commit/989243e502e92db15fe087bcc574d095fe0e911f))
  * add a test runner for intern_server tests ([1e551e37](https://github.com/mozilla/fxa-content-server/commit/1e551e3764a1102915d00625b803beed25fbfac5))


#### Features

* **avatars:** enable the gravatar option with permission prompt ([c2b5d96c](https://github.com/mozilla/fxa-content-server/commit/c2b5d96c658db2ed1f7ff4080fd116eef882f916), closes [#2053](https://github.com/mozilla/fxa-content-server/issues/2053))
* **client:**
  * Send a `signup_must_verify` event to the firstrun page on signup. ([da411363](https://github.com/mozilla/fxa-content-server/commit/da41136348eb0846af50935647d729dd6dc2c223))
  * update to fxa-js-client 0.1.30 ([d81207c5](https://github.com/mozilla/fxa-content-server/commit/d81207c58429b62b1b9c3d5fafc369cc7d564003))
  * firstrun - notify the parent of important events. ([aade4c77](https://github.com/mozilla/fxa-content-server/commit/aade4c77e01207f5c9aa80882ca3155cca46dfbe))
  * Pass Google Analytics query params to metrics. ([b0f273a2](https://github.com/mozilla/fxa-content-server/commit/b0f273a2bc8d44a4a46338dc6c231bca5d01798f))
  * Preserve `uniqueUserId` across email verifiation. ([84063546](https://github.com/mozilla/fxa-content-server/commit/8406354691085ccb748a1cb19607e431bb31717c))
  * `campaign` and `entrypoint` are sent to metrics on verification. ([2c354ae0](https://github.com/mozilla/fxa-content-server/commit/2c354ae0fc7fd063ba8f18ca0bc38f63ae100c0c))
  * Add support for `context=fx_desktop_v2` ([8830562a](https://github.com/mozilla/fxa-content-server/commit/8830562a6f8efbcc340dd36923c7b6ae5cd7f659))
* **metrics:**
  * add server google analytics events ([c549edfb](https://github.com/mozilla/fxa-content-server/commit/c549edfb3eef6056d9ca2c9d65590a7e16d9ad29))
  * Report all metrics to our backend. ([bf71368e](https://github.com/mozilla/fxa-content-server/commit/bf71368efc5d4a409c1c79201dcf8912438930da))
  * add timing metrics to the statsd collector ([90c95c7f](https://github.com/mozilla/fxa-content-server/commit/90c95c7fb339406eb2ae8db45ae0126337bfbb78))


<a name="0.41.1"></a>
## 0.41.1 (2015-07-08)


#### Bug Fixes

* **templates:** fixes issues with 50*.html templates in production mode ([09e95013](https://github.com/mozilla/fxa-content-server/commit/09e95013745f193799ac39f9b41f4bff67ee28cf), closes [#2663](https://github.com/mozilla/fxa-content-server/issues/2663))


<a name="0.41.0"></a>
## 0.41.0 (2015-07-08)


#### Bug Fixes

* **avatars:** Fix float imprecision errors when saving cropped image ([b241c698](https://github.com/mozilla/fxa-content-server/commit/b241c698871e331df7633e7e372fa44da2fd1686))
* **client:** Mozilla Payments flow is not considered an iframe. ([82c1981d](https://github.com/mozilla/fxa-content-server/commit/82c1981d942b839f7e77235cc6a29073be5c94fe))
* **content-server:** open TOS/PP in new tab if inside an iframe Check for presence of link inside ifr ([a556142e](https://github.com/mozilla/fxa-content-server/commit/a556142ec36e2f29a009a573372e885de211f5be), closes [#2351](https://github.com/mozilla/fxa-content-server/issues/2351))
* **icons:** add a precomposed icon for apple devices to avoid extra 404 requests ([df4dccd7](https://github.com/mozilla/fxa-content-server/commit/df4dccd7c0c9c92d177d2864e09715ec57b95e71), closes [#2655](https://github.com/mozilla/fxa-content-server/issues/2655))
* **lint:** Fix the eslint camelcase errors. ([b352476a](https://github.com/mozilla/fxa-content-server/commit/b352476a65b5df815191993b37760bfe56ef41bc))
* **marketing:** add a bit of top margin to the opt in ([042c210f](https://github.com/mozilla/fxa-content-server/commit/042c210f0036b3295cd3821b6bb4c4d8ae0582fc))
* **styles:** Fix the header spacing for the firstrun flow. ([b855a72b](https://github.com/mozilla/fxa-content-server/commit/b855a72ba60be43217af26a1c4c475da0630a893))
* **tests:**
  * check that content in all expected languages is available ([89591f00](https://github.com/mozilla/fxa-content-server/commit/89591f00c0be675e43762d342700fd9322f9a80a))
  * adjust code to support IE10 ([a1c7c203](https://github.com/mozilla/fxa-content-server/commit/a1c7c203893aebc09aa09bcee9aca08731e31875), closes [#2378](https://github.com/mozilla/fxa-content-server/issues/2378))


#### Features

* **avatars:** add metrics for avatar cropping operations ([79c05c97](https://github.com/mozilla/fxa-content-server/commit/79c05c9748eaef5d2073a72111284c2077e978c7))
* **metrics:** add Sentry metrics for front-end errors ([9c11f69a](https://github.com/mozilla/fxa-content-server/commit/9c11f69a9111f469fe72049ae607b7784f70df20))
* **oauth:** allow access_type query parameter ([ebcc10d4](https://github.com/mozilla/fxa-content-server/commit/ebcc10d4806ac8d2c4ae3c718a0e3547af5c9a0e))
* **signup:** adds mailcheck + ab testing ([1553651d](https://github.com/mozilla/fxa-content-server/commit/1553651d6bf5806360c6773b50002a5099e70fbf))


#### Breaking Changes

* Developer's local.json needs to be updated to remove
the `api_proxy` configuration parameter.
 ([d69a64b1](https://github.com/mozilla/fxa-content-server/commit/d69a64b1748aa6a5daf15ae680bd441f1118edab))


<a name="0.40.0"></a>
## 0.40.0 (2015-06-29)


#### Bug Fixes

* **avatars:** rounded camera cropper in google chrome ([5c4a1264](https://github.com/mozilla/fxa-content-server/commit/5c4a12642b52422753c62d7f5298f113adb92178))
* **basket:** add a bit more logging to basket-proxy-server ([2de3d6aa](https://github.com/mozilla/fxa-content-server/commit/2de3d6aa155ba08e1752369dccc1805febd76b61))
* **build:** revert use script and force it to use function mode ([faa0a02d](https://github.com/mozilla/fxa-content-server/commit/faa0a02d459b7c6c67bc774295700422a1cb3882))
* **client:**
  * Supress the malformed WebChannelMessageToContent log for errors ([531a2259](https://github.com/mozilla/fxa-content-server/commit/531a225976155e4a4ffa83d49b7a91452621145e))
  * Fix the submit button on communcation preferences page. ([fa0df9c7](https://github.com/mozilla/fxa-content-server/commit/fa0df9c77bfb3cf33ae62c596aa15bc35926c69a))
* **lint:** remove "use strict" from server code ([745e569b](https://github.com/mozilla/fxa-content-server/commit/745e569b8042858b45f95ebea23f5ae45e91f84f), closes [#2558](https://github.com/mozilla/fxa-content-server/issues/2558))
* **server:** inconsistent use of 'use strict' ([38ab1c05](https://github.com/mozilla/fxa-content-server/commit/38ab1c0516525274f2cec1fe380516c88545a7b0), closes [#1318](https://github.com/mozilla/fxa-content-server/issues/1318))
* **tests:**
  * restore first tests to run are signin and signup ([c3d474a1](https://github.com/mozilla/fxa-content-server/commit/c3d474a153c20a93f2a0086986a8cb0d9df2defd))
  * use the regularly updated firefox binaries ([8bb8e3b4](https://github.com/mozilla/fxa-content-server/commit/8bb8e3b40c16ad152f1f02e88cf78da37d32d37d))
  * fix Basket functional tests ([6adf3c0d](https://github.com/mozilla/fxa-content-server/commit/6adf3c0d837107163d84914ed4214c13d52f51ce))
  * add a run script for beta on latest ([bcb0e699](https://github.com/mozilla/fxa-content-server/commit/bcb0e69998e200b0d3fd0f0246f3ddbf32ae6c9c))


#### Features

* **client:**
  * Notify IFRAME reliers when the content height changes. ([c698324b](https://github.com/mozilla/fxa-content-server/commit/c698324b400a8be66d1b119a3c877b4b3b9da0bd))
  * Add Easter Egg to Content Server ([0a5ea8ed](https://github.com/mozilla/fxa-content-server/commit/0a5ea8ed461575fa4d194a0d1bab857278524bee))
* **metrics:** add uuid for metrics and able purposes ([89ac7a58](https://github.com/mozilla/fxa-content-server/commit/89ac7a587c31741a00cc29c8dca7d9b2042b1b48))
* **server:** Support /v1/reset_password ([043f6221](https://github.com/mozilla/fxa-content-server/commit/043f6221bcab6e396858c10bdde8b222d6ebbd3b))
* **style:** The `chromeless` style hides the header. ([7b12bbf6](https://github.com/mozilla/fxa-content-server/commit/7b12bbf68dd5e8e33d5ec05daa67c56403aa73a5))


<a name="0.39.0"></a>
## 0.39.0 (2015-06-09)


#### Bug Fixes

* **avatars:**
  * allow users to change their avatar if they have/had one ([e6a9cd0d](https://github.com/mozilla/fxa-content-server/commit/e6a9cd0d7b3f3f511d8e960cbb9978b2c5fc41d4))
  * disable the gravatar option on avatar change ([153f3d4c](https://github.com/mozilla/fxa-content-server/commit/153f3d4cfa98df75e9a819e6d5edf4f0aea7d6e9))
* **basket:**
  * only destroy the token if we successfully acquired one ([de4c26c7](https://github.com/mozilla/fxa-content-server/commit/de4c26c785fca0bbc8f6c1f742e3ed6f95ec03b5))
  * URI-encode email address in basket server urls. ([a43061d3](https://github.com/mozilla/fxa-content-server/commit/a43061d3317af3d26c15337c314e07f6ab5dade2))
* **basket-proxy:** tighten up param checking and logging ([fa5aa01d](https://github.com/mozilla/fxa-content-server/commit/fa5aa01d1e19df561b1497fc23aedd0422826abc))
* **client:** Continue email verification flow on Basket server error. ([919e64db](https://github.com/mozilla/fxa-content-server/commit/919e64dbf1389da8f03ef993613a0c7c90838e53))
* **docs:** add verification_redirect to query params ([5dff0821](https://github.com/mozilla/fxa-content-server/commit/5dff08217ae9401010e175900c892e4906cb09bd), closes [#2438](https://github.com/mozilla/fxa-content-server/issues/2438))
* **form:** fixes form autofill for Firefox and paste for iOS ([9b062568](https://github.com/mozilla/fxa-content-server/commit/9b062568ef152694be276488f01b36f203d3b2d8))
* **metrics:** measure when users add or modify their profile picture. ([e5b35659](https://github.com/mozilla/fxa-content-server/commit/e5b356594ee1c596fcfc400aa9671d21a44e797d), closes [#2294](https://github.com/mozilla/fxa-content-server/issues/2294))
* **npm:** move request to production dependency ([dcd6a50c](https://github.com/mozilla/fxa-content-server/commit/dcd6a50c98471a3c53b4798c24cb14219e46a66b))
* **oauth:** sanitize scope of untrusted reliers ([f80a57fb](https://github.com/mozilla/fxa-content-server/commit/f80a57fbe163646d59396d8c3330d162fab259af))
* **test:** Fix refreshes_metrics functional test on Firefox 18 ([52c88e54](https://github.com/mozilla/fxa-content-server/commit/52c88e543d4036733d9bbb53c7f72d7483df573f))
* **tests:**
  * more improvements to avatar tests to avoid remote timeouts ([c7a44841](https://github.com/mozilla/fxa-content-server/commit/c7a448414b7fd03e3ee7d9436504cf91c4be8e8d))
  * improve legal copy tests and update avatar tests ([11104f77](https://github.com/mozilla/fxa-content-server/commit/11104f772790ba63efca3d13a00b848be6df2771))
  * skip functional/email_opt_in test if fxaProduction=true ([c7fbe52c](https://github.com/mozilla/fxa-content-server/commit/c7fbe52cc9901caaea17bcd0c83af4bc829a7977))
  * wait for ".error" to be visible; fixes #2475 ([8ab41765](https://github.com/mozilla/fxa-content-server/commit/8ab4176525520a5125c198b16f3ae46c8b989066))


#### Features

* Email opt-in. ([8c4246ec](https://github.com/mozilla/fxa-content-server/commit/8c4246ec5afdb25a9c2fe6fc290f506ef8c2e896))
* **build:** Compress the HTML files ([39667b9a](https://github.com/mozilla/fxa-content-server/commit/39667b9aa5a599b275546e4a26ce116232e10bcb))
* **server:** add basket proxy server ([4cbfed3d](https://github.com/mozilla/fxa-content-server/commit/4cbfed3d33b70a8e35ac894e2b7ce3c61d1fdbaa))
* **tests:** Add metrics in functional tests ([18658991](https://github.com/mozilla/fxa-content-server/commit/186589914de6cd0db4ce74d81411f1174a4f26d4))


<a name="0.38.1"></a>
### 0.38.1 (2015-05-28)


#### Bug Fixes

* **oauth:** sanitize scope of untrusted reliers ([619b3429](https://github.com/mozilla/fxa-content-server/commit/619b3429a46fdcb1e19ddc53c3ec7cb4a4e3c90b))
* **tests:** wait for ".error" to be visible; fixes #2475 ([436a47c7](https://github.com/mozilla/fxa-content-server/commit/436a47c718400f7d96b89f4832f9e3c936d38a43))


<a name="0.38.0"></a>
## 0.38.0 (2015-05-26)


#### Bug Fixes

* **avatars:**
  * Redirect to settings/avatar/change on error ([6b6a5f77](https://github.com/mozilla/fxa-content-server/commit/6b6a5f77c6cc0f332b4649a22678aa9ef4278644))
  * cache the profile image after fetching ([30601d4f](https://github.com/mozilla/fxa-content-server/commit/30601d4f2ef466f9203bcb31079ada17ab470909), closes [#2429](https://github.com/mozilla/fxa-content-server/issues/2429))
* **client:** `Invalid scopes` is an error message. ([3f42a328](https://github.com/mozilla/fxa-content-server/commit/3f42a32867bcb5a4171f82c489e2e7eb2db0f858))
* **docs:**
  * add <screen_name>.refresh metrics event ([d30a95b2](https://github.com/mozilla/fxa-content-server/commit/d30a95b2838f53aa78253fbecbc63e3572fe6806))
  * add confirm resend metrics event ([492f8bbf](https://github.com/mozilla/fxa-content-server/commit/492f8bbfd77666e97e93a0e40fb3efa309d28fc5))
  * fix metrics documentation headers ([dc24d386](https://github.com/mozilla/fxa-content-server/commit/dc24d3868f1dc398691859b705f4fc6535bb7df1))
* **metrics:**
  * set metrics to 1 in local dev ([5599e91d](https://github.com/mozilla/fxa-content-server/commit/5599e91d708b6df3816aaae9a88cb7cbcaeb245c))
  * metrics for signout. ([455da813](https://github.com/mozilla/fxa-content-server/commit/455da8131ca1f7923b59c110303b19e8322281f0), closes [#2295](https://github.com/mozilla/fxa-content-server/issues/2295))
* **oauth:**
  * strip permissions that are not on the whitelist ([a6a22c0a](https://github.com/mozilla/fxa-content-server/commit/a6a22c0ab74139ed2d8ceef3a7315200e68bfa38))
  * update verification_redirect to always redirect in same browser or show "proceed ([3be6da92](https://github.com/mozilla/fxa-content-server/commit/3be6da9263abe05754ffd8e2244c114c695da94f), closes [#2436](https://github.com/mozilla/fxa-content-server/issues/2436), [#2402](https://github.com/mozilla/fxa-content-server/issues/2402))
* **tests:**
  * improve progress indicator coverage ([51cb1058](https://github.com/mozilla/fxa-content-server/commit/51cb1058bcf1f81e298d26609e11092a229685a0), closes [#2465](https://github.com/mozilla/fxa-content-server/issues/2465))
  * remove Test lib from verification_redirect ([a38d8082](https://github.com/mozilla/fxa-content-server/commit/a38d80828bca01c16406183dffd0194fb5ffe836))
  * update travis to firefox 38 ([35d0027f](https://github.com/mozilla/fxa-content-server/commit/35d0027fb8e56b35346e847c84fe26532412085a))
  * Update the submit button selector for the permissions screen tests. ([e67cbc30](https://github.com/mozilla/fxa-content-server/commit/e67cbc305513c7d945396c0cbd4cbc8223345e16))


#### Features

* `/` can be framed by allowed reliers. ([aedfae9e](https://github.com/mozilla/fxa-content-server/commit/aedfae9e1ca1c1891d9cb3b7430390bdfdcc1d98))
* **client:** Pass along a `service` and `reason` whenever signing a user in. ([32812392](https://github.com/mozilla/fxa-content-server/commit/32812392012ae583541daf9c4fa0caf1b462abc3))
* **lib:** storage lib is now able to use sessionStorage ([33c53def](https://github.com/mozilla/fxa-content-server/commit/33c53defb91f2bd8ac96e025191fd3c825945024))
* **metrics:** measure page reloads by user ([29ede010](https://github.com/mozilla/fxa-content-server/commit/29ede010010eb14ca994fba78d49674fb0d0f3d5))
* **oauth:** signal action=signup or action=signin at end of oauth flow. ([9016164b](https://github.com/mozilla/fxa-content-server/commit/9016164b7742c04ddf15169c1ccceac2a2634941))


<a name="0.37.1"></a>
### 0.37.1 (2015-05-14)


#### Bug Fixes

* **metrics:** track account deleted events ([2c296a44](https://github.com/mozilla/fxa-content-server/commit/2c296a445ed7d613ec99e3711311c122ae989a9e), closes [#2297](https://github.com/mozilla/fxa-content-server/issues/2297))
* **oauth:** serviceUri is not used for now so remove it ([b361aba3](https://github.com/mozilla/fxa-content-server/commit/b361aba35df3215105e8d57f108db3f64007e886))
* **tests:** increase timeout for password reset tests ([10a3fc6c](https://github.com/mozilla/fxa-content-server/commit/10a3fc6c340446097d9b5ebd8b50f9a573fa6f72))


<a name="0.37.0"></a>
## 0.37.0 (2015-05-13)


#### Bug Fixes

* **client:**
  * Ensure ask-password metrics are only logged once. ([bc336543](https://github.com/mozilla/fxa-content-server/commit/bc336543a7f99998f2b32d7f698934e38c8d03c0))
  * getUserMedia check for avatar change. ([0a0405bd](https://github.com/mozilla/fxa-content-server/commit/0a0405bd6f0bd4f74cb9cd0bc4634ddbeb041832))
* **oauth:**
  * bring back oauth session clearing to WebChannels ([7487fe65](https://github.com/mozilla/fxa-content-server/commit/7487fe6582b8bf946275a2452bcbb0fa8d483ae9))
  * Ensure we can derive relier keys during the signup flow. ([fd2fc72d](https://github.com/mozilla/fxa-content-server/commit/fd2fc72d3af8abaa7acff61f026c166fc306d3c3))
* **signup:** make email suggestion tooltip keyboard accessible ([6d40efbb](https://github.com/mozilla/fxa-content-server/commit/6d40efbb9153fed8d88d2aa455b43eaaf591637a), closes [#2185](https://github.com/mozilla/fxa-content-server/issues/2185))
* **tests:**
  * Fix the oauth permissions tests. ([2b479e1e](https://github.com/mozilla/fxa-content-server/commit/2b479e1e563790d442951e4989cc303e71bca85f))
  * more timeout and fix element .end() for OAuth tests ([6296db62](https://github.com/mozilla/fxa-content-server/commit/6296db621dafe10de8808bd992957495484ad783))
  * add untrusted app to TeamCity configs ([33a97662](https://github.com/mozilla/fxa-content-server/commit/33a97662990370e8d4e46d65fabc4038f90f347d))
  * stabilize tos and pp functional tests ([50994dc6](https://github.com/mozilla/fxa-content-server/commit/50994dc6c73120deeea5f70a93ade904878e3701))


#### Features

* **client:**
  * Sync over WebChannel glue ([92b118c9](https://github.com/mozilla/fxa-content-server/commit/92b118c9711e3d69078e9fe68b10d83b0f243715))
  * Add a DuplexChannel, convert the WebChannel to a duplex channel. ([9b1ebb1e](https://github.com/mozilla/fxa-content-server/commit/9b1ebb1e83b1a795f1a249884992ed316b7d3329))
* **metrics:**
  * Log metrics about whether we ask for a password at signin: ([838c365e](https://github.com/mozilla/fxa-content-server/commit/838c365ec5528141c178f1d03deae665141e9b06))
  * adds DataDog integration ([d10b0de0](https://github.com/mozilla/fxa-content-server/commit/d10b0de0fba0679dd12028e7dad1370bc051ace0))
* **oauth:**
  *  'verification_redirect' option for OAuth reliers ([a5fdaee9](https://github.com/mozilla/fxa-content-server/commit/a5fdaee90b61b7aa3ecc5c39e6d2499a19632750))
  * show permission screen for untrusted reliers ([123821de](https://github.com/mozilla/fxa-content-server/commit/123821de702f59b813bb0900a18fd3c25dcc1886))
  * suggest account to use during sign up if possible ([7fc06358](https://github.com/mozilla/fxa-content-server/commit/7fc06358cdd525793047b5370ae13977dbade618))
* **test:** Print unit test names when they fail in travis. ([08932c5a](https://github.com/mozilla/fxa-content-server/commit/08932c5adc2956cf0b05a9a820e97b1965e4d6dd))


<a name="0.36.3"></a>
### 0.36.3 (2015-05-01)


#### Bug Fixes

* **tests:** stabilize tos and pp functional tests ([d14d608a](https://github.com/mozilla/fxa-content-server/commit/d14d608a1e9b487dc296b75c9c957d465e3d144e))


<a name="0.36.2"></a>
### 0.36.2 (2015-04-30)


#### Features

* **oauth:** suggest account to use during sign up if possible ([186b2d74](https://github.com/mozilla/fxa-content-server/commit/186b2d742d3d628dc4f79a3d94d1a44029f2a5ba))


<a name="0.36.1"></a>
### 0.36.1 (2015-04-29)


#### Bug Fixes

* **client:** If a relier wants keys, give them keys. ([519ca117](https://github.com/mozilla/fxa-content-server/commit/519ca117ecdbb05211041d352bb0f0b6d99f68e7))


<a name="0.36.0"></a>
## 0.36.0 (2015-04-27)


#### Bug Fixes

* **csp:** use only the origin part of fxaccount_url (with /v1 is a csp violation) ([db55881b](https://github.com/mozilla/fxa-content-server/commit/db55881b596136e4a3d5d39a5b99dac1381f6110))
* **css:** Show links in TOS/PP text next to the original anchor text. ([5fcb9664](https://github.com/mozilla/fxa-content-server/commit/5fcb9664d9e54a6878c940eaf6dfcd2d6b0c8ea9))
* **icons:** fixes 404s for iOS icons ([e488c8af](https://github.com/mozilla/fxa-content-server/commit/e488c8af54b432ec9030692c4027c73f7a8425cb), closes [#2062](https://github.com/mozilla/fxa-content-server/issues/2062))
* **l10n:**
  * missing legal template redirect should start with "/" ([0498008a](https://github.com/mozilla/fxa-content-server/commit/0498008a2a658de3d58efe0c3f190d76be8cb4b3))
  * copy es-ES legal templates to es ([76d895a1](https://github.com/mozilla/fxa-content-server/commit/76d895a147e21c48bbf033fe824609dcf6ad5f4c), closes [#2305](https://github.com/mozilla/fxa-content-server/issues/2305))
* **styles:** Hide the top-right Mozilla link if signing into Sync on Fx for iOS ([a536e557](https://github.com/mozilla/fxa-content-server/commit/a536e5575d94ae9a015ac034e3b60cd80bf5be79))
* **test:** make asyncTimeout settable from the intern command line ([77ddde9b](https://github.com/mozilla/fxa-content-server/commit/77ddde9bc36888f3320aa020652e092471ce26c0))


#### Features

* **client:** Add the `change_password` and `delete_account` messages to the FxDesktop broker. ([56306f10](https://github.com/mozilla/fxa-content-server/commit/56306f10d214df3cb3e7327715a1e3ae8cab60f7))
* **test:** Add env-test.js unit tests. ([207a84ce](https://github.com/mozilla/fxa-content-server/commit/207a84ceb409fd32889659169d9e5dde27927495))


<a name="0.35.0"></a>
## 0.35.0 (2015-04-13)


#### Bug Fixes

* **auth-broker:** fixes fx-desktop channel tests for FF18 and FxOS 1.* ([2cadc2bd](https://github.com/mozilla/fxa-content-server/commit/2cadc2bd378aff2d27704e063b19ef7ca61b4cca))
* **avatars:** show a default avatar if a uploaded avatar does not load ([cbdc5a11](https://github.com/mozilla/fxa-content-server/commit/cbdc5a11a2822738176a0938c4c2290a8eef242b), closes [#1804](https://github.com/mozilla/fxa-content-server/issues/1804))
* **client:** Replace the `ﬁ` with `fi` (no ligature). ([43a402ef](https://github.com/mozilla/fxa-content-server/commit/43a402ef32086e9abfac2d3d7b2e6a8273e2d98b))
* **csp:**
  * use camelCase option keys instead of e.g., "img-src" ([730939aa](https://github.com/mozilla/fxa-content-server/commit/730939aac69145af76a153b29cb4ea6c2be42417))
  * improve content-security-policy configuration ([bad1e80d](https://github.com/mozilla/fxa-content-server/commit/bad1e80dc5fda0a3f1b432f8b1e596417fc93939))
* **jscs:** allow the 'other' quote mark to be used, but only to avoid having to escape ([b4fc1fda](https://github.com/mozilla/fxa-content-server/commit/b4fc1fdaef199922ed2518071b7ae7008095b0af))
* **server:**
  * Serve HTML templates for TOS/PP if Accept header is not `text/partial` ([3207c1d8](https://github.com/mozilla/fxa-content-server/commit/3207c1d84ca1ac3189a3f82ab4966127db77bf9f))
  * migrate to Express 4 ([bc008ce4](https://github.com/mozilla/fxa-content-server/commit/bc008ce488e6df56498909418f172422c586b0d9), closes [#2214](https://github.com/mozilla/fxa-content-server/issues/2214))
* **settings:** allow settings page redirect to work with extra query params ([4f8d64c0](https://github.com/mozilla/fxa-content-server/commit/4f8d64c025fcaffb95f1453b2f39a3b48fec1ef4), closes [#2301](https://github.com/mozilla/fxa-content-server/issues/2301))
* **teamcity:** replace execSync with sync-exec module ([57cf75a1](https://github.com/mozilla/fxa-content-server/commit/57cf75a1b9c50f71db1f157c052cb68ff1c57640))
* **test:** add missing "/v1" on FXA_AUTH_ROOT ([09b8ca91](https://github.com/mozilla/fxa-content-server/commit/09b8ca91ab627dd707d277f8804e54ff7fe421c8))
* **tests:**
  * tasks for running latest-beta and latest-esr builds in stage ([1c84e7f8](https://github.com/mozilla/fxa-content-server/commit/1c84e7f8203290c6011f4bd60444244ec2a55d90))
  * create a task to ensure latest release, beta and esr builds are available ([bceb2e22](https://github.com/mozilla/fxa-content-server/commit/bceb2e223ebf8a9867bba14553389f534b962eb5))


#### Features

* **client:** Add "Chromeless" styling - remove all the extra stuff. ([b17dc56b](https://github.com/mozilla/fxa-content-server/commit/b17dc56b838d74cf98bfe03a3fce2fb83663a11f))
* **docs:** Add documentation about the accepted query parameters. ([295fc00e](https://github.com/mozilla/fxa-content-server/commit/295fc00eb839f3026ed833b825b6328696071e28))


<a name="0.34.0"></a>
## 0.34.0 (2015-03-31)


#### Bug Fixes

* **client:**
  * Only send postMessages to and from the expected parent when using the iframe. ([0a453d1c](https://github.com/mozilla/fxa-content-server/commit/0a453d1cb5375390558bd34d0b75b4c3775d4468))
  * Channel timeouts are informative, they no longer throw errors. ([0b7770c1](https://github.com/mozilla/fxa-content-server/commit/0b7770c1139519965261898750ae281ca4200f76))
  * Extract the COPPA datepicker logic into its own module. ([a368072d](https://github.com/mozilla/fxa-content-server/commit/a368072d8790cd5dae78fa2af2ea6d580da3d1d4))
* **l10n:** sv is no longer maintained, copy strings from sv-SE ([7d28bfcd](https://github.com/mozilla/fxa-content-server/commit/7d28bfcdc4a4bd697bedcd5555ea233312cbde81), closes [#1773](https://github.com/mozilla/fxa-content-server/issues/1773))
* **server:** Translate static pages (in dev mode too!). ([28e5759d](https://github.com/mozilla/fxa-content-server/commit/28e5759dfa71b1476233f200ff68bfee6da993b1))
* **test:** Fix the account locked tests when run against latest. ([45073cf6](https://github.com/mozilla/fxa-content-server/commit/45073cf66cf69118251c85846f6ce0e330f8bafd))


#### Features

* **client:** Add the account locked flows. ([8e405298](https://github.com/mozilla/fxa-content-server/commit/8e405298b8fee3b1e5c4e495a006d42580432c49))
* **settings:** redirect to avatar change page when query param setting=avatar ([344f9c70](https://github.com/mozilla/fxa-content-server/commit/344f9c70ebd7fc7bae9eb9ab31c8682e42c64b47), closes [#2249](https://github.com/mozilla/fxa-content-server/issues/2249))


<a name="0.33.0"></a>
## 0.33.0 (2015-03-16)


#### Bug Fixes

* **client:**
  * Use standard error formats for expired and damaged verification links. ([86384b2f](https://github.com/mozilla/fxa-content-server/commit/86384b2fe95e6cac0d36ca3258884116f689a784))
  * Opt in to the iframe broker. ([09b9bac2](https://github.com/mozilla/fxa-content-server/commit/09b9bac2a7c8aea37b2a79a67a1008d3132d6f73))
  * Ensure console errors are displayed in Firefox on catastrophic startup error. ([47a8c299](https://github.com/mozilla/fxa-content-server/commit/47a8c2995cee27f9d1f5bb78383682b0b4708cee))
* **docs:**
  * Update docs for the new iframe message format. ([20121dc7](https://github.com/mozilla/fxa-content-server/commit/20121dc793a7d7fe7a375d293d348c561d4447b8))
  * Correct the documentation of the afterResetPasswordConfirmationPoll function. ([033ad26e](https://github.com/mozilla/fxa-content-server/commit/033ad26e07fc88b9c0ffe662233826d7e787bbab))
* **tests:** Start the auth-db server for travis. ([8f21f017](https://github.com/mozilla/fxa-content-server/commit/8f21f01701a361b16ea5a6ebd4d63829c4d5cd6d))


#### Features

* **channels:** broadcast messages across across all channels ([dfacd358](https://github.com/mozilla/fxa-content-server/commit/dfacd3581558d08a1e803fe0a50dc0e45d64437a), closes [#2095](https://github.com/mozilla/fxa-content-server/issues/2095))
* **docs:** Document the email suggestion events. ([29b0fadb](https://github.com/mozilla/fxa-content-server/commit/29b0fadb69f641f8df3226280fabb16e96bb2c8e))


<a name="0.32.0"></a>
## 0.32.0 (2015-03-03)


#### Bug Fixes

* **avatars:**
  * show error if avatar removal fails ([9dcd9b65](https://github.com/mozilla/fxa-content-server/commit/9dcd9b650cc4d30d907987f78ac419e88587270d))
  * fix avatar image uploads ([1e6ecd8a](https://github.com/mozilla/fxa-content-server/commit/1e6ecd8a2c8a41f7354748df398024c3413ab91e))
  * prevent flicker when loading avatars on settings pages ([c3be4f45](https://github.com/mozilla/fxa-content-server/commit/c3be4f45b3b7793261b552d4bdc4b9a66ca27f35), closes [#2105](https://github.com/mozilla/fxa-content-server/issues/2105))
* **build:** simple default grunt command ([9f101ee1](https://github.com/mozilla/fxa-content-server/commit/9f101ee196b706cd3519ad29b18416b25d0ced77))
* **client:**
  * Simplify the message serialization for the iframe channel. ([1af5009d](https://github.com/mozilla/fxa-content-server/commit/1af5009d092935f345ce19f3c6e9befccb2780df))
  * Add "successfully" to most success messages. ([ec4b4fcc](https://github.com/mozilla/fxa-content-server/commit/ec4b4fcc6c00a26c8241d550c322b8e88dd4642c))
* **errors:** reverts the "Invalid verification code" string back to normal. r=vladikoff ([14cbf41d](https://github.com/mozilla/fxa-content-server/commit/14cbf41d78d918382fc414d67abc0a4fa6d81619))
* **l10n:** join server templates so email strings are not overwritten ([b0898f76](https://github.com/mozilla/fxa-content-server/commit/b0898f76f700bceda4f3d18816d69d62ed8a4fb8))
* **pages:** 502 pages should be allowed to be iframed ([00e69196](https://github.com/mozilla/fxa-content-server/commit/00e69196560a3d335443ff0cc64bd8fcd04c4208), closes [#2056](https://github.com/mozilla/fxa-content-server/issues/2056))
* **router:**
  * make sure loaded message is still sent after a view render error ([79c93978](https://github.com/mozilla/fxa-content-server/commit/79c93978bd4e8859a5156b89d3ed09b52d5ba5d1))
  * anchor event handler should handle event bubbling ([cd4a64ca](https://github.com/mozilla/fxa-content-server/commit/cd4a64cadcbba51ea862e1a8ebc13fa4e6bed724))
* **server:** Ensure templates render text in dev mode. ([b7c5eb0a](https://github.com/mozilla/fxa-content-server/commit/b7c5eb0a400974e54d78571f2888adbaca4f3ed2))


#### Features

* **docker:** Dockerfile and README update for basic docker development workflow ([4b244644](https://github.com/mozilla/fxa-content-server/commit/4b2446441b6da3805cc7a03d98c1f0d7268a5b58))
* **docs:** Document the iframe protocol. ([02e0fc49](https://github.com/mozilla/fxa-content-server/commit/02e0fc49eed086ebe12e46394d861077634e86e9))
* **login:** indicate whether the account is verified in the fx-desktop channel ([6c5c0c42](https://github.com/mozilla/fxa-content-server/commit/6c5c0c429e89cea7fb78a7cf894a4d6b9c67b00e), closes [#2094](https://github.com/mozilla/fxa-content-server/issues/2094))
* **oauth:** Expose relier-specific encryption keys to OAuth WebChannel reliers. ([a0318c28](https://github.com/mozilla/fxa-content-server/commit/a0318c28a5daf1d311ef926715c6a9dad391dab0), closes [#2088](https://github.com/mozilla/fxa-content-server/issues/2088))
* **signup:** suggest proper email spelling ([a825a83f](https://github.com/mozilla/fxa-content-server/commit/a825a83f4903231c1316d6ba14b3b219dba2e737), closes [#871](https://github.com/mozilla/fxa-content-server/issues/871))
* **tests:** Boost the test coverage of router.js ([0e7d06e6](https://github.com/mozilla/fxa-content-server/commit/0e7d06e68f43fedf7370dd596600b3637b742d93))


<a name="0.31.0"></a>
## 0.31.0 (2015-02-17)


#### Bug Fixes

* **client:** Redirect to `/settings` for direct access users who verify signup or password re ([31e4b2c6](https://github.com/mozilla/fxa-content-server/commit/31e4b2c64b593c73c7447bf6eb7b51b4357603c7))
* **metrics:** track window.onerror ([4f9bd296](https://github.com/mozilla/fxa-content-server/commit/4f9bd2963cb422b3dc47551fdd7306157e4c46bd))


#### Features

* **metrics:** Log more screen info ([85a05e41](https://github.com/mozilla/fxa-content-server/commit/85a05e4113aef899e2ebb3e113076232b5b25a22))


<a name="0.30.0"></a>
## 0.30.0 (2015-02-02)


#### Bug Fixes

* **avatars:** fixes Firefox 18 dataType json request ([005c9f5d](https://github.com/mozilla/fxa-content-server/commit/005c9f5d6376c1654d8751592baa45d03a3b2d40), closes [#1930](https://github.com/mozilla/fxa-content-server/issues/1930))
* **l10n:** use en as the default language instead of en-US ([8f599d54](https://github.com/mozilla/fxa-content-server/commit/8f599d54a340ba9168ae6f77c00ceeac67d94efe), closes [#2072](https://github.com/mozilla/fxa-content-server/issues/2072))
* **xhr:** send correct JSON content-type and accept headers to api servers ([8dc69d0b](https://github.com/mozilla/fxa-content-server/commit/8dc69d0bc012b1e788958f7eb8e595650d5d249b))


#### Features

* **avatars:** set the account by uid when visiting avatar pages ([d9f5649e](https://github.com/mozilla/fxa-content-server/commit/d9f5649e8c80b76af98a08dcbdaf94cd51e21bf8), closes [#1974](https://github.com/mozilla/fxa-content-server/issues/1974), [#1876](https://github.com/mozilla/fxa-content-server/issues/1876))
* **client:** Add a `loaded` message for the fx-desktop and iframe brokers. ([c9ca23e8](https://github.com/mozilla/fxa-content-server/commit/c9ca23e837b43a8b08c055766dd66a43ab82acfe))
* **l10n:** add az locale to list ([0acd097e](https://github.com/mozilla/fxa-content-server/commit/0acd097e36395a42ba0e55f18685778f592dc2ea), closes [#1774](https://github.com/mozilla/fxa-content-server/issues/1774))
* **metrics:**
  * Add `signup.customizeSync.(true|false)` metrics. ([919f9281](https://github.com/mozilla/fxa-content-server/commit/919f928178488dc4d022242704d77cbb4e56aa15))
  * Log whether the user changes the password visibility. ([13b2b835](https://github.com/mozilla/fxa-content-server/commit/13b2b83534106482f43877e3e0dd1fe042e33dbd))


<a name="0.29.0"></a>
## 0.29.0 (2015-01-20)


#### Bug Fixes

* **avatars:** make avatar navigation l10n friendly ([014b4ec5](https://github.com/mozilla/fxa-content-server/commit/014b4ec59871b4c831689c146b732ed83141bbb1), closes [#1729](https://github.com/mozilla/fxa-content-server/issues/1729))
* **client:**
  * Do not display errors after window.beforeunload is triggerred. ([2e080e81](https://github.com/mozilla/fxa-content-server/commit/2e080e817496767811fb73b9ba317b3dc538e1e1))
  * Disable the sign up confirmation poll for Sync. ([e6421a71](https://github.com/mozilla/fxa-content-server/commit/e6421a711c883cb098b2014674c4e4b7a60f5589))
  * Only request keys from the server for Sync users. ([283b41b4](https://github.com/mozilla/fxa-content-server/commit/283b41b44ce32f60ce50f9273bc583265ca7324a))
* **iframe:** fixes styling issues caused by the iframe environment #2 ([9347d818](https://github.com/mozilla/fxa-content-server/commit/9347d8184b098649de166a1ccad10d3e0f79a3bb), closes [#2010](https://github.com/mozilla/fxa-content-server/issues/2010))
* **logging:** switch to mozlog ([a346b9d1](https://github.com/mozilla/fxa-content-server/commit/a346b9d102eb5ef20430cb15f69535dc4ec2af8b), closes [#1994](https://github.com/mozilla/fxa-content-server/issues/1994))
* **signin:** better reject with errors ([2e6c3bbd](https://github.com/mozilla/fxa-content-server/commit/2e6c3bbd34b227bd2379648963c0958f1d8d134d), closes [#2031](https://github.com/mozilla/fxa-content-server/issues/2031))
* **tests:**
  * fail when not enough coverage, add more oauth-errors coverage ([87be18f7](https://github.com/mozilla/fxa-content-server/commit/87be18f79e4c01ee7670647ca86b93488feb0ca6))
  * better functional tests for age dropdowns ([01c70f95](https://github.com/mozilla/fxa-content-server/commit/01c70f95bc886b142cca787307e991594815ecbb))


#### Features

* Check for required OAuth parameters on startup. ([52f65f78](https://github.com/mozilla/fxa-content-server/commit/52f65f78c1ec2b95db2c7cc2cfa135280c2bf204))
* **client:**
  * force_auth action for oauth! ([82a6c0be](https://github.com/mozilla/fxa-content-server/commit/82a6c0be7973056a73b6c6de067638d3b816cda7))
  * Give the relier the ability to overrule cached credentials. ([74cb38e1](https://github.com/mozilla/fxa-content-server/commit/74cb38e11c955e3a1537fabc4454e3c73782bab0))
* **docs:** Start on an architecture doc ([4a3c0540](https://github.com/mozilla/fxa-content-server/commit/4a3c05400dc85f83a473509e441e24b30652a493))
* **error-pages:** add a static 502.html error page for nginx to route to ([fe343454](https://github.com/mozilla/fxa-content-server/commit/fe343454d2064327df3c866f12085ea38aca5e51))


<a name="0.28.0"></a>
## 0.28.0 (2015-01-05)


#### Bug Fixes

* **account:** filter account.toJSON ([6044aa6d](https://github.com/mozilla/fxa-content-server/commit/6044aa6dfdccf4e88a3c2859d63ca3cf27008904))
* **build:** generate sourcemaps ([fdcf92fd](https://github.com/mozilla/fxa-content-server/commit/fdcf92fda50a98cf3a706616de997d0ef8455589), closes [#258](https://github.com/mozilla/fxa-content-server/issues/258))
* **client:**
  * We broke password managers with `autocomplete=off` on password fields! ([7df783f2](https://github.com/mozilla/fxa-content-server/commit/7df783f2fce77db869cd4c9076a75be0bc87e112))
  * OAuth/redirect users who paste the verification link into the original tab shoul ([86b1c5cb](https://github.com/mozilla/fxa-content-server/commit/86b1c5cb0649129dbdad8ddbbc4a1467f21c4771))
  * Allow Fx18 to use the iframe flow. ([c2020f85](https://github.com/mozilla/fxa-content-server/commit/c2020f856ffc31034b1fe124031cc5f232e8d2ea))
* **docs:** update AUTHORS list ([09aec587](https://github.com/mozilla/fxa-content-server/commit/09aec587119c54332c87fd5c0984420a59e2f036), closes [#1981](https://github.com/mozilla/fxa-content-server/issues/1981))
* **iframe:** fixes styling issues caused by the iframe environment ([740006de](https://github.com/mozilla/fxa-content-server/commit/740006de68e291412399c9e275bb888c0cf11eca), closes [#2010](https://github.com/mozilla/fxa-content-server/issues/2010))
* **metrics:** Convert all `_` in screen names to `-`. ([726d9017](https://github.com/mozilla/fxa-content-server/commit/726d90170beee05b3c7d22c069d8bb6ba0a0d403))
* **server:** Allow the 500 and 503 pages to be iframed. ([b25faa2c](https://github.com/mozilla/fxa-content-server/commit/b25faa2c2ff1e99c1628b0ba210fd0914639fd52))
* **signin:**
  * set the current account after logging in with cached sync account ([9732f05f](https://github.com/mozilla/fxa-content-server/commit/9732f05fa5ede4142b0c4b9187945edc1f145c83))
  * pass account data to broker instead of using currentUser ([aeb4aa15](https://github.com/mozilla/fxa-content-server/commit/aeb4aa15d6a228166339de7a40c7991f644d7440), closes [#1973](https://github.com/mozilla/fxa-content-server/issues/1973))
* **styles:** make sure normalize.css is used in production ([28ff205e](https://github.com/mozilla/fxa-content-server/commit/28ff205e648e99b4e2d60ced78551a910175763a), closes [#1997](https://github.com/mozilla/fxa-content-server/issues/1997))
* **sync:** correct a typo that voided the customize sync option ([8f78e1d6](https://github.com/mozilla/fxa-content-server/commit/8f78e1d6ffadea035d75764d5b3f33118ac69d69))
* **tests:** fix up select dropdown ([995a8a5a](https://github.com/mozilla/fxa-content-server/commit/995a8a5a75fe6698145a09a998a423710ae28ee2))


#### Features

* **client:** An Fx Sync relier can specify `customizeSync=true` to force the Customize Sync c ([a4a26f91](https://github.com/mozilla/fxa-content-server/commit/a4a26f9189ca1776f1b0f8087b42eba9a3ef3eef))
* **metrics:** Report distinct metrics codes for missing and invalid emails ([71489471](https://github.com/mozilla/fxa-content-server/commit/71489471a0916f0a1b17dec36096ad7d1b30adbb))


<a name="0.27.0"></a>
## 0.27.0 (2014-12-08)


#### Bug Fixes

* **client:**
  * WebChannel/Hello screen and event fixes. ([e67d2158](https://github.com/mozilla/fxa-content-server/commit/e67d2158e6e0264a4c58a78c8474f408ac9c5dba))
  * Ensure the web-channel flows match expected behavior. ([0cbcf9a6](https://github.com/mozilla/fxa-content-server/commit/0cbcf9a6ffa39a4f2996615b4c79a6425ea0f670))
  * Show the back button for reset_password, even if an email is on the URL query st ([9e293664](https://github.com/mozilla/fxa-content-server/commit/9e29366405dd2f828975ad3608da86f1bb37c1bb))
  * Go to the /cookies_disabled screen instead of the /500 screen if cookies are dis ([e9433b7a](https://github.com/mozilla/fxa-content-server/commit/e9433b7ac8f16db89335d513fdc46f7081f16067))
* **confirm:** redirect to signup on bounced email error ([bb3c8d8c](https://github.com/mozilla/fxa-content-server/commit/bb3c8d8c6cec414d3b09c753f31bafb0029b0619), closes [#1902](https://github.com/mozilla/fxa-content-server/issues/1902))
* **docs:** add Bower usage to CONTRIBUTING ([dc9db2d7](https://github.com/mozilla/fxa-content-server/commit/dc9db2d78170d7d1e3efdc0985d5b750721742f1))
* **l10n:** use a less spammy email headline ([f2efc82b](https://github.com/mozilla/fxa-content-server/commit/f2efc82b57d4bc76d2ce2b0fe496736d9735ccb4), closes [#1849](https://github.com/mozilla/fxa-content-server/issues/1849))
* **metrics:** Show the correct screen name in the iframe flow metrics. ([44c630b5](https://github.com/mozilla/fxa-content-server/commit/44c630b5d96643329e82273c2d6622bff0eb6e81))
* **signup:** block signup attempts with @firefox.com emails. ([b41389fc](https://github.com/mozilla/fxa-content-server/commit/b41389fcdb6a7ae7a909c4862a43b17939c4a07b), closes [#1859](https://github.com/mozilla/fxa-content-server/issues/1859))
* **style:** marketing snippet offset ([ddbacce7](https://github.com/mozilla/fxa-content-server/commit/ddbacce7fe238dfbf6c27242fb3c470a6fe4814d))
* **styles:** no more underscored classes ([46e0cc0e](https://github.com/mozilla/fxa-content-server/commit/46e0cc0e916c705dbc8c5fe6249277c305e889e4))
* **test:**
  * allow custom Firefox binary locations for tests ([4338d193](https://github.com/mozilla/fxa-content-server/commit/4338d1931075fe52276030a788c8422701863d7b))
  * check that signin is complete before proceeding ([ad07160d](https://github.com/mozilla/fxa-content-server/commit/ad07160d5169f8169aed339098bae28187d746a2))
  * No longer redirect on the web channel tests. ([21863591](https://github.com/mozilla/fxa-content-server/commit/2186359155692c5bddf1d21d749dc5a8b1800082))
  * Fix the 'Unexpected error' flash in the sign_in tests. ([58780398](https://github.com/mozilla/fxa-content-server/commit/587803989ee847fa6071f83deaa2b38e0ff2d6a0))
  * Remove the inter-test dependencies in the reset-password tests. ([1a198fdd](https://github.com/mozilla/fxa-content-server/commit/1a198fddc3521b7dec7a1d2fb1cd92624373b5a5))
* **tests:**
  * add iframe app to latest tester ([d5216304](https://github.com/mozilla/fxa-content-server/commit/d5216304f11bc43dc6756ef35d2529e131213b6e), closes [#1959](https://github.com/mozilla/fxa-content-server/issues/1959))
  * update sauce tests to firefox 33 ([d5884034](https://github.com/mozilla/fxa-content-server/commit/d5884034890031c2ae9a808de776cb7869194e92))
  * fix avatar crop transition. ([89b8225c](https://github.com/mozilla/fxa-content-server/commit/89b8225c1179f0d3ccb49073f8645975bb617287), closes [#1836](https://github.com/mozilla/fxa-content-server/issues/1836))


#### Features

* **client:**
  * Add the iframe flow. ([8561ec3c](https://github.com/mozilla/fxa-content-server/commit/8561ec3c1d06763f454f4ac7cb8ef142eb0c01b0))
  * Allow TLD only domain names in email addresses ([e3487a04](https://github.com/mozilla/fxa-content-server/commit/e3487a04f78eba4920b3c78cb20c29e777099624))
* **metrics:**
  * Add the `campaign` metric. ([21e18a96](https://github.com/mozilla/fxa-content-server/commit/21e18a96eb607fbfe412d3dfc3c2ea12918f5afe))
  * Add the `isMigration` field to the reported metrics. ([d9f7ddd1](https://github.com/mozilla/fxa-content-server/commit/d9f7ddd18d8a5e2964949cd9dbf562368e689cfc))
* **test:** Add more functional tests! ([a43d65f9](https://github.com/mozilla/fxa-content-server/commit/a43d65f933e32bd711c1ec50ec83520e3d9d66ee))


<a name="0.26.2"></a>
### 0.26.2 (2014-11-20)


#### Bug Fixes

* **client:** Go to the /cookies_disabled screen instead of the /500 screen if cookies are dis ([d12d6ec8](https://github.com/mozilla/fxa-content-server/commit/d12d6ec88de44bb1b8e0774b0b190089a0672c54))


<a name="0.26.1"></a>
### 0.26.1 (2014-11-17)


#### Bug Fixes

* **l10n:** update the header font mixin name for locales that use system fonts ([60d05bb9](https://github.com/mozilla/fxa-content-server/commit/60d05bb9192c38c57a74364cf5e3c680b4aa2fc4))


<a name="0.26.0"></a>
## 0.26.0 (2014-11-14)


#### Bug Fixes

* **accounts:** only fetch access token if verified ([d3168850](https://github.com/mozilla/fxa-content-server/commit/d3168850a23a314cdf6477c5d74794e819561c84))
* **avatars:**
  * ensure the default image background is covered by the profile image ([387e3246](https://github.com/mozilla/fxa-content-server/commit/387e3246a9f5fcd3bd474d7df7c93f6ce2f0444f))
  * load profile image on settings and sign in pages if available ([382c9db9](https://github.com/mozilla/fxa-content-server/commit/382c9db980753300b38b3f767aa071a1163ccf73), closes [#1727](https://github.com/mozilla/fxa-content-server/issues/1727))
* **broker:** fix desktop broker to forward account data before confirm ([0492140e](https://github.com/mozilla/fxa-content-server/commit/0492140e90cc85535681dce1e2daf24d456f44c6))
* **client:**
  * Fixed missing spinner on subsequent requests. ([910ff4dd](https://github.com/mozilla/fxa-content-server/commit/910ff4ddad0768c2d5d796a7abb6701381308271))
  * Notify Sync of unverified logins and signups before the user verifies her email  ([8943f1f7](https://github.com/mozilla/fxa-content-server/commit/8943f1f7e58f13c1e4297e0c8268be80c8ea41d1))
  * The Sync flow should not notify the browser of login after the signup confirmati ([3ba53720](https://github.com/mozilla/fxa-content-server/commit/3ba5372020c32fb0eace40e8530137f70c77da56))
  * Autofocus on /signup works again. ([7f142421](https://github.com/mozilla/fxa-content-server/commit/7f142421495d74f5bd13e4dd3a7f31bab2ac69ea))
  * The FxDesktop broker no longer sends the `session_status` message on startup. ([8f414c4a](https://github.com/mozilla/fxa-content-server/commit/8f414c4a0b9cc70d2c243897c102368d79021be2))
  * Ensure the spinner stays spinning after signin for Sync/OAuth. ([5c74b8a2](https://github.com/mozilla/fxa-content-server/commit/5c74b8a228120314412917db1531602f8cdb4c45))
  * Do not fail on startup if cookies or access to dom.storage is disabled. ([e084cba7](https://github.com/mozilla/fxa-content-server/commit/e084cba7ffc8ba8b2f950024b9576368921c3631))
  * Ensure the Loop initiated reset password verification flow sends OAuth credentia ([a91e27b5](https://github.com/mozilla/fxa-content-server/commit/a91e27b5ad74798fbf99c5974966da7c0b0469c0))
* **images:** optimize images with new optipng ([780ff760](https://github.com/mozilla/fxa-content-server/commit/780ff76029cfcd15911ded01ccd80fef977a4135))
* **style:**
  * remove end padding from text inputs ([07dacd9d](https://github.com/mozilla/fxa-content-server/commit/07dacd9d423e10bf30c8c7b000de40bf03a8a7ac))
  * tos/pn layout overlap ([53d8a7b3](https://github.com/mozilla/fxa-content-server/commit/53d8a7b38d220c9323af57a4cb06cf9f258cfc77))
* **styles:**
  * spinning wheel affects button height ([3d536417](https://github.com/mozilla/fxa-content-server/commit/3d536417bd96c6d291a848c5459e821e25b77db1))
  * show password border radius ([20270acd](https://github.com/mozilla/fxa-content-server/commit/20270acd423387cc4deb5826b2d0b020230d2434))
  * odd wrapping on choose account and reset pwd links on sign in in some l10ns ([f454d9d3](https://github.com/mozilla/fxa-content-server/commit/f454d9d3c86c77d162498a18f2129a59d926cb22))
* **test:** Ensure the web channel tests complete. ([46b578d6](https://github.com/mozilla/fxa-content-server/commit/46b578d67e01a6fc4eb17f59ab4c0c22c510706a))


#### Features

* **client:**
  * Allow the user to restart the signup flow on email bounce. ([896d1f47](https://github.com/mozilla/fxa-content-server/commit/896d1f470fc70614feb8e66a1bd57a1e0dedb3fb))
  * Add some brokers! ([83ee1861](https://github.com/mozilla/fxa-content-server/commit/83ee186129cf28e49d88942aaef47bd5d48e6eb1))
* **test:** Add functional test for web channel flow when user signs up, closes original tab ([c2b51b9d](https://github.com/mozilla/fxa-content-server/commit/c2b51b9d5e580fa1575d73236a00dc445cc77c51))


<a name="0.25.0"></a>
## 0.25.0 (2014-10-29)


#### Bug Fixes

* **chrome:** fix a "read-only" strict mode error in Chrome ([c15de01b](https://github.com/mozilla/fxa-content-server/commit/c15de01b706e5cadeb59965182267c3bdb73cbc9))
* **client:**
  * Fix CORS requests not being decoded for Fx<21 ([a92ab607](https://github.com/mozilla/fxa-content-server/commit/a92ab607cd8e14068b44a6f12c2fbf693446246c))
  * COPPA - make learn more link target _blank only on sync ([ae06e403](https://github.com/mozilla/fxa-content-server/commit/ae06e403931f26bf3370140313c77e9f7baced3d))
  * Allow leading/trailing whitespace on email addresses. ([2385500d](https://github.com/mozilla/fxa-content-server/commit/2385500df7b9895b509dbd098d1ee9015e8a9d53))
* **coppa:** better align error message in pop up ([7bc43ca4](https://github.com/mozilla/fxa-content-server/commit/7bc43ca432c5a41c566509abebf68cde0f585057))
* **oauth:**
  * fixes WebChannel double submit during password reset ([c4ad6289](https://github.com/mozilla/fxa-content-server/commit/c4ad6289303190c87b6559a6270faba4408e138d))
  * validate that redirect param exists. ([a8c63fd0](https://github.com/mozilla/fxa-content-server/commit/a8c63fd0991dacaf4a944fe7c0ae4d8ed4cafa4c), closes [#1786](https://github.com/mozilla/fxa-content-server/issues/1786))
* **test:** fixes setTimeout tests in FF18 ([ab270636](https://github.com/mozilla/fxa-content-server/commit/ab2706363f33068ad0e7ab9f1b4f50d169546a1f))


#### Features

* **metrics:** Add three new auth-errors ([ca2e1c46](https://github.com/mozilla/fxa-content-server/commit/ca2e1c46639aaf84041c7b79985dedb7f191e050))


<a name="0.24.0"></a>
## 0.24.0 (2014-10-20)


#### Bug Fixes

* **client:**
  * Change the "Next" button to say "Sign up" ([08a008c0](https://github.com/mozilla/fxa-content-server/commit/08a008c069ca226f28ce7ca4136d7ea89496f6a6))
  * Add a "forgot password?" link when using cached credentials. ([99754f76](https://github.com/mozilla/fxa-content-server/commit/99754f76adb340cff02c831196ec9e4e53e39f62))
* **oauth:** use the correct client_id for local oauth server ([8e1c288c](https://github.com/mozilla/fxa-content-server/commit/8e1c288c46f7dd1434cd50e637358a0b4543a725))
* **signin:** choosing to use a different account clears cached credentials ([4919e1d1](https://github.com/mozilla/fxa-content-server/commit/4919e1d18bf9a7346e315615436f6911f44bf82e), closes [#1721](https://github.com/mozilla/fxa-content-server/issues/1721))
* **styles:** Ensure the year of birth select box uses Clear Sans. ([4f796b29](https://github.com/mozilla/fxa-content-server/commit/4f796b29070f38bb103fb0de163b298390e95360))
* **test:** Fix `test-latest` functional tests. ([37696cb0](https://github.com/mozilla/fxa-content-server/commit/37696cb0c337e112151bd473ba7df428114d0a04))
* **tests:** remove about:prefs tests from full testing ([cccdeb09](https://github.com/mozilla/fxa-content-server/commit/cccdeb09b1d89b926a60fa6134a3ad74d66c6c54))
* **trusted-ui-style:** make layout shorter ([02c7d7fb](https://github.com/mozilla/fxa-content-server/commit/02c7d7fb559b054be522110c4e8430860d4b1fc1))


#### Features

* **client:** Create and send a resume token to the OAuth server. ([8dd01b07](https://github.com/mozilla/fxa-content-server/commit/8dd01b072ceda0d868056aab9b4de9771f88696a))
* **metrics:** Add metrics for signup, preverified signup, signin, hide the resend button. ([76ecb248](https://github.com/mozilla/fxa-content-server/commit/76ecb24855cb9112d72e60c73369c1c42df2bf80))
* **test:** Add more functional tests sign up/reset password flows. ([483ba166](https://github.com/mozilla/fxa-content-server/commit/483ba16602010006eda5d7725fc8fdd945d88fe7))


<a name="0.23.0"></a>
## 0.23.0 (2014-10-07)


#### Bug Fixes

* **appStart:** show an error screen when errors occur during app start ([e457eae4](https://github.com/mozilla/fxa-content-server/commit/e457eae409c8b5674c3bfb7a888025781c1f94f4))
* **avatars:** redirect unverified users to confirm screen ([d440e4d7](https://github.com/mozilla/fxa-content-server/commit/d440e4d74a1893d50a38bf7fd615e1ed4ab57130), closes [#1662](https://github.com/mozilla/fxa-content-server/issues/1662))
* **fxa-client:** update to latest client ([fdb6dbbb](https://github.com/mozilla/fxa-content-server/commit/fdb6dbbbaf392d6a9e28120c9170dfbf8bcedb22))
* **style:** ensure legal pages are no taller than /signup ([1698922b](https://github.com/mozilla/fxa-content-server/commit/1698922bda64dd09e50e59bb91b014a768db6fd7))
* **tests:**
  * run tos and pp test for saving information separately - fixes #1640 ([d2f52126](https://github.com/mozilla/fxa-content-server/commit/d2f5212642f4b8275f9eaca94bc0e3503fad5df6))
  * Only set the autofocus timeout if the element to be focused is hidden. ([ce2ce9d0](https://github.com/mozilla/fxa-content-server/commit/ce2ce9d03e428fcb7ba1be021114482d0bd7fd4a))


#### Features

* **client:**
  * Smooth out the verification flow. ([02b0d351](https://github.com/mozilla/fxa-content-server/commit/02b0d3514586fc2759c1af7cecd3ba420d16385d))
  * Fix the COPPA flow to allow 13 year olds that are born this year to register. ([61ec08bd](https://github.com/mozilla/fxa-content-server/commit/61ec08bd98cf21605b95b284c60156ac9f580e20))


<a name="0.22.0"></a>
## 0.22.0 (2014-09-22)


#### Bug Fixes

* **avatars:**
  * show a spinner icon when loading images with latency ([ae1e17f1](https://github.com/mozilla/fxa-content-server/commit/ae1e17f1b1878469bc08add6cc3112d801e76c84), closes [#1527](https://github.com/mozilla/fxa-content-server/issues/1527))
  * set the correct OAuth client ID for fxa-dev environment ([f6374760](https://github.com/mozilla/fxa-content-server/commit/f637476099cecca239f6bd4ba2146d86acdbfb1e), closes [#1683](https://github.com/mozilla/fxa-content-server/issues/1683))
  * integrate profile server backend for profile images ([66ebc83a](https://github.com/mozilla/fxa-content-server/commit/66ebc83a45c42ac10b10791cfb5e7f8c59f36dd9))
  * disable remote URL option ([17e76acd](https://github.com/mozilla/fxa-content-server/commit/17e76acdb274c9842658acb8786caded78fbdc87))
* **client:**
  * autofocus the password field on /oauth/signin if the user already has a session. ([c4228b2f](https://github.com/mozilla/fxa-content-server/commit/c4228b2fcbae528cdc6e02807d7ccc1d06c2c2e6))
  * Auto-focus the password field on the /delete_account page. ([31fc11d2](https://github.com/mozilla/fxa-content-server/commit/31fc11d260d60dbb67ed465028b001846a4c677b))
* **errors:** use the correct context for error messages ([a3c4f2a2](https://github.com/mozilla/fxa-content-server/commit/a3c4f2a2063a3c61ee455ebcc6ad0182fd427386), closes [#1660](https://github.com/mozilla/fxa-content-server/issues/1660))
* **oauth:** increase the assertion lifetime to avoid clock skew issues ([132bbf57](https://github.com/mozilla/fxa-content-server/commit/132bbf572d71b3f8d58c909fb23f8aba8a7fd45e))
* **test:** Fix and enable the oauth-preverified-sign-up functional test. ([7cade58a](https://github.com/mozilla/fxa-content-server/commit/7cade58a6147a28bf40ec76d50e76a7e432afba6))
* **tests:**
  * Fix some places that race with an XHR response return ([f49e3de6](https://github.com/mozilla/fxa-content-server/commit/f49e3de67d55d22e8c81b260f0222ae95be3bb96))
  * Fix the oauth_webchannel tests when run by themselves. ([f19d2d58](https://github.com/mozilla/fxa-content-server/commit/f19d2d58f615081672627a7dbada8d816af22246))


#### Features

* **metrics:** Log `entrypoint` to the metrics. ([9ecf71bb](https://github.com/mozilla/fxa-content-server/commit/9ecf71bb514e42072c23ea0e1f256ab43b665d07))
* **test:** Add the ability to run `npm run-script test-functional-oauth` from the command l ([6ca4fe4d](https://github.com/mozilla/fxa-content-server/commit/6ca4fe4dc802272eaf1d8ed78e53e7c2b9e36802))


<a name="0.21.0"></a>
## 0.21.0 (2014-09-08)


#### Bug Fixes

* **avatars:** allow mobile browsers to reposition the image during crop ([74202ea1](https://github.com/mozilla/fxa-content-server/commit/74202ea1b9127786834d8bf387efdd0fd8eb1a63))
* **hsts:** force hsts headers and use milliseconds ([138756b1](https://github.com/mozilla/fxa-content-server/commit/138756b1df4a12878b67b4c3992e6f9003c73eb2))
* **signin:** cache credentials for desktop sign-ins, otherwise only cache email ([33675ae8](https://github.com/mozilla/fxa-content-server/commit/33675ae8863a85bf530c4b3bcbd9703b027524df), closes [#1621](https://github.com/mozilla/fxa-content-server/issues/1621))
* **styles:** Un-nesting some CSS to fix /signin links ([1878d120](https://github.com/mozilla/fxa-content-server/commit/1878d120928ecce25373327a392e90801c4a7fd2))


#### Features

* **client:** Add support for `preVerfiyToken`. ([d30dd6d3](https://github.com/mozilla/fxa-content-server/commit/d30dd6d3f4d65ceeb6a195b16cf6fd689eb1f7a4))
* **signin:** Add cached signin ([7780e49a](https://github.com/mozilla/fxa-content-server/commit/7780e49aa007db60d12e29ea791d60489298ad3a))


<a name="0.20.0"></a>
## 0.20.0 (2014-08-25)


#### Bug Fixes

* **build:**
  * Remove imagemin for dependencies ([bddf83fe](https://github.com/mozilla/fxa-content-server/commit/bddf83fe80296ddfabe6330eeb1fb260c6f4d59a))
  * Wait for config to load. Move draggable into a require.js packge. ([b2a0be17](https://github.com/mozilla/fxa-content-server/commit/b2a0be177fe3dbb24e7cc9832939187a02822096))
* **l10n:** remove the en i18n symlink ([9c2e5ba0](https://github.com/mozilla/fxa-content-server/commit/9c2e5ba0c707f8a20bcef5a7ea17462531d58937))
* **teats:** Use execute to clear browser state ([f56aa45e](https://github.com/mozilla/fxa-content-server/commit/f56aa45e2e0a9d09f199f175ee376bde3fbe446c))
* **tests:**
  * Avatar functional test updates ([ceb5561d](https://github.com/mozilla/fxa-content-server/commit/ceb5561d2ba9f64846ddd9d556b704099e02ef3e))
  * Update service-mixin tests. ([37d6c371](https://github.com/mozilla/fxa-content-server/commit/37d6c371db3d7442d6742e5ba79fd24b68d7ca92), closes [#1400](https://github.com/mozilla/fxa-content-server/issues/1400))
* **travis:** Run functional tests first, move sleep. ([23f124cc](https://github.com/mozilla/fxa-content-server/commit/23f124cce5b9e38d8621097ec398716f06b3f0d6))


#### Features

* **oauth:** Support for URN redirects ([dc2cefd6](https://github.com/mozilla/fxa-content-server/commit/dc2cefd658f7ad8fc0c70b39d174b9b42f3a4101))


<a name="0.19.0"></a>
## 0.19.0 (2014-08-11)


#### Bug Fixes

* **avatars:**
  * add profile server client to proxy remote images ([899f1895](https://github.com/mozilla/fxa-content-server/commit/899f18956b3f6cdb12de6a920b561ea030d6612d))
  * clean up numerous issues from comments in #1405 ([916044d6](https://github.com/mozilla/fxa-content-server/commit/916044d668305d3a94b698ec226b4a9130dca5d5))
* **bug:**
  * IE9: browser unsupported message is very wide ([488f5108](https://github.com/mozilla/fxa-content-server/commit/488f510878be6a788b70b0f6c79d10c9951bfd53))
  * fixed snippet layout error ([0e3dcd9e](https://github.com/mozilla/fxa-content-server/commit/0e3dcd9eb8bc533202757ee202a1dae1b7b82d3d))
* **client:**
  * Show the /force_auth error message on startup, if one exists. ([e61bf17e](https://github.com/mozilla/fxa-content-server/commit/e61bf17e5083788f355d9753abaa6474aa4265ca))
  * Remove the survey material all together, it's not being used. ([04249936](https://github.com/mozilla/fxa-content-server/commit/04249936f85cb64421f0a2a7b5557f7383549b3f))
  * If logError/displayError/displayErrorUnsafe is called without an error, log an ` ([d3bf9552](https://github.com/mozilla/fxa-content-server/commit/d3bf95521ecd6f86daa18f7c6766d12477959bd6))
  * Display `Service Unavailable` if the user visits `/oauth/sign(in|up)` and the OA ([fe599744](https://github.com/mozilla/fxa-content-server/commit/fe599744d5c7d191136616ea49744be2a6ee50d4))
  * Ensure a down OAuth server does not cause an `undefined` error. ([7224d952](https://github.com/mozilla/fxa-content-server/commit/7224d9528c73c02d24afada320901ed5ce122284))
* **csp:**
  * allow image sources from gravatar ([cfd7ce84](https://github.com/mozilla/fxa-content-server/commit/cfd7ce84f5213eca4ffff7a488e6173d05b3b130))
  * allow data uris for images ([9a880661](https://github.com/mozilla/fxa-content-server/commit/9a880661e1e5272cd26aa48eacde3736a93eaa49))
* **deps:** update express and request dependencies to patched versions ([5e990731](https://github.com/mozilla/fxa-content-server/commit/5e9907315cf22e5447af8794e5760ab4c515064e))
* **fxa-client:** remove lang from fxa-client requests ([93c3384d](https://github.com/mozilla/fxa-content-server/commit/93c3384d80d913a5a1a746b2e2213240f9b404b0), closes [#1404](https://github.com/mozilla/fxa-content-server/issues/1404))
* **l10n:**
  * ensure that supported languages are a subset of the default supported languages ([d0d14176](https://github.com/mozilla/fxa-content-server/commit/d0d141761f51ed7b0397d92d0f90fcf219b34d06))
  * add hsb and dsb to default supported languag list for asset generation ([c726205d](https://github.com/mozilla/fxa-content-server/commit/c726205d62649df14f6dcefd2ee97861759ddd02))
* **legal:**
  * show home button on legal pages when loaded directly ([8bf43a37](https://github.com/mozilla/fxa-content-server/commit/8bf43a37d40febaaab93d597ed4ecd2b06e5c7b0))
  * fix layout of statically rendered legal pages ([f59d82b1](https://github.com/mozilla/fxa-content-server/commit/f59d82b1c5a7694c932f836ab398304ae284ac71))
* **logger:** fix for express logger api change ([dfa60957](https://github.com/mozilla/fxa-content-server/commit/dfa609575339e903969fdabe9e91657b468e17a9))
* **metrics:** Log a screen once, childviews should not cause the parent to be lgoged. ([5964e0ba](https://github.com/mozilla/fxa-content-server/commit/5964e0badb1495c62a44e807ea604e43b8543f3f))
* **router:** show error screen when view rendering fails ([49eb7063](https://github.com/mozilla/fxa-content-server/commit/49eb70631f261cf7deecaf15e5c324edf51e704f))
* **sync:** show Sync brand name when signin up/in for Sync ([c15a2761](https://github.com/mozilla/fxa-content-server/commit/c15a276112883834a46b7c7b50cebe39db941214), closes [#1339](https://github.com/mozilla/fxa-content-server/issues/1339))
* **test:** Ensure requirejs configuration is loaded before any other scripts. ([10eddcb4](https://github.com/mozilla/fxa-content-server/commit/10eddcb4bd11eeadb50b21577272ecd00882c31e))
* **tos-pp:** rely on accept headers instead of naviagor.language for partial requests ([fdceab5a](https://github.com/mozilla/fxa-content-server/commit/fdceab5a0aad420e0c000bb920b121ce05bd99d5), closes [#1412](https://github.com/mozilla/fxa-content-server/issues/1412))


#### Features

* **metrics:** Add screen width and height to the metrics. ([0f5f3513](https://github.com/mozilla/fxa-content-server/commit/0f5f35135098b0502a9276549d4d74160a28279a))
* **oauth:**
  * Add WebChannel support ([97b714b6](https://github.com/mozilla/fxa-content-server/commit/97b714b6705ba7f719febe9ca7c814bf768207f8))
  * message to native flows ([00c1c0f7](https://github.com/mozilla/fxa-content-server/commit/00c1c0f7a054fa690b0af00f52aa5f526dc0b127))
* **settings:** profile images ([fe0b8770](https://github.com/mozilla/fxa-content-server/commit/fe0b8770c8bfe0b719a947f193a827d03bf747e6))


<a name="0.18.0"></a>
## 0.18.0 (2014-07-28)


#### Bug Fixes

* **bug:**
  * IE9: browser unsupported message is very wide ([488f5108](https://github.com/mozilla/fxa-content-server/commit/488f510878be6a788b70b0f6c79d10c9951bfd53))
  * fixed snippet layout error ([0e3dcd9e](https://github.com/mozilla/fxa-content-server/commit/0e3dcd9eb8bc533202757ee202a1dae1b7b82d3d))
* **client:**
  * If logError/displayError/displayErrorUnsafe is called without an error, log an ` ([d3bf9552](https://github.com/mozilla/fxa-content-server/commit/d3bf95521ecd6f86daa18f7c6766d12477959bd6))
  * Display `Service Unavailable` if the user visits `/oauth/sign(in|up)` and the OA ([fe599744](https://github.com/mozilla/fxa-content-server/commit/fe599744d5c7d191136616ea49744be2a6ee50d4))
  * Ensure a down OAuth server does not cause an `undefined` error. ([7224d952](https://github.com/mozilla/fxa-content-server/commit/7224d9528c73c02d24afada320901ed5ce122284))
* **fxa-client:** remove lang from fxa-client requests ([93c3384d](https://github.com/mozilla/fxa-content-server/commit/93c3384d80d913a5a1a746b2e2213240f9b404b0), closes [#1404](https://github.com/mozilla/fxa-content-server/issues/1404))
* **l10n:** add hsb and dsb to default supported languag list for asset generation ([c726205d](https://github.com/mozilla/fxa-content-server/commit/c726205d62649df14f6dcefd2ee97861759ddd02))
* **legal:** fix layout of statically rendered legal pages ([f59d82b1](https://github.com/mozilla/fxa-content-server/commit/f59d82b1c5a7694c932f836ab398304ae284ac71))
* **metrics:** Log a screen once, childviews should not cause the parent to be lgoged. ([5964e0ba](https://github.com/mozilla/fxa-content-server/commit/5964e0badb1495c62a44e807ea604e43b8543f3f))
* **router:** show error screen when view rendering fails ([49eb7063](https://github.com/mozilla/fxa-content-server/commit/49eb70631f261cf7deecaf15e5c324edf51e704f))
* **sync:** show Sync brand name when signin up/in for Sync ([c15a2761](https://github.com/mozilla/fxa-content-server/commit/c15a276112883834a46b7c7b50cebe39db941214), closes [#1339](https://github.com/mozilla/fxa-content-server/issues/1339))
* **tos-pp:** rely on accept headers instead of naviagor.language for partial requests ([fdceab5a](https://github.com/mozilla/fxa-content-server/commit/fdceab5a0aad420e0c000bb920b121ce05bd99d5), closes [#1412](https://github.com/mozilla/fxa-content-server/issues/1412))


#### Features

* **metrics:** Add screen width and height to the metrics. ([0f5f3513](https://github.com/mozilla/fxa-content-server/commit/0f5f35135098b0502a9276549d4d74160a28279a))
* **settings:** profile images ([fe0b8770](https://github.com/mozilla/fxa-content-server/commit/fe0b8770c8bfe0b719a947f193a827d03bf747e6))


<a name="0.17.0"></a>
## 0.17.0 (2014-07-14)


#### Bug Fixes

* **fonts:** Update connect-fonts-firasans and grunt-connect-fonts. ([e5a2fdcd](https://github.com/mozilla/fxa-content-server/commit/e5a2fdcd74659ff0f0465b2c831dfedf212e8a53))
* **l10n:** use correct locale if specified in url for legal pages ([02c287cb](https://github.com/mozilla/fxa-content-server/commit/02c287cb055558e4b8ada3394fbb08a91a6c2f9c), closes [#1337](https://github.com/mozilla/fxa-content-server/issues/1337))
* **legal:** fix rendering of legal pages when loaded directly via url ([70b17b37](https://github.com/mozilla/fxa-content-server/commit/70b17b375d1a6e3184b3724c786284241cd6131b), closes [#1372](https://github.com/mozilla/fxa-content-server/issues/1372))
* **styles:** sassify border radii ([10f53c09](https://github.com/mozilla/fxa-content-server/commit/10f53c099a62ebf159d317f3555b0bf495a3aec2))
* **tests:** Make IE10/IE11 pass all the mocha tests. ([074c7246](https://github.com/mozilla/fxa-content-server/commit/074c724640e5987e89961d657333cd38ef02ac5d))


#### Features

* **metrics:** Log which marketing material is shown to a user. ([afa111ac](https://github.com/mozilla/fxa-content-server/commit/afa111ac163b9103ea32ce0db7bb099f6ca78a41))
* **server:** Add a forwarding proxy for IE8. ([50060ce3](https://github.com/mozilla/fxa-content-server/commit/50060ce3305d2e720d32b6247df65301bba3d8d3))


<a name="0.16.0"></a>
## 0.16.0 (2014-06-30)


#### Bug Fixes

* **client:**
  * Firefox for Android Sync marketing material is only available to desktop sync us ([c5e62fa6](https://github.com/mozilla/fxa-content-server/commit/c5e62fa6b48af641210a95514bc14b888bdd984d))
  * Only send a `link_expired` event if the password reset link is expired. ([38310417](https://github.com/mozilla/fxa-content-server/commit/38310417567662bb37e07a3d973f86400a9ffb78))
  * Fix the IE8 password toggle test for real this time. ([8cdecd14](https://github.com/mozilla/fxa-content-server/commit/8cdecd14d48945120b005132724859b6d56f57f3))
  * Check the user's old password before attempting a change password. ([b78bfaa5](https://github.com/mozilla/fxa-content-server/commit/b78bfaa56b77afd991cc459d7b58fa8ab804a2c5))
  * Remove the ability for IE8 and IE10+ to show the password field. ([b257333f](https://github.com/mozilla/fxa-content-server/commit/b257333fff061ef85bd0d4f3b457520bea8b935f))
  * Abort autofocus events if no element exists with the `autofocus` attribute. ([07a12642](https://github.com/mozilla/fxa-content-server/commit/07a126429d2eb36115eb40ef44fa823ca8186c13))
  * Throw an exception if invokeHandler is passed an invalid handler. ([0f58af47](https://github.com/mozilla/fxa-content-server/commit/0f58af478a7a31c81d770a7dfb695601976cab6b))
  * Remove keyboard accessibility for the show/hide button. ([09fc7a96](https://github.com/mozilla/fxa-content-server/commit/09fc7a96066cb3541566fca5822df2a5c8ee367d))
  * Replace calls to [].indexOf with _.indexOf for IE8 support. ([b5430e1b](https://github.com/mozilla/fxa-content-server/commit/b5430e1b44014e6f019aa329bf387715680773fe))
* **csp:** turn on report only mode until CSP issues are resolved ([e39e4128](https://github.com/mozilla/fxa-content-server/commit/e39e41289048d84b520f3451039240929f0b09ec))
* **css:** Remove the blue background on select element focus in IE10+ ([b8300f9f](https://github.com/mozilla/fxa-content-server/commit/b8300f9fdab2ea7749efaaa0113518cd3e8467ba))
* **desktop:** keep desktop context after password change ([df187b8d](https://github.com/mozilla/fxa-content-server/commit/df187b8d655de93d62638d36ac5be26cae9813df), closes [#812](https://github.com/mozilla/fxa-content-server/issues/812))
* **ie8:** use a standard font so the password field renders correctly ([48c7e807](https://github.com/mozilla/fxa-content-server/commit/48c7e8076bc3a6304fc32d0f5529a29ee16f1cd1), closes [#1266](https://github.com/mozilla/fxa-content-server/issues/1266))
* **l10n:**
  * disable fira sans for unsupported locales ([46dedd04](https://github.com/mozilla/fxa-content-server/commit/46dedd04ebf5b9871d8cbd74566f8b498c089d04))
  * build json locale bundles on server start ([1ba744c3](https://github.com/mozilla/fxa-content-server/commit/1ba744c3fbe431c6e6f2e641426d5cdc3fcb4364), closes [#1295](https://github.com/mozilla/fxa-content-server/issues/1295))
  * upgrade jsxgettext to handle nested handlebar clocks ([229303ac](https://github.com/mozilla/fxa-content-server/commit/229303ace2303efa0bcebeb9d6cf004ecb8ed9c0), closes [#1306](https://github.com/mozilla/fxa-content-server/issues/1306))
* **oauth:**
  * ensure oauth forms are enabled if valid on afterRender ([f46e435c](https://github.com/mozilla/fxa-content-server/commit/f46e435ce59b94d9bdbd80f8ae86cb9bd7ebaec9))
  * only show service name if it is defined ([dc5775ee](https://github.com/mozilla/fxa-content-server/commit/dc5775ee2f318efa69462349168d9d2a1c1b8bd0), closes [#1216](https://github.com/mozilla/fxa-content-server/issues/1216))
  * keep the oauth context after a page refresh ([a548e575](https://github.com/mozilla/fxa-content-server/commit/a548e5758c9bd382ee0bf7a515f22f224020c5e1))
* **server:** Add a 'connect-src' directive to allow contact with the auth-server and oauth-se ([28d9a90d](https://github.com/mozilla/fxa-content-server/commit/28d9a90dce2f1d2088ee0b55327c941f08922a8e))
* **strings:** fix reset password link error messages ([cf525dcf](https://github.com/mozilla/fxa-content-server/commit/cf525dcfbb7b6c0cd7719b0a4f357c4f0484cca5))
* **test:**
  * fix functional test remote for slow connections ([8f0d0025](https://github.com/mozilla/fxa-content-server/commit/8f0d0025496ae8012469161de0e8ae14daaccd46))
  * Remove cache busting URLs in dev mode. ([ffc0de84](https://github.com/mozilla/fxa-content-server/commit/ffc0de84a06cad81ffe9fde0e70f06f30228e7d1))
* **tests:** Fix throttled test.. ([6e3430f3](https://github.com/mozilla/fxa-content-server/commit/6e3430f318794c19cb625911324eb7668c75ef9e), closes [#1144](https://github.com/mozilla/fxa-content-server/issues/1144))


#### Features

* **client:**
  * Add email prefill on the `/signin` page if the email address is passed as a sear ([f7049063](https://github.com/mozilla/fxa-content-server/commit/f7049063a128906f88b4a9b780ec77afbba6cac8))
  * Add email prefil on the `/signup` page if an email is passed as a URL search par ([af7ad386](https://github.com/mozilla/fxa-content-server/commit/af7ad386c30edf61e86eef4a5671368dd7320e3e))
  * add expired verification link message and a email resend link ([12b1fe71](https://github.com/mozilla/fxa-content-server/commit/12b1fe7178cbd5d6741d0d60c6eeb554bdcc5f05))
* **server:** Add `x-content-type-options: nosniff` headers to prevent browser content type sn ([3bdc2584](https://github.com/mozilla/fxa-content-server/commit/3bdc25841204fd316e65f41281191845ddef4cbb))


<a name="0.15.0"></a>
## 0.15.0 (2014-06-16)


#### Bug Fixes

* **client:**
  * Convert all inline error strings to use an error object. ([73231273](https://github.com/mozilla/fxa-content-server/commit/7323127309fd663b1d6b5d74778619305867f946))
  * Fix disabled cookies screen not showing correctly. ([6442364e](https://github.com/mozilla/fxa-content-server/commit/6442364e8362d90f6cdf63904e9c04bfb6258f12))
* **config:** don't alter process.env.CONFIG_FILES from the config script ([11653d4c](https://github.com/mozilla/fxa-content-server/commit/11653d4c3bf9501f8f7ae206a347770d2dcd2b67))
* **csp:** update p-promise library to version that is CSP compatible ([a82e51f3](https://github.com/mozilla/fxa-content-server/commit/a82e51f3e958a21afa71fe28bd55c25c94ab4f8a))
* **form:** a regression was hiding sign up/in suggestions ([6466370d](https://github.com/mozilla/fxa-content-server/commit/6466370d36e0f62729eabed068781be08b08fba8))
* **forms:** labels should not shift unless values change ([2811d0a9](https://github.com/mozilla/fxa-content-server/commit/2811d0a90d68c2a7dff46bc50999873d4a2fd549), closes [#1008](https://github.com/mozilla/fxa-content-server/issues/1008))
* **style:** make tooltips work for the select list hack ([30d91076](https://github.com/mozilla/fxa-content-server/commit/30d9107641a62eeedc836e6f214be1ccd2f0c67d))
* **test:** Run Mocha tests in order ([8d0d58a3](https://github.com/mozilla/fxa-content-server/commit/8d0d58a3a94fe7e49e1554424e74c5f455cdac54))
* **tests:** update legal and tos tests to work under slow conditions ([17006989](https://github.com/mozilla/fxa-content-server/commit/17006989d1c09e243bd0464f0ab0cbe1bda40acd))


#### Features

* **ux:** show messaging when response takes longer than expected ([e4d13330](https://github.com/mozilla/fxa-content-server/commit/e4d13330afc13ca321c05435f0a59974d33ca464))


<a name="0.14.0"></a>
## 0.14.0 (2014-06-02)


#### Bug Fixes

* **bug:** modify select css to remediate bug 1017864 ([c15d8f47](https://github.com/mozilla/fxa-content-server/commit/c15d8f47c29d4a2735a9472c30f3efe5fff34792))
* **build:**
  * Exclude testing tools from production build ([84658550](https://github.com/mozilla/fxa-content-server/commit/846585508e5b71b5440c41623cf165364e20d503))
  * Downgrade imagemin ([e04c9e9a](https://github.com/mozilla/fxa-content-server/commit/e04c9e9a9384e229ab9c521b27dcf7d868841a50))
* **config:**
  * Add oauth_url to awsbox ([3e2c5576](https://github.com/mozilla/fxa-content-server/commit/3e2c5576dbfb743940704085d03cea43cfa3957e))
  * set default oauth url to dev deployment ([63237fe7](https://github.com/mozilla/fxa-content-server/commit/63237fe7e1f645588b723d10cd88eb1723508e11))
* **logs:** Set metrics sample_date to 0 ([037c0da4](https://github.com/mozilla/fxa-content-server/commit/037c0da4b64b429be6a61127049cfe0c9c1e2300))
* **oauth:** Adding functional oauth tests and fixing oauth bugs ([8e941318](https://github.com/mozilla/fxa-content-server/commit/8e94131802eb72717781848c739cc61c2ac4d864))
* **server:** Remove X-FRAME-OPTIONS for Legal and Terms ([9eff994f](https://github.com/mozilla/fxa-content-server/commit/9eff994fb32bba07140da8204782d8a09abeca4a))
* **test:**
  * Update oauth client name, jshint ([566355fb](https://github.com/mozilla/fxa-content-server/commit/566355fbcb6514375e424bb790bf244f78bd04e1))
  * Force focus in Mocha tests. ([23bead9a](https://github.com/mozilla/fxa-content-server/commit/23bead9a30d4b6059055f93deb0c4440a02392a6))
  * Removed 'npm run test-browser'. Combined into 'npm test' ([38cb00b2](https://github.com/mozilla/fxa-content-server/commit/38cb00b2b3316413bf98e66f027af8f78e8a813a))
* **tests:**
  * Exclude functional tests from Travis ([e84daa75](https://github.com/mozilla/fxa-content-server/commit/e84daa7555960866374195f81922bfc89366c384))
  * fix hanging email issues ([04b186ea](https://github.com/mozilla/fxa-content-server/commit/04b186eac3d005392db1cc44e8d7ba33759a7354))
* **views:** strip spaces in uid, token, code when pasted ([1d1919ac](https://github.com/mozilla/fxa-content-server/commit/1d1919ac5b427ea8568ae9c04bd8380334db93b4))


#### Features

* Add front end metrics gathering. ([084fce06](https://github.com/mozilla/fxa-content-server/commit/084fce06ae1bb1acde9fb71e1ccdfce90ad9ea11))
* **server:** serve directly over https ([1216ab0d](https://github.com/mozilla/fxa-content-server/commit/1216ab0de5fd5223b0425e19f1226141f38cfe54))


<a name="0.13.0"></a>
## 0.13.0 (2014-05-19)


#### Bug Fixes

* **build:**
  * Remove Sync browser pages from distribution build ([50ddf022](https://github.com/mozilla/fxa-content-server/commit/50ddf0227bd2c13bb14647e7c012dad71423f58b))
  * Exclude env-test.js from the copyright check, it has its own from the Modernizr  ([7ae249dd](https://github.com/mozilla/fxa-content-server/commit/7ae249dd118e7def6e468cdde2a417d8795bc2dd))
  * Fix IE 404s when requesting .eot fonts in prod. ([ef28093f](https://github.com/mozilla/fxa-content-server/commit/ef28093fc50af4b103458643836670572231d134))
* **client:**
  * update js-client so xhr works in IE ([15a75cee](https://github.com/mozilla/fxa-content-server/commit/15a75cee270c8f453646fc8b538c3b13112fd69b))
  * Fix form validation on browsers that do not have HTML5 form field validation. ([aa8992eb](https://github.com/mozilla/fxa-content-server/commit/aa8992eb46bf1feb7a98ee4cda4fb447094116d4))
  * Disable IE9 support until we get IE9's CORS situation situated. ([717fbcf2](https://github.com/mozilla/fxa-content-server/commit/717fbcf210a643b0ad58764fabddf6fd8adfbc28))
  * Fix the styling on outdated browsers. ([9b1ef4ef](https://github.com/mozilla/fxa-content-server/commit/9b1ef4efc36437427bbdcb6b569a4dfc0e8824e3))
  * update js-client to 0.1.19 for request timeouts ([48d6a637](https://github.com/mozilla/fxa-content-server/commit/48d6a6375ee9949e1e657b9c1d8432a3c74c9fe4))
  * Fix email field focus in Chrome. No more exceptions. ([d1ed5334](https://github.com/mozilla/fxa-content-server/commit/d1ed53349b2d95d47f8eb6605dca309065fcb646))
  * Prefill the user's email on /signin if the user clicks the "sign in" link from " ([efaa0ab8](https://github.com/mozilla/fxa-content-server/commit/efaa0ab83ee7cb36ba50d625c0ecd164ff5da259))
  * Fix the "Sign in" link on `/confirm_reset_password` if the user is in the force  ([9fbe392f](https://github.com/mozilla/fxa-content-server/commit/9fbe392fbc957cdd41284a7a59fae314997dec59))
  * No longer automatically sign in existing users on signup. ([ae625d93](https://github.com/mozilla/fxa-content-server/commit/ae625d934192c0b11b11bacc50eecf2421a32947))
* **email:**
  * generated templates should escape email and link variables ([7bf2b225](https://github.com/mozilla/fxa-content-server/commit/7bf2b22556e2c0f1047037e71ccc3b6d6337a838))
  * don't escape template strings with smart quotes ([886ef989](https://github.com/mozilla/fxa-content-server/commit/886ef989de687f4f7a25da3a4451360d23d4dfe3))
* **emails:** no need to HTML escape text based emails ([fdecafb2](https://github.com/mozilla/fxa-content-server/commit/fdecafb2356c17210ad6d8acd1172543f80dc14e))
* **marketing:** add breakpoints for marketing snippet ([cf9c7698](https://github.com/mozilla/fxa-content-server/commit/cf9c7698da6cd87709106a325659bf6d806fa4a1))
* **server:** Fix IE9 not showing any content. ([cca162d0](https://github.com/mozilla/fxa-content-server/commit/cca162d06489b06fb6743bb5803d5aa38fa7514b))
* **test:** Fix the reset password related tests that were broken by the new form prefill fe ([686533f6](https://github.com/mozilla/fxa-content-server/commit/686533f6fec9b7429799de4a33bf0940b0e72647))
* **tests:**
  * Fixed a regex typo in the reset password tests ([c28bdfc5](https://github.com/mozilla/fxa-content-server/commit/c28bdfc5e8580e6921f4f6f75a7ed19b49cfc9ed))
  * Fix Safari focus issues. ([ef7f760e](https://github.com/mozilla/fxa-content-server/commit/ef7f760efb56d6363d84d45699e1be45de551443), closes [#1049](https://github.com/mozilla/fxa-content-server/issues/1049))
  * Add a missing semicolon. ([85a795e6](https://github.com/mozilla/fxa-content-server/commit/85a795e6024725d62b6d73f2be638f891d7cb088))
  * Fix the jshint errors and warnings in all of the tests. ([ad82aac6](https://github.com/mozilla/fxa-content-server/commit/ad82aac66cc2bb82c6bac3b52d7097b9133fdbf1))
* **ui:** word-break long email addresses ([1d1efbbf](https://github.com/mozilla/fxa-content-server/commit/1d1efbbf289e915cd740309d04f6e44e64834745))


<a name="0.12.0"></a>
## 0.12.0 (2014-05-05)


#### Bug Fixes

* **build:** Use the custom version of Modernizr in prod, not the full version. ([7c31d07a](https://github.com/mozilla/fxa-content-server/commit/7c31d07aeb22e7e95db2114111390a9c6bef689b))
* **client:**
  * Do not show Fx for Android marketing material if completing sign up on B2G or Fe ([23a08b4a](https://github.com/mozilla/fxa-content-server/commit/23a08b4a2008a6a12a80469c5ab3b872255a681f))
  * Gracefully handle server errors when fetching translations. ([24d95825](https://github.com/mozilla/fxa-content-server/commit/24d958252ff31e111930f2d10c2d2bff30d11345))
* **l10n:** normalize locale when fetching client.json ([7a3ce02c](https://github.com/mozilla/fxa-content-server/commit/7a3ce02ce5b90e4b0a4cc3b9214648a4b64bd1f1), closes [#1024](https://github.com/mozilla/fxa-content-server/issues/1024))
* **server:** Ensure the browsehappy text is translated ([ae1cc9e9](https://github.com/mozilla/fxa-content-server/commit/ae1cc9e950596bb4d1ce7abed917206f558283a2))


<a name="0.11.2"></a>
### 0.11.2 (2014-04-29)


#### Bug Fixes

* **email:** Pass {{link}} url into outlook-specific markup in email templates. ([ec231c25](https://github.com/mozilla/fxa-content-server/commit/ec231c2527944b6dbaea9d1370a3e72e2ed7cf8d))


<a name="0.11.1"></a>
### 0.11.1 (2014-04-28)


#### Bug Fixes

* **client:** Gracefully handle server errors when fetching translations. ([768b5926](https://github.com/mozilla/fxa-content-server/commit/768b5926c99246216317a83a01efdd59c9757841))
* **l10n:** revert untranslated strings ([faf5651e](https://github.com/mozilla/fxa-content-server/commit/faf5651ee78956bc540a3856285b4e2cdc393b3e))


<a name="0.11.0"></a>
## 0.11.0 (2014-04-21)


#### Bug Fixes

* **client:**
  * Replaced cookie checks with localStorage checks as a work around for 3rd party c ([4442d1ab](https://github.com/mozilla/fxa-content-server/commit/4442d1ab0186e6141ef47c6761295b202405c196))
  * Correctly handle the THROTTLED error from fxa-client.js->signUp ([5ebe34c2](https://github.com/mozilla/fxa-content-server/commit/5ebe34c24be23a10b65b8eea0ac182251ed3e826))
  * Fix disappearing error messages when toggling password visibility. ([5c71c26f](https://github.com/mozilla/fxa-content-server/commit/5c71c26f8f4aaad4a4c7c883bba7a35460737acd))
* **emails:** make emails responsive + work with outlook ([f2af56c0](https://github.com/mozilla/fxa-content-server/commit/f2af56c02f90879e96a54d352bf58625294dd2a1))
* **i18n:** Ensure i18n works in Chrome. ([a5fa583a](https://github.com/mozilla/fxa-content-server/commit/a5fa583a3d0340aeb9ca168aa784e84574c3b1bf))
* **l10n:**
  * config should return the language not locale ([3d90a4b7](https://github.com/mozilla/fxa-content-server/commit/3d90a4b78b576f86564cc21148a93797a2c1c551))
  * ensure the default locale is listed as supported ([07a07a6c](https://github.com/mozilla/fxa-content-server/commit/07a07a6ccd36c6263c1e1ddd36fe70f5c7c301c5))
* **server:**
  * add cache-control header for /config ([21f992f9](https://github.com/mozilla/fxa-content-server/commit/21f992f9dc52463309529116d4c647bece0a9b71))
  * Add maxAge cache control for static assets ([581531e6](https://github.com/mozilla/fxa-content-server/commit/581531e6c1891c1ef035d58d6be1964b1e5c1368))
* **templates:** make firefox logo visible on templates and add mozilla logo ([9b9a5039](https://github.com/mozilla/fxa-content-server/commit/9b9a5039783b0ccaa11143c743bf6190b28f8bc9))


<a name="0.10.2"></a>
### 0.10.2 (2014-04-18)

#### Bug Fixes

* **tests:** fix privacy heading ID ([4fd3139e](https://github.com/mozilla/fxa-content-server/commit/4fd3139e4a4044e45bd6d06ebc680c4d1f1c667c))


<a name="0.10.1"></a>
### 0.10.1 (2014-04-18)


#### Bug Fixes

* **client:** Replaced cookie checks with localStorage checks as a work around for 3rd party c ([c75bf680](https://github.com/mozilla/fxa-content-server/commit/c75bf6801eb764bfd773c0b831381dd6a58157ea))


<a name="0.10.0"></a>
## 0.10.0 (2014-04-14)


#### Bug Fixes

* **build:** Fix the typo when copying fonts. ([cec3e6eb](https://github.com/mozilla/fxa-content-server/commit/cec3e6eb81dea2f83d243e17c9d76c844c1ee55e))
* **client:** Enable back button functionality when visiting `/`. ([35ba88e2](https://github.com/mozilla/fxa-content-server/commit/35ba88e2656c5fcb57828e6a122505032499eb65))
* **server:** Ensure fonts have cacheable URLs. ([c66e6ef1](https://github.com/mozilla/fxa-content-server/commit/c66e6ef10bb395269c64b9e0dae8d9a234b674f4))


#### Features

* **client:** updating js client to 0.1.18 ([db4764e3](https://github.com/mozilla/fxa-content-server/commit/db4764e381468f7b7edd036a2c5476c59bfa41a5))


<a name="0.9.0"></a>
## 0.9.0 (2014-04-07)


#### Bug Fixes

* **client:**
  * Redirect to start page if resend email token is invalid. ([28217658](https://github.com/mozilla/fxa-content-server/commit/282176589dc4c6737a5db98ed37343620ed920b5))
  * Use sentance casing on placeholder text. ([4d4142f9](https://github.com/mozilla/fxa-content-server/commit/4d4142f9a068c8366c6740c343e789d45341d96d))
  * transition from password reset confirmation to signin once reset is complete ([23311db0](https://github.com/mozilla/fxa-content-server/commit/23311db08271c4b1122e9246b5380d20592d66b1))
  * All error strings should have a Capitalized first letter. ([a1a74b18](https://github.com/mozilla/fxa-content-server/commit/a1a74b18e4320553533eb85679a0a69b6c99be68))
  * Ensure auth-server errors are displayed on confirm pages. ([ba156c2b](https://github.com/mozilla/fxa-content-server/commit/ba156c2b46105f72f051d5cdc8eda425f2a94c36))
* **tests:**
  * Ensure all tests pass. ([a6d0c31c](https://github.com/mozilla/fxa-content-server/commit/a6d0c31c0a5fce37d3dd51302d3b79861d8cb5c2))
  * Use `assert(false, <message>)` instead of `assert.fail(<message>)`. ([e541e3fb](https://github.com/mozilla/fxa-content-server/commit/e541e3fb95b720849ffe036ac1294eeab4417a62))
  * Fix test failures by reducing shared global state. ([f6948cd4](https://github.com/mozilla/fxa-content-server/commit/f6948cd4181ca4c149e041c814affe53350388c8))
  * Update unit and functional tests to handle throttled password reset email reques ([190ba0b5](https://github.com/mozilla/fxa-content-server/commit/190ba0b576d12b9d673b359dd67dc1f4fdf8cbeb))


<a name="0.8.0"></a>
## 0.8.0 (2014-03-31)


#### Bug Fixes

* **build:**
  * Use lowercase extensions on output files in marked. ([bff7ad71](https://github.com/mozilla/fxa-content-server/commit/bff7ad710f0768dee9c6b14dd9b6dfcf2a1a069b))
  * Normalize TOS/PP filenames to use the `_` separator. ([19095a44](https://github.com/mozilla/fxa-content-server/commit/19095a44181911b8b8496a5f85225bcc9f7242a5))
* **client:**
  * Ensure the client specifies a language when requesting TOS/PP templates. ([eef61de4](https://github.com/mozilla/fxa-content-server/commit/eef61de4202d0f22432da5f679db02d0221fa1c0))
  * remove retry functionality over desktop channel ([e722a204](https://github.com/mozilla/fxa-content-server/commit/e722a204f029efe3d269d6f0b7eb76658de8b3ed))
  * automatically add version to auth-server url if missing ([79237efb](https://github.com/mozilla/fxa-content-server/commit/79237efb748185ff1bf99f428e686c9227574662))
  * Enabled autocomplete='off' for all password input boxes. ([51d77028](https://github.com/mozilla/fxa-content-server/commit/51d7702865ebaabd5b4496d4e10fd2c68bf29d61))
* **server:** Redirect with locale name that abide understands. ([b430cd7c](https://github.com/mozilla/fxa-content-server/commit/b430cd7c15c4f10c57330257ebdbc92643b3121c))
* **signup:** choose what to sync checkbox should persist on the signup page ([0570ccdb](https://github.com/mozilla/fxa-content-server/commit/0570ccdb14f54f9ace440e740a1fc9b9d2d5ad12))
* **styles:**
  * kill webkit default inset shadow ([bbf6f856](https://github.com/mozilla/fxa-content-server/commit/bbf6f856b3176a5f5e0c7a01a2aca997e0146e45))
  * user older standard for bg-pos to work with ios7 ([0c2b7e73](https://github.com/mozilla/fxa-content-server/commit/0c2b7e73c62aa42036ea03e4530c168053719a9a))
* **tests:**
  * Fix the failing fxaClient->signIn test. ([3e484316](https://github.com/mozilla/fxa-content-server/commit/3e4843166b6af829a0892eede13724366b97bc81))
  * Ensure a real locale is used for TOS/PP template requests. ([1825b321](https://github.com/mozilla/fxa-content-server/commit/1825b321a09ff542f1c46fbe858056bc7716b9b8))


#### Features

* Translated TOS/PP text! ([26f680b3](https://github.com/mozilla/fxa-content-server/commit/26f680b3d1fc7c2110a2b663d7305fbe2524b80d))
* **client:**
  * Add support for "can_link_account" Desktop Channel message. ([fecbe20d](https://github.com/mozilla/fxa-content-server/commit/fecbe20d3515b890d544646904fd1fa50dbb1f85))
  * updating js client to 0.1.17 ([11e8f398](https://github.com/mozilla/fxa-content-server/commit/11e8f39846d3549e238779390443b15d4e6cbe54))


<a name="0.0.7"></a>
### 0.0.7 (2014-03-24)


#### Bug Fixes

* **client:**
  * Session values only last as long as the browsing session now by default. ([d22e5680](https://github.com/mozilla/fxa-content-server/commit/d22e5680f2268afd6dc1bd2b23341d4be84621d9))
  * put a fixed limit on email resend api calls ([1b3c8b37](https://github.com/mozilla/fxa-content-server/commit/1b3c8b371dc63c3c0644b994c099a8d225c1d18d))
* **fxa-client:** trim leading/trailing whitespace from user's email ([2b5bf630](https://github.com/mozilla/fxa-content-server/commit/2b5bf630553b413fe0c0f70a849dc2f24097053e))
* **l10n:** normalize locale name when generating json strings ([fb1cedff](https://github.com/mozilla/fxa-content-server/commit/fb1cedff7f37094f65cef76084ad55d893e36834))
* **style:**
  * fix android chrome select box ([9b889146](https://github.com/mozilla/fxa-content-server/commit/9b8891468f60a999c570fb56e3dab51bbfa6797b))
  * removes flicker from post email verification screen ([185d0e80](https://github.com/mozilla/fxa-content-server/commit/185d0e80a0825d99ec45fc3d011b8e32f57222de))


<a name="0.0.6"></a>
### 0.0.6 (2014-03-17)


#### Bug Fixes

* **awsbox:** fix awsbox authserver config ([f0134f15](https://github.com/mozilla/fxa-content-server/commit/f0134f1501a630fcede82363c4979955209f11f2))
* **build:** Use fxa-content Sauce Labs account ([4f383524](https://github.com/mozilla/fxa-content-server/commit/4f383524f962106ebc99ad3f52b78bf6d0d11d04))
* **channel:**
  * call 'done' callback in Session.send if given ([f92a6deb](https://github.com/mozilla/fxa-content-server/commit/f92a6debb959ef20625ea5b835f3ba26f0f32f8f))
  * Make sure the web channel invokes the 'done' callback in Channel.send if it's gi ([b8435bf9](https://github.com/mozilla/fxa-content-server/commit/b8435bf9bf4479f4ac32ba8f5bf59bf8ce357269))
* **client:**
  * Hide sign out from users who signed in from Firefox desktop. ([5d8699de](https://github.com/mozilla/fxa-content-server/commit/5d8699de9a1d1a99efd5dc86ff2a8e114dba4e33))
  * Re-enable "delete account" in settings. ([9d6cf483](https://github.com/mozilla/fxa-content-server/commit/9d6cf48356851694281c3ecd8ba5984c90e6e203))
  * Use /settings as the landing page when logging in to the accounts portal. ([9dba7e5a](https://github.com/mozilla/fxa-content-server/commit/9dba7e5a3a232cce9570932e735f48ea990dfab6))
* **constants:** Added a constant for the Fx Desktop context ([582b86e4](https://github.com/mozilla/fxa-content-server/commit/582b86e4a16a31bc32a102e84bbf55ed6bd5af31))
* **l10n:**
  * fix configuration typo causing default language to be undefined ([4cb85819](https://github.com/mozilla/fxa-content-server/commit/4cb85819f9e000d516c9b6de0c9d4cdbd5e0122a))
  * find best locale when region not available ([bb67db05](https://github.com/mozilla/fxa-content-server/commit/bb67db05879608bf86243b10eddc0ce094d6d886))
  * fix string copy task ([8f0b338a](https://github.com/mozilla/fxa-content-server/commit/8f0b338a8befdeccdf94c3aa575475d253a0143f))
  * fetch strings from the l10n repo and fix supported languages config ([dfaa76d7](https://github.com/mozilla/fxa-content-server/commit/dfaa76d758d0e49b80021b6935a377d1e6743249))
* **routes:** allow direct loading of delete_account page ([e4defe45](https://github.com/mozilla/fxa-content-server/commit/e4defe454891bc0b0d649f149c30601ea1c78316))
* **styles:**
  * issue 678 ([12f43c94](https://github.com/mozilla/fxa-content-server/commit/12f43c94ce8aa8ec2622e73d15615bdfabb84b82))
  * Removing explicit Show button width ([7d925a30](https://github.com/mozilla/fxa-content-server/commit/7d925a30ab3ff5497d75b51f391d2307f7d20483))
* **templates:** Remove ip address restriction on email templates ([edd4c0a9](https://github.com/mozilla/fxa-content-server/commit/edd4c0a929d47e3aef5d10a2599057c02c74d251))
* **view:** update delete account view and associated template ([76635cc8](https://github.com/mozilla/fxa-content-server/commit/76635cc8a4cf10a4c8d7e995241d8660ce9150ed))


#### Features

* **client:** Don't show 'settings' when context=desktop and user is verified ([768cd7f7](https://github.com/mozilla/fxa-content-server/commit/768cd7f742c9d0f6a39a550728eaa9f23656a26b))
* **session:** Make the Session aware of the 'context' ([3d7f1b6a](https://github.com/mozilla/fxa-content-server/commit/3d7f1b6adbf84a14dfcb49c2e6f8afea5d200b64))


<a name="0.0.5"></a>
### 0.0.5 (2014-03-10)


#### Bug Fixes

* **client:**
  * signOut is always a success, even if it is a failure. ([7adb896a](https://github.com/mozilla/fxa-content-server/commit/7adb896a176dbbaaebe600a84654e1d393444116), closes [#616](https://github.com/mozilla/fxa-content-server/issues/616))
  * Show "Service unavailable" error message if auth server is unavailable or return ([6c0dc629](https://github.com/mozilla/fxa-content-server/commit/6c0dc62921ca84d53bb0bb304316b6039cc29865), closes [#601](https://github.com/mozilla/fxa-content-server/issues/601))
* **l10n:** add missing debug locale to local config ([15e0403e](https://github.com/mozilla/fxa-content-server/commit/15e0403ef4658af5aa8302d8fff2791bfd669c80))
* **router:**
  * handle an extra slash when loading the index ([bf1a5e24](https://github.com/mozilla/fxa-content-server/commit/bf1a5e2410beea7ad5d660d14868b396039f58c2))
  * allow optional trailing slash on routes - fixes #641 ([0c28907c](https://github.com/mozilla/fxa-content-server/commit/0c28907c5efff8a5688982abdcecb576ee589523))
* **server:**
  * run_locally.js - just pipe the child streams to stdout/stderr ([0a80fbad](https://github.com/mozilla/fxa-content-server/commit/0a80fbad3838a6813a5110c63bb5551185cfc243))
  * add timestamps to log lines - fixes GH-662 ([32f64b30](https://github.com/mozilla/fxa-content-server/commit/32f64b304b37ce8b8265a9d6f576d14b01a24097))
  * Use correct production path for config/version.json ([5211df72](https://github.com/mozilla/fxa-content-server/commit/5211df72d82a8b8fe06621ec95b1385677934cbb), closes [#530](https://github.com/mozilla/fxa-content-server/issues/530))
* **tests:** Update to handle unverified users re-signing up. ([32175d6e](https://github.com/mozilla/fxa-content-server/commit/32175d6e2722a079b7466856d5231a9c3a332f5a), closes [#666](https://github.com/mozilla/fxa-content-server/issues/666))


#### Features

* **client:** Password reset email prefill & /force_auth simplification. ([8259981a](https://github.com/mozilla/fxa-content-server/commit/8259981ac3e9768a1df434255d5f63e1ebeb8544), closes [#549](https://github.com/mozilla/fxa-content-server/issues/549), [#637](https://github.com/mozilla/fxa-content-server/issues/637))


<a name="0.0.2"></a>
### 0.0.2 (2014-03-03)


#### Bug Fixes

* keyframe animations should go to 360 degrees, not 365 ([065ab83c](https://github.com/mozilla/fxa-content-server/commit/065ab83c5fd843ba969d6b2fc9ff384794e22d79))
* remove grunt-contrib-connect dependency. ([77d91393](https://github.com/mozilla/fxa-content-server/commit/77d913933a439a1cad85f14036beabce11b52c62))
* show the focus ring on anchors ([f4694627](https://github.com/mozilla/fxa-content-server/commit/f469462785cf9709ed13f0e1a9a70f7c11f925bf))
* interpolate error string variables with data from backend. ([93c672c5](https://github.com/mozilla/fxa-content-server/commit/93c672c54a8b1dfa5769d5e1535e5a7427ef0c7a))
* **awsbox:** fix awsbox configuration ([2560de4d](https://github.com/mozilla/fxa-content-server/commit/2560de4dfcaaea39aa5d9f6819595fc5f5a91f2c))
* **build:**
  * Use static version numbers for bower deps ([1f07875d](https://github.com/mozilla/fxa-content-server/commit/1f07875d9f4b6161c55592436b9b0cc88c092c1c))
  * Update lockdown.json with new dependencies ([6192bcc8](https://github.com/mozilla/fxa-content-server/commit/6192bcc837d8f49697f316865a2085f3f2067c35))
* **client:**
  * validate emails against IETF rfc5321 ([d7d3a0ba](https://github.com/mozilla/fxa-content-server/commit/d7d3a0ba93b48abd7d5c343633da6fb3461a3a14), closes [#563](https://github.com/mozilla/fxa-content-server/issues/563))
  * Add /signin_complete endpoint. ([083d7734](https://github.com/mozilla/fxa-content-server/commit/083d77344fbb496c52dc5ec18f6e8e9f26185a0b), closes [#546](https://github.com/mozilla/fxa-content-server/issues/546))
* **l10n:** use underscores instead of dashes in locale directory names; enable all locales  ([5fc24fc3](https://github.com/mozilla/fxa-content-server/commit/5fc24fc3a4f549f4d99c5a99a28e2a029664eebd))
* **styles:**
  * Fiding duplicated selector in main.scss ([c23f9f9e](https://github.com/mozilla/fxa-content-server/commit/c23f9f9e22a1f3ad61d866edd54b89bfba0fdae4))
  * Removing unneeded vendor prefixes ([f7e5373c](https://github.com/mozilla/fxa-content-server/commit/f7e5373c507070bb9b44877a3999b9f0f1bc7a12))


#### Features

* Add a styled 404 page, rendered on the back end. ([cc2a024b](https://github.com/mozilla/fxa-content-server/commit/cc2a024bfb72efe5457cbdfc829b1a4cb4620f9e))
* **build:**
  * Adding npm-lockdown ([d60699d7](https://github.com/mozilla/fxa-content-server/commit/d60699d789c3519eefb0caa2f03acb5f40bdb941))
  * Add a `grunt version` task to stamp a new version. ([aaa6e9d8](https://github.com/mozilla/fxa-content-server/commit/aaa6e9d8ecd805bb0f2ed71030c1c4fb448fc703), closes [#496](https://github.com/mozilla/fxa-content-server/issues/496))
* **client:** update document title on screen transition. ([8973b1a3](https://github.com/mozilla/fxa-content-server/commit/8973b1a3ffe60a70d1f55dac950d9fff4fd26e2f), closes [#531](https://github.com/mozilla/fxa-content-server/issues/531))


#### Breaking Changes

* The production configuration script must add a new option to its config :
```
   page_template_subdirectory: 'dist'
```

issue #554

.
 ([cc2a024b](https://github.com/mozilla/fxa-content-server/commit/cc2a024bfb72efe5457cbdfc829b1a4cb4620f9e))


