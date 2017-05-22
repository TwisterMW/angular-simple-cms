module.exports = function(grunt){

	grunt.initConfig({
        clean: {
            all: ['dist', 'docs', '.tmp'],
            temp: ['.tmp']
        },

        copy: {
            main: {
                files: [
                    { src: 'index.html', dest: 'dist/index.html' },
                    { src: 'dashboard.html', dest: 'dist/dashboard.html' },
                    { src: 'favicon.png', dest: 'dist/favicon.png' },
                    
                    // HTML Views
                    { expand: true, cwd: 'app/components/templates/', src: '**', dest: 'dist/app/components/templates' },
                    { expand: true, cwd: 'app/common/templates/', src: '**', dest: 'dist/app/common/templates' },

                    // Img files
                    { expand: true, cwd: 'assets/img/', src: '**', dest: 'dist/assets/img/', filter: 'isFile', flattern: true },

                    // Extra Font files
                    { expand: true, cwd: 'assets/theme/lumino/fonts/', src: '**', dest: 'dist/fonts/', filter: 'isFile', flattern: true }
                ]
            }
        },

        wiredepCopy: {
            target: {
                options: {
                    src: '.',
                    dest: 'dist/',
                    wiredep: {}
                }
            },
        },

        // Generates the documentation related to the application
        ngdocs: {
          all: ['app/**/**/*.js']
        },

        // Automatically includes bower dependencies on index.html
        wiredep: {
            task: {
                src: ['index.html', 'dashboard.html']
            },
        },

        uglify: {
            options: {
                compress: true
            },
            dev: { 
                files: { 
                    'dist/js/app.js': [
                        'dist/js/app.js'
                    ]
                }
            }
        },

        // Minifies all the CSS dependencies of wiredep
        cssmin: {
            minify: {
                files: { 
                    'dist/css/app.css': [
                        require('wiredep')().css, "assets/theme/lumino/css/bootstrap.min.css", "assets/theme/lumino/css/styles.css", "assets/css/*.css"
                    ]
                }
           }
        },

        useminPrepare: {
            int: {
                src: ['index.html']
            }
        },

        // Task for replacing dependencies
        usemin: {
            int: ['dist/index.html', 'dist/dashboard.html'],
        },

        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: 'app.js',
                    dest: 'dist/js/'
                }]
            }
        },

        // Task for concatenate files into one
        concat: {
            basic: {
                files: {
                    '.tmp/app.js': [
                        require('wiredep')().js, 
                        'app/app.js',
                        'app/app.routes.js',
                        'app/common/**/*.js',
                        'app/components/**/*.js'
                    ]
                }
            }
        },

        // Automatically detects bower_component updates and executes wiredep task
        watch: {
            js: {
                files: ['app/*', 'app/**/**/*'],
                tasks: ['jshint']
            }
        },

        // Automatically detects JS errors
        jshint: {
            all: ['Gruntfile.js', 'app/**/**/*.js', 'app/*.js']
        },

        // Mocks a server on custom port
        connect: {
            dev: {
                options: {
                    port: 9000,
                    base: '.',
                    open: true
                }
            },
            docs:{
                options: {
                    port: 9003,
                    base: 'docs/',
                    open: true,
                    keepalive: true
                }
            },
            dist: {
                options: {
                    port: 9002,
                    base: 'dist/',
                    open: true,
                    keepalive: true
                }
            }
        },

        // Task for including yeoman generations
        includeSource: {
            options: {
                basePath: '',
                baseUrl: '',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
                    }
                }
            },
            myTarget: {
                files: {
                    'index.html': 'index.html',
                    'dashboard.html': 'dashboard.html'
                }
            }
        }

    });

    // Tasks loading
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-wiredep-copy');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Task for watching JS errors during development (Errors detected will be outputed on console)
    grunt.registerTask('jslinter', ['watch:js']);

    grunt.registerTask('compress', [
        'useminPrepare', 'concat:basic', 'ngmin:dist', 'uglify:dev', 'usemin', 'cssmin:minify', 'usemin'
    ]);


    // Task for adding sources located on app/** folders generated by yo angular-component (generator)
    grunt.registerTask('addsource', ['wiredep', 'includeSource']);

    // Developer related tasks
    // ===============================================================================================

    grunt.registerTask('release:int', [
        'clean:all', 'addsource', 'copy:main', 'compress', 'clean:temp'
    ]);

    // $ grunt server (Launches development server)
    grunt.registerTask('server', [
        'addsource', 'connect:dev', 'jslinter'
    ]);

    grunt.registerTask('docs:generate', ['ngdocs']);
    grunt.registerTask('docs:server', ['connect:docs']);
};