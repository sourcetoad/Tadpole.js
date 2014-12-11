

var gulp = require("gulp");

// Include Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var htmlreplace = require('gulp-html-replace');
var webserver = require('gulp-webserver');



// ***********************
// * Watch
// ***********************

// JSHint
gulp.task('jshint', function() {
    return gulp.src('src/js/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// Live Reload HTTP Server
gulp.task('start', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});





// ***********************
// * Distribute
// ***********************

// Minify JS
gulp.task('minify', function() {
    return gulp.src(['src/js/app.js', 'src/js/index.js', 'src/js/base/*.js', 'src/js/routers/*.js', 'src/js/views/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Copy Templates
gulp.task('copyTemplates', function() {
    gulp.src('src/js/templates/*.hbs')
        .pipe(gulp.dest('dist/js/templates/'));
});


// Include files from libs.js into dist
gulp.task("includeLibs", function() {
    gulp.src('src/js/libs.js')
        .pipe( include() )
        .pipe( gulp.dest("dist/js") )
});


// Index.html
gulp.task('replaceHTML', function() {
    gulp.src('src/index.html')
        .pipe(htmlreplace({
            'js': ['js/libs.js', 'js/app.js']
        }))
        .pipe(gulp.dest('dist/'));
});






// ***********************
// * Tasks
// ***********************

// Watch Task
gulp.task('watch', ['jshint', 'start']);

// Distribute Task
gulp.task('distribute', ['minify', 'copyTemplates','includeLibs', 'replaceHTML']);








