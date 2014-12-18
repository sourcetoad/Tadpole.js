/***
 * Created at SourceToad
 */

/**
 * Base view from which all child views extend, it's methods are global.
 */
var BaseView = Backbone.View.extend({
    scope: {},
    template: function(){
        return '<h1>PLACEHOLDER</h1>';
    },
    initialize: function(){

    },
    getScope: function(){
        return this.scope;
    },
    render: function(){
//        this.unrender();
        console.log("RENDERING");
        var html = this.template(this.getScope());
        this.$el.html(html);
        return this;
    },
    unrender: function(){
//        this.$el.html('');
    },
    bindTo: function(source, event, callback) {
        source.bind(event, callback, this);
        this.bindings = this.bindings || [];
        this.bindings.push({ source: source, event: event, callback: callback });
    },
    unbindFromAll: function() {
        _.each(this.bindings, function(binding) {
            binding.source.unbind(binding.event, binding.callback);
        });
        this.bindings = [];
    },
    leave: function() {
        this.trigger('leave');
        this.unbind();
        this.unbindFromAll();
            //COMPLETELY UNBIND THE VIEW
        this.undelegateEvents();
        $(this.el).removeData().unbind(); 
        //Remove view from DOM
        this.remove();  
        Backbone.View.prototype.remove.call(this);
    }
});