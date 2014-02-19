/**
 * Created by chriswillingham on 2/6/14.
 */
App.views.Index = BaseView.extend({
    template: null,
    el: '#main',
    name: 'hello world',
    initialize: function(){
        this.template = App.templates.index;
    },
    events: {
        
    },
    render: function(){
        console.log("RENDERING INDEX");
        var html = this.template(this);
        this.$el.html(html);
    }
});