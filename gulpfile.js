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



function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}



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


// Generate File
function generateFile(name, type, path, template) {
    var filePath = path + name + capitalizeFirstLetter(type) + '.js';
    var fileContent = "App." + type + "s." + name + template;

    console.log("Creating " + type + " called " + name + "...");
    fs.writeFile(filePath, fileContent);
}


// Generate Task
gulp.task("g", function(){
    var isView = getArg("--view");
    var isRouter = getArg("--router");
    var isModel = getArg("--model");
    var isCollection = getArg("--collection");

    if (isView != null) {
        //createView(isView);
        generateFile(isView, "view", "app/js/views/", " = BaseView.extend({});");
    }
    if (isRouter != null) {
        generateFile(isRouter, "router", "app/js/routers/", " = Backbone.Router.extend({});");
    }
    if (isModel != null) {
        generateFile(isModel, "model", "app/js/models/", " = Backbone.Model.extend({});");
    }
    if (isCollection != null) {
        generateFile(isCollection, "collection", "app/js/collections/", " = Backbone.Collection.extend({});");
    }
});




// ***********************
// * Watch
// ***********************

// JSHint
gulp.task('jshint', function() {
    return gulp.src(['app/js/libs.js', 'app/js/*/*.js'])
        .pipe(include())
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
    return gulp.src('app/js/app.js')
        .pipe(include())
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
            'js': ['js/app.js']
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








