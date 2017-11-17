/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  grunt.config('watch', {
    grunt: { files: ['Gruntfile.js'] },
    livereload: {
      files: [
        '<%= yeoman.app %>/*.bundle.js' // only watch for bundles changing.
      ],
      options: {
        livereload: true
      }
    },
    sass: {
      files: '<%= yeoman.app %>/styles/**/*.scss',
      tasks: ['sass', 'autoprefixer']
    }
  });
};
