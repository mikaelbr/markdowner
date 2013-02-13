define(['backbone', 
        'underscore', 
        'jquery', 
        'vent',
        'bootstrap'
        ], function(Backbone, _, $, vent) {
   
    return Backbone.View.extend({
        el: "#file-settings",
        publicBase: 'http://www.markdowner.com/document/',

        initialize: function () {
            vent.on('editor:loadDocument', this.setModel, this);
            vent.on('fileOptions:show', this.show, this);
            vent.on('fileOptions:hide', this.hide, this);
            vent.on('fileOptions:toggle', this.toggle, this);

            this.$el.tooltip({
                selector: 'a[data-toggle="tooltip"]'
            });
        },

        events: {
            'click .public-button': 'togglePublic',
            'click .remark-button': 'toggleRemark',
            'focus input[type="text"]': 'selectText'
        },

        setModel: function (model) {
            this.model = model;
            this.render();
        },

        selectText: function () {
            var self = this;
            setTimeout(function () {
                self.$el.find('input[type="text"]').select();
            }, 300);
        },

        togglePublic: function () {
            var isPublic = this.model.get('public') || false;
            if (this.model.get('remark')) {
                return;
            }
            this.model.save({ "public": !isPublic }).then($.proxy(this.render, this));
        },

        toggleRemark: function () {
            var isRemark = this.model.get('remark') || false;
            if (!this.model.get('public')) {
                this.model.set('public', true);
            }
            this.model.save({ "remark": !isRemark }).then($.proxy(this.render, this));
        },

        show: function (model) {
            this.setModel(model);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        toggle: function (model) {
            this.setModel(model);
            this.$el.toggle();
        },


        render: function () {
            var input = this.$el.find('input[type="text"]'),
                publicButton = this.$el.find('.public-button'),
                remarkButton = this.$el.find('.remark-button'),
                isPublic = this.model.get('public'),
                isRemark = this.model.get('remark');

            input.val(this.publicBase + this.model.get('_id'));
            if ( isPublic ) {
                publicButton.addClass('btn-info active');
                input.addClass('readonly').removeAttr('disabled');
            } else {
                publicButton.removeClass('btn-info active');
                input.removeClass('readonly').attr('disabled', 'disabled');
            }

            if ( isRemark ) {
                remarkButton.addClass('btn-info active');
            } else {
                remarkButton.removeClass('btn-info active');
            }
            vent.trigger('editor:compile');

            return this;
        }
    });
});