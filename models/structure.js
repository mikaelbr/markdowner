// GET     /api/structure.json              ->  index
// GET     /api/structure.json/new          ->  new
// POST    /api/structure.json              ->  create
// GET     /api/structure.json/:structure       ->  show
// GET     /api/structure.json/:structure/edit  ->  edit
// PUT     /api/structure.json/:structure       ->  update
// DELETE  /api/structure.json/:structure       ->  destroy

var structure = require('../lib/folderHierarchy'),
    store = require('../lib/store');

exports.index = function(req, res){
  var user = req.user || {_id: 1};
  structure.list(user._id, function (err, list) {
    console.log(err, list);
    res.json(list);
  });
};

// New folder view - not include
// exports.new = function(req, res){
//   res.send('new folder');
// };

exports.create = function(req, res){
  var user = req.user;
  var newItem = req.body;
  newItem.user_id = user._id;

  structure.insert(newItem, function(err, item) {

    if (item.type === 0) {
      return res.json(item);
    }

    var newDocument = {
      body: item.name + "\n===",
      file_id: item._id,
      user_id: req.user._id
    };

    store.insert(newDocument, function(err, createdDocument) {
      res.json(item);
    });
  });
};

exports.show = function(req, res){
  structure.get(req.params.structure, function (err, item) {
    res.json(item);
  });
};

// Edit file/folder view
// exports.edit = function(req, res){
//   res.send('edit file/folder ' + req.params.structure);
// };

exports.update = function(req, res){
  structure.save(req.body, function (err, item) {
    res.json(req.body);
  })
};

exports.destroy = function(req, res){
  structure.delete(req.params.structure, function (err, item) {
    res.json(item);
  });
};