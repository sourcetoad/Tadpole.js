var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var htmlreplace = require('gulp-html-replace');
var taskListing = require('gulp-task-listing');
var connect = require('gulp-connect');

var fs = require('fs');

var args   = require('yargs').argv;
//var gulpif = require('gulp-if');


// Http server task
gulp.task('server', function() {
    connect.server({
        root: '',
        livereload: true,
        port: 8080
    });
});




// ***********************
// * Generators
// ***********************

// Get CLI key
function getArg(key) {
    var index = process.argv.indexOf(key);
    var next = process.argv[index + 1];
    return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
}

// Create View
function createView(name) {
    console.log("Creating view called " + name + "...");
}


// Generate Task
gulp.task("g", function(){
    var isView = getArg("--view");

    if (isView != null) {
        createView(getArg("--view"));
    }
});








// ***********************
// * Watch
// ***********************

// JSHint
gulp.task('jshint', function() {
    return gulp.src('app/js/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// Live Reload HTTP Server
gulp.task('appServer', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8080
    });
});




// ***********************
// * Distribute
// ***********************

// Minify JS
gulp.task('minify', function() {
    return gulp.src(['app/js/app.js', 'app/js/index.js', 'app/js/base/*.js', 'app/js/routers/*.js', 'app/js/views/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


// Copy Templates into dist
gulp.task('copyTemplates', function() {
    gulp.src('app/templates/*.hbs')
        .pipe(gulp.dest('dist/templates/'));
});


// Include files from libs.js in dist
gulp.task("includeLibs", function() {
    gulp.src('app/js/libs.js')
        .pipe( include() )
        .pipe( gulp.dest("dist/js") )
});


// Replace JS index.html file includes with minified versions
gulp.task('replaceHTML', function() {
    gulp.src('app/index.html')
        .pipe(htmlreplace({
            'js': ['js/libs.js', 'js/app.js']
        }))
        .pipe(gulp.dest('dist/'));
});





// ***********************
// * Tasks
// ***********************

// Default (help) Task
gulp.task('default', taskListing);

// Watch Task
gulp.task('start', ['jshint', 'appServer']);

// Distribute Task
gulp.task('distribute', ['minify', 'copyTemplates','includeLibs', 'replaceHTML']);








