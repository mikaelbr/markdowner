var db = require('./db');

var FileStorage = function () {
    this.col = db.documents;
};

FileStorage.prototype.list = function(userId, cb) {
  this.col.find({user_id: userId}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, (res));
  });
  return this;
}


FileStorage.prototype.get = function(id, cb) {
  this.col.findOne({file_id: db.ObjectId(id)}, function (err, res) {
    if (err) return cb(err, res);
    cb(null, res);
  });
  return this;
}

FileStorage.prototype.delete = function(id, userId, cb) {
  this.col.remove({file_id: id, user_id: userId}, true, cb);
  return this;
};

FileStorage.prototype.add = function(item, cb) {
  this.save(item);
  this.get(item.user_id, cb);
  return this;
};

FileStorage.prototype.save = function(item, cb) {
  var _id = item._id;
  delete item._id;
  item.user_id = db.ObjectId(item.user_id);
  item.file_id = db.ObjectId(item.file_id);
  this.col.update({_id: db.ObjectId(_id)}, item, function (err, data) {
    item._id = _id;
    cb(err, data);
  });
  return this;
};

FileStorage.prototype.insert = function(item, cb) {
  this.col.save(item, cb);
  return this;
};

module.exports = new FileStorage();