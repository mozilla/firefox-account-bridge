/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* exceptsPaths: modal */
define([
  'jquery',
  'modal',
  'cocktail',
  'views/base',
  'views/mixins/avatar-mixin',
  'views/mixins/inter-tab-signout-mixin',
  'views/settings/avatar',
  'views/settings/avatar_change',
  'views/settings/avatar_crop',
  'views/settings/avatar_camera',
  'views/settings/avatar_gravatar',
  'views/settings/gravatar_permissions',
  'views/settings/communication_preferences',
  'views/settings/change_password',
  'views/settings/delete_account',
  'views/settings/display_name',
  'views/sub_panels',
  'views/mixins/settings-mixin',
  'views/mixins/loading-mixin',
  'views/decorators/allow_only_one_submit',
  'stache!templates/settings'
],
function ($, modal, Cocktail, BaseView, AvatarMixin, InterTabSignoutMixin,
  AvatarView, AvatarChangeView, AvatarCropView, AvatarCameraView, GravatarView,
  GravatarPermissionsView, CommunicationPreferencesView, ChangePasswordView,
  DeleteAccountView, DisplayNameView, SubPanels, SettingsMixin, LoadingMixin,
  allowOnlyOneSubmit, Template) {
  'use strict';

  var PANEL_VIEWS = [
    AvatarView,
    DisplayNameView,
    CommunicationPreferencesView,
    ChangePasswordView,
    DeleteAccountView,
    AvatarChangeView,
    AvatarCropView,
    AvatarCameraView,
    GravatarView,
    GravatarPermissionsView
  ];

  var View = BaseView.extend({
    template: Template,
    className: 'settings',
    layoutClassName: 'settings',
    screenName: 'settings',

    initialize: function (options) {
      options = options || {};

      this._able = options.able;
      this._subPanels = options.subPanels || this._initializeSubPanels(options);
      this._formPrefill = options.formPrefill;
      this.router.on(this.router.NAVIGATE_FROM_SUBVIEW, this._onNavigateFromSubview.bind(this));
    },

    _initializeSubPanels: function (options) {
      var areCommunicationPrefsVisible = false;
      var panelViews = options.panelViews || PANEL_VIEWS;

      if (panelViews.indexOf(CommunicationPreferencesView) !== -1) {
        areCommunicationPrefsVisible = this._areCommunicationPrefsVisible();
        panelViews = panelViews.filter(function (SubView) {
          if (SubView === CommunicationPreferencesView) {
            return areCommunicationPrefsVisible;
          }
          return true;
        });
      }

      this.logScreenEvent('communication-prefs-link.visible.' +
          String(areCommunicationPrefsVisible));

      return new SubPanels({
        initialSubView: options.subView,
        panelViews: panelViews,
        router: this.router
      });
    },

    context: function () {
      var account = this.getSignedInAccount();

      return {
        displayName: account.get('displayName'),
        showSignOut: ! account.isFromSync(),
        userEmail: account.get('email')
      };
    },

    events: {
      'click #signout': BaseView.preventDefaultThen('signOut')
    },

    // Triggered by AvatarMixin
    onProfileUpdate: function () {
      this._showAvatar();
    },

    showSubView: function (SubView) {
      return this._subPanels.showSubView(SubView);
    },

    // When we navigate to settings from a subview
    // close the modal, show any ephemeral messages passed to `navigate`
    _onNavigateFromSubview: function () {
      if ($.modal.isActive()) {
        $.modal.close();
      }
      this.showEphemeralMessages();
      this.logScreen();
      this._swapDisplayName();
    },

    beforeRender: function () {
      var self = this;
      var account = self.getSignedInAccount();

      return account.fetchProfile()
        .then(function () {
          self.user.setAccount(account);
        });
    },

    afterRender: function () {
      this._subPanels.setElement(this.$('#sub-panels')[0]);
      return this._subPanels.render();
    },

    afterVisible: function () {
      var self = this;
      BaseView.prototype.afterVisible.call(self);

      // Clients may link to the settings page with a `setting` query param
      // so that that field can be displayed/focused.
      if (self.relier.get('setting') === 'avatar') {
        self.relier.set('setting', null);
        self.navigate('settings/avatar/change');
      }

      return self._showAvatar();
    },

    // When the user adds, removes or changes a display name
    // this gets called and swaps out headers to reflect
    // the updated state of the account
    _swapDisplayName: function () {
      var account = this.getSignedInAccount();
      var displayName = account.get('displayName');
      var email = account.get('email');

      var cardHeader = this.$('.card-header');
      var cardSubheader = this.$('.card-subheader');

      if (displayName) {
        cardHeader.text(displayName);
        cardSubheader.text(email);
      } else {
        cardHeader.text(email);
        cardSubheader.text('');
      }
    },

    _setupAvatarChangeLinks: function () {
      this.$('.avatar-wrapper > *').wrap('<a href="/settings/avatar/change" class="change-avatar"></a>');
    },

    _showAvatar: function () {
      var self = this;
      var account = self.getSignedInAccount();
      return self.displayAccountProfileImage(account)
        .then(function () {
          self._setupAvatarChangeLinks();
        });
    },

    _areCommunicationPrefsVisible: function () {
      return !! this._able.choose('communicationPrefsVisible', {
        lang: this.navigator.language
      });
    },

    signOut: allowOnlyOneSubmit(function () {
      var self = this;
      var sessionToken = self.getSignedInAccount().get('sessionToken');

      self.logScreenEvent('signout.submit');
      return self.fxaClient.signOut(sessionToken)
        .fail(function () {
          // ignore the error.
          // Clear the session, even on failure. Everything is A-OK.
          // See issue #616
          self.logScreenEvent('signout.error');
        })
        .fin(function () {
          self.onSignOutSuccess();
        });
    }),

    SUCCESS_MESSAGE_DELAY_MS: 5000, // show success message for 5 seconds

    displaySuccess: function () {
      var self = this;
      self.clearTimeout(self._successTimeout);
      self._successTimeout = self.setTimeout(function () {
        self.hideSuccess();
      }, self.SUCCESS_MESSAGE_DELAY_MS);
      return BaseView.prototype.displaySuccess.apply(this, arguments);
    },

    displaySuccessUnsafe: function () {
      var self = this;
      self.clearTimeout(self._successTimeout);
      self._successTimeout = self.setTimeout(function () {
        self.hideSuccess();
      }, self.SUCCESS_MESSAGE_DELAY_MS);
      return BaseView.prototype.displaySuccessUnsafe.apply(this, arguments);
    }
  });

  Cocktail.mixin(
    View,
    AvatarMixin,
    InterTabSignoutMixin,
    LoadingMixin,
    SettingsMixin
  );

  return View;
});
