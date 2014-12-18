/**
 * Created at SourceToad
 */

/**
 * Route for IndexView at /.
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