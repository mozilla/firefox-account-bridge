/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.config('concurrent', {
    server: [
      'copy:styles',
      'copy:normalize',
      'connect_fonts_copy'
    ],
    test: [
      'copy:styles'
    ],
    dist: [
      'copy:styles',
      'copy:normalize',
      'connect_fonts_copy',
      'htmlmin'
    ],
    lint: [
      'jshint',
      'jsonlint:app',
      'jscs',
      'amdcheck'
    ]
  });
};
