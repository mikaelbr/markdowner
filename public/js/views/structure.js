
define(['backbone', 
        'underscore', 
        'jquery', 
        'js/views/structureItem', 
        'vent'], 
        function (Backbone, _, $, ItemView, vent) {

  var getModelFromItemInTree = function (tree, id) {
    for(var i = 0, len = tree.length; i < len; i++) {
      if (tree[i].item.get('_id') === id) {
        return tree[i];
      }
    } 
    return null;
  };

  var getChilderenFromItemInTree = function (tree, id) {
    var item = getModelFromItemInTree(tree, id);
    if (!item) {
      return null;
    }

    return item.children;
  };

  return Backbone.View.extend({
    el: '#filelist',

    initialize: function () {
      this.collection.on('tree:sync', this.render, this);

      this.$elul = this.$el.children('ul');

      $('html').off('click.toolbar').on('click.toolbar', function( event ) {
          $('.tool-container').hide();
      });

      vent.on('sidebar:loadDocument', this.loadDocument, this);
      vent.on('sidebar:newfile', this.newfile, this);
      vent.on('sidebar:newfolder', this.newfolder, this);
      vent.on('sidebar:deletefolder', this.deleteFolder, this);
      vent.on('sidebar:loadFileAfterDelete', this.loadFileAfterDelete, this);
      vent.on('sidebar:renderChildren', this.renderChildrenOfModelInView, this);

      vent.on('sidebar:hide', this.hide, this);
      vent.on('sidebar:show', this.show, this);
      vent.on('sidebar:toggle', this.toggle, this);
    },

    events: {
      'contextmenu': 'toggleContextMenu',
      'click .sidebar-context .new-file': 'contextNewfile',
      'click .sidebar-context .new-folder': 'contextNewfolder'
    },

    loadFileAfterDelete: function (i) {
      // Get file below
      var model = this.collection.tree[i-1];

      // Check for file below and if it is Folder
      if (!model || !model.item || model.item.get('type') === 0) {
        model = this.collection.tree[i];
      }

      // Check for file below and if it is Folder
      if (!model || !model.item || model.item.get('type') === 0) {
        model = this.collection.tree[i+1];
      }

      if (!model || !model.item || model.item.get('type') === 0) {
        // No files, disable editor
        return vent.trigger('editor:setReadOnly');
      }

      // We now got a model, change this to the active one. 
      return vent.trigger('editor:loadDocument', model.item);
    },

    toggleContextMenu: function (e) {
        e.preventDefault();
        var menu = this.$el.children('.tool-container');
        menu.css({
            "margin-left": menu.outerWidth()/2 * -1,
            'top': e.clientY - 20
        });
        $('.tool-container').not(menu.toggle()).hide();
        return false;
    },

    contextNewfile: function (e) {
      e.preventDefault();
      this.$el.children('.tool-container').hide();
      vent.trigger('sidebar:newfile');
      return false;
    },

    contextNewfolder: function (e) {
      e.preventDefault();
      this.$el.children('.tool-container').hide();
      vent.trigger('sidebar:newfolder');
      return false;
    },

    render: function () {
      this.$elul.empty();
      _.each(this.collection.tree, this.renderOne, this);
      return this;
    },

    loadDocument: function (modelJSON) {
      var model = this.collection.get(modelJSON._id);
      vent.trigger('editor:loadDocument', model);
    },


    hide: function () {
      this.$el.hide();
    },

    show: function () {
      this.$el.show();
    },

    toggle: function (visible) {
      if (typeof visible === 'undefined') {
        this.$el.toggle();

        vent.trigger('user:setSidebarVisibility', this.$el.is(':visible'));

        if(this.$el.is(':visible')) {
          $('.tool-wrapper').css({
            left: this.$el.outerWidth()
          });
        } else {
          $('.tool-wrapper').css({
            left: 0
          });
        }
        return;
      }

      if (visible) {
        this.$el.show();
        $('.tool-wrapper').css({
          left: this.$el.outerWidth()
        });
        return;
      }
      
      this.$el.hide();
      $('.tool-wrapper').css({
        left: 0
      });
    },

    newfile: function (parent) {

      var parentId = parent && (parentId = parent.get('_id')) || null;
      var name = prompt('Enter filename for new file', 'Markdown File #1');

      if (name === null) {
        return;
      }

      var item = {
        name: name,
        parentId: parentId,
        type: 1
      };

      this.collection.create(item, {
        success: function(model, response, event) {
          vent.trigger('editor:loadDocument', model);
        }
      });
    },

    newfolder: function () {
      var name = prompt('Enter filename for new folder', 'Folder #1');

      if (name === null) {
        return;
      }

      var item = {
        name: name,
        parentId: null,
        type: 0,
        expanded: false
      };

      this.collection.create(item);
    },

    deleteFolder: function (folder) {
      var id = folder.get('_id');
      var children = getChilderenFromItemInTree(this.collection.tree, id);

      _.each(children, function(item) {
        item.item.destroy();
      });
    },

    renderChildrenOfModelInView: function (view, children) {
      var id = view.model.get('_id');
      var children = children || getChilderenFromItemInTree(this.collection.tree, id);

      var $parentLi = view.$el;

      if (children && children.length > 0) {

        var parent = $('<ul/>').addClass('nav nav-list').hide();

        if(view.model.get('expanded')) {
          parent.show();
        }

        $parentLi.append(parent);
        _.each(children, function (model) {
          model.parent = parent;
          this.renderChild(model);
        }, this);
      }
    },

    renderOne: function (model) {
      
      var modelView = new ItemView({
        model: model.item
      });

      var $parent = modelView.render();
      this.$elul.append($parent.el);
    },

    renderChild: function (model) {

      var modelView = new ItemView({
        model: model.item
      });

      model.parent.append(modelView.render().el);
    }

  });
});