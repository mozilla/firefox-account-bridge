/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('build', function (target) {
    var tasks = [
      'lint',
      'clean:dist',
      'useminPrepare',
      'selectconfig:dist',
      'l10n-create-json',
      // server templates are needed for requirejs to replace the require script
      'copy:server_templates',
      'requirejs',
      'css',
      'concurrent:dist',
      'concat',
      'cssmin',
      'copy:dist',
      // modernizer must come after copy or else the custom
      // modernizr is overwritten with the dev version.
      'modernizr',
      // uglify overwrites the files in the dist directory.
      'uglify',
      'rev',
      'usemin'
    ];

    // copy tests if the build target is travis
    if (target === 'travis') {
      tasks.splice(tasks.indexOf('copy:dist'), 0, 'copy:tests');
    }

    grunt.task.run(tasks);
  });
};
