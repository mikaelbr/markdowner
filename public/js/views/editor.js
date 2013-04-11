define(['ace',
        'backbone',
        'underscore',
        'jquery',
        'vent',
        'js/models/document',
        'js/collections/openDocuments'
    ], 
    function (ace, Backbone, _, $, vent, DocumentModel, openDocuments) {
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

            this.addCommand();
            this.noFile();

            if (options && options.fileModel) {
                this.fileModel = options.fileModel;
            }

            if (options && options.activeDoc) {
                this.activeDoc = options.activeDoc;
            }

            this.e.on('change', $.proxy(this.onChange, this));

            vent.on('editor:compile', this.compile, this);
            vent.on('editor:changeTheme', this.changeTheme, this);
            vent.on('editor:editStyling', this.toggleEditStyling, this);
            vent.on('editor:loadDocument', this.loadDocument, this);
            vent.on('editor:saveDocument', this.saveDocument, this);
            vent.on('editor:currentEditorFileOptions', this.currentEditorFileOptions, this);

            vent.on('editor:noFile', this.noFile, this);
            vent.on('editor:settings', this.setSettings, this);

            vent.on('editor:toggleHorizontal', this.toggleHorizontal, this);
        },

        setSettings: function (settings) {
            this.e.setSelectionStyle(settings['full-line-selection'] ? 'line' : 'text');
            this.e.setHighlightActiveLine(settings['highlight-active-line']);
            this.e.setShowInvisibles(settings['show-invisibles']);
            this.e.setDisplayIndentGuides(settings['show-indent-guides']);
            this.e.renderer.setShowGutter(settings['show-gutter']);
            this.e.setShowPrintMargin(settings['show-print-margin']);
            this.e.setHighlightSelectedWord(settings['hightlight-selected-word']);
            
            this.setDocSettings(settings);  
        },

        setDocSettings: function (settings) {
            this.activeDoc && this.activeDoc.setSettings(settings);
        },

        noFile: function () {
            this.e.setValue('# No file defined. Create a new one or select from the sidebar');
            this.e.setReadOnly(true);
            // vent.trigger('compiled:render', this.e.getValue());
        },

        toggleEditStyling: function (file) {
            file = file || this.fileModel;
            var self = this;

            if (!self.fileModel.get('remark')) {
                return false;
            }

            if (!self.activeDoc.isStyling) {
                return self.e.setSession(self.activeDoc.getCSSEditorSession());
            }

            return self.e.setSession(self.activeDoc.getEditorSession());
        },

        compile: function () {
            var self = this;

            if (!self.activeDoc.isStyling) {
                vent.trigger('compiled:render', self.fileModel, self.activeDoc);
                return;
            }

            vent.trigger('editor:saveDocument', function () {
                vent.trigger('compiled:render', self.fileModel, self.activeDoc);
            });
        },

        changeTheme: function (themeName) {
            vent.trigger('user:setTheme', themeName);
            this.e.setTheme(themeBase + themeName);
        },

        onChange: function (e) {
            
            // Editor changed. Save once per 10 change
            if (this._changeIterator > this._changeSaveThreshold) {
                this._changeIterator = 0;
                vent.trigger('editor:saveDocument');
            }

            this._changeIterator++;

            if(this.activeDoc.isStyling) {
                return;
            }

            vent.trigger('editor:compile');

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
                var documentId = file.get('_id'),
                    doc = openDocuments.get(documentId);

                if (doc) {
                    self.activeDoc = doc;
                    self.setContent(cb);
                    return;
                }

                vent.trigger('load:show', 'Opening ...');

                self._fetchingDocument = true;
                self.activeDoc = new DocumentModel({file_id: documentId});
                openDocuments.add(self.activeDoc);
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

            this.activeDoc.getCSSEditorSession()
            this.e.setSession(this.activeDoc.getEditorSession());
            vent.trigger('load:hide');

            this.fileModel.trigger('loaded');
            vent.trigger('user:setActiveDocument', this.fileModel);
            this.e.setReadOnly(false);

            vent.trigger('editor:compile');
            vent.trigger('editor:documentLoaded', self.activeDoc);

            this._fetchingDocument = false;
            this._changeIterator = 0;
            cb();
        },

        saveDocument: function (cb) {
            cb = cb || function () {};

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
                    win:"Shift-Ctrl-I",
                    mac:"Shift-Command-I"
                },
                exec: function(t){
                    vent.trigger('editor:editStyling');
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