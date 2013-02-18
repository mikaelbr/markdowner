require.config({
  paths: {
    order: 'js/libs/requirejs-plugins/order',
    vent: 'js/vent',
    bootstrap: 'js/vendor/bootstrap/docs/assets/js/bootstrap',
    'ace/ace/lib': 'js/vendor/ace/lib'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

// require(["ace/config"], function (config) {
//   // config.set("packaged", true) 
//   config.set("libPath", "js/vendor/ace/lib") 
// });

define([
        'backbone', 
        'jquery', 
        'bootstrap',
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
    init: function(tree, doc, fileModel) {

      sidebarStructureView = new StructureView({
        collection: new StructureCollection(tree)
      });
      sidebarStructureView.collection.getTree();

      new NavTopView();
      new LoadingScreen();
      var editor = new EditorView({
        activeDoc: new DocumentModel(doc),
        fileModel: sidebarStructureView.collection.get(fileModel._id)
      });
      new CompiledView();
      new FileOptions();
      new UserBox();

      if (fileModel && doc)
        editor.setContent();
    }
  };
});
