// GET     /api/files.json              ->  index
// GET     /api/files.json/new          ->  new
// POST    /api/files.json              ->  create
// GET     /api/files.json/:forum       ->  show
// GET     /api/files.json/:forum/edit  ->  edit
// PUT     /api/files.json/:forum       ->  update
// DELETE  /api/files.json/:forum       ->  destroy
var store = require('../lib/store');


exports.index = function(req, res){
  var user = req.user || {_id: 1};
  store.list(user._id, function (err, list) {
    res.json(list);
  });
};

// New folder view - not include
// exports.new = function(req, res){
//   res.send('new folder');
// };

exports.create = function(req, res){
  var newItem = req.body;
  var user = req.user || {_id: 1};
  newItem.user_id = user._id;
  store.insert(newItem, function(err, item) {
    res.json(item);
  });
};

exports.show = function(req, res){
  store.get(req.params.document, function (err, item) {
    res.json(item);
  });
};

// Edit document/folder view
// exports.edit = function(req, res){
//   res.send('edit document/folder ' + req.params.document);
// };

exports.update = function(req, res){
  store.save(req.body, function (err, item) {
    console.log(err, item);
    res.json(req.body);
  })
};

exports.destroy = function(req, res){
  store.delete(req.params.document, function (err, item) {
    res.json(item);
  });
};