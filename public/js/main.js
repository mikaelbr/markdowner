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
        'js/views/load'
    ], 
    function (Backbone, $, boot, StructureCollection, StructureView, NavTopView, EditorView, CompiledView, FileOptions, UserBox, LoadingScreen) {

  var structureCollection = new StructureCollection(),
      sidebarStructureView = new StructureView({collection: structureCollection});
  structureCollection.fetch();

  new NavTopView();
  new LoadingScreen();
  new EditorView();
  new CompiledView();
  new FileOptions();
  new UserBox();
  
  return {
    init: function() {}
  };
});
