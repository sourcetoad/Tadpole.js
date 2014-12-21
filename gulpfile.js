var gulp = require('gulp');

// Gulp Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');
var inject = require('gulp-inject-string');
var include = require('gulp-include');
var htmlreplace = require('gulp-html-replace');
var taskListing = require('gulp-task-listing');
var connect = require('gulp-connect');
var stripDebug = require('gulp-strip-debug');

// Node Modules
var args   = require('yargs').argv;
var fs = require('fs');



// ***********************
// * Generators
// ***********************


/**
 * Capitalizes the first letter of a string. This is needed for the generators.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Get the argument key (--view, --model, etc).
 */
function getArg(key) {
    var index = process.argv.indexOf(key);
    var next = process.argv[index + 1];
    return (index < 0) ? null : (!next || next[0] === "-") ? true : next;
}


/**
 * Generates a file with some boilerplate code in the corresponding directory.
 *
 * @version x.x.x
 * @params {string} name - filename taken from getArg.
 * @params {string} type - file type taken from getArg (view, model, etc).
 * @params {string} path - path to the folder corresponding with the file type.
 * @params {string} template - boilerplate template code to be included in the file.
 */
function generateFile(name, type, path, template) {
    var filePath = path + name + capitalizeFirstLetter(type) + '.js';
    var fileContent = "App." + type + "s." + name + template;

    console.log("Creating " + type + " called " + name + "...");
    fs.writeFile(filePath, fileContent);
}


/**
 * Generator task that runs the generator corresponding with the key.
 */
gulp.task("g", function(){
    // Assign keys to variables.
    var isView = getArg("--view");
    var isRouter = getArg("--router");
    var isModel = getArg("--model");
    var isCollection = getArg("--collection");

    // If a key is not null (meaning the key was used with the task), run that generator.
    if (isView != null) {
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
// * Gulp Start
// ***********************


// Http server task
gulp.task('server', function() {
    connect.server({
        root: '',
        livereload: true,
        port: 8080
    });
});


/**
 * Runs JSHINT on app/js.
 */
gulp.task('jshint', function() {
    return gulp.src(['app/js/libs.js', 'app/js/*/*.js'])
        .pipe(include())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});




// ***********************
// * Distribute
// ***********************


/**
 * Minify JS and move from app to dist.
 */
gulp.task('minify', function() {
    return gulp.src(['app/js/app.js'])
        .pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/**
 * Move templates (.hbs) into dist.
 */
gulp.task('copyTemplates', function() {
    gulp.src('app/templates/*.hbs')
        .pipe(gulp.dest('dist/templates/'));
});

/**
 * Movie images into dist.
 */
gulp.task('copyImg', function() {
    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img/'));
});

/**
 * Move CSS into dist.
 */
gulp.task('copyCSS', function() {
    gulp.src('app/css/*')
        .pipe(gulp.dest('dist/css/'));
});


/**
 * Replace HTML JS includes within build:js tags with app.js include.
 */
gulp.task('replaceHTML', function() {
    gulp.src('app/index.html')
        .pipe(htmlreplace({
            'js': ['js/app.js', 'js/templates.js']
        }))
        .pipe(gulp.dest('dist/'));
});


gulp.task('templates', function(){
    gulp.src('app/templates/*')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            root: 'App',
            namespace: 'templates',
            noRedeclare: false //this totally doesn't, which is really irritating
        }))
        .pipe(concat('templates.js'))
        .pipe(inject.prepend('App.templates = {};\n'))//because declare refuses to REDECLARE this statement, so for not this must be here
        .pipe(gulp.dest('dist/js'));
});

// ***********************
// * Tasks
// ***********************

// Default (help) Task
gulp.task('default', taskListing);

// Watch Task
gulp.task('start', ['jshint', 'server']);

// Distribute Task
gulp.task('distribute', ['templates', 'minify', 'copyImg', 'copyCSS', 'replaceHTML']);








