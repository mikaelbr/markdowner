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

        _defaultTheme: "twilight",
        _cssMode: "ace/mode/less",
        _markdownMode: "ace/mode/markdown",

        _changeIterator: 0,
        _changeSaveThreshold: 40,
        _fetchingDocument: false,
        _activeStyling: false,

        initialize: function (options) {
            this.e = ace.edit(this.el);
            this.e.setReadOnly(true);
            this.e.setTheme(themeBase + this._defaultTheme);
            this.e.getSession().setMode(this._markdownMode);
            this.addCommand();


            if (options && options.fileModel) {
                this.fileModel = options.fileModel;
            }

            if (options && options.activeDoc) {
                this.activeDoc = options.activeDoc;
            }

            this.e.on('change', $.proxy(this.onChange, this));

            this.noFile();

            vent.on('editor:compile', this.compile, this);
            vent.on('editor:changeTheme', this.changeTheme, this);
            vent.on('editor:editStyling', this.toggleEditStyling, this);
            vent.on('editor:loadDocument', this.loadDocument, this);
            vent.on('editor:saveDocument', this.saveDocument, this);
            vent.on('editor:currentEditorFileOptions', this.currentEditorFileOptions, this);

            vent.on('editor:noFile', this.noFile, this);

            vent.on('editor:toggleHorizontal', this.toggleHorizontal, this);
        },

        noFile: function () {
            this.e.setValue('# No file defined. Create a new one or select from the sidebar');
            this.e.setReadOnly(true);
            vent.trigger('compiled:render', this.e.getValue());
        },

        toggleEditStyling: function (file) {
            file = file || this.fileModel;
            var self = this;
            var toggle = function () {
                if (self._activeStyling) {
                    return self.regularWriteMode();
                }
                return self.stylingWriteMode();
            };
            if (file.get('_id') === this.fileModel.get('_id')) {
                return toggle();
            }

            this.loadDocument(file, toggle);
        },

        stylingWriteMode: function () {
            var style = this.activeDoc.get('style') || '// Write in LESS\n\n// Default style:\n@import "/stylesheets/default-remark.css";';
            var self = this;
            this.saveDocument(function () {
                // Saved. We can now switch to styling mode.
                self._activeStyling = true;
                self.e.getSession().setMode(self._cssMode);
                self.e.setValue(style);
                self.e.clearSelection();
                self.e.moveCursorTo(0,0);
            });
        },

        regularWriteMode: function () {
            var body = this.activeDoc.get('body');
            var self = this;
            this.saveDocument(function () {
                // Saved. We can now switch to styling mode.
                self._activeStyling = false;
                self.e.getSession().setMode(self._markdownMode);
                self.e.setValue(body);
                self.e.clearSelection();
                self.e.moveCursorTo(0,0);
            });
        },

        compile: function () {
            var self = this;
            if (self.fileModel.get('remark') ){
                return vent.trigger('editor:saveDocument', function () {
                    vent.trigger('compiled:remark', self.fileModel, self.e.getValue());
                });
            }
            vent.trigger('compiled:render', self.e.getValue());
        },

        changeTheme: function (themeName) {
            vent.trigger('user:setTheme', themeName);
            this.e.setTheme(themeBase + themeName);
        },

        onChange: function (e) {

            if(this._activeStyling) {
                return;
            }

            if (this.fileModel && this.fileModel.get('remark') === true) {
                return;
            }

            // Editor changed. Save once per 10 change
            if (this._changeIterator > this._changeSaveThreshold) {
                this._changeIterator = 0;
                vent.trigger('editor:saveDocument');
            }

            if (this._changeIterator % 5 === 0)  {
                vent.trigger('editor:compile');
            }

            this._changeIterator++;
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

        loadDocument: function (file, cb) {
            if(!file || this._fetchingDocument) {
                return;
            }

            if(this.activeDoc && this.activeDoc.get('file_id') === file.get('_id')) {
                return;
            }

            var self = this;
            var loadDoc = function () {
                self.fileModel = file;
                var documentId = file.get('_id');

                vent.trigger('load:show', 'Opening ...');

                self._fetchingDocument = true;
                self.activeDoc = new DocumentModel({file_id: documentId});
                self.activeDoc.fetch().then(function () {
                    self.setContent(cb);
                });
            };

            // Save old document before changing.
            if(this.activeDoc) {
                return self.saveDocument(loadDoc);
            }
            loadDoc();
        },

        setReadOnly: function () {
            this.e.setReadOnly(true);
        },

        setContent: function (cb) {
            cb = cb || function () {};

            if (this._activeStyling) {
                this._activeStyling = false;
                this.e.getSession().setMode(this._markdownMode);
            }

            this.e.setValue(this.activeDoc.get('body'));
            vent.trigger('load:hide');

            this.e.clearSelection();
            this.e.moveCursorTo(0,0);

            this.fileModel.trigger('loaded');
            vent.trigger('user:setActiveDocument', this.fileModel);
            this.e.setReadOnly(false);

            vent.trigger('editor:compile');

            this._fetchingDocument = false;
            this._changeIterator = 0;
            cb();
        },

        saveDocument: function (cb) {
            cb = cb || function () {};

            if (this._activeStyling) {
                this.activeDoc.set({'style': this.e.getValue()});
            } else {
                this.activeDoc.set({'body': this.e.getValue()});
            }

            vent.trigger('load:show', 'Saving ...');
            this.activeDoc.save().then(function () {
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