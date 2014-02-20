/**
 * Created by chriswillingham on 2/6/14.
 */
App.views.Index = BaseView.extend({
    initialize: function(){
        console.log('initializing');
        this.template = App.templates.index;
        this.scope = {
            i: 0
        }
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