module.exports = function(grunt) {
  // Do grunt-related things in here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
          scripts: {
            files: ['src/**/*.js', 'src/**/*.hbs'],
            tasks: ['directives'],
            options: {
              spawn: false
            }
          }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            files: {
                dest: './dist/js/index.min.js',
                src: './build/js/index.js'
            }
        },
        directives: {
            options: {
//                banner: "(function( window, undefined ){ \n ",
                stripBanners: false
//                footer: "}( window )); //eof"
            },
            files: {
                options: {cwd: './src'},
                src: 'src/js/app.js',
                dest: 'build/js/index.js'
            }
        },
        copy: {
            templates: {
                files: [
                    {expand: true, flatten:true,filter: 'isFile', src: 'src/js/templates/**', dest: 'build/js/templates/'}
                ]
            },
            production: {
                files: [
                    {expand: true, flatten:true,filter: 'isFile', dest: 'dist/js/templates/', src: 'build/js/templates/**'}
                ]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'src/js/lib',
                    layout: 'byComponent',
                    cleanTargetDir: true,
                    cleanBowerDir: false
                }
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        }
    });
    grunt.loadNpmTasks('grunt-sprockets-directives');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');
    
    grunt.registerTask('default', ['bower', 'directives', 'copy:templates']);
    grunt.registerTask('production', ['default', 'uglify', 'copy:production']);
//    grunt.registerTask('watch', ['default', 'watch']);
};