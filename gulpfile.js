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
    var filePath = 'app/js/views/' + name + 'View' + '.js';
    var fileContent = "App.views." + name + " = BaseView.extend({});";


    console.log("Creating view called " + name + "...");

    fs.writeFile(filePath, fileContent);
}


// Create Router
function createRouter(name) {
    var filePath = 'app/js/routers/' + name + 'Router' + '.js';
    var fileContent = "App.routers." + name + " = Backbone.Router.extend({});";


    console.log("Creating router called " + name + "...");

    fs.writeFile(filePath, fileContent);
}


// Create Model
function createModel(name) {
    var filePath = 'app/js/models/' + name + 'Model' + '.js';
    var fileContent = "App.models." + name + " = Backbone.Model.extend({});";


    console.log("Creating model called " + name + "...");

    fs.writeFile(filePath, fileContent);
}


// Create Collection
function createCollection(name) {
    var filePath = 'app/js/collections/' + name + 'Collection' + '.js';
    var fileContent = "App.collections." + name + " = Backbone.Collection.extend({});";


    console.log("Creating collection called " + name + "...");

    fs.writeFile(filePath, fileContent);
}



// Generate Task
gulp.task("g", function(){
    var isView = getArg("--view");
    var isRouter = getArg("--router");
    var isModel = getArg("--view");
    var isCollection = getArg("--collection");

    if (isView != null) {
        createView(isView);
    }
    if (isRouter != null) {
        createRouter(isRouter);
    }
    if (isModel != null) {
        createModel(isModel);
    }
    if (isCollection != null) {
        createCollection(isCollection);
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








