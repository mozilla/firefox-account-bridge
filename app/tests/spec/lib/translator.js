/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// test the translation library

'use strict';


define([
  'chai',
  'lib/translator',
  '/tests/lib/helpers.js'
],
function (chai, Translator, TestHelpers) {
  /*global beforeEach, afterEach, describe, it*/
  var assert = chai.assert;
  var wrapAssertion = TestHelpers.wrapAssertion;

  // translations taken from Persona's db_LB translations.
  var TRANSLATIONS = {
    'There was a problem with your signup link. Has this address already been registered?':
      [null, '⊥ɥǝɹǝ ʍɐs ɐ dɹoqʅǝɯ ʍıʇɥ ʎonɹ sıƃund ʅıuʞ˙ Hɐs ʇɥıs ɐppɹǝss ɐʅɹǝɐpʎ qǝǝu ɹǝƃısʇǝɹǝp¿'],

    'Error encountered trying to register: %(email)s.': [null,
        'Ǝɹɹoɹ ǝuɔonuʇǝɹǝp ʇɹʎıuƃ ʇo ɹǝƃısʇɹɐʇıou: %(email)s˙'],

    // use one direct translation to prepare for simpler json files.
    '%s, Persona requires cookies to remember you.':
        '%s, Ԁǝɹsouɐ ɹǝbnıɹǝs ɔooʞıǝs ʇo ɹǝɯǝɯqǝɹ ʎon˙'
  };

  describe('lib/translator', function () {
    var translator;

    beforeEach(function () {
      // Bringing back the David Bowie's Labrynth
      translator = new Translator('db-LB', ['db-LB']);
      translator.set(TRANSLATIONS);
    });

    afterEach(function () {
      translator = null;
    });

    describe('fetch', function () {
      it('fetches translations from the server', function (done) {
        translator.fetch(function() {
          wrapAssertion(function () {
            // Check that an expected key is empty
            assert.isDefined(translator.translations['Show']);
          }, done);
        });
      });

      it('fails gracefully when receiving a 404', function (done) {
        // Monkey patch jQuery ajax to to request an invalid URL
        $(document).one('ajaxSend', function(event, jqXHR, ajaxOptions) {
          ajaxOptions.url = '/i18n/client-not-here.json';
        });

        translator.fetch(function() {
          wrapAssertion(function () {
            // Check that an expected key is undefined
            assert.isUndefined(translator.translations['Show']);
          }, done);
        });
      });
    });

    describe('get', function () {
      it('returns translated string when it exists', function () {
        var stringToTranslate =
              'There was a problem with your signup link. Has this address already been registered?';
        var translation = translator.get(stringToTranslate);
        assert.equal(translation,
              '⊥ɥǝɹǝ ʍɐs ɐ dɹoqʅǝɯ ʍıʇɥ ʎonɹ sıƃund ʅıuʞ˙ Hɐs ʇɥıs ɐppɹǝss ɐʅɹǝɐpʎ qǝǝu ɹǝƃısʇǝɹǝp¿');
      });

      it('returns untranslated string when translation does not exist', function () {
        var stringToTranslate = 'this string is untranslated';
        var translation = translator.get(stringToTranslate);
        assert.equal(translation, stringToTranslate);
      });

      it('can do string interpolation on unnamed `%s` when given array context', function () {
        var stringToTranslate = '%s, Persona requires cookies to remember you.';
        var translation = translator.get(stringToTranslate, ['testuser@testuser.com']);
        assert.equal(translation,
              'testuser@testuser.com, Ԁǝɹsouɐ ɹǝbnıɹǝs ɔooʞıǝs ʇo ɹǝɯǝɯqǝɹ ʎon˙');
      });

      it('can do string interpolation on named `%(name)s` when given array context', function () {
        var stringToTranslate = 'Error encountered trying to register: %(email)s.';
        var translation = translator.get(stringToTranslate, {
          email: 'testuser@testuser.com'
        });
        assert.equal(translation,
              'Ǝɹɹoɹ ǝuɔonuʇǝɹǝp ʇɹʎıuƃ ʇo ɹǝƃısʇɹɐʇıou: testuser@testuser.com˙');
      });

      it('can do interpolation multiple times with an array', function () {
        var stringToTranslate = 'Hi %s, you have been signed in since %s';
        var translation = translator.get(stringToTranslate, [
          'testuser@testuser.com', 'noon'
        ]);

        assert.equal(translation,
              'Hi testuser@testuser.com, you have been signed in since noon');
      });

      it('can do interpolation multiple times with an object', function () {
        var stringToTranslate = 'Hi %(email)s, you have been signed in since %(time)s';
        var translation = translator.get(stringToTranslate, {
          email: 'testuser@testuser.com',
          time: 'noon'
        });

        assert.equal(translation,
              'Hi testuser@testuser.com, you have been signed in since noon');
      });

      it('does no replacement on %s and %(name)s if not in context', function () {
        var stringToTranslate = 'Hi %s, you have been signed in since %(time)s';
        var translation = translator.get(stringToTranslate);

        assert.equal(translation, stringToTranslate);
      });

      it('leaves remaining %s if not enough items in context', function () {
        var stringToTranslate = 'Hi %s, you have been signed in since %s';
        var translation = translator.get(stringToTranslate, ['testuser@testuser.com']);

        assert.equal(translation, 'Hi testuser@testuser.com, you have been signed in since %s');
      });
    });
  });
});


