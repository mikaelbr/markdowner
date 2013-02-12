define([
        'backbone',
        'underscore',
        'jquery',
        'vent',
        'ace',
        'js/models/document'
    ], 
    function (Backbone, _, $, vent, ace, DocumentModel) {
    var themeBase = "ace/theme/";

    return Backbone.View.extend({
        el: '#editor',
        changeIterator: 0,
        changeSaveThreshold: 20,

        initialize: function () {
            this.e = ace.edit(this.el);
            this.e.setTheme(themeBase + "twilight");
            this.e.getSession().setMode("ace/mode/markdown");

            this.addCommand();

            this.e.on('change', $.proxy(this.onChange, this));

            vent.on('editor:compile', this.compile, this);
            vent.on('editor:changeTheme', this.changeTheme, this);
            vent.on('editor:loadDocument', this.loadDocument, this);
            vent.on('editor:saveDocument', this.saveDocument, this);
            vent.on('editor:currentEditorFileOptions', this.currentEditorFileOptions, this);

            vent.on('editor:toggleHorizontal', this.toggleHorizontal, this);
        },

        compile: function () {
            vent.trigger('compiled:render', this.e.getValue());
        },

        changeTheme: function (themeName) {
            vent.trigger('user:setTheme', themeName);
            this.e.setTheme(themeBase + themeName);
        },

        onChange: function (e) {
            // Editor changed. Save once per 10 change
            if (this.changeIterator++ > this.changeSaveThreshold) {
                this.changeIterator = 0;
                vent.trigger('editor:saveDocument');
            }
        },

        toggleHorizontal: function (horizontal) {
            if (typeof horizontal === 'undefined') {
                this.$el.parent().toggleClass('horizontal');
                vent.trigger('user:setView', this.$el.parent().hasClass('horizontal'));
                return;
            }

            if (horizontal) {
                this.$el.parent().addClass('horizontal');
            } else {
                this.$el.parent().removeClass('horizontal');
            }
        },

        currentEditorFileOptions: function () {
            vent.trigger('fileOptions:show', this.fileModel);
        },

        loadDocument: function (file) {
            var self = this;
            this.fileModel = file;
            var documentId = file.get('_id');

            this.fileModel.trigger('loaded');
            vent.trigger('user:setActiveDocument', this.fileModel);

            this.activeDoc = new DocumentModel({file_id: documentId});
            this.activeDoc.fetch().then(function () {
                if (!self.activeDoc.get('body')) {
                    self.createDocument(documentId);
                    return;
                }
                self.setContent();
            });
        },

        setContent: function () {
            this.e.setValue(this.activeDoc.get('body'));
            this.e.clearSelection();
            this.e.moveCursorTo(0,0);
        },

        createDocument: function (documentId) {
            var newFile = {
                file_id: documentId,
                body: 'Hello World\n========\nLorem ipsum...'
            };

            this.activeDoc = new DocumentModel(newFile);
            this.activeDoc.save().then($.proxy(this.setContent, this));
        },

        saveDocument: function () {
            vent.trigger('load:show', 'Saving ...');
            this.activeDoc.save({'body': this.e.getValue()}).then(function () {
                vent.trigger('load:hide');
            });
        },

        addCommand: function () {
            var self = this;
            this.e.commands.addCommand({ 
                name:"markdown", 
                bindKey: { 
                    win:"Ctrl-M",
                    mac:"Command-M"
                },
                exec: function(t){
                    self.compile();
                },
                readOnly: true
            });

            this.e.commands.addCommand({ 
                name:"newFile", 
                bindKey: { 
                    win:"Ctrl-L",
                    mac:"Command-L"
                },
                exec: function(t){
                    vent.trigger('sidebar:newfile');
                    return false;
                },
                readOnly: true
            });

            this.e.commands.addCommand({ 
                name:"saveDocument", 
                bindKey: { 
                    win:"Ctrl-S",
                    mac:"Command-S"
                },
                exec: function(t){
                    vent.trigger('editor:saveDocument');
                    return true;
                },
                readOnly: true
            });

            this.e.commands.addCommand({ 
                name:"newFolder", 
                bindKey: { 
                    win:"Shift-Ctrl-L",
                    mac:"Shift-Command-L"
                },
                exec: function(t){
                    vent.trigger('sidebar:newfolder');
                    return false;
                },
                readOnly: true
            });

            this.e.commands.addCommand({ 
                name:"newFolder", 
                bindKey: { 
                    win:"Ctrl-K",
                    mac:"Command-K"
                },
                exec: function(t){
                    vent.trigger('sidebar:toggle');
                    return false;
                },
                readOnly: true
            });
        }
    });

});