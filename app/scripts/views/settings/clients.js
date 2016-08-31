/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*/

define(function (require, exports, module) {
  'use strict';

  var _ = require('underscore');
  var $ = require('jquery');
  var Cocktail = require('cocktail');
  var Clients = require('models/clients');
  var Devices = require('models/devices');
  var FormView = require('views/form');
  var preventDefaultThen = require('views/base').preventDefaultThen;
  var SettingsPanelMixin = require('views/mixins/settings-panel-mixin');
  var SignedOutNotificationMixin = require('views/mixins/signed-out-notification-mixin');
  var Strings = require('lib/strings');
  var t = require('views/base').t;
  var Template = require('stache!templates/settings/clients');
  var Url = require('lib/url');

  var DEVICE_REMOVED_ANIMATION_MS = 150;
  var DEVICES_SUPPORT_URL = 'https://support.mozilla.org/kb/fxa-managing-devices';
  var UTM_PARAMS = '?utm_source=accounts.firefox.com&utm_medium=referral&utm_campaign=fxa-devices';
  var FIREFOX_DOWNLOAD_LINK = 'https://www.mozilla.org/firefox/new/' + UTM_PARAMS;
  var FIREFOX_ANDROID_DOWNLOAD_LINK = 'https://www.mozilla.org/firefox/android/' + UTM_PARAMS;
  var FIREFOX_IOS_DOWNLOAD_LINK = 'https://www.mozilla.org/firefox/ios/' +  UTM_PARAMS;
  var FORCE_DEVICE_LIST_VIEW = 'forceDeviceList';
  var FORCE_APPS_LIST_VIEW = 'forceAppsList';

  var View = FormView.extend({
    template: Template,
    className: 'devices',
    viewName: 'settings.devices',

    initialize: function (options) {
      this._able = options.able;
      this._devices = options.devices;
      this._clients = options.clients;

      // An empty Devices instance is created to render the initial view.
      // Data is only fetched once the panel has been opened.
      if (! this._devices) {
        this._devices = new Devices([], {
          notifier: options.notifier
        });
      }

      var devices = this._devices;
      devices.on('add', this._onDeviceAdded.bind(this));
      devices.on('remove', this._onDeviceRemoved.bind(this));

      // An empty Clients instance is created to render the initial view.
      // Data is only fetched once the panel has been opened.
      if (! this._clients) {
        this._clients = new Clients([], {
          notifier: options.notifier
        });
      }

      this._clients.on('add', this._onClientAdded.bind(this));
      this._clients.on('remove', this._onClientRemoved.bind(this));
    },

    _formatDevicesList: function (devices) {
      return _.map(devices, function (device) {
        if (device.lastAccessTimeFormatted) {
          device.lastAccessTime = Strings.interpolate(
            t('Last active: %(translatedTimeAgo)s'), { translatedTimeAgo: device.lastAccessTimeFormatted });
        } else {
          // unknown lastAccessTime or not possible to format.
          device.lastAccessTime = '';
        }
        return device;
      });
    },

    context: function () {
      return {
        clients: this._clients.toJSON(),
        clientsPanelManageString: this._getManageString(),
        clientsPanelTitle: this._getPanelTitle(),
        devices: this._formatDevicesList(this._devices.toJSON()),
        devicesSupportUrl: DEVICES_SUPPORT_URL,
        isPanelEnabled: this._isPanelEnabled(),
        isPanelOpen: this.isPanelOpen(),
        linkAndroid: FIREFOX_ANDROID_DOWNLOAD_LINK,
        linkIOS: FIREFOX_IOS_DOWNLOAD_LINK,
        linkLinux: FIREFOX_DOWNLOAD_LINK,
        linkOSX: FIREFOX_DOWNLOAD_LINK,
        linkWindows: FIREFOX_DOWNLOAD_LINK
      };
    },

    events: {
      'click .client-disconnect': preventDefaultThen('_onDisconnectClient'),
      'click .clients-refresh': preventDefaultThen('_onRefreshDeviceList'),
      'click .device-disconnect': preventDefaultThen('_onDisconnectDevice')
    },

    _isPanelEnabled: function () {
      return this._able.choose('deviceListVisible', {
        forceDeviceList: Url.searchParam(FORCE_DEVICE_LIST_VIEW, this.window.location.search)
      });
    },

    _getPanelTitle: function () {
      var title = t('Devices');

      if (this._isAppsListVisible()) {
        title = t('Devices & apps');
      }

      return title;
    },

    _getManageString: function () {
      var title = t('You can manage your devices below.');

      if (this._isAppsListVisible()) {
        title = t('You can manage your devices and apps below.');
      }

      return title;
    },

    _isAppsListVisible: function () {
      return this._able.choose('appsListVisible', {
        forceAppsList: Url.searchParam(FORCE_APPS_LIST_VIEW, this.window.location.search)
      });
    },

    _onDeviceAdded: function () {
      this.render();
    },

    _onDeviceRemoved: function (device) {
      var id = device.get('id');
      var self = this;
      $('#' + id).slideUp(DEVICE_REMOVED_ANIMATION_MS, function () {
        // re-render in case the last device is removed and the
        // "no registered devices" message needs to be shown.
        self.render();
      });
    },

    _onDisconnectDevice: function (event) {
      this.logViewEvent('device.disconnect');
      var deviceId = $(event.currentTarget).attr('data-id');
      this._destroyDevice(deviceId);
    },

    _onDisconnectClient: function (event) {
      this.logViewEvent('client.disconnect');
      var itemId = $(event.currentTarget).attr('data-id');
      this._destroyService(itemId);
    },

    _onRefreshDeviceList: function () {
      var self = this;
      if (this.isPanelOpen()) {
        this.logViewEvent('refresh');
        // only refresh devices if panel is visible
        // if panel is hidden there is no point of fetching devices
        this._fetchDevices().then(function () {
          self.render();
        });
      }
    },

    openPanel: function () {
      this.logViewEvent('open');
      this._fetchDevices();

      if (this._isAppsListVisible()) {
        this._fetchClients();
      }
    },

    _fetchDevices: function () {
      var account = this.getSignedInAccount();

      return this.user.fetchAccountDevices(account, this._devices);
    },

    _destroyDevice: function (deviceId) {
      var self = this;
      var account = this.getSignedInAccount();
      var device = this._devices.get(deviceId);
      if (device) {
        this.user.destroyAccountDevice(account, device)
          .then(function () {
            if (device.get('isCurrentDevice')) {
              self.navigateToSignIn();
            }
          });
      }
    },

    _fetchClients: function () {
      return this.user.fetchAccountClients(this.getSignedInAccount(), this._clients);
    },

    _destroyClient: function (clientId) {
      if (this._clients.get(clientId)) {
        this.user.destroyAccountClient(this.getSignedInAccount(), clientId).then(() => {
          this.render();
        });
        // TODO: if content-server, logout?
      }
    }
  });

  Cocktail.mixin(
    View,
    SettingsPanelMixin,
    SignedOutNotificationMixin
  );

  module.exports = View;
});

