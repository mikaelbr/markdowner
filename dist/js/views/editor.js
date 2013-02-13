define(["backbone","underscore","jquery","vent","ace","js/models/document"],function(e,t,n,r,i,s){var o="ace/theme/";return e.View.extend({el:"#editor",changeIterator:0,changeSaveThreshold:40,fetchingDocument:!1,initialize:function(){this.e=i.edit(this.el),this.e.setReadOnly(!0),this.e.setTheme(o+"twilight"),this.e.getSession().setMode("ace/mode/markdown"),this.addCommand(),this.e.on("change",n.proxy(this.onChange,this)),r.on("editor:compile",this.compile,this),r.on("editor:changeTheme",this.changeTheme,this),r.on("editor:loadDocument",this.loadDocument,this),r.on("editor:saveDocument",this.saveDocument,this),r.on("editor:currentEditorFileOptions",this.currentEditorFileOptions,this),r.on("editor:toggleHorizontal",this.toggleHorizontal,this)},compile:function(){var e=this;if(e.fileModel.get("remark")){r.trigger("editor:saveDocument",function(){r.trigger("compiled:remark",e.fileModel)});return}r.trigger("compiled:render",e.e.getValue())},changeTheme:function(e){r.trigger("user:setTheme",e),this.e.setTheme(o+e)},onChange:function(e){this.changeIterator++>this.changeSaveThreshold&&(this.changeIterator=0,r.trigger("editor:saveDocument"))},toggleHorizontal:function(e){if(typeof e=="undefined"){this.$el.parent().toggleClass("horizontal"),r.trigger("user:setView",this.$el.parent().hasClass("horizontal")),this.e.resize();return}e?this.$el.parent().addClass("horizontal"):this.$el.parent().removeClass("horizontal"),this.e.resize()},currentEditorFileOptions:function(){r.trigger("fileOptions:show",this.fileModel)},loadDocument:function(e){if(!e||this.fetchingDocument)return;this.activeDoc&&r.trigger("editor:saveDocument");var t=this;this.fileModel=e;var n=e.get("_id");r.trigger("load:show","Opening ..."),this.fetchingDocument=!0,this.activeDoc=new s({file_id:n}),this.activeDoc.fetch().then(function(){t.activeDoc.get("body")?t.setContent():t.createDocument(n)})},setContent:function(){this.e.setValue(this.activeDoc.get("body")),r.trigger("load:hide"),this.e.clearSelection(),this.e.moveCursorTo(0,0),this.fileModel.trigger("loaded"),r.trigger("user:setActiveDocument",this.fileModel),this.e.setReadOnly(!1),r.trigger("editor:compile"),this.fetchingDocument=!1},createDocument:function(e){var t={file_id:e,body:"Hello World\n===\nLorem ipsum..."};this.activeDoc=new s(t),this.activeDoc.save().then(n.proxy(this.setContent,this))},saveDocument:function(e){e=e||function(){},r.trigger("load:show","Saving ..."),this.activeDoc.save({body:this.e.getValue()}).then(function(){r.trigger("load:hide"),e()})},_deactivateCommand:function(e,t,n){this.e.commands.addCommand({name:e,bindKey:{win:t,mac:n},exec:function(e){return!1},readOnly:!0})},addCommand:function(){var e=this;this.e.commands.addCommand({name:"markdown",bindKey:{win:"Ctrl-M",mac:"Command-M"},exec:function(t){e.compile()},readOnly:!0}),this.e.commands.addCommand({name:"newFile",bindKey:{win:"Ctrl-L",mac:"Command-L"},exec:function(e){return r.trigger("sidebar:newfile"),!1},readOnly:!0}),this.e.commands.addCommand({name:"saveDocument",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:function(e){return r.trigger("editor:saveDocument"),!0},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Shift-Ctrl-L",mac:"Shift-Command-L"},exec:function(e){return r.trigger("sidebar:newfolder"),!1},readOnly:!0}),this.e.commands.addCommand({name:"newFolder",bindKey:{win:"Ctrl-K",mac:"Command-K"},exec:function(e){return r.trigger("sidebar:toggle"),!1},readOnly:!0}),this._deactivateCommand("search","Ctrl-F","Command-F"),this._deactivateCommand("replace","Ctrl-R","Command-Option-F"),this._deactivateCommand("replaceall","Ctrl-Shift-R","Command-Shift-Option-F")}})});