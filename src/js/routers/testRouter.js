App.routers.test = Backbone.Router.extend({
    initialize: function(){
        console.log("Index init");
    },
    routes: {
        'test': 'index'
    },
    index: function(){
        console.log('INDEX loading');
        App.renderView(new App.views.Test());
    }
});