// GET     /api/files.json              ->  index
// GET     /api/files.json/new          ->  new
// POST    /api/files.json              ->  create
// GET     /api/files.json/:document       ->  show
// GET     /api/files.json/:document/edit  ->  edit
// PUT     /api/files.json/:document       ->  update
// DELETE  /api/files.json/:document       ->  destroy
var docs = require('../lib/documents');

exports.index = function(req, res){
  var user = req.user || {_id: 1};
  docs.list(user._id, function (err, list) {
    res.json(list);
  });
};


exports.create = function(req, res){
  var newItem = req.body;
  var user = req.user || {_id: 1};
  newItem.user_id = user._id;
  docs.insert(newItem, function(err, item) {
    res.json(item);
  });
};

exports.show = function(req, res){
  docs.get(req.params.document, function (err, item) {
    res.json(item);
  });
};


exports.update = function(req, res){
  docs.save(req.body, function (err, item) {
    res.json(req.body);
  })
};

exports.destroy = function(req, res){
  docs.delete(req.params.document, function (err, item) {
    res.json(item);
  });
};