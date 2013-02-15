
define([
        'backbone', 
        'underscore', 
        'jquery', 
        'vent',
        'text!templates/sidebar/folder.html', 
        'text!templates/sidebar/link.html'
        ], function (Backbone, _, $, vent, FolderTemplate, LinkTemplate) {
    return Backbone.View.extend({
        tagName: 'li',

        folderTemplate: _.template(FolderTemplate), 
        fileTemplate: _.template(LinkTemplate), 

        events: {
            'click .nav-header': 'expandFolder',
            'click a.md-file': 'loadDocument',
            'contextmenu': 'toggleContextMenu',
            // 'contextmenu': 'rightClickFolder',
            'click .tool-container:first .delete': 'delete',
            'click .tool-container:first .rename': 'rename',
            'click .tool-container:first .new-file': 'newfile',
            'click .tool-container:first .styling': 'styling'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.removeItem, this);
            this.model.on('loaded', this.setActive, this);
        },

        expandFolder: function () {
            var ul = this.$el.find('ul'),
                invertedVisible = !ul.is(':visible');
            this.model.set('expanded', invertedVisible).save();
            this.toggleExpandedVisibility();
        },

        setActive: function (e) {
            $('#filelist').find('li').not(this.$el.addClass('active')).removeClass('active');
        },

        removeItem: function () {
            if (this.$el.hasClass('active')) {
                vent.trigger('sidebar:loadFileAfterDelete', this.$el.index())
            }
            this.remove();
        },

        loadDocument: function (e) {
            e.preventDefault();
            if(this.$el.hasClass('active')) return false;
            vent.trigger('editor:loadDocument', this.model);
            return false;
        },

        styling: function (e) {
            e.preventDefault();
            vent.trigger('editor:editStyling', this.model);
            return false;
        },

        delete: function (e) {
            // Temporary solution. Need to trigger a Model View.
            var self = this;
            self.nIndex = this.$el.index();
            var msg = 'Do you really want to delete this file?';
            if (this.model.get('type') === 0) {
                msg = 'Are you sure you want to delete this folder and all the files in it?';
            }
            var conf = confirm(msg);

            if (conf) {
                if(this.model.get('type') === 0) {
                    vent.trigger('sidebar:deletefolder', this.model);
                }
                this.model.destroy();
            }
            this.toggleContextMenu(e);
            return false;
        },

        rename: function (e) {
            e.preventDefault();
            var name = prompt("Please set new file name", this.model.get('name'));
            this.toggleContextMenu(e);
            
            if (!name) {
                return false;
            }
            this.model.set('name', name).save();
            return false;
        },

        newfile: function (e) {
            e.preventDefault();
            vent.trigger('sidebar:newfile', this.model);
            return false;
        },

        toggleContextMenu: function (e) {
            e.preventDefault();
            var menu = this.$el.find('.tool-container:first');
            menu.css({
                "margin-left": menu.outerWidth()/2 * -1
            });
            $('.tool-container').not(menu.toggle()).hide();
            return false;
        },

        toggleExpandedVisibility: function () {
            var ul = this.$el.find('ul'),
                i = this.$el.find('span i');

            if (!ul.is(':visible')) {
                ul.hide();
                i.className = 'icon-chevron-down';
            } else {
                ul.show();
                i.className = 'icon-chevron-up';
            }
        },

        render: function () {
            if (this.model.get('type') === 0) {
                var model = this.model.toJSON();
                if (!model.expanded) model.expanded = false;
                this.$el.html(this.folderTemplate(model));
                vent.trigger('sidebar:renderChildren', this);
            } else if (this.model.get('type') > 0) {
                // is regular MD file
                this.$el.html(this.fileTemplate(this.model.toJSON()));
            }

            return this;
        },

        renderChildren: function () {

        }
    });
});