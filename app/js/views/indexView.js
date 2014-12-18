/***
 * Created at SourceToad
 */

/**
 * Boilerplate view for the index.hbs template.
 */
App.views.Index = BaseView.extend({
    initialize: function(){
        console.log('initializing');
        this.template = App.templates.index;
        this.scope = {
            i: 0
        };
    },
    
    events: {
        'click #test': 'clicked'
    },
    clicked: function(e){
        this.scope.i++;
        console.log('Button clicked:', this.scope.i, 'times');
        this.render();
    }
});