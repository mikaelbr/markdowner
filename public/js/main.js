require.config({
  paths: {
    order: 'js/libs/requirejs-plugins/order',
    vent: 'js/vent',
    bootstrap: 'js/vendor/bootstrap/docs/assets/js/bootstrap',
    marked: 'js/libs/marked',
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  },
  "packages": [
        {
            "name": "ace",
            "location": "js/libs/ace/",
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
        'js/models/fileStructure'
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
              FileModel) {
  return {
    init: function(tree, fileModel) {

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
      new UserBox();

      if (fileModel) {
        vent.trigger('editor:loadDocument', sidebarStructureView.collection.get(fileModel._id));
      }

      // Set Startup Box as a model:
      $("#startup-box").modal();
    }
  };
});
