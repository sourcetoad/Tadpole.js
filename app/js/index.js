/***
 * Created at SourceToad - SourceToad.com
 */

/**
 * The App variable organizes the applications components into corresponding objects.
 */
var App = {
    models: {},
    collections: {},
    data: {},
    views: {},
    routers: {},
    runningRouters: {},
    currentView: null,
    templates: [
        "index"
    ],
    init: function(){
        var self = this;
        async.series([
            function(cb){
                self.loadTemplates(cb);
            },
            function(cb){
                self.loadRoutes();
                //new App.routers.index();
                console.log("APP INIT");
                console.log(Backbone.history.start());
            }
        ]);
    },
    /**
     * Downloads and compiles handlebars (.hbs) templates ONLY from the App.templates string array.
     *
     * @params {callback} callback - Returns an object of compiled templates.
     */
    loadTemplates: function(callback){
        var self = this;
        var templateFiles = this.templates;
        this.templates = {};
        var templateLoaders = {};

        // Loop through each template and generates a list of template loading functions.
        for(var i in templateFiles){
            // Create another scope.
            (function(){
                var file = templateFiles[i];
                templateLoaders[file] = function(callback2) {
                    // Request and compile a template.
                    $.get('templates/'+file+'.hbs', function(data){
                        self.templates[file] = Handlebars.compile(data);
                        callback2(null, Handlebars.compile(data));
                    });
                };
                // Load compiled template into templateLoaders[i] array.
                templateLoaders[file].file = file;
            })();
        }
        // Pass list of template loading functions into async.parallel, returning the result.
        async.parallel(templateLoaders, function(err, data){
            var templates = data;
            callback(null, templates);
        });
    },
    /**
     * Renders a new view with fadeOut and fadeIn animation on #img.
     */
    renderView: function(view){
        if(this.currentView != null){
            console.log('leaving view');
            this.currentView.leave();
            this.currentView = null;
        }

        this.currentView = view;
        $('#main').html(this.currentView.render().el);
    },
    /**
     * Loads routers.
     */
    loadRoutes: function(){
        var self = this;
        for(var i in this.routers){
            self.runningRouters[i] = new self.routers[i]();
        }
    }
};

/**
 * Initialize the backbone application on document.ready, so all JS can go in the <head>.
 */
$(document).ready(function(){
    App.init();
});
