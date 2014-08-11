/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// grunt task to create a copy of each static page for each locale.
// Three steps are performed to create the pages:
//  1. po files for each locale are converted to JSON
//  2. Terms/Privacy markdown documents are converted to HTML
//  3. Templates are compiled using the JSON strings and legal doc translations, and with URLs for locale
// specific resources.
//
// They compiled templates are placed in the server's compiled template directory to await further processing
// (requirejs, minification, revving).

module.exports = function (grunt) {
  'use strict';

  var path = require('path');
  var Handlebars = require('handlebars');
  var Promise = require('bluebird');
  var legalTemplates = require('../server/lib/legal-templates');

  var defaultLang;
  var templateSrc;
  var templateDest;

  // Legal templates for each locale, key'ed by languages, e.g.
  // templates['en-US'] = { terms: ..., privacy: ... }
  var templates = {
    // The debug language does not have template files, so use an empty object
    'db-LB': {}
  };

  // Make the 'gettext' function available in the templates.
  Handlebars.registerHelper('t', function (string) {
    if (string.fn) {
      return this.l10n.format(this.l10n.gettext(string.fn(this)), this);
    } else {
      return this.l10n.format(this.l10n.gettext(string), this);
    }
    return string;
  });

  grunt.registerTask('l10n-generate-pages', ['l10n-create-json', 'l10n-generate-tos-pp', 'l10n-compile-templates']);


  grunt.registerTask('l10n-compile-templates',
      'Generate localized versions of the static pages', function () {

    var done = this.async();

    var i18n = require('../server/lib/i18n')(grunt.config.get('server.i18n'));

    // server config is set in the selectconfig task
    var supportedLanguages = grunt.config.get('server.i18n.supportedLanguages');
    defaultLang = grunt.config.get('server.i18n.defaultLang');

    templateSrc = grunt.config.get('yeoman.page_template_src');
    templateDest = grunt.config.get('yeoman.page_template_dist');

    // Legal templates have already been generated and placed in the template destination directory.
    var getTemplate = legalTemplates(i18n, templateDest);

    // Create a cache of the templates so we can reference them synchronously later
    Promise.settle(supportedLanguages.map(function (lang) {

      return Promise.all([
          getTemplate('terms', lang, defaultLang),
          getTemplate('privacy', lang, defaultLang)
        ])
        .then(function (temps) {
          templates[lang] = {
            terms: temps[0],
            privacy: temps[1]
          };
        });

    })).then(function () {
      supportedLanguages.forEach(function (lang) {
        generatePagesForLanguage(i18n, lang);
      });
      done();
    }).then(null, done);

  });


  function generatePagesForLanguage(i18n, language) {
    // items on disk are stored by locale, not language.
    var locale = i18n.localeFrom(language);
    var destRoot = path.join(templateDest, locale);
    var context = i18n.localizationContext(language);

    grunt.file.recurse(templateSrc,
                    function (srcPath, rootDir, subDir, fileName) {

      var destPath = path.join(destRoot, (subDir || ''), fileName);
      generatePage(srcPath, destPath, context);
    });
  }

  function generatePage(srcPath, destPath, context) {
    grunt.log.writeln('generating `%s`', destPath);

    grunt.file.copy(srcPath, destPath, {
      process: function (contents, path) {
        var terms = templates[context.lang].terms || templates[defaultLang].terms;
        var privacy = templates[context.lang].privacy || templates[defaultLang].privacy;
        var template = Handlebars.compile(contents);
        var out = template({
          l10n: context,
          locale: context.locale,
          lang: context.lang,
          lang_dir: context.lang_dir,
          fontSupportDisabled: context.fontSupportDisabled,
          terms: terms,
          privacy: privacy
        });
        return out;
      }
    });
  }
};

