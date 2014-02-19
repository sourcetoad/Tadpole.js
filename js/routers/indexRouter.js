/**
 * Created by chriswillingham on 2/6/14.
 */

App.routers.index = Backbone.Router.extend({
    initialize: function(){
        console.log("Index init");
    },
    routes: {
        '': 'index'
    },
    index: function(){
        console.log('INDEX loading');
        var view = new App.views.Index();
        view.render();
    }
});