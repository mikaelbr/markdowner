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
        changeSaveThreshold: 40,
        fetchingDocument: false,

        initialize: function () {
            this.e = ace.edit(this.el);
            this.e.setReadOnly(true);
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
            var self = this;
            if (self.fileModel.get('remark') ){
                vent.trigger('editor:saveDocument', function () {
                    vent.trigger('compiled:remark', self.fileModel);
                });
                return;
            }
            vent.trigger('compiled:render', self.e.getValue());
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

                this.e.resize();
                return;
            }

            if (horizontal) {
                this.$el.parent().addClass('horizontal');
            } else {
                this.$el.parent().removeClass('horizontal');
            }
            this.e.resize();
        },

        currentEditorFileOptions: function () {
            vent.trigger('fileOptions:show', this.fileModel);
        },

        loadDocument: function (file) {
            if(!file || this.fetchingDocument) {
                return;
            }

            // Save old document before changing.
            if(this.activeDoc) {
                vent.trigger('editor:saveDocument');
            }

            var self = this;
            this.fileModel = file;
            var documentId = file.get('_id');

            vent.trigger('load:show', 'Opening ...');

            this.fetchingDocument = true;
            this.activeDoc = new DocumentModel({file_id: documentId});
            this.activeDoc.fetch().then(function () {
                self.setContent();
            });
        },

        setContent: function () {
            this.e.setValue(this.activeDoc.get('body'));
            vent.trigger('load:hide');

            this.e.clearSelection();
            this.e.moveCursorTo(0,0);

            this.fileModel.trigger('loaded');
            vent.trigger('user:setActiveDocument', this.fileModel);
            this.e.setReadOnly(false);

            vent.trigger('editor:compile');

            this.fetchingDocument = false;
        },

        saveDocument: function (cb) {
            cb = cb || function () {};
            vent.trigger('load:show', 'Saving ...');
            this.activeDoc.save({'body': this.e.getValue()}).then(function () {
                vent.trigger('load:hide');
                cb();
            });
        },

        _deactivateCommand: function (name, win, mac) {
            // Deactivate some commands:
            this.e.commands.addCommand({ 
                name: name, 
                bindKey: { 
                    win: win,
                    mac: mac
                },
                exec: function(t){
                    return false;
                },
                readOnly: true
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

            // Deactivate some commands:
            this._deactivateCommand("search", "Ctrl-F", "Command-F");
            this._deactivateCommand("replace", "Ctrl-R", "Command-Option-F");
            this._deactivateCommand("replaceall", "Ctrl-Shift-R", "Command-Shift-Option-F");

        }
    });

});