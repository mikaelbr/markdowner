define(['backbone', 'jquery', 'vent'], function (Backbone, $, vent) {

    return Backbone.View.extend({
        el: "#load-screen",

        initialize: function () {
            this.hide();

            vent.on('load:hide', this.hide, this);
            vent.on('load:show', this.show, this);
            vent.on('load:toggle', this.toggle, this);
            vent.on('load:setText', this.setText, this);
        },

        setText: function (text) {
            this.$el.find('.load-text').html(text);
        },

        show: function (text) {
            text && this.setText(text);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        toggle: function (text) {
            text && this.setText(text);
            this.$el.toggle();
        }
    });

});