'use strict';


/* global module */
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserify:     {
            options:      {
                transform:  [ require('grunt-react').browserify ],
                browserifyOptions: {
                    debug: true
                },
                watch: true
            },
            server: {
                files: {
                    '.tmp/bundle.js': ['app/**/*.js']
                }
            },
            dist: {
                files: {
                    'dist/bundle.js': ['app/**/*.js']
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    dest: 'dist',
                    src: [
                        '*.html'
                    ]
                }]

            }
        },

        connect: {
            options: {
                port: 9900,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },

            server: {
                options: {
                    port: 9900,
                    base: '.',
                    middleware: function(connect, options) {
                        return [
                            // Serve static files.
                            connect.static(options.base),
                            connect.static('.tmp'),
                            connect.static(options.base+'/app'),
                            // Make empty directories browsable.
                            connect.directory(options.base+'/app')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:9900'
            }
        },

        watch: {
            options: {
                nospawn: true,
                livereload: 9999
            },
            app: {
                files: ['app/**/*.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.registerTask('server', function(target) {
        grunt.task.run([
            'browserify:server',
            'connect',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', function(target) {
        grunt.task.run([
            'copy:dist',
            'browserify:dist'
        ]);
    });
};