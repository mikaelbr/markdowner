define(["backbone","underscore","jquery","vent","marked"],function(e,t,n,r,i){function o(e){return s[e]||e}function u(e){return e.replace(/[&<>]/g,o)}var s={"<":"&lt;",">":"&gt;"};return e.View.extend({el:"#compiled",mdWrapper:'<div class="compiled github" />',rmWrapper:'<iframe class="remark-preview" />',initialize:function(){i.setOptions({gfm:!0,tables:!0,breaks:!0,pedantic:!1,sanitize:!0,smartLists:!0,langPrefix:"language-"}),this.$el.find(".compiled").hide(),r.on("compiled:render",this.setOutput,this),r.on("compiled:remark",this.setRemark,this)},setOutput:function(e){this.$el.find(".weak-text").remove();var t=this.$el.find(".compiled");t.length||(t=n(this.mdWrapper).appendTo(this.$el),this.$el.find(".remark-preview").remove());var r=i(e);t.html(r).show()},setRemark:function(e,t){this.$el.find(".weak-text").remove();var r=this.$el.find(".remark-preview");r.length?this.refreshIFrame(r[0],t):(r=n(this.rmWrapper).attr("src","/document/"+e.get("_id")).appendTo(this.$el),this.$el.find(".compiled").remove())},refreshIFrame:function(e,t){e.contentWindow.remark&&e.contentWindow.remark.loadFromString(u(t))}})});