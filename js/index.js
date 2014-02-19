/**
 * Created by chriswillingham on 2/6/14.
 */

var App = {
    models: {},
    collections: {},
    data: {},
    views: {},
    routers: {},
    runningRouters: {},
    templates: [
        "index"
    ],
    currentView: null,
    init: function(){
        var self = this;
        async.series([
            function(cb){
                self.loadTemplates(cb);
            },
            function(cb){
                self.loadRoutes();
                console.log("APP INIT");
                var view = new self.views.Index();
                view.render();
                Backbone.history.start({pushState: true});
            }
        ]);
    },
    loadTemplates: function(cb){
        var self = this;
        var templateFiles = this.templates;
        this.templates = {};
        var templateLoaders = {};
        for(var i in templateFiles){
            var file = templateFiles[i];
            templateLoaders[file] = function(cb){
                $.get('js/templates/'+file+'.hbr', function(data){
                    self.templates[file] = Handlebars.compile(data);
                    console.log(data);
                    cb(null, Handlebars.compile(data));
                });
            }
        }
        async.parallel(templateLoaders, function(err, data){
            console.log('templates finished loading: ', data);
            var templates = data;
            cb(null, templates);
        })
    },
    render: function(html){
        
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
