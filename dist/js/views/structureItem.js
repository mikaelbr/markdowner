define(["backbone","underscore","jquery","vent","text!templates/sidebar/folder.html","text!templates/sidebar/link.html"],function(e,t,n,r,i,s){return e.View.extend({tagName:"li",folderTemplate:t.template(i),fileTemplate:t.template(s),events:{"click .nav-header":"expandFolder","click a.md-file":"loadDocument",contextmenu:"toggleContextMenu","click .tool-container:first .delete":"delete","click .tool-container:first .rename":"rename","click .tool-container:first .new-file":"newfile","click .tool-container:first .options":"fileOptions"},initialize:function(){this.model.on("change",this.render,this),this.model.on("destroy",this.remove,this),this.model.on("loaded",this.setActive,this)},expandFolder:function(){var e=this.$el.find("ul"),t=!e.is(":visible");this.model.set("expanded",t).save(),this.toggleExpandedVisibility()},setActive:function(e){n("#filelist").find("li").not(this.$el.addClass("active")).removeClass("active")},loadDocument:function(e){return e.preventDefault(),r.trigger("editor:loadDocument",this.model),!1},fileOptions:function(e){return e.preventDefault(),r.trigger("fileOptions:show",this.model),!1},"delete":function(e){var t="Do you really want to delete this file?";this.model.get("type")===0&&(t="Are you sure you want to delete this folder and all the files in it?");var n=confirm(t);return n&&(this.model.get("type")===0&&r.trigger("sidebar:deletefolder",this.model),this.model.destroy()),this.toggleContextMenu(e),!1},rename:function(e){e.preventDefault();var t=prompt("Please set new file name",this.model.get("name"));return this.toggleContextMenu(e),t?(this.model.set("name",t).save(),!1):!1},newfile:function(e){return e.preventDefault(),r.trigger("sidebar:newfile",this.model),!1},toggleContextMenu:function(e){e.preventDefault();var t=this.$el.find(".tool-container:first");return t.css({"margin-left":t.outerWidth()/2*-1}),n(".tool-container").not(t.toggle()).hide(),!1},toggleExpandedVisibility:function(){var e=this.$el.find("ul"),t=this.$el.find("span i");e.is(":visible")?(e.show(),t.className="icon-chevron-up"):(e.hide(),t.className="icon-chevron-down")},render:function(){if(this.model.get("type")===0){var e=this.model.toJSON();e.expanded||(e.expanded=!1),this.$el.html(this.folderTemplate(e)),r.trigger("sidebar:renderChildren",this)}else this.model.get("type")===1&&this.$el.html(this.fileTemplate(this.model.toJSON()));return this},renderChildren:function(){}})});