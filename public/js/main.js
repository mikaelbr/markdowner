require.config({
   paths: {
      order: 'js/libs/requirejs-plugins/order',
      jqueryContextMenu: 'js/libs/jquery.contextMenu',
      jqueryuiPosition: 'js/libs/jquery.ui.position',
      vent: 'js/vent',
      // templates: 'templates/'
   }
});

define([
        'backbone', 
        'jquery', 
        'js/collections/structure', 
        'js/views/structure', 
        'js/views/navtop',
        'js/views/editor',
        'js/views/compiled',
        'js/views/fileOptions',
        'js/views/user',
        'js/views/load',
        'order!bootstrap/js/bootstrap-dropdown'
    ], 
    function (Backbone, $, StructureCollection, StructureView, NavTopView, EditorView, CompiledView, FileOptions, UserBox, LoadingScreen) {

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
