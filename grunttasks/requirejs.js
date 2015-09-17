/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  grunt.config('requirejs', {
    dist: {
      // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
      options: {
        replaceRequireScript: [{
          files: ['<%= yeoman.page_template_dist %>/{,*/}index.html'],
          module: 'main',
          modulePath: '/scripts/main'
        }],
        baseUrl: '<%= yeoman.app %>/scripts-built',
        optimize: 'none',
        name: 'main',
        out: '<%= yeoman.tmp %>/scripts/main.js',
        mainConfigFile: '<%= yeoman.app %>/scripts-built/require_config.js',
        keepBuildDir: true,
        findNestedDependencies: true,
        // TODO: (Issue #560) Figure out how to make sourcemaps work with grunt-usemin
        // https://github.com/yeoman/grunt-usemin/issues/30
        //generateSourceMaps: true,
        // required to support SourceMaps
        // http://requirejs.org/docs/errors.html#sourcemapcomments
        preserveLicenseComments: false,
        useStrict: true,
        wrap: true,
        stubModules: ['text', 'stache'],
        // since nocache is a requirejs plugin and not stubbed, it must
        // be added manually to the bundle.
        deps: ['nocache']
      }
    }
  });
};
