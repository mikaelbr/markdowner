define([
        'backbone',
        'underscore',
        'jquery',
        'vent',
        'js/models/user',
        'bootstrap'
    ], 
    function (Backbone, _, $, vent, UserModel) {
    
    var settingsList = [
        'wrap-lines',
        'full-line-selection',
        'highlight-active-line',
        'show-invisibles',
        'show-indent-guides',
        'show-gutter',
        'show-print-margin',
        'use-soft-tab',
        'hightlight-selected-word'
    ], defaultSettings = {
        'wrap-lines': false,
        'full-line-selection': true,
        'highlight-active-line': true,
        'show-invisibles': false,
        'show-indent-guides': true,
        'show-gutter': true,
        'show-print-margin': true,
        'use-soft-tab': true,
        'hightlight-selected-word': true,
    };

    return Backbone.View.extend({
        el: '#editor-settings',

        initialize: function () {

            this.$el.modal({
                show: false,
                keyboard: true
            });

            vent.on('user:show', this.showModal, this);
            vent.on('user:hide', this.hideModal, this);
            vent.on('user:toggle', this.toggleModal, this);

            vent.on('editor:documentLoaded', this.setSettings, this);


            var _settings = this.model.get('settings') || {};

            if (!_settings.editor) {
                vent.trigger('editor:settings', defaultSettings);
            } else {
                vent.trigger('editor:settings', _settings.editor);
            }

            this.render();
        },

        events: {
            'click :checkbox': 'settingsChanged'
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

        settingsChanged: function(e) {
            var $target = $(e.currentTarget),
                settingName = $target.attr('class'),
                _settings = this.model.get('settings') || {};

            _settings.editor[settingName] = !_settings.editor[settingName];
            this.model.save({'settings': _settings});
            vent.trigger('editor:settings', _settings.editor);
        },

        setSettings: function () {
            var _settings = this.model.get('settings') || {};

            if (!_settings.editor) {
                _settings.editor = defaultSettings;
            }

            vent.trigger('editor:settings', _settings.editor);
        },

        render: function () {
            var _settings = this.model.get('settings') || {},
                settingSelected;

            if (!_settings.editor) {
                _settings.editor = defaultSettings;
            }

            for (var i = 0, len = settingsList.length; i < len; i++) {
                settingSelected = settingsList[i];

                if (_settings.editor[settingSelected]) {
                    this.$el.find('input.' + settingSelected).prop('checked', true);
                } else {
                    this.$el.find('input.' + settingSelected).removeProp('checked');
                }
            }
        }
        
    });

});