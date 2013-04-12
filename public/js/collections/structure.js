
define(['backbone', 'underscore', 'jquery', 'js/models/fileStructure'], function (Backbone, _, $, FileStructureModel) {
    return Backbone.Collection.extend({
        url: 'api/structure',
        model: FileStructureModel,

        initialize: function () {
            this.on('add', this.getTree, this);
            this.on('reset', this.getTree, this);
            this.on('destroy', this.getTreeSilent, this);
        },

        _buildTree: function (list) {
          var tree = {};

          for(var i=0; i<list.length; i++) {
            var item = list[i],
                parentId = item.get('parentId'),
                id = item.get('_id');

            if (parentId && !tree[parentId]) {
                tree[parentId] = { children: [{item: item}]};
            } else if (parentId) {
                tree[parentId].children.push({item: item});
            } else if (tree[id] && !parentId) {
                tree[id].item = item;
            } else {
                tree[id] = {item: item, children: []};
            }
          }

          return tree;
        },

        getTree: function () {
            var tree = this._buildTree(this.models);
            tree = _.sortBy(tree, function (el) {
                return el.item.get('name');
            });
            this.tree = tree;
            this.trigger('tree:sync', tree);
        },

        getTreeSilent: function (model) {
            var tree = this._buildTree(this.models);
            tree = _.sortBy(tree, function (el) {
                return el.item.get('name');
            });
            this.tree = tree;
            this.trigger('tree:destroy', model, tree);
        }
    });
});