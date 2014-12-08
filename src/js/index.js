/**
 *= require_self
 *= require_tree base
 *= require_tree models
 *= require_tree views
 *= require_tree routers
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
    loadTemplates: function(cb){
        var self = this;
        var templateFiles = this.templates;
        this.templates = {};
        var templateLoaders = {};
        for(var i in templateFiles){
            (function(){
                var file = templateFiles[i];
                console.log(file);
                templateLoaders[file] = function(cb){
                    var me = this;
                    console.log('FILE IS',file);
                    $.get('js/templates/'+file+'.hbs', function(data){
                        self.templates[file] = Handlebars.compile(data);
                        //console.log(data);
                        cb(null, Handlebars.compile(data));
                    });
                };
                templateLoaders[file].file = file;
            })();
        }
        async.parallel(templateLoaders, function(err, data){
            console.log('templates finished loading: ', data);
            var templates = data;
            cb(null, templates);
        })
    },
    renderView: function(view){
        if(this.currentView != null){
            console.log('leaving view');
            this.currentView.leave();
            this.currentView = null;
        }

        this.currentView = view;
        $('#main').html(this.currentView.render().el);
    },
    loadRoutes: function(){
        var self = this;
        for(var i in this.routers){
            self.runningRouters[i] = new self.routers[i]();
        }
    }
};
$(document).ready(function(){
    App.init();
});
