var scripts = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/modernizr/modernizr.js",
    "bower_components/ideal-image-slider/ideal-image-slider.js",
    "bower_components/ideal-image-slider/extensions/bullet-nav/iis-bullet-nav.js",
    "bower_components/ideal-image-slider/extensions/captions/iis-captions.js",
    "bower_components/underscore/underscore.js",
    "bower_components/angular/angular.js",
    "bower_components/angular-route/angular-route.js",
    "bower_components/eventEmitter/EventEmitter.js",
    "bower_components/imagesloaded/imagesloaded.js",
    "bower_components/hammerjs/hammer.js",
    "bower_components/sequencejs/src/sequence.js",
    "js/template.js"
];

var styles = [
    "css/font-awesome.css",
    "bower_components/ideal-image-slider/ideal-image-slider.css",
    "bower_components/ideal-image-slider/themes/default/default.css",
    "css/main.css"
];

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* Grunt Contrib Watch
        * Visualiza se os arquivos foram modificados,, adicionados ou removidos, e é executado
        * uma task (ou mais) específica de acordo da extensão do arquivo que sofreu alteração */
        watch: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['dev']
            },
            sass: {
                files: ['bower_components/font-awesome/scss/*.scss'],
                tasks: ['sass']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['concat']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['concat']
            },
            img: {
                files: ['img/*.png','img/**/*.png', 'img/*.jpg','img/**/*.jpg']
            },
            configFiles: {
                    files: [ 'Gruntfile.js', 'config/*.js', '**/*.php', '**/*.html' ],
                    options: {
                    reload: true
                }
            }
        },

        /* SASS
         * Pré-processador de CSS */
        sass: {
            dist: {
                files: {
                    'css/font-awesome.css': ['bower_components/font-awesome/scss/font-awesome.scss']
                }
            }
        },

        /* Grunt Contrib Concat
        * Concatenar arquivos */
        concat: {
            scripts: {
                options: {
                    separator:';'
                },
                src: scripts,
                dest: 'assets/scripts.min.js'
            },
            styles: {
                src: styles,
                dest: 'css/styles.min.css'
            }
        },

        /* Grunt Contrib Imagemin
        * Otimizar imagens */
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand:true,
                    cwd: 'img/',
                    src: '**/*.png',
                    dest: 'assets/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand:true,
                    cwd: 'img/',
                    src: '**/*.jpg',
                    dest: 'assets/',
                    ext: '.jpg'
                }]
            }
        },
            
        /* Grunt Contrib Cssmin
        * Minifica os arquivos de CSS depois de compilados do SASS */
        cssmin: {
            geral: {
                expand: true,
                cwd: 'assets/',
                src: 'styles.min.css',
                dest: 'assets/',
                ext: '.min.css'
            }
        },
            
        /* Grunt Contrib Uglify
        * Minifica os scripts concatenados */
        uglify: {
            options: {
                beautify: false,
                preserveComments: false,
                compress: {
                    global_defs: {
                        DEBUG: false
                    }
                }
            },
            all: {
                files: {
                    'assets/scripts.min.js': ['assets/scripts.min.js']
                }
            }
        }
  });

    // Carrega os plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Digite "grunt" no terminal para executar todas as tarefas
    grunt.registerTask('default', ['sass', 'imagemin', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('dev', ['sass', 'concat', 'cssmin']);
};