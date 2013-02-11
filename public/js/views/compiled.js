define(['backbone', 'underscore', 'jquery', 'vent'], function (Backbone, _, $, vent) {

    return Backbone.View.extend({
        el: '#compiled',

        initialize: function () {
            this.converter = new Showdown.converter;
            this.$el.hide();
            vent.on('compiled:render', this.setOutput, this);
        },

        setOutput: function (input) {
            this.$el.parent().find('.weak-text').remove();
            this.$el.html(this.converter.makeHtml(input));
            this.$el.show();
        }

    });

});