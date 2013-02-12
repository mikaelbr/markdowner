define(['backbone', 'underscore', 'jquery', 'vent'], function (Backbone, _, $, vent) {

    return Backbone.View.extend({
        el: '#compiled',

        initialize: function () {
            this.converter = new Showdown.converter;
            this.$el.hide();
            vent.on('compiled:render', this.setOutput, this);
            vent.on('compiled:remark', this.setRemark, this);
        },

        setOutput: function (input) {
            this.$el.parent().find('.weak-text').remove();
            this.$el.html(this.converter.makeHtml(input));
            this.$el.show();
        },

        setRemark: function (fileModel) {
            this.$el.parent().find('.weak-text').remove();
            var link = $('<a />', {
                text: 'Visit Share Page',
                href: '/document/' + fileModel.get('_id')
            });
            var wrapper = $('<div />', {
                'class': 'alert'
            }).html("<p>To view a Remark document, the document needs to be public and viewed in the share page.</p>").append(link);
            this.$el.html(wrapper);
            this.$el.show();
        }

        

    });

});