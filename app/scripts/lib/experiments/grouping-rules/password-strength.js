/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const BaseGroupingRule = require('./base');

const GROUPS_FOR_PARTIAL_ROLLOUT = ['control', 'designF'];
const ROLLOUT_RATES = {
  'de': 0.2, // german is 10% control, 10% treatment
  'en': 1.0, // english is rolled out to 50% control, 50% treatment
};

const EXPERIMENT_NAME = 'passwordStrength';

class PasswordStrengthExperiment extends BaseGroupingRule {
  constructor () {
    super();
    this.ROLLOUT_RATES = ROLLOUT_RATES;
    this.name = EXPERIMENT_NAME;
  }

  choose (subject = {}) {
    if (! subject.account || ! subject.uniqueUserId || ! subject.lang) {
      return false;
    }

    if (this.isTestEmail(subject.account.get('email'))) {
      return 'designF';
    }

    const rolloutLang = subject.lang.substr(0, 2);
    const rolloutRate = this.ROLLOUT_RATES[rolloutLang];

    if (! rolloutRate) {
      return false;
    }

    if (this.bernoulliTrial(rolloutRate, subject.uniqueUserId)) {
      return this.uniformChoice(GROUPS_FOR_PARTIAL_ROLLOUT, subject.uniqueUserId);
    }

    return false;
  }
}


PasswordStrengthExperiment.EXPERIMENT_NAME = EXPERIMENT_NAME;

module.exports = PasswordStrengthExperiment;
