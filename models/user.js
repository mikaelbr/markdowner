// GET     /api/user.json               ->  index
// GET     /api/user.json/new           ->  new
// POST    /api/user.json               ->  create
// GET     /api/user.json/:user         ->  show
// GET     /api/user.json/:user/edit    ->  edit
// PUT     /api/user.json/:user         ->  update
// DELETE  /api/user.json/:structure    ->  destroy

var user = require('../lib/user');

exports.index = function(req, res){
  user.list(function (err, list) {
    res.json(list);
  });
};

exports.show = function(req, res){
  res.json(req.user);
};

exports.update = function(req, res){
  user.save(req.body, function (err, item) {
    res.json(req.body);
  })
};

exports.destroy = function(req, res){
  user.delete(req.params.user, function (err, item) {
    res.json(item);
  });
};