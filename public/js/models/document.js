define(['backbone', 'jquery', 'ace'], function (Backbone, $, ace) {
    var EditSession = require('ace/edit_session').EditSession;

    return Backbone.Model.extend({
        urlRoot: '/api/document',
        idAttribute: 'file_id',

        _cssMode: "ace/mode/less",
        _markdownMode: "ace/mode/markdown",


        editorSession: null,
        cssEditorSession: null,

        isStyling: false,
        
        getEditorSession: function () {
          this.isStyling = false;

          if (this.editorSession !== null) {
            this.editorSession.setValue(this.get('body'));
            return this.editorSession;
          }

          this.editorSession = new EditSession(this.get('body'));
          this.editorSession.setMode(this._markdownMode);
          this.editorSession.on('change', $.proxy(this.bodyChange, this));
          return this.editorSession;
        },

        getCSSEditorSession: function () {
          this.isStyling = true;
          if (this.cssEditorSession !== null) {
            this.cssEditorSession.setValue(this.get('style'));
            return this.cssEditorSession;
          }
          var style = this.get('style');

          if (!style) {
            style = '// Write in LESS\n\n// Default style:\n@import "/stylesheets/default-remark.css";';
          }

          this.cssEditorSession = new EditSession(style);
          this.cssEditorSession.setMode(this._cssMode);
          this.cssEditorSession.on('change', $.proxy(this.cssChange, this));
          return this.cssEditorSession;
        },

        setSettings: function (settings) {
            this.editorSession && this.editorSession.setUseWrapMode(settings['wrap-lines']);
            this.editorSession && this.editorSession.setUseSoftTabs(settings['use-soft-tab']);
            this.editorSession && this.editorSession.setTabSize(2);
            this.cssEditorSession && this.cssEditorSession.setUseWrapMode(settings['wrap-lines']);
            this.cssEditorSession && this.cssEditorSession.setUseSoftTabs(settings['use-soft-tab']);
            this.cssEditorSession && this.cssEditorSession.setTabSize(2);
        },

        bodyChange: function (e, s) {
          this.set('body', s.getValue());
        },

        cssChange: function (e, s) {
          this.set('style', s.getValue());
        }
    });
});