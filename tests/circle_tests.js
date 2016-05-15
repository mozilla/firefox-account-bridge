/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var testList = [
  './functional/404',
  './functional/500',
  './functional/alternative_styles',
  './functional/avatar',
  './functional/back_button_after_start',
  './functional/bounced_email',
  './functional/change_password',
  './functional/complete_sign_up',
  './functional/confirm',
  './functional/cookies_disabled',
  './functional/delete_account',
  './functional/email_opt_in',
  './functional/fonts',
  './functional/force_auth',
  './functional/fx_fennec_v1_force_auth',
  './functional/fx_fennec_v1_sign_in',
  './functional/fx_fennec_v1_sign_up',
  './functional/fx_firstrun_v1_sign_in',
  './functional/fx_firstrun_v1_sign_up',
  './functional/fx_firstrun_v2_sign_up',
  './functional/fx_ios_v1_sign_in',
  './functional/fx_ios_v1_sign_up',
  './functional/fx_ios_v2_sign_up',
  './functional/legal',
  './functional/pages',
  './functional/password_visibility',
  './functional/pp',
  './functional/refreshes_metrics',
  './functional/reset_password',
  './functional/robots_txt',
  './functional/settings',
  './functional/settings_common',
  './functional/settings_devices',
  './functional/sign_in',
  './functional/sign_in_cached',
  './functional/sign_up',
  './functional/sync_force_auth',
  './functional/sync_reset_password',
  './functional/sync_settings',
  './functional/sync_sign_in',
  './functional/sync_sign_up',
  './functional/sync_v2_force_auth',
  './functional/sync_v2_reset_password',
  './functional/sync_v2_sign_in',
  './functional/sync_v2_sign_up',
  './functional/sync_v3_force_auth',
  './functional/sync_v3_sign_up',
  './functional/tos',
  './functional/upgrade_storage_formats',
  './functional/verification_experiments',
];

var parallelism = parseInt(process.env['CIRCLE_NODE_TOTAL'], 10);
var runnerIndex = parseInt(process.env['CIRCLE_NODE_INDEX'], 10);
console.log('parallelism', parallelism, 'runnerIndex', runnerIndex);

var suitesToRun = testList.filter(function (test, index) {
  return (index % parallelism) === runnerIndex;
});

console.log('suites', suitesToRun);

define(suitesToRun, function () {});
