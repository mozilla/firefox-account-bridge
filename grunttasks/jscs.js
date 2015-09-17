/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  grunt.config('jscs', {
    server: {
      src: '{,tests/**/,grunttasks/**/,server/**/,scripts/**/}*.js',
      options: {
        config: '.jscsrc'
      }
    },
    app: {
      src: [
        '<%= yeoman.app %>/**/*.js',
        '!<%= yeoman.app %>/bower_components/**',
        '!<%= yeoman.app %>/scripts/vendor/**',
        '!<%= yeoman.app %>/scripts-built/**'
      ],
      options: {
        config: '.jscsrc',
        requirePaddingNewLinesAfterUseStrict: true
      }
    }
  });
};

