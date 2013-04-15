require.config({
  paths: {
    order: 'js/libs/requirejs-plugins/order',
    vent: 'js/vent',
    bootstrap: 'js/vendor/bootstrap/docs/assets/js/bootstrap',
    marked: 'js/libs/marked',
    jRespond: 'js/libs/jRespond',
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'jRespond': {
      exports: 'jRespond'
    }
  },
  "packages": [
        {
            "name": "ace",
            "location": "js/libs/ace",
            "main": "ace.js"
        }
  ]
});

define([
        'backbone', 
        'jquery', 
        'bootstrap',
        'vent',
        'js/collections/structure', 
        'js/views/structure', 
        'js/views/navtop',
        'js/views/editor',
        'js/views/compiled',
        'js/views/fileOptions',
        'js/views/user',
        'js/views/load',
        'js/models/document',
        'js/models/fileStructure',
        'js/views/user',
        'js/views/settings',
        'js/models/user',
        'js/views/responsive'
    ], 
    function (Backbone, 
              $, 
              boot, 
              vent, 
              StructureCollection, 
              StructureView, 
              NavTopView, 
              EditorView, 
              CompiledView, 
              FileOptions, 
              UserBox, 
              LoadingScreen,
              DocumentModel,
              FileModel,
              UserBox,
              SettingsBox,
              UserModel, ResponsiveView) {
  return {
    init: function(tree, fileModel) {

      new ResponsiveView();

      var userModel = new UserModel({_id: 'foo'});
      userModel.fetch().then(function () {
        new UserBox({
          model: userModel
        });
        new SettingsBox({
          model: userModel
        });
      });

      var existingDocs;

      sidebarStructureView = new StructureView({
        collection: new StructureCollection(tree)
      });
      sidebarStructureView.collection.getTree();


      new NavTopView();
      new LoadingScreen();
      new CompiledView();
      
      var editor = new EditorView(existingDocs);
      new FileOptions();

      if (fileModel) {
        vent.trigger('editor:loadDocument', sidebarStructureView.collection.get(fileModel._id));
      }

      // Set Startup Box as a model:
      $("#startup-box").modal();
    }
  };
});
