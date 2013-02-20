// GET     /api/structure.json              ->  index
// GET     /api/structure.json/new          ->  new
// POST    /api/structure.json              ->  create
// GET     /api/structure.json/:structure       ->  show
// GET     /api/structure.json/:structure/edit  ->  edit
// PUT     /api/structure.json/:structure       ->  update
// DELETE  /api/structure.json/:structure       ->  destroy

var files = require('../lib/files'),
    docs = require('../lib/documents');

exports.index = function(req, res){
  var user = req.user || {_id: 1};
  files.list(user._id, function (err, list) {
    res.json(list);
  });
};

exports.create = function(req, res){
  var user = req.user;
  var newItem = req.body;
  newItem.user_id = user._id;

  files.insert(newItem, function(err, item) {

    if (item.type === 0) {
      return res.json(item);
    }

    var newDocument = {
      body: item.name + "\n===",
      file_id: item._id,
      user_id: req.user._id
    };

    docs.insert(newDocument, function(err, createdDocument) {
      res.json(item);
    });
  });
};

exports.show = function(req, res){
  files.get(req.params.structure, function (err, item) {
    res.json(item);
  });
};

exports.update = function(req, res){
  files.save(req.body, function (err, item) {
    res.json(req.body);
  })
};

exports.destroy = function(req, res){
  files.delete(req.params.structure, req.user._id, function (err, item) {
    docs.delete(req.params.structure, req.user._id, function (err, doc) {
      res.json(item);
    });
  });
};