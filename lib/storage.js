var db = require('./db')
  , _ = require('underscore');

var Storage = function () {
  this.db = db;
};

Storage.prototype._stdFieldCheck = function(_id, extra) {
  if (this._stdField === 'file_id') {
    return _.extend({file_id: db.ObjectId(_id)}, _.result(extra));
  }

  return _.extend({_id: db.ObjectId(_id)}, _.result(extra));
};

Storage.prototype.list = function(userId, cb) {
  this.col.find({user_id: userId}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, (res));
  });
  return this;
};


Storage.prototype.get = function(id, cb) {
  this.col.findOne(this._stdFieldCheck(id), function (err, res) {
    if (err) return cb(err, res);
    cb(null, res);
  });
  return this;
};

Storage.prototype.delete = function(id, userId, cb) {
  this.col.remove(this._stdFieldCheck(id, { user_id: userId } ), true, cb);
  return this;
};

Storage.prototype.add = function(item, cb) {
  this.save(item);
  this.get(item.user_id, cb);
  return this;
};

Storage.prototype.save = function(item, cb) {
  var _id = item._id;
  delete item._id;
  item.user_id = db.ObjectId(item.user_id);
  item.file_id && (item.file_id = db.ObjectId(item.file_id));
  this.col.update({_id: db.ObjectId(_id)}, item, function (err, data) {
    item._id = _id;
    cb(err, data);
  });
  return this;
};

Storage.prototype.insert = function(item, cb) {
  this.col.save(item, cb);
  return this;
};


module.exports = Storage;