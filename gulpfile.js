var gulp = require("gulp");

// Include Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var include = require('gulp-include');


// JSHint
gulp.task('lint', function() {
    return gulp.src('src/js/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});



// Concatenate & Minify JS
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


// Copy Index
//gulp.task('copyIndex', function() {
//    gulp.src('src/index.html')
//        .pipe(gulp.dest('dist'));
//});



// Dist Task
gulp.task('dist', ['minify', 'copyTemplates','includeLibs']);
