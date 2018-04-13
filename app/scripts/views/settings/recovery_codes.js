/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const $ = require('jquery');
const Cocktail = require('cocktail');
const FormView = require('../form');
const ModalSettingsPanelMixin = require('../mixins/modal-settings-panel-mixin');
const Template = require('templates/settings/recovery_codes.mustache');
const RecoveryCodePrintTemplate = require('templates/settings/recovery_codes_print.mustache');
const RecoveryCode = require('../../models/recovery-code');

const {preventDefaultThen, t} = FormView;

const View = FormView.extend({
  template: Template,
  className: 'recovery-codes',
  viewName: 'settings.two-step-authentication.recovery-codes',

  events: {
    'click .copy-codes': preventDefaultThen('_copyCodes'),
    'click .download-codes': '_downloadCodes',
    'click .print-codes': preventDefaultThen('_printCodes'),
    'click .replace-codes-link': preventDefaultThen('_replaceRecoveryCodes'),
    'click .two-step-authentication-done': preventDefaultThen('_returnToTwoStepAuthentication')
  },

  _returnToTwoStepAuthentication() {
    this.navigate('settings/two_step_authentication');
  },

  _copyCodes() {
    // This copies the recovery codes to clipboard by creating a tiny transparent
    // textArea with recovery code contents. Then it executes the
    // browser `copy` command and removes textArea.
    $('<textArea class=\"recovery-code-text-area\"></textArea>').appendTo('#recovery-codes');
    this.$('.recovery-code-text-area').html(this.recoveryCodesText);
    this.$('.recovery-code-text-area').select();
    this.$('.recovery-code-text-area').focus();
    try {
      this.window.document.execCommand('copy');
      this._displaySuccess(t('Codes copied'));
    } catch (err) {
      this._displayError(t('Failed to copy codes. Please manually copy them.'));
    }
    this.$('.recovery-code-text-area').remove();
  },

  _downloadCodes() {
    // This dynamically creates a link with a blob data of the recovery
    // codes, clicks it to initiate download and then removes element.
    const codeBlob = new Blob([this.recoveryCodesText], {type: 'text/plain'});
    const filename = 'Recovery Codes.txt';
    const href = URL.createObjectURL(codeBlob);
    const template = `
      <a id="recovery-code-download-link" href="${href}" download="${filename}"></a>
    `;
    $(template).appendTo('#recovery-codes');
    this.window.document.getElementById('recovery-code-download-link').click();
    this.$('#recovery-code-download-link').remove();
  },

  _printCodes() {
    // We dynamically create a new window with recovery codes and attempt to
    // print it.
    const printWindow = this.window.open('', 'Print', 'height=600,width=800');
    const recoveryCodes = this.recoveryCodes.map((code) => {
      return new RecoveryCode({code}).toJSON();
    });
    const template = RecoveryCodePrintTemplate({recoveryCodes});
    printWindow.document.write(template);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  },

  _displaySuccess(msg) {
    this.$('.error').addClass('hidden');
    this.$('.modal-success').removeClass('hidden');
    this.$('.modal-success').html(msg);
  },

  _displayError(msg) {
    this.$('.error').removeClass('hidden');
    this.$('.modal-success').addClass('hidden');
    this.$('.error').html(msg);
  },

  _replaceRecoveryCodes() {
    const account = this.getSignedInAccount();
    return account.replaceRecoveryCodes()
      .then((result) => {
        this._setupRecoveryCodes(result.recoveryCodes, t('New recovery codes generated'));
      });
  },

  _setupRecoveryCodes(codes, msg) {
    // Store a readable version of recovery codes so that they can
    // be copied, printed and downloaded
    this.recoveryCodesText = '';
    if (codes) {
      this.recoveryCodes = codes;
      this.recoveryCodesText = this.recoveryCodes.join('\n');
      this.model.set('recoveryCodes', codes);

      if (msg) {
        this.model.set('modalSuccessMsg', msg);
      }
    }
  },

  initialize() {
    this._setupRecoveryCodes(this.model.get('recoveryCodes'));
    this.listenTo(this.model, 'change', this.render);
  },

  setInitialContext(context) {
    let recoveryCodes = this.model.get('recoveryCodes');
    if (recoveryCodes) {
      recoveryCodes = recoveryCodes.map((code) => {
        return new RecoveryCode({code}).toJSON();
      });
    } else {
      recoveryCodes = [];
    }

    let modalSuccessMsg = this.model.get('modalSuccessMsg');
    if (! modalSuccessMsg) {
      modalSuccessMsg = t('Two-step authentication enabled');
    }

    context.set({
      modalSuccessMsg,
      recoveryCodes
    });
  }
});

Cocktail.mixin(
  View,
  ModalSettingsPanelMixin
);

module.exports = View;

