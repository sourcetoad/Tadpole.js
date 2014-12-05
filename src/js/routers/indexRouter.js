/**
 * Created by SourceToad on 2/6/14.
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
        App.renderView(new App.views.Index());
    }
});