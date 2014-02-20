/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'serverproc:dist']);
    }

    grunt.task.run([
      'clean:server',
      'selectconfig:app',
      'css',
      'concurrent:server',
      'serverproc:app'
    ]);
  });
};
