define(['backbone', 'underscore', 'jquery', 'vent',
        'order!bootstrap/js/bootstrap-transition',
        'order!bootstrap/js/bootstrap-modal', 'vent'], function(Backbone, _, $, vent) {
   
    return Backbone.View.extend({
        el: "#file-options",
        publicBase: 'http://markdowner.herokuapp.com/document/',

        initialize: function () {
            this.$el.modal({
                show: false,
                keyboard: true
            });
            vent.on('fileOptions:show', this.showModal, this);
            vent.on('fileOptions:hide', this.hideModal, this);
            vent.on('fileOptions:toggle', this.toggleModal, this);
        },

        events: {
            'change .public input': 'makePublic',
            'change .remark input': 'makeRemark',
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

        makePublic: function () {
            this.model.set('public', this.$el.find('.public input').is(':checked')).save();
            this.render();
        },

        makeRemark: function () {
            this.model.set('remark', this.$el.find('.remark input').is(':checked')).save();
            this.render();
        },

        showModal: function (model) {
            model && this.setModel(model);
            this.$el.modal('show');
        },

        hideModal: function () {
            this.$el.modal('hide');
        },

        toggleModal: function (model) {
            this.setModel(model);
            this.$el.modal('toggle');
        },


        render: function () {
            var body = this.$el.find('.modal-body form'),
                publicCheckBox = body.find('.public input[type="checkbox"]'),
                remarkCheckBox = body.find('.remark input[type="checkbox"]'),
                input = body.find('input[type="text"]'),
                btn = body.find('a.btn'),
                isPublic = this.model.get('public') || false,
                isRemark = this.model.get('remark') || false;

            input.val(this.publicBase + this.model.get('_id'));
            if ( isPublic ) {
                publicCheckBox.attr('checked', 'checked');
                input.addClass('readonly').removeAttr('disabled');
            } else {
                publicCheckBox.removeAttr('checked');
                input.removeClass('readonly').attr('disabled', 'disabled');
            }

            if ( isRemark ) {
                remarkCheckBox.attr('checked', 'checked');
            } else {
                remarkCheckBox.removeAttr('checked');
            }

            return this;
        }
    });
});