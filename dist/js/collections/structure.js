define(["backbone","underscore","jquery","js/models/fileStructure"],function(e,t,n,r){return e.Collection.extend({url:"api/structure",model:r,initialize:function(){this.on("add",this.getTree,this),this.on("reset",this.getTree,this),this.on("destroy",this.getTreeSilent,this)},_buildTree:function(e){var t={};for(var n=0;n<e.length;n++){var r=e[n],i=r.get("parentId"),s=r.get("_id");i&&!t[i]?t[i]={children:[{item:r}]}:i?t[i].children.push({item:r}):t[s]&&!i?t[s].item=r:t[s]={item:r,children:[]}}return t},getTree:function(){var e=this._buildTree(this.models);e=t.sortBy(e,function(e){return e.item.get("name")}),this.tree=e,this.trigger("tree:sync",e)},getTreeSilent:function(){var e=this._buildTree(this.models);e=t.sortBy(e,function(e){return e.item.get("name")}),this.tree=e}})});