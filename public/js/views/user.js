define([
        'backbone',
        'underscore',
        'jquery',
        'vent',
        'js/models/user'
    ], 
    function (Backbone, _, $, vent, UserModel) {

    return Backbone.View.extend({
        el: '#user-box',

        initialize: function () {
            this.model = new UserModel({_id: 'foo'});
            this.model.fetch().then($.proxy(this.initiateMarkdowner, this));

            this.$el.modal({
                show: false,
                keyboard: true
            });


            vent.on('user:show', this.showModal, this);
            vent.on('user:hide', this.hideModal, this);
            vent.on('user:toggle', this.toggleModal, this);

            // User settings. 
            vent.on('user:setActiveDocument', this.setActiveDocument, this);
            vent.on('user:setTheme', this.setTheme, this);
            vent.on('user:setView', this.setView, this);
            vent.on('user:setSidebarVisibility', this.setSidebarVisibility, this);
        },

        initiateMarkdowner: function () {
            var _settings = this.model.get('settings') || {};
            _settings.theme && vent.trigger('editor:changeTheme', _settings.theme);
            _settings.activeDocument && vent.trigger('sidebar:loadDocument', _settings.activeDocument, this);
            typeof _settings.horizontal !== "undefined" && vent.trigger('editor:toggleHorizontal', _settings.horizontal, this);
            typeof _settings.sidebarVisible !== "undefined" && vent.trigger('sidebar:toggle', _settings.sidebarVisible, this);

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
            this.$el.modal('toggle');
        },

        setActiveDocument: function (fileModel) {
            var _settings = this.model.get('settings') || {};

            _settings.activeDocument = fileModel;
            this.model.save({'settings': _settings});
        },

        setTheme: function (themeName) {
            var _settings = this.model.get('settings') || {};
            _settings.theme = themeName;
            this.model.save({'settings': _settings});
        },

        setView: function (horizontal) {
            var _settings = this.model.get('settings') || {};
            _settings.horizontal = horizontal;
            this.model.save({'settings': _settings});
        },

        setSidebarVisibility: function (visible) {
            var _settings = this.model.get('settings') || {};
            _settings.sidebarVisible = visible;
            this.model.save({'settings': _settings});
        },

        render: function () {
            
        }

        
    });

});