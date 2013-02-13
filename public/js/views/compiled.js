define(['backbone', 'underscore', 'jquery', 'vent'], function (Backbone, _, $, vent) {

    return Backbone.View.extend({
        el: '#compiled',

        mdWrapper: '<div class="compiled github" />',
        rmWrapper: '<iframe class="remark-preview" />',

        initialize: function () {
            this.converter = new Showdown.converter;
            this.$el.find('.compiled').hide();
            vent.on('compiled:render', this.setOutput, this);
            vent.on('compiled:remark', this.setRemark, this);
        },

        setOutput: function (input) {
            this.$el.find('.weak-text').remove();
            var $inEl = this.$el.find('.compiled');
            if (!$inEl.length) {
                $inEl = $(this.mdWrapper).appendTo(this.$el);
                this.$el.find('.remark-preview').remove();
            }
            $inEl.html(this.converter.makeHtml(input));
            $inEl.show();
        },

        setRemark: function (fileModel) {
            this.$el.find('.weak-text').remove();

            var $inEl = this.$el.find('.remark-preview');
            if (!$inEl.length) {
                $inEl = $(this.rmWrapper).attr('src', '/document/' + fileModel.get('_id')).appendTo(this.$el);
                this.$el.find('.compiled').remove();
            } else {
                $inEl.attr('src', '/document/' + fileModel.get('_id'));
            }
        }

        

    });

});